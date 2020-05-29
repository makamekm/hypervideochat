/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { observer, useLocalStore } from "mobx-react";
import { useHistory } from "react-router";
import { useLayoutConfig } from "./LayoutService";
// import {
//   XFocusableContainer,
//   XFocusable,
// } from "~/components/XFocusable/XFocusable";
import { LoadingService } from "~/components/Loading/LoadingService";

const webapis = (window as any).webapis;

enum PlayState {
  ERROR = -1,
  STOPPED = 0,
  PLAYING = 1,
  PAUSED = 2,
  PREPARED = 3,
}

export const Player = observer(() => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const history = useHistory();
  const loadingService = React.useContext(LoadingService);
  const state = useLocalStore(() => ({
    playState: PlayState.STOPPED,
    currentTime: 0,
    totalTime: 0,
    quality: "720p",
    files: {} as {
      [quality: string]: string;
    },
    get qualities() {
      return Object.keys(state.files);
    },
    get file() {
      return (
        state.files[state.quality] ||
        state.files["default"] ||
        state.files[state.qualities[0]]
      );
    },
    getFiles: () => {
      const file: string = (history.location.state as any).file;
      const urls = file
        .split(",")
        .map((s) => s.trim())
        .reduce((o, p) => {
          if (/^\[/gi.test(p)) {
            const [, quality, path] = /^\[(.+)\](.*)/gi.exec(p);
            o[quality] = path;
          } else {
            o["default"] = p;
          }
          return o;
        }, {});
      return urls;
    },
    formatTime(seconds) {
      const hh = Math.floor(seconds / 3600);
      const mm = Math.floor(seconds / 60) % 60;
      const ss = Math.floor(seconds) % 60;
      return (
        (hh ? (hh < 10 ? "0" : "") + hh + ":" : "") +
        (mm < 10 ? "0" : "") +
        mm +
        ":" +
        (ss < 10 ? "0" : "") +
        ss
      );
    },
    setupEventListeners() {
      const listener = {
        onbufferingstart: () => {
          console.log("Buffering...");
        },
        onbufferingprogress: (percent) => {
          console.log("Buffering progress: " + percent);
        },
        onbufferingcomplete: () => {
          console.log("Buffering Complete, Can play now!");
        },
        onstreamcompleted: () => {
          console.log("video has ended.");
          webapis.avplay.stop();
          state.playState = PlayState.STOPPED;
        },
        oncurrentplaytime: (currentTime) => {
          const duration = webapis.avplay.getDuration();
          if (duration > 0) {
            state.currentTime = currentTime / 1000;
            state.totalTime = duration / 1000;
          }
        },
        ondrmevent: (drmEvent, drmData) => {
          console.log("DRM callback: " + drmEvent + ", data: " + drmData);
        },
        onerror: (type, data) => {
          console.log("OnError: " + data);
        },
      };

      webapis.avplay.setListener(listener);
    },
    prepare() {
      webapis.avplay.open(state.file);
      state.setupEventListeners();
      webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
      webapis.avplay.setStreamingProperty("SET_MODE_4K"); //for 4K contents
      webapis.avplay.prepare();
      state.totalTime = webapis.avplay.getDuration() / 1000;
      state.playState = PlayState.PREPARED;
    },
    play() {
      if (state.playState >= PlayState.PAUSED) {
        if (ref.current) {
          state.playState = PlayState.PLAYING;
          ref.current.src = state.file;
          webapis.avplay.play();
        }
      }
    },
    pause() {
      console.log("Player.pause()");
      if (state.playState !== PlayState.PLAYING) {
        return;
      }
      state.playState = PlayState.PAUSED;
      webapis.avplay.pause();
    },
    stop() {
      console.log("Player.stop()");
      state.playState = PlayState.STOPPED;
      webapis.avplay.stop();
    },
    load: async () => {
      loadingService.setLoading(true, "player");
      try {
        state.files = state.getFiles();
        state.prepare();
        state.play();
      } catch (error) {
        console.error(error);
      }
      loadingService.setLoading(false, "player");
    },
  }));
  useLayoutConfig({
    scrollable: false,
    empty: true,
  });
  React.useEffect(() => {
    if (!history.location.state) {
      // return history.push("/");
      history.location.state = {
        title: "Серия 1",
        file:
          "[360p]//mp4.animedia.biz/dir291/7344_360.mp4, [480p]//mp4.animedia.biz/dir291/7344_480.mp4,[720p]//mp4.animedia.biz/dir291/7344.mp4",
        prevUrl: "/tvshow/13878",
      };
    }
    state.load();
  }, [history, state]);
  return (
    <>
      <object
        ref={ref as any}
        type="application/avplayer"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div className="flex flex-1 flex-col items-center justify-start z-10 text-2xl">
        <div
          className="w-full flex justify-center items-center p-6"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className="px-4">{state.file}</div>
          <div className="px-4">
            <div className="progress">
              <span></span>
            </div>
            <div className="time-info">
              <span>{state.formatTime(state.currentTime)}</span> /{" "}
              <span>{state.formatTime(state.totalTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
