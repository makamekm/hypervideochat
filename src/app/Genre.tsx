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

function truncate(str: string, n: number) {
  return str.length > n ? str.substr(0, n - 1) + " ..." : str;
}

export const Genre = observer(() => {
  const history = useHistory();
  const { genre, page } = useParams();
  const pageNum = Number(page || 0);
  const loadingService = React.useContext(LoadingService);
  const state = useLocalStore(() => ({
    title: "",
    description: "",
    pageNum: 0,
    showDescription: false,
    hasNextPage: false,
    related: [] as {
      id: string;
      title: string;
      poster: string;
    }[],
    load: async () => {
      loadingService.setLoading(true, "tvshow");
      try {
        const res = await fetch(
          "https://proxier.now.sh/api?url=https://online.animedia.tv/category/" +
            genre +
            (state.pageNum > 0 ? `/P${12 * state.pageNum}` : "")
        );
        const text = await res.text();
        const $ = cherio.load(text);
        state.title = $(".list-page__header__title").text();
        state.description = $(".about-page")
          .text()
          .trim();
        const related = [];
        $("#ajax-result .ads-list__item").each((i, el) => {
          related.push({
            title: $(el)
              .find(".h3.ads-list__item__title")
              .text(),
            poster: $(el)
              .find(".ads-list__item__thumb.js-postload img")
              .attr("data-src"),
            id: $(el)
              .find(".ads-list__item__thumb.js-postload a")
              .attr("href")
              .replace("https://online.animedia.tv/anime/", ""),
          });
        });
        (state.related as any).replace(related);
        state.hasNextPage = !!$(".pagination__list__item.active")
          .next()
          .toArray()[0];
      } catch (error) {
        console.error(error);
      }
      loadingService.setLoading(false, "tvshow");
    },
  }));
  useLayoutConfig({});
  React.useEffect(() => {
    state.pageNum = pageNum;
    state.load();
  }, [state, pageNum]);
  return (
    <div className="flex flex-1 flex-col items-start justify-start">
      <div className="flex-1 flex-col items-start justify-center">
        <XFocusable
          className="flex items-end justify-between text-gray-400 mx-10 p-4 max-h-screen leading-none font-normal text-5xl"
          onClickEnter={() => {
            state.showDescription = !state.showDescription;
          }}
        >
          <div className="ellipsis" style={{ maxWidth: "50vw" }}>
            {state.title}
          </div>
        </XFocusable>

        {state.description && (
          <div className="font-light text-2xl text-gray-500 w-full px-10 mt-8">
            {truncate(state.description, state.showDescription ? 100000 : 500)}
          </div>
        )}

        <XFocusableContainer
          className="px-10 mt-10"
          style={{ maxWidth: "100vw" }}
        >
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
      </div>

      <div className="w-full flex items-center justify-center mt-8">
        <div className="font-normal text-4xl mx-2 p-4 leading-none">
          СТРАНИЦА #{pageNum + 1}
        </div>
        {pageNum > 0 && (
          <XFocusable
            className="font-normal text-4xl mx-2 p-4 leading-none"
            onClickEnter={() => {
              history.push("/genre/" + genre + "/" + Math.max(pageNum - 1, 0));
            }}
          >
            {"< НАЗАД"}
          </XFocusable>
        )}
        {state.hasNextPage && (
          <XFocusable
            className="font-normal text-4xl mx-2 p-4 leading-none"
            onClickEnter={() => {
              history.push("/genre/" + genre + "/" + (pageNum + 1));
            }}
          >
            {"ВПЕРЕД >"}
          </XFocusable>
        )}
      </div>
    </div>
  );
});
