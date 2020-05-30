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

      <div className="flex flex-col items-center justify-center font-light text-4xl mb-8 text-gray-500 w-full px-10">
        <div className="flex flex-row items-center justify-center">
          <XFocusable
            onClickEnter={() => {
              state.query += "1";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            1
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "2";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            2
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "3";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            3
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "4";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            4
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "5";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            5
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "6";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            6
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "7";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            7
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "8";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            8
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "9";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            9
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "0";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            0
          </XFocusable>
        </div>
        <div className="flex flex-row items-center justify-center">
          <XFocusable
            onClickEnter={() => {
              state.query += "Q";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            Q
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "W";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            W
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "E";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            E
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "R";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            R
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "T";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            T
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "Y";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            Y
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "U";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            U
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "I";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            I
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "O";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            O
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "P";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            P
          </XFocusable>
        </div>
        <div className="flex flex-row items-center justify-center">
          <XFocusable
            onClickEnter={() => {
              state.query += "A";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            A
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "S";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            S
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "D";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            D
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "F";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            F
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "G";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            G
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "H";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            H
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "J";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            J
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "K";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            K
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "L";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            L
          </XFocusable>
        </div>
        <div className="flex flex-row items-center justify-center">
          <XFocusable
            onClickEnter={() => {
              state.query += "Z";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            Z
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "X";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            X
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "C";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            C
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "V";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            V
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "B";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            B
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "N";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            N
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query += "M";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            M
          </XFocusable>
        </div>
        <div className="flex flex-row items-center justify-center">
          <XFocusable
            onClickEnter={() => {
              state.query += " ";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            {"_"} SPACE
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query = state.query.substr(0, state.query.length - 1);
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            {"<"} BACKSPACE
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.query = "";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            {"-"} CLEAR
          </XFocusable>
        </div>
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
