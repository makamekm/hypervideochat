import React from "react";
import { useHistory } from "react-router";
import { observer, useLocalStore } from "mobx-react";
import { useLayoutConfig } from "./LayoutService";
import { XFocusable } from "~/components/XFocusable/XFocusable";
import { LoadingService } from "~/components/Loading/LoadingService";
import { useSimpleSyncLocalStorage } from "~/hooks";
import { Focusable } from "~/components/Focusable/Focusable";

export const Dashboard = observer(() => {
  const loadingService = React.useContext(LoadingService);
  const history = useHistory();
  const state = useLocalStore(() => ({
    isInputFocused: false,
    server: "http://192.168.0.213:8888",
  }));
  useLayoutConfig({});
  useSimpleSyncLocalStorage(state, "server");
  return (
    <div className="flex flex-1 flex-col items-start justify-start py-4">
      <div className="flex flex-row items-center font-light text-4xl mb-8 text-gray-500 w-full px-10">
        <div>Сервер:</div>
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
            value={state.server || ""}
            onChange={(e) => (state.server = e.currentTarget.value)}
          />
        </Focusable>
      </div>

      <div className="flex flex-col items-center justify-center font-light text-4xl mb-8 text-gray-500 w-full px-10">
        <div className="flex flex-row items-center justify-center">
          <XFocusable
            onClickEnter={() => {
              state.server += "1";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            1
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.server += "2";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            2
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.server += "3";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            3
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.server += "4";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            4
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.server += "5";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            5
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.server += "6";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            6
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.server += "7";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            7
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.server += "8";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            8
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.server += "9";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            9
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.server += "0";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            0
          </XFocusable>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center px-4 pb-4">
            <div className="flex flex-row items-center justify-center">
              <XFocusable
                onClickEnter={() => {
                  state.server += "Q";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                Q
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "W";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                W
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "E";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                E
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "R";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                R
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "T";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                T
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "Y";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                Y
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "U";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                U
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "I";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                I
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "O";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                O
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "P";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                P
              </XFocusable>
            </div>
            <div className="flex flex-row items-center justify-center">
              <XFocusable
                onClickEnter={() => {
                  state.server += "A";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                A
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "S";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                S
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "D";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                D
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "F";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                F
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "G";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                G
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "H";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                H
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "J";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                J
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "K";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                K
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "L";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                L
              </XFocusable>
            </div>
            <div className="flex flex-row items-center justify-center">
              <XFocusable
                onClickEnter={() => {
                  state.server += "Z";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                Z
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "X";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                X
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "C";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                C
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "V";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                V
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "B";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                B
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "N";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                N
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "M";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                M
              </XFocusable>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center px-4 pb-4">
            <div className="flex flex-row items-center justify-center">
              <XFocusable
                onClickEnter={() => {
                  state.server += ".";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                .
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += "/";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                /
              </XFocusable>
              <XFocusable
                onClickEnter={() => {
                  state.server += ":";
                }}
                className="p-4 leading-none text-4xl font-bold"
              >
                :
              </XFocusable>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center">
          <XFocusable
            onClickEnter={() => {
              state.server += " ";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            {"_"} SPACE
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.server = state.server.substr(0, state.server.length - 1);
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            {"<"} BACKSPACE
          </XFocusable>
          <XFocusable
            onClickEnter={() => {
              state.server = "";
            }}
            className="p-4 leading-none text-4xl font-bold"
          >
            {"-"} CLEAR
          </XFocusable>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center font-light text-4xl text-gray-500 w-full px-10">
        <XFocusable
          onClickEnter={() => {
            loadingService.setLoading(true, "playerGlobal");
            setTimeout(() => {
              history.push({
                pathname: "/player",
                state: {
                  server: state.server,
                  prevUrl: history.location.pathname,
                },
              });
            }, 100);
          }}
          className="p-4 leading-none text-4xl font-bold"
        >
          OPEN
        </XFocusable>
      </div>
    </div>
  );
});
