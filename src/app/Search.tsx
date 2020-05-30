import React from "react";
import Fuse from "fuse.js";
import { useHistory } from "react-router";
import { observer, useLocalStore } from "mobx-react";
import { useLayoutConfig } from "./LayoutService";
import { XFocusable } from "~/components/XFocusable/XFocusable";
import { LoadingService } from "~/components/Loading/LoadingService";
import { Focusable } from "~/components/Focusable/Focusable";

export const Search = observer(() => {
  const loadingService = React.useContext(LoadingService);
  const history = useHistory();
  const state = useLocalStore(() => ({
    query: "",
    fuse: null as any,
    isInputFocused: false,
    async load() {
      loadingService.setLoading(true, "search");
      const res = await fetch(
        "https://proxier.now.sh/api?url=https://online.animedia.tv/ajax/ss?_=" +
          +new Date()
      );
      let text = await res.text();
      text = text.replace(/^\svar categoryContent = /m, "");
      text = text.replace(/\];[\S\s]*;$/m, "]");
      text = text.replace(/"/gm, '\\"');
      text = text.replace(/'/gm, '"');
      text = text.replace(/,\s*\]/gm, "]");
      text = text.replace(
        /\s((category)|(title)|(url)|(image)|(description)|(alter)):/gm,
        (_, q) => {
          return `"${q}":`;
        }
      );
      try {
        const rawData = JSON.parse(text);
        const data = rawData.map((r) => {
          return {
            id: /\/([^/]+)$/i.exec(r.url)[1],
            title: r.title,
            poster: r.image,
            description: r.description,
          };
        });
        console.log(data);
        state.fuse = new Fuse(data, {
          keys: ["title", "description"],
        });
      } catch (error) {
        console.error(error);
      }
      loadingService.setLoading(false, "search");
    },
    get results(): {
      id: string;
      poster: string;
      title: string;
      description: string;
    }[] {
      return state.fuse
        ? state.fuse
            .search(state.query)
            .map((s) => s.item)
            .slice(0, 9)
        : [];
    },
  }));

  useLayoutConfig({});

  React.useEffect(() => {
    state.load();
  }, [state]);

  const onKeyDown = React.useCallback(
    (e) => {
      if (state.isInputFocused && /^[a-zA-Z0-9 ]$/g.test(e.key)) {
        state.query += e.key;
      } else if (state.isInputFocused && e.keyCode === 8) {
        state.query = state.query.substr(0, state.query.length - 1);
      }
    },
    [state]
  );
  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="flex flex-1 flex-col items-start justify-start py-4">
      <div className="flex flex-row items-center font-light text-4xl mb-8 text-gray-500 w-full px-10">
        <div>Запрос:</div>
        <Focusable
          className="flex-1 ml-4 input rounded focus:outline-none focus:shadow-outline"
          onFocus={() => {
            state.isInputFocused = true;
          }}
          onUnfocus={() => {
            state.isInputFocused = false;
          }}
        >
          <input
            className="w-full text-gray-100 p-2 rounded bg-transparent leading-none focus:outline-none focus:shadow-outline"
            value={state.query}
            onChange={(e) => (state.query = e.currentTarget.value)}
          />
        </Focusable>
      </div>

      <div className="font-light text-4xl mb-8 text-gray-600 w-full px-10">
        Результаты поиска
        <span className="text-xl text-gray-700 ml-4">
          # все что нам удалось найти
        </span>
      </div>

      {state.results.map((show) => {
        return (
          <div key={show.id} className="py-1 px-6 w-full">
            <XFocusable
              className="p-2 w-full"
              onClickEnter={() => {
                history.push("/tvshow/" + show.id);
              }}
            >
              <div className="flex flex-row">
                <img
                  style={{
                    height: "60px",
                  }}
                  className="rounded-lg"
                  alt={show.title}
                  src={show.poster}
                />
                <div
                  className="ellipsis px-4 text-2xl font-light"
                  style={{
                    maxWidth: "80vw",
                  }}
                >
                  {show.title}
                </div>
              </div>
            </XFocusable>
          </div>
        );
      })}
    </div>
  );
});
