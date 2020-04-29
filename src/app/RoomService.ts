import React from "react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import { useOnChange } from "~/hooks";
import { LoadingService } from "~/components/Loading/LoadingService";
// import { useOnChange } from "~/hooks";

export const RoomService = createService(
  () => {
    const state = useLocalStore(() => ({
      room: null as number,
      isLoading: false,
      async run() {
        state.isLoading = true;

        state.isLoading = false;
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
    return state;
  },
  (state) => {
    const loadingService = React.useContext(LoadingService);
    useOnChange(state, "isLoading", (value) => {
      loadingService.setLoading(value);
    });
  }
);
