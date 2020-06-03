import React from "react";
import cherio from "cheerio";
import { useLocalStore, observer } from "mobx-react";
import { useParams, useHistory } from "react-router";
import { toJS } from "mobx";
import { useLayoutConfig } from "./LayoutService";
import {
  XFocusableContainer,
  XFocusable,
} from "~/components/XFocusable/XFocusable";
import { LoadingService } from "~/components/Loading/LoadingService";
import { FavoriteService } from "./FavoriteService";
import { ProgressService } from "./ProgressService";
import { PROXY } from "@env/config";

export const TVShow = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  const loadingService = React.useContext(LoadingService);
  const favoriteService = React.useContext(FavoriteService);
  const progressService = React.useContext(ProgressService);
  const state = useLocalStore(() => ({
    id: "",
    title: "",
    originalTitle: "",
    poster: "",
    description: "",
    genres: [] as {
      id: string;
      title: string;
    }[],
    related: [] as {
      id: string;
      title: string;
      poster: string;
    }[],
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
    get isFavourite() {
      return !!favoriteService.favoriteShows.find((s) => s.id === state.id);
    },
    getSeasons: async (uuid: string, ids: string[]) => {
      const seasons = [];
      for (let i of ids) {
        const res = await fetch(
          `${PROXY}https://online.animedia.pro/embeds/playlist-j.txt/${uuid}/${Number(
            i
          ) + 1}`
        );
        const arr = await res.json();
        seasons.push(arr);
      }
      return seasons;
    },
    load: async (id) => {
      state.id = id;
      loadingService.setLoading(true, "tvshow");
      try {
        const res = await fetch(
          `${PROXY}https://online.animedia.pro/anime/${state.id}`
        );
        const text = await res.text();
        const $ = cherio.load(text);
        const mainElement = $(".media__tabs > ul[data-entry_id]");
        const uuid = mainElement.attr("data-entry_id");
        state.originalTitle = $(".media__post__original-title").text();
        state.title = $(".media__post__title")
          .text()
          .replace("смотреть онлайн", "")
          .trim();
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
        const genres = [];
        $(".content-container .media .media__post__info .genre-tags a").each(
          (i, el) => {
            genres.push({
              title: $(el).text(),
              id: $(el)
                .attr("href")
                .replace("https://online.animedia.pro/category/", ""),
            });
          }
        );
        (state.genres as any).replace(genres);
        const related = [];
        $(".media__related__list .media__related__list__item a").each(
          (i, el) => {
            related.push({
              title: $(el)
                .attr("title")
                .replace("Смотреть онлайн ", ""),
              poster: $(el)
                .find("img")
                .attr("data-src"),
              id: $(el)
                .attr("href")
                .replace("https://online.animedia.pro/anime/", ""),
            });
          }
        );
        (state.related as any).replace(related);
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
    state.load(id);
  }, [state, id]);
  return (
    <div className="flex flex-1 flex-col items-start justify-center">
      <div className="flex items-end justify-between font-light text-5xl mt-4 mb-4 text-gray-300 w-full px-10 max-h-screen leading-none">
        <XFocusable
          className="text-gray-400 leading-none mr-4 py-6 px-6"
          onClickEnter={() => {
            const isFavouriteIndex = favoriteService.favoriteShows.findIndex(
              (s) => s.id === state.id
            );
            if (isFavouriteIndex >= 0) {
              favoriteService.favoriteShows.splice(isFavouriteIndex, 1);
            } else {
              favoriteService.favoriteShows.unshift(
                toJS({
                  id: state.id,
                  poster: state.poster,
                  title: state.title,
                })
              );
            }
          }}
        >
          <div className="flex flex-row items-center">
            <div
              className="ellipsis font-normal text-5xl"
              style={{ maxWidth: "50vw" }}
            >
              {state.title} / {state.originalTitle}
            </div>
            <div className="font-bold text-3xl ml-6">
              {state.isFavourite ? (
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
      <div className="flex flex-wrap items-center justify-start font-light text-2xl text-gray-500 w-full px-10">
        {state.genres.map((g) => (
          <XFocusable
            className="p-4 leading-none m-2"
            key={g.id}
            onClickEnter={() => {
              history.push("/genre/" + g.id);
            }}
          >
            <div className="font-light text-2xl">{g.title}</div>
          </XFocusable>
        ))}
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
                    shouldTrapLeft
                    shouldTrapRight
                    className="my-1 mx-2 p-1 relative"
                    key={episode.id}
                    onClickEnter={() => {
                      loadingService.setLoading(true, "playerGlobal");
                      setTimeout(() => {
                        history.push({
                          pathname: "/player",
                          state: {
                            id: state.id + "__" + episode.id,
                            header: state.title,
                            poster: state.poster,
                            title: episode.title,
                            file: episode.file,
                            prevUrl: history.location.pathname,
                          },
                        });
                      }, 100);
                    }}
                  >
                    <img
                      style={{
                        width: "270px",
                        height: "150px",
                      }}
                      className="rounded-lg inline-block"
                      alt={episode.title}
                      src={"https:" + episode.poster}
                    />
                    <div
                      className="ellipsis py-1 px-2 text-lg font-light"
                      style={{
                        maxWidth: "270px",
                      }}
                    >
                      {episode.title}
                    </div>
                    <div
                      className="rounded-lg"
                      style={{
                        content: "",
                        position: "absolute",
                        top: 10,
                        left: 10,
                        height: "6px",
                        backgroundColor: "red",
                        opacity: 0.8,
                        width: `calc(${(progressService.episodeProgress[
                          state.id + "__" + episode.id
                        ] || 0) * 100}% - 20px)`,
                      }}
                    ></div>
                  </XFocusable>
                );
              })}
            </XFocusableContainer>
          </React.Fragment>
        );
      })}

      {state.related?.length > 0 && (
        <>
          <div className="font-light text-4xl mt-8 mb-8 text-gray-600 w-full px-10">
            Схожие
            <span className="text-xl text-gray-700 ml-4">
              # с этим шоу так же смотрят
            </span>
          </div>
          <XFocusableContainer className="px-10" style={{ maxWidth: "100vw" }}>
            {state.related.map((show) => {
              return (
                <XFocusable
                  key={show.id}
                  className="my-1 mx-2 p-1"
                  onClickEnter={() => {
                    history.push("/tvshow/" + show.id);
                  }}
                  shouldTrapLeft
                  shouldTrapRight
                >
                  <img
                    style={{
                      width: "200px",
                    }}
                    className="rounded-lg"
                    alt={show.title}
                    src={show.poster}
                  />
                  <div
                    className="ellipsis py-1 px-2 text-lg font-light"
                    style={{
                      maxWidth: "200px",
                    }}
                  >
                    {show.title}
                  </div>
                </XFocusable>
              );
            })}
          </XFocusableContainer>
        </>
      )}
    </div>
  );
});
