import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import { useSyncLocalStorage } from "~/hooks";

export const ProgressService = createService(
  () => {
    const state = useLocalStore(() => ({
      episodeProgress: {} as {
        [id: string]: number;
      },
      lastEpisodePlayed: {} as {
        [id: string]: {
          seasonId: string;
          episodeId: string;
          id: string;
        };
      },
    }));
    return state;
  },
  (state) => {
    useSyncLocalStorage(state, "episodeProgress");
    useSyncLocalStorage(state, "lastEpisodePlayed");
  }
);
