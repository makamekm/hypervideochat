import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import { useSyncLocalStorage } from "~/hooks";

export const ProgressService = createService(
  () => {
    const state = useLocalStore(() => ({
      _episodeProgress: {} as {
        [id: string]: number;
      },
      get episodeProgress() {
        if (!state._episodeProgress) {
          state._episodeProgress = {};
        }
        return state._episodeProgress;
      },
    }));
    return state;
  },
  (state) => {
    useSyncLocalStorage(state, "_episodeProgress");
  }
);
