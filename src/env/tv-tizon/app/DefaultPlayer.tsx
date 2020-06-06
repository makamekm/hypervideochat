/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { observer, useLocalStore } from "mobx-react";
import { useHistory } from "react-router";
import { debounce } from "lodash";
import { LoadingService } from "~/components/Loading/LoadingService";
import { XFocusable } from "~/components/XFocusable/XFocusable";
import { Focusable } from "~/components/Focusable/Focusable";
import { useSimpleSyncLocalStorage } from "~/hooks";
import { ProgressService } from "~/app/ProgressService";
import { TVKeys } from "~/app/TVKeys";
import { useLayoutConfig } from "~/app/LayoutService";

const webapis = (window as any).webapis;
const tizen = (window as any).tizen;

enum PlayState {
  ERROR = -1,
  STOPPED = 0,
  PLAYING = 1,
  PAUSED = 2,
  PREPARED = 3,
}

export const DefaultPlayer = observer(() => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const history = useHistory();
  const loadingService = React.useContext(LoadingService);
  const progressService = React.useContext(ProgressService);
  const state = useLocalStore(() => ({
    isVideoFocused: false,
    isProgressFocused: false,
    playState: PlayState.STOPPED,
    currentTime: 0,
    seekTime: 0,
    get progress() {
      return (
        (state.isProgressFocused ? state.seekTime : state.currentTime) /
        state.totalTime
      );
    },
    totalTime: 0,
    quality: "720p",
    files: {} as {
      [quality: string]: string;
    },
    get qualities() {
      return Object.keys(state.files).filter((s) => s !== "default");
    },
    get title() {
      return (history.location?.state as any)?.title;
    },
    get header() {
      return (history.location?.state as any)?.header;
    },
    get poster() {
      return (history.location?.state as any)?.poster;
    },
    get id() {
      return (history.location?.state as any)?.id;
    },
    get savedProgress() {
      return progressService.episodeProgress[state.id];
    },
    saveProgressInterval: 0,
    saveProgress: () => {
      progressService.episodeProgress[state.id] =
        state.currentTime / state.totalTime;
    },
    setSaveProgressInterval() {
      state.saveProgressInterval = window.setInterval(state.saveProgress, 5000);
    },
    unsetSaveProgressInterval() {
      window.clearInterval(state.saveProgressInterval);
    },
    restoreProgress() {
      if (state.savedProgress && state.savedProgress < 0.99) {
        state.seekTime = state.totalTime * state.savedProgress;
        state.seekTime = Math.max(state.seekTime, 0);
        state.seekTime = Math.min(state.seekTime, state.totalTime);
        state.currentTime = state.seekTime;
        webapis.avplay.seekTo(state.seekTime * 1000);
      }
    },
    get file() {
      let url =
        state.files[state.quality] ||
        state.files["default"] ||
        state.files[state.qualities[state.qualities.length - 1]];
      if (/^\/\//gi.test(url)) {
        url = "https:" + url;
      }
      return url;
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
    setRegisterMediaKeys() {
      try {
        tizen.tvinputdevice.registerKey("MediaPlayPause");
        tizen.tvinputdevice.registerKey("MediaPlay");
        tizen.tvinputdevice.registerKey("MediaStop");
        tizen.tvinputdevice.registerKey("MediaPause");
        tizen.tvinputdevice.registerKey("MediaRewind");
        tizen.tvinputdevice.registerKey("MediaFastForward");
      } catch (error) {
        console.error(error);
      }
    },
    setSeek: debounce(() => {
      webapis.avplay.seekTo(state.seekTime * 1000);
      state.currentTime = state.seekTime;
    }, 500),
    onKeyDown: (e) => {
      state.setFocusTimeout();
      switch (e.keyCode) {
        case TVKeys.LEFT:
          if (state.isVideoFocused) {
            (document.querySelector(".progress-dot") as HTMLElement).focus();
            setTimeout(() => {
              state.seekTime = state.currentTime - 10;
              state.seekTime = Math.max(state.seekTime, 0);
              state.setSeek();
            });
          }
          if (state.isProgressFocused) {
            state.seekTime -= (state.totalTime / 100) * 3;
            state.seekTime = Math.max(state.seekTime, 0);
            state.setSeek();
          }
          console.log("LEFT");
          break;
        case TVKeys.UP:
          console.log("UP");
          break;
        case TVKeys.RIGHT:
          if (state.isVideoFocused) {
            (document.querySelector(".progress-dot") as HTMLElement).focus();
            setTimeout(() => {
              state.seekTime = state.currentTime + 10;
              state.seekTime = Math.min(state.seekTime, state.totalTime);
              state.setSeek();
            });
          }
          if (state.isProgressFocused) {
            state.seekTime += (state.totalTime / 100) * 3;
            state.seekTime = Math.min(state.seekTime, state.totalTime);
            state.setSeek();
          }
          console.log("RIGHT");
          break;
        case TVKeys.DOWN:
          console.log("DOWN");
          break;
        case TVKeys.ENTER:
          console.log("OK");
          break;
        case TVKeys.RETURN:
          console.log("RETURN");
          break;
        case TVKeys.PLAYPAUSE:
          console.log("PLAYPAUSE");
          if (state.playState === PlayState.PLAYING) {
            state.pause();
          } else {
            state.play();
          }
          break;
        case TVKeys.PLAY:
          console.log("PLAY");
          state.play();
          break;
        case TVKeys.PAUSE:
          console.log("PAUSE");
          state.pause();
          break;
        case TVKeys.STOP:
          console.log("STOP");
          state.goBack();
          break;
        default:
          console.log("Key code : " + e.keyCode);
          break;
      }
    },
    setHandleKeyDown() {
      document.addEventListener("keydown", state.onKeyDown);
    },
    setEventListeners() {
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
      const url = String(state.file);
      console.log(url);
      webapis.avplay.open(String(state.file));
      webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
      // webapis.avplay.setStreamingProperty("SET_MODE_4K"); //for 4K contents
      webapis.avplay.prepare();
      state.totalTime = webapis.avplay.getDuration() / 1000;
      state.playState = PlayState.PREPARED;
    },
    timeout: 0,
    setFocusTimeout() {
      state.timeout && window.clearTimeout(state.timeout);
      state.timeout = window.setTimeout(() => {
        if (!state.isVideoFocused) {
          state.focus();
        }
      }, 4000);
    },
    focus() {
      const player = document.querySelector(".player") as HTMLElement;
      if (player) {
        player.focus();
      }
    },
    play() {
      if (state.playState >= PlayState.PAUSED) {
        if (ref.current) {
          state.playState = PlayState.PLAYING;
          ref.current.src = String(state.file);
          webapis.avplay.play();
        }
      }
    },
    setQuality: (q: string) => {
      const time = state.currentTime;
      state.stop();
      state.quality = q;
      state.prepare();
      state.play();
      state.focus();
      state.currentTime = time;
      webapis.avplay.seekTo(time * 1000);
    },
    goBack: () => {
      state.stop();
      const prevUrl = (history.location.state as any).prevUrl;
      history.push(prevUrl);
    },
    toggle: () => {
      if (state.playState === PlayState.PLAYING) {
        state.pause();
      } else if (state.playState === PlayState.PAUSED) {
        state.play();
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
      state.setFocusTimeout();
      try {
        state.files = state.getFiles();
        state.prepare();
        state.play();
        state.focus();
        state.restoreProgress();
      } catch (error) {
        console.error(error);
      }
      loadingService.setLoading(false, "player");
      loadingService.setLoading(false, "playerGlobal");
    },
    mount() {
      try {
        state.setSaveProgressInterval();
        state.setRegisterMediaKeys();
        state.setHandleKeyDown();
        state.setEventListeners();
      } catch (error) {
        console.error(error);
      }
    },
    unsetRegisterMediaKeys() {
      try {
        tizen.tvinputdevice.unregisterKey("MediaPlayPause");
        tizen.tvinputdevice.unregisterKey("MediaPlay");
        tizen.tvinputdevice.unregisterKey("MediaStop");
        tizen.tvinputdevice.unregisterKey("MediaPause");
        tizen.tvinputdevice.unregisterKey("MediaRewind");
        tizen.tvinputdevice.unregisterKey("MediaFastForward");
      } catch (error) {
        console.error(error);
      }
    },
    unmount() {
      state.unsetSaveProgressInterval();
      document.removeEventListener("keydown", state.onKeyDown);
      state.unsetRegisterMediaKeys();
      try {
        webapis.avplay.close();
      } catch (error) {
        console.error(error);
      }
    },
  }));
  useSimpleSyncLocalStorage(state, "quality");
  useLayoutConfig({
    scrollable: false,
    empty: true,
  });
  React.useEffect(() => {
    if (!history.location.state) {
      return history.push("/");
      // history.location.state = {
      //   title: "Серия 1",
      //   file:
      //     "[360p]//mp4.animedia.biz/dir291/7344_360.mp4, [480p]//mp4.animedia.biz/dir291/7344_480.mp4,[720p]//mp4.animedia.biz/dir291/7344.mp4",
      //   prevUrl: "/tvshow/13878",
      // };
    }
    state.mount();
    state.load();
    return () => {
      state.unmount();
    };
  }, [history, state]);
  return (
    <>
      <XFocusable
        className="player"
        onFocus={() => {
          state.isVideoFocused = true;
        }}
        onUnfocus={() => {
          state.isVideoFocused = false;
          state.setFocusTimeout();
        }}
        onClickEnter={state.toggle}
      >
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
      </XFocusable>
      <div className="flex flex-1 flex-col items-center justify-end z-10 text-2xl p-8">
        <div
          className="w-full flex flex-col items-center justify-end py-6 rounded-lg px-10"
          style={{
            transition: "opacity 0.4s",
            opacity:
              state.isVideoFocused && state.playState === PlayState.PLAYING
                ? 0
                : 1,
            background: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <div
            className="p-8 rounded-lg flex justify-between items-start"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <div
              className="p-6 rounded-lg"
              style={{
                background: "rgba(0, 0, 0, 0.8)",
              }}
            >
              <img src="/logo.svg" alt="logo" />
            </div>
            <div className="flex flex-col items-end rounded-lg text-right">
              <img
                style={{
                  height: "250px",
                }}
                className="rounded-lg shadow-md border border-gray-700"
                alt={state.header}
                src={state.poster}
              />
              <div
                className="ellipsis font-light text-3xl mt-3 p-6 rounded-lg leading-none"
                style={{ maxWidth: "50vw", background: "rgba(0, 0, 0, 0.8)" }}
              >
                {state.header} / {state.title}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="pr-4">{state.title}</div>
            <div className="pl-4">
              <div className="time-info">
                <span>
                  {state.formatTime(
                    state.isProgressFocused ? state.seekTime : state.currentTime
                  )}
                </span>{" "}
                / <span>{state.formatTime(state.totalTime)}</span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center mt-6">
            <div
              className="px-4 w-full rounded-lg relative"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                borderRadius: "100px",
                height: "20px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  content: "",
                  width: `${state.progress * 100}%`,
                  height: "100%",
                  left: 0,
                  right: `${100 - state.progress * 100}%`,
                  top: 0,
                  bottom: 0,
                  background: "red",
                  borderRadius: "100px",
                }}
              ></div>
              <Focusable
                className="progress-dot static focus:outline-none"
                onFocus={() => {
                  state.seekTime = state.currentTime;
                  state.isProgressFocused = true;
                }}
                onUnfocus={() => {
                  state.isProgressFocused = false;
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    content: "",
                    left: `${state.progress * 100}%`,
                    top: "50%",
                    height: state.isProgressFocused ? "45px" : "35px",
                    width: state.isProgressFocused ? "45px" : "35px",
                    transform: "translateY(-50%) translateX(-50%)",
                    background: "white",
                    borderRadius: "100px",
                    boxShadow: state.isProgressFocused
                      ? "0 0 0 12px rgba(255, 255, 255, 0.5)"
                      : "0 0 0 0px rgba(255, 255, 255, 0.5)",
                    transition: "box-shadow 0.4s, height 0.4s, width 0.4s",
                  }}
                ></div>
              </Focusable>
            </div>
          </div>
          <div className="w-full flex justify-center items-center mt-6">
            <XFocusable
              className="text-4xl px-6 py-5 mx-2 leading-none"
              onClickEnter={state.toggle}
            >
              {state.playState === PlayState.PLAYING ? (
                <i className="fas fa-pause" />
              ) : (
                <i className="fas fa-play" />
              )}
            </XFocusable>
            <XFocusable
              className="text-4xl px-6 py-5 mx-2 leading-none"
              onClickEnter={state.goBack}
            >
              <i className="fas fa-stop"></i>
            </XFocusable>
            {state.qualities.map((q) => {
              return q === state.quality ? (
                <div className="text-2xl px-8 py-5 mx-2 opacity-50">{q}</div>
              ) : (
                <XFocusable
                  key={q}
                  className={"text-2xl px-6 py-5 mx-2"}
                  onClickEnter={() => state.setQuality(q)}
                >
                  {q}
                </XFocusable>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
});
