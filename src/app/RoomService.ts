import React from "react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import { useOnChange } from "~/hooks";
import { LoadingService } from "~/components/Loading/LoadingService";
import hyperswarm from "hyperswarm-web";

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

export const RoomService = createService(
  () => {
    const [storage] = React.useState(() => ({
      swarm: null as any,
      loadDevicesPromise: createHotPromise(),
    }));
    React.useEffect(() => {
      storage.swarm = hyperswarm();
      return () => {
        storage.swarm.destroy();
      };
    }, [storage]);

    const state = useLocalStore(() => ({
      remoteStreams: [] as any[],
      connections: [] as any[],
      mics: [] as any[],
      speakers: [] as any[],
      cameras: [] as any[],
      localStream: null as any,
      room: null as number,
      isLoading: false,
      loadingDevices: true,
      async run() {
        state.isLoading = true;
        await storage.loadDevicesPromise;
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: state.mics[0].deviceId,
          },
          video: {
            deviceId: state.cameras[0].deviceId,
          },
        });
        console.log(stream);
        state.localStream = stream;
        state.isLoading = false;
      },
      get storage() {
        return storage;
      },
      async stop() {},
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
  }
);
