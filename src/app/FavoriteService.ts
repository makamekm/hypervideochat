import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import { useSyncLocalStorage } from "~/hooks";

export const FavoriteService = createService(
  () => {
    const state = useLocalStore(() => ({
      _favoriteShows: [] as {
        title: string;
        id: string;
        poster: string;
      }[],
      get favoriteShows() {
        if (!state._favoriteShows) {
          state._favoriteShows = [];
        }
        return state._favoriteShows;
      },
    }));
    return state;
  },
  (state) => {
    useSyncLocalStorage(state, "_favoriteShows");
  }
);
