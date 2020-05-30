import React from "react";
import cherio from "cheerio";
import { useLocalStore, observer } from "mobx-react";
import { useParams, useHistory } from "react-router";
import { useLayoutConfig } from "./LayoutService";
import {
  XFocusableContainer,
  XFocusable,
} from "~/components/XFocusable/XFocusable";
import { LoadingService } from "~/components/Loading/LoadingService";
import { FavoriteService } from "./FavoriteService";

export const TVShow = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  const loadingService = React.useContext(LoadingService);
  const favoriteService = React.useContext(FavoriteService);
  const state = useLocalStore(() => ({
    title: "",
    poster: "",
    description: "",
    seasons: [] as {
      id: string;
      title: string;
      eposodes: {
        title: string;
        file: string;
        id: string;
        poster: string;
      }[];
    }[],
    getSeasons: async (uuid: string, ids: string[]) => {
      const seasons = [];
      for (let i of ids) {
        const res = await fetch(
          `https://proxier.now.sh/api?url=https://online.animedia.tv/embeds/playlist-j.txt/${uuid}/${Number(
            i
          ) + 1}`
        );
        const arr = await res.json();
        seasons.push(arr);
      }
      return seasons;
    },
    load: async () => {
      loadingService.setLoading(true, "tvshow");
      try {
        const res = await fetch(
          "https://proxier.now.sh/api?url=https://online.animedia.tv/anime/" +
            id
        );
        const text = await res.text();
        const $ = cherio.load(text);
        const mainElement = $(".media__tabs > ul[data-entry_id]");
        const uuid = mainElement.attr("data-entry_id");
        state.title = $(".media__post__original-title").text();
        state.description = $(".media__post__body").text();
        state.poster = $(".widget__post-info__poster img").attr("data-src");
        const seasonNames: string[] = [];
        const seasonIds: string[] = [];
        mainElement.children("li").each((i, el) => {
          seasonNames.push(
            $(el)
              .children("a")
              .text()
          );
          seasonIds.push(
            $(el)
              .children("a")
              .attr("href")
              .replace("#tab", "")
          );
        });
        const seasonEpisodes = await state.getSeasons(uuid, seasonIds);
        const seasons = [];
        for (let i in seasonIds) {
          seasons.push({
            id: seasonIds[i],
            title: seasonNames[i],
            eposodes: seasonEpisodes[i],
          });
        }
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
      <div className="flex items-end justify-between font-light text-5xl mt-4 mb-4 text-gray-300 w-full px-10 max-h-screen leading-none">
        <XFocusable
          className="text-gray-400 leading-none mr-4 py-6 px-6"
          onClickEnter={() => {
            if (favoriteService.favoriteShows.includes(id)) {
              favoriteService.favoriteShows.splice(
                favoriteService.favoriteShows.indexOf(id),
                1
              );
            } else {
              favoriteService.favoriteShows.push(id);
            }
          }}
        >
          <div className="flex flex-row items-center">
            <div
              className="ellipsis font-normal text-5xl"
              style={{ maxWidth: "50vw" }}
            >
              {state.title}
            </div>
            <div className="font-bold text-3xl ml-6">
              {favoriteService.favoriteShows.includes(id) ? (
                <i className="fas fa-star"></i>
              ) : (
                <i className="far fa-star"></i>
              )}
            </div>
          </div>
        </XFocusable>
        <img
          style={{
            height: "100px",
          }}
          className="rounded-lg"
          alt={state.title}
          src={state.poster}
        />
      </div>
      <div className="font-light text-2xl mt-4 text-gray-500 w-full px-10">
        {state.description}
      </div>
      {state.seasons.map((season) => {
        return (
          <React.Fragment key={season.id}>
            <div className="font-light text-4xl mt-8 mb-8 text-gray-600 w-full px-10">
              {season.title}
              <span className="text-xl text-gray-700 ml-4">
                # {season.eposodes.length} of eposodes
              </span>
            </div>

            <XFocusableContainer
              className="px-10"
              style={{ maxWidth: "100vw" }}
            >
              {season.eposodes.map((episode) => {
                return (
                  <XFocusable
                    className="my-1 mx-2 p-1"
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
                      src={"https:" + episode.poster}
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
