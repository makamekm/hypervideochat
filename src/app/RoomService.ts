import React from "react";
import hark from "hark";
import ndjson from "ndjson";
import signalhub from "signalhub";
import SimplePeer from "simple-peer";
import crypto from "crypto";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import { useOnChange, useSimpleSyncLocalStorage } from "~/hooks";
import { LoadingService } from "~/components/Loading/LoadingService";

const LOAD_DEVICES_DELAY = 100;
const CONNECTION_TIMEOUT = 5000;

class HotPromise<T = void> extends Promise<T> {
  resolve: () => void;
}

const createHotPromise = () => {
  let resolve;
  const promise = new HotPromise((r) => {
    resolve = r;
  });
  promise.resolve = resolve;
  return promise;
};

export interface IConnection {
  id: string;
  speaking: boolean;
  peer;
  send?: (data) => void;
  username?: string;
  stream?: MediaStream;
}

export const RoomService = createService(
  () => {
    const [storage] = React.useState(() => ({
      // swarm: null as any,
      id: null,
      hub: null as any,
      broadcast: null as (data) => void,
      loadDevicesPromise: createHotPromise(),
      peerMap: {} as any,
      initialPeerMap: {} as any,
    }));

    const state = useLocalStore(() => ({
      connections: [] as IConnection[],
      speakingConnectionId: null,
      mics: [] as any[],
      speakers: [] as any[],
      cameras: [] as any[],
      selectedCam: "default" as string,
      selectedMic: "default" as string,
      prevLocalStream: null as MediaStream,
      localStream: null as MediaStream,
      room: null as string,
      isLoading: false,
      loadingDevices: true,
      micState: false,
      currentScreenState: false,
      screenState: false,
      camState: true,
      username: "",
      get mainStream() {
        const speaker = state.connections.find(
          (connection) => connection.id === state.speakingConnectionId
        );
        if (speaker) {
          return speaker.stream;
        } else {
          return state.connections[0]?.stream;
        }
      },
      updateLocalStream() {
        if (state.prevLocalStream) {
          state.connections.forEach((connection) => {
            connection.peer.removeStream(state.prevLocalStream);
          });
        }
        if (state.localStream) {
          state.connections.forEach((connection) => {
            connection.peer.addStream(state.localStream);
          });
        }
        state.prevLocalStream = state.localStream;
      },
      async getStream() {
        if (state.screenState) {
          try {
            return await state.getDisplayStream();
          } catch {
            state.screenState = false;
            return await state.getCamStream();
          }
        } else {
          return await state.getCamStream();
        }
      },
      async updateScreenState() {
        if (state.localStream) {
          state.localStream = await state.getStream();
          state.updateCamState();
          state.updateMicState();
        }
      },
      updateUsername() {
        state.connections.forEach((connection) =>
          connection.send({
            type: "username",
            value: state.username,
          })
        );
      },
      updateMicState() {
        if (state.localStream) {
          state.localStream.getAudioTracks().forEach((track) => {
            track.enabled = state.micState;
          });
        }
      },
      updateCamState() {
        if (state.localStream) {
          state.localStream.getVideoTracks().forEach((track) => {
            track.enabled = state.camState;
          });
        }
      },
      async getDisplayStream(): Promise<MediaStream> {
        return await (navigator.mediaDevices as any).getDisplayMedia({
          audio: {
            deviceId: state.selectedMic,
            echoCancellation: true,
            googAutoGainControl: false,
            autoGainControl: false,
            noiseSuppression: true,
            sampleRate: 48000,
            channelCount: 1,
          } as any,
          video: true,
        });
      },
      uuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
          c
        ) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      },
      onHubPrivateMessage(data) {
        if (data.type === "handshake" && data.id) {
          state.createPeer(data.id);
          storage.peerMap[data.id].signal(data.signal);
        } else if (
          data.type === "handshake-peer" &&
          data.id &&
          storage.initialPeerMap[data.id]
        ) {
          storage.initialPeerMap[data.id].signal(data.signal);
        }
      },
      onHubMessage(data) {
        if (data.type === "connect" && data.id && data.id !== storage.id) {
          state.createInitiatorPeer(data.id);
        }
      },
      createPeer(id: string) {
        if (storage.peerMap[id]) {
          return;
        }
        const deletePeer = () => {
          if (storage.peerMap[id]) {
            delete storage.peerMap[id];
          }
        };
        const destroyPeer = () => {
          if (storage.peerMap[id]) {
            storage.peerMap[id].destroy();
            deletePeer();
          }
        };
        const connectionInitTimeout = setTimeout(() => {
          destroyPeer();
        }, CONNECTION_TIMEOUT);
        const peer = new SimplePeer({
          initiator: false,
          trickle: false,
          stream: state.localStream,
          iceTransportPolicy: "relay",
        });
        peer.on("error", (err) => {
          console.error(err);
          destroyPeer();
        });
        peer.on("stream", (stream) => {
          clearTimeout(connectionInitTimeout);
          state.connectStream(peer, id, stream);
        });
        peer.on("connect", () => {
          clearTimeout(connectionInitTimeout);
          state.connect(peer, id);
        });
        peer.on("close", () => {
          state.disconnect(peer, id);
          deletePeer();
        });
        peer.on("signal", (signal) => {
          storage.hub.broadcast(id, {
            type: "handshake-peer",
            signal,
            id: storage.id,
          });
        });
        storage.peerMap[id] = peer;
      },
      createInitiatorPeer(id: string) {
        if (storage.initialPeerMap[id]) {
          return;
        }
        const deletePeer = () => {
          if (storage.initialPeerMap[id]) {
            delete storage.initialPeerMap[id];
          }
        };
        const destroyPeer = () => {
          if (storage.initialPeerMap[id]) {
            storage.initialPeerMap[id].destroy();
            deletePeer();
          }
        };
        const connectionInitTimeout = setTimeout(() => {
          destroyPeer();
        }, CONNECTION_TIMEOUT);
        const peer = new SimplePeer({
          initiator: true,
          trickle: false,
          stream: state.localStream,
          iceTransportPolicy: "relay",
        });
        peer.on("error", (err) => {
          console.error(err);
          destroyPeer();
        });
        storage.initialPeerMap[id] = peer;
        peer.on("stream", (stream) => {
          clearTimeout(connectionInitTimeout);
          state.connectStream(peer, id, stream);
        });
        peer.on("connect", () => {
          clearTimeout(connectionInitTimeout);
          state.connect(peer, id);
        });
        peer.on("close", () => {
          state.disconnect(peer, id);
          deletePeer();
        });
        peer.on("signal", (signal) => {
          storage.hub.broadcast(id, {
            type: "handshake",
            signal,
            id: storage.id,
          });
        });
      },
      onMessage(connection: IConnection, data) {
        if (data.type === "username") {
          connection.username = data.value;
        }
      },
      connect(peer, id) {
        const incoming = ndjson.parse();
        const outgoing = ndjson.stringify();
        peer.pipe(incoming);
        outgoing.pipe(peer);

        let connection = state.connections.find((c) => c.id === id);

        if (!connection) {
          state.connections.push({
            id,
            peer,
            speaking: false,
            send: (data) => outgoing.write(data),
          });
          connection = state.connections.find((c) => c.id === id);
        } else {
          connection.send = (data) => outgoing.write(data);
        }

        incoming.on("data", (data) => {
          state.onMessage(connection, data);
        });

        connection.send({
          type: "username",
          value: state.username,
        });
      },
      connectStream(peer, id, stream) {
        const connection = state.connections.find((c) => c.id === id);
        if (connection) {
          connection.stream = stream;
        } else {
          state.connections.push({
            id,
            peer,
            speaking: false,
            stream,
          });
        }
        state.trackSpeech(id, stream);
      },
      trackSpeech(id: string, stream: MediaStream) {
        const speech = hark(stream);
        speech.on("speaking", () => {
          const currentConnection = state.connections.find((c) => c.id === id);
          if (currentConnection) {
            const speaker = state.connections.find(
              (connection) => connection.id === state.speakingConnectionId
            );
            if (!speaker || !speaker.speaking) {
              state.speakingConnectionId = id;
            }
            currentConnection.speaking = true;
          }
        });
        speech.on("stopped_speaking", () => {
          const currentConnection = state.connections.find((c) => c.id === id);
          if (currentConnection) {
            currentConnection.speaking = false;
            const speaker = state.connections.find(
              (connection) => connection.id === state.speakingConnectionId
            );
            if (!speaker || !speaker.speaking) {
              const newSpeaker = state.connections.find(
                (connection) => connection.speaking
              );
              if (newSpeaker) {
                state.speakingConnectionId = newSpeaker.id;
              }
            }
          }
        });
      },
      disconnect(peer, id) {
        const index = state.connections.findIndex(
          (connection) => connection.peer === peer
        );
        if (index >= 0) {
          state.connections.splice(state.connections.indexOf(peer), 1);
        }
      },
      async getCamStream() {
        return await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: state.selectedMic,
            echoCancellation: true,
            googAutoGainControl: false,
            autoGainControl: false,
            noiseSuppression: true,
            sampleRate: 48000,
            channelCount: 1,
          } as any,
          video: {
            deviceId: state.selectedCam,
          },
        });
      },
      async run() {
        state.isLoading = true;
        await storage.loadDevicesPromise;
        try {
          state.localStream = await state.getStream();
        } catch (e) {
          alert("You need to allow video and audio sharing");
          throw e;
        }
        state.updateCamState();
        state.updateMicState();

        storage.id = state.uuid();
        storage.hub = signalhub(state.topic.toString("hex"), [
          "https://signalhub-hzbibrznqa.now.sh",
          // "https://signalhub-jccqtwhdwc.now.sh",
        ]);
        storage.hub
          .subscribe(state.topic.toString("hex"))
          .on("data", (message) => {
            state.onHubMessage(message);
          });
        storage.hub.subscribe(storage.id).on("data", (message) => {
          state.onHubPrivateMessage(message);
        });
        storage.broadcast = (message) => {
          storage.hub.broadcast(state.topic.toString("hex"), message);
        };
        storage.broadcast({
          type: "connect",
          id: storage.id,
        });

        state.isLoading = false;
      },
      get topic() {
        return crypto
          .createHash("sha256")
          .update("HYPERCHAT_" + state.room)
          .digest();
      },
      get storage() {
        return storage;
      },
      stop() {
        if (state.localStream) {
          state.localStream.getTracks().forEach((track) => track.stop());
          state.connections.forEach((connection) => {
            if (connection.stream) {
              connection.stream.getTracks().forEach((track) => track.stop());
            }
          });
          state.localStream = null;
        }
        state.connections.forEach((connection) => connection.peer.destroy());
        state.connections.splice(0, state.connections.length);
        storage.hub.stop();
      },
      onRoomChange(room: number) {
        if (room) {
          state.run();
        } else {
          state.stop();
        }
      },
    }));

    React.useEffect(() => {
      setTimeout(async () => {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
          for (let deviceInfo of deviceInfos) {
            if (deviceInfo.kind === "audioinput") {
              state.mics.push(deviceInfo);
            } else if (deviceInfo.kind === "audiooutput") {
              state.speakers.push(deviceInfo);
            } else if (deviceInfo.kind === "videoinput") {
              state.cameras.push(deviceInfo);
            }
          }
          state.loadingDevices = false;
          storage.loadDevicesPromise.resolve();
        });
      }, LOAD_DEVICES_DELAY);
    }, [storage, state]);

    return state;
  },
  (state) => {
    const loadingService = React.useContext(LoadingService);
    useOnChange(state, "isLoading", (value) => {
      loadingService.setLoading(value);
    });
    useOnChange(state, "localStream", state.updateLocalStream);
    useOnChange(state, "screenState", state.updateScreenState);
    useOnChange(state, "micState", state.updateMicState);
    useOnChange(state, "camState", state.updateCamState);
    useOnChange(state, "selectedCam", state.updateScreenState);
    useOnChange(state, "selectedMic", state.updateScreenState);
    useOnChange(state, "username", state.updateUsername);
    useSimpleSyncLocalStorage(state, "username");
  }
);
