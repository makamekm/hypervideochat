import React from "react";
import { useLocalStore, observer } from "mobx-react";
import { useParams, useHistory } from "react-router";
import { useLayoutConfig } from "./LayoutService";
import {
  XFocusableContainer,
  XFocusable,
} from "~/components/XFocusable/XFocusable";
import { LoadingService } from "~/components/Loading/LoadingService";

export const TVShow = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  const loadingService = React.useContext(LoadingService);
  const state = useLocalStore(() => ({
    seasons: [] as {
      title: string;
      file: string;
      id: string;
      poster: string;
    }[][],
    getSeasons: async () => {
      const seasons = [];
      let i = 0;
      while (true) {
        i++;
        const res = await fetch(
          `https://proxier.now.sh/api?url=https://online.animedia.tv/embeds/playlist-j.txt/${id}/${i}`
        );
        const arr = await res.json();
        if (arr.length === 0) {
          break;
        } else {
          seasons.push(arr);
        }
      }
      return seasons;
    },
    load: async () => {
      loadingService.setLoading(true, "tvshow");
      try {
        const seasons = await state.getSeasons();
        console.log(seasons);
        (state.seasons as any).replace(seasons);
      } catch (error) {
        console.error(error);
      }
      loadingService.setLoading(false, "tvshow");
    },
  }));
  useLayoutConfig({});
  React.useEffect(() => {
    state.load();
  }, [state]);
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      {state.seasons.map((season, index) => {
        return (
          <React.Fragment key={index}>
            <div className="font-light text-4xl mt-8 mb-8 text-gray-600 w-full px-10">
              Season #{index + 1}
              <span className="text-xl text-gray-700 ml-4">
                # {season.length} of eposodes
              </span>
            </div>

            <XFocusableContainer
              className="px-10"
              style={{ maxWidth: "100vw" }}
            >
              {season.map((episode) => {
                return (
                  <XFocusable
                    key={episode.id}
                    onClickEnter={() => {
                      console.log(episode);
                      history.push({
                        pathname: "/player",
                        state: {
                          title: episode.title,
                          file: episode.file,
                          prevUrl: history.location.pathname,
                        },
                      });
                    }}
                  >
                    <img
                      style={{
                        width: "270px",
                        height: "150px",
                      }}
                      className="rounded-lg"
                      alt={episode.title}
                      src={episode.poster}
                    />
                  </XFocusable>
                );
              })}
            </XFocusableContainer>
          </React.Fragment>
        );
      })}
    </div>
  );
});
