import React from "react";
import hark from "hark";
import hyperswarm from "hyperswarm-web";
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
  stream?: MediaStream;
}

export const RoomService = createService(
  () => {
    const [storage] = React.useState(() => ({
      swarm: null as any,
      loadDevicesPromise: createHotPromise(),
    }));
    React.useEffect(() => {
      storage.swarm = hyperswarm({
        maxPeers: Infinity,
      });
      return () => {
        storage.swarm.destroy();
      };
    }, [storage]);

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
          return await state.getDisplayStream();
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
          audio: state.selectedMic
            ? {
                deviceId: state.selectedMic,
              }
            : true,
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
      async connect(socket, details) {
        const id = state.uuid();
        state.connections.push({
          id,
          socket,
          speaking: false,
        });
        socket.on("stream", (stream) => {
          const connection = state.connections.find((c) => c.id === id);
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
      async disconnect(socket, details) {
        const index = state.connections.findIndex(
          (connection) => connection.socket === socket
        );
        if (index >= 0) {
          state.connections.splice(state.connections.indexOf(socket), 1);
        }
      },
      async getCamStream() {
        return await navigator.mediaDevices.getUserMedia({
          audio: state.selectedMic
            ? {
                deviceId: state.selectedMic,
                // deviceId: state.mics[0].deviceId,
              }
            : true,
          video: state.selectedCam
            ? {
                deviceId: state.selectedCam,
                // deviceId: state.cameras[0].deviceId,
              }
            : true,
        });
      },
      async run() {
        state.isLoading = true;
        await storage.loadDevicesPromise;
        state.localStream = await state.getStream();
        state.updateCamState();
        state.updateMicState();
        const topic = crypto
          .createHash("sha256")
          .update(state.room)
          .digest();
        storage.swarm.join(topic);
        storage.swarm.on("connection", (socket, details) => {
          state.connect(socket, details);
          socket.once("close", () => {
            state.disconnect(socket, details);
          });
        });
        state.isLoading = false;
      },
      get storage() {
        return storage;
      },
      async stop() {
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
