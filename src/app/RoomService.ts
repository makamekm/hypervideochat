import React from "react";
import hark from "hark";
import ndjson from "ndjson";
import hyperswarm from "@geut/discovery-swarm-webrtc";
import crypto from "crypto";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import { useOnChange } from "~/hooks";
import { LoadingService } from "~/components/Loading/LoadingService";

const LOAD_DEVICES_DELAY = 100;

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
  socket;
  send: (data) => void;
  stream?: MediaStream;
}

export const RoomService = createService(
  () => {
    const [storage] = React.useState(() => ({
      swarm: null as any,
      loadDevicesPromise: createHotPromise(),
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
            connection.socket.removeStream(state.prevLocalStream);
          });
        }
        if (state.localStream) {
          state.connections.forEach((connection) => {
            connection.socket.addStream(state.localStream);
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
          },
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
      onMessage(connection: IConnection, data) {
        console.log("message", data);
      },
      connect(socket, details) {
        const id = state.uuid();
        const incoming = ndjson.parse();
        const outgoing = ndjson.stringify();
        socket.pipe(incoming);
        outgoing.pipe(socket);

        state.connections.push({
          id,
          socket,
          speaking: false,
          send: (data) => outgoing.write(data),
        });
        const connection = state.connections.find((c) => c.id === id);

        incoming.on("data", (data) => {
          state.onMessage(connection, data);
        });

        socket.on("stream", (stream) => {
          connection.stream = stream;

          const speech = hark(stream);
          speech.on("speaking", () => {
            const speaker = state.connections.find(
              (connection) => connection.id === state.speakingConnectionId
            );
            if (!speaker) {
              state.speakingConnectionId = id;
            }
            connection.speaking = true;
          });
          speech.on("stopped_speaking", function() {
            connection.speaking = false;
          });
        });

        socket.addStream(state.localStream);
      },
      disconnect(socket, details) {
        const index = state.connections.findIndex(
          (connection) => connection.socket === socket
        );
        if (index >= 0) {
          state.connections.splice(state.connections.indexOf(socket), 1);
        }
      },
      async getCamStream() {
        return await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: state.selectedMic,
            echoCancellation: true,
          },
          video: {
            deviceId: state.selectedCam,
          },
        });
      },
      async run() {
        state.isLoading = true;
        storage.swarm = hyperswarm({
          bootstrap: [
            "https://geut-webrtc-signal.herokuapp.com",
            "http://localhost:4000",
          ],
          maxPeers: 24,
        });
        storage.swarm.join(Buffer.from(state.topic));
        await storage.loadDevicesPromise;
        try {
          state.localStream = await state.getStream();
        } catch (e) {
          alert("You need to allow video and audio sharing");
          throw e;
        }
        state.updateCamState();
        state.updateMicState();
        storage.swarm.on("connection", (socket, details) => {
          state.connect(socket, details);
        });
        storage.swarm.on("connection-closed", (socket, details) => {
          state.disconnect(socket, details);
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
          state.connections.splice(0, state.connections.length);
        }
        storage.swarm.destroy();
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
      setTimeout(
        () =>
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
          }),
        LOAD_DEVICES_DELAY
      );
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
  }
);
