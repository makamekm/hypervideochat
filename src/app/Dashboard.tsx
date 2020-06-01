import React from "react";
import cherio from "cheerio";
import { useHistory } from "react-router";
import { observer, useLocalStore } from "mobx-react";
import { useLayoutConfig } from "./LayoutService";
import {
  XFocusableContainer,
  XFocusable,
} from "~/components/XFocusable/XFocusable";
import { LoadingService } from "~/components/Loading/LoadingService";
import { FavoriteService } from "./FavoriteService";

export const Dashboard = observer(() => {
  const loadingService = React.useContext(LoadingService);
  const history = useHistory();
  const favoriteService = React.useContext(FavoriteService);
  const state = useLocalStore(() => ({
    topWeek: [] as {
      id: string;
      poster: string;
      title: string;
    }[],
    newShows: [] as {
      id: string;
      poster: string;
      title: string;
    }[],
    async load() {
      loadingService.setLoading(true, "dashboard");
      const res = await fetch(
        "https://proxier.now.sh/api?url=https://online.animedia.tv/"
      );
      const text = await res.text();
      // const buffer = await res.arrayBuffer();
      // const decoder = new TextDecoder("WINDOWS-1251");
      // const text = decoder.decode(buffer);
      // console.log(text);
      const topWeek = [];
      const newShows = [];
      const $ = cherio.load(text);
      try {
        $(
          ".index__releases__header > .finished-releases__header__title:contains('Популярное за неделю')"
        )
          .parent()
          .next(".index-scroller")
          .find(".scroller__item2")
          .each((index, el) => {
            topWeek.push({
              poster: $(el)
                .find(".ads-list__item__thumb img")
                .attr("data-src")
                .replace("?h=225&fit=crop&q=70", "?h=385&w=280&fit=crop&q=80"),
              id: $(el)
                .find(".title__list__index > .title__index > a")
                .attr("href")
                .replace("https://online.animedia.tv/anime/", ""),
              title: $(el)
                .find(".title__list__index > .title__index > a")
                .attr("title")
                .replace(/^Аниме /gi, ""),
            });
          });
        $(
          ".index__releases__header > .finished-releases__header__title:contains('Новинки аниме')"
        )
          .parent()
          .next(".index-scroller")
          .find(".scroller__item2")
          .each((index, el) => {
            newShows.push({
              poster: $(el)
                .find(".ads-list__item__thumb img")
                .attr("data-src")
                .replace("?h=225&fit=crop&q=70", "?h=385&w=280&fit=crop&q=80"),
              id: $(el)
                .find(".title__list__index > .title__index > a")
                .attr("href")
                .replace("https://online.animedia.tv/anime/", ""),
              title: $(el)
                .find(".title__list__index > .title__index > a")
                .attr("title")
                .replace(/^Аниме /gi, ""),
            });
          });
      } catch (error) {
        console.error(error);
      }
      (state.topWeek as any).replace(topWeek);
      (state.newShows as any).replace(newShows);
      loadingService.setLoading(false, "dashboard");
    },
  }));
  useLayoutConfig({});
  React.useEffect(() => {
    state.load();
  }, [state]);
  return (
    <div className="flex flex-1 flex-col items-start justify-center py-4">
      {favoriteService.favoriteShows?.length > 0 && (
        <>
          <div className="font-light text-4xl mt-8 mb-8 text-gray-600 w-full px-10">
            Избранные
            <span className="text-xl text-gray-700 ml-4">
              # все что вы считаете интересным
            </span>
          </div>
          <XFocusableContainer className="px-10" style={{ maxWidth: "100vw" }}>
            {favoriteService.favoriteShows.map((show) => {
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
                    className="rounded-lg inline-block"
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

      <div className="font-light text-4xl mt-8 mb-8 text-gray-600 w-full px-10">
        Популярное за неделю
        <span className="text-xl text-gray-700 ml-4">
          # самые популярные аниме за последнее время
        </span>
      </div>
      <XFocusableContainer className="px-10" style={{ maxWidth: "100vw" }}>
        {state.topWeek.map((show) => {
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
                className="rounded-lg inline-block"
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

      <div className="font-light text-4xl mt-8 mb-8 text-gray-600 w-full px-10">
        Новинки
        <span className="text-xl text-gray-700 ml-4">
          # новые аниме за последнее время
        </span>
      </div>
      <XFocusableContainer className="px-10" style={{ maxWidth: "100vw" }}>
        {state.newShows.map((show) => {
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
                className="rounded-lg inline-block"
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
    </div>
  );
});
