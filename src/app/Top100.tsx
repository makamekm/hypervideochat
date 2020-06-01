import React from "react";
import cherio from "cheerio";
import { useLocalStore, observer } from "mobx-react";
import { useHistory } from "react-router";
import { useLayoutConfig } from "./LayoutService";
import {
  XFocusableContainer,
  XFocusable,
} from "~/components/XFocusable/XFocusable";
import { LoadingService } from "~/components/Loading/LoadingService";

export const Top100 = observer(() => {
  const history = useHistory();
  const loadingService = React.useContext(LoadingService);
  const state = useLocalStore(() => ({
    related: [] as {
      id: string;
      title: string;
      poster: string;
    }[],
    load: async () => {
      loadingService.setLoading(true, "tvshow");
      try {
        const res = await fetch(
          "https://proxier.now.sh/api?url=https://online.animedia.tv/top-100-anime"
        );
        const text = await res.text();
        const $ = cherio.load(text);
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
    <div className="flex flex-1 flex-col items-start justify-center">
      <div className="flex items-end justify-between text-gray-400 mx-10 p-4 max-h-screen leading-none font-normal text-5xl">
        Top 100
      </div>

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
