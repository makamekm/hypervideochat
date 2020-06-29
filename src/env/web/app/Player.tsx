/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import classNames from "classnames";
import { observer, useLocalStore } from "mobx-react";
import { useHistory } from "react-router";
import { debounce } from "lodash";
import { LoadingService } from "~/components/Loading/LoadingService";
import { XFocusable } from "~/components/XFocusable/XFocusable";
import { Focusable } from "~/components/Focusable/Focusable";
import { TVKeys } from "~/app/TVKeys";
import { useLayoutConfig, LayoutService } from "~/app/LayoutService";
import { SHOW_FULLSCREEN } from "@env/config";

const videojs = (window as any).videojs;

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
  const service = React.useContext(LayoutService);
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
    files: {} as {
      [quality: string]: string;
    },
    get server() {
      return (history.location?.state as any)?.server;
    },
    isFocused: true,
    windowFocusinterval: 0,
    checkIsFocused: () => {
      state.isFocused = document.hasFocus();
    },
    setIsFocusedInterval() {
      state.windowFocusinterval = window.setInterval(
        state.checkIsFocused,
        1000
      );
    },
    unsetIsFocusedInterval() {
      window.clearInterval(state.windowFocusinterval);
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
    setSeek: debounce(() => {
      // webapis.avplay.seekTo(Math.floor(state.seekTime));
      state.player.currentTime(Math.floor(state.seekTime));
      state.currentTime = state.seekTime;
    }, 1000),
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
      state.player.on("timeupdate", () => {
        state.currentTime = state.player.currentTime();
        state.totalTime = state.player.duration();
      });
      state.player.on("play", () => {
        state.playState = PlayState.PLAYING;
      });
      state.player.on("pause", () => {
        state.playState = PlayState.PAUSED;
      });
      state.player.on("stop", () => {
        state.playState = PlayState.STOPPED;
      });
    },
    player: null,
    async prepare() {
      state.player = videojs(ref.current, {
        controls: false,
      });

      state.player.src({
        src: String(state.server),
        type: "video/mp4",
      });
      state.player.load();
      await new Promise((r) => state.player.ready(r));
      state.setEventListeners();
      await new Promise((r) => setTimeout(r, 500));
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
    focus: () => {
      const player = document.querySelector(".player") as HTMLElement;
      if (player) {
        player.focus();
      }
    },
    async play() {
      if (state.playState >= PlayState.PAUSED) {
        state.playState = PlayState.PLAYING;
        try {
          await state.player.play();
          state.totalTime = state.player.duration();
        } catch (e) {
          console.error(e);
        }
      }
    },
    setQuality: async (q: string) => {
      const time = state.currentTime;
      state.stop();
      await state.prepare();
      await state.play();
      state.focus();
      state.currentTime = time;
      state.player.currentTime(time);
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
      state.player.pause();
      // webapis.avplay.pause();
    },
    stop() {
      console.log("Player.stop()");
      state.playState = PlayState.STOPPED;
      state.player.pause();
      // webapis.avplay.stop();
    },
    load: async () => {
      loadingService.setLoading(true, "player");
      state.setFocusTimeout();
      try {
        await state.prepare();
        await state.play();
        state.focus();
      } catch (error) {
        console.error(error);
      }
      loadingService.setLoading(false, "player");
      loadingService.setLoading(false, "playerGlobal");
    },
    checkProgressInterval: 0,
    checkPlayerProgress: () => {
      if (state.player) {
        state.currentTime = state.player.currentTime();
        state.totalTime = state.player.duration();
      }
    },
    setCheckProgressInterval() {
      state.checkProgressInterval = window.setInterval(
        state.checkPlayerProgress,
        1000
      );
    },
    unsetCheckProgressInterval() {
      window.clearInterval(state.checkProgressInterval);
    },
    mount() {
      try {
        state.setCheckProgressInterval();
        state.setIsFocusedInterval();
        state.setHandleKeyDown();
      } catch (error) {
        console.error(error);
      }
    },
    unmount() {
      state.unsetCheckProgressInterval();
      state.unsetIsFocusedInterval();
      document.removeEventListener("keydown", state.onKeyDown);
      try {
        // webapis.avplay.close();
      } catch (error) {
        console.error(error);
      }
    },
  }));
  useLayoutConfig({
    scrollable: false,
    empty: true,
  });
  React.useEffect(() => {
    console.log(history.location.state);

    if (!history.location.state) {
      // return history.push("/");
      history.location.state = {
        header: "Глейпнир",
        poster: "https://static.animedia.tv/uploads/gleipnir.jpg?w=280&h=385",
        title: "Серия 1",
        prevUrl: "/tvshow/glejpnir",
        id: "test",
        // file:
        //   "[720p]magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent|Sintel.mp4",
        // // file:
        // //   "[360p]//mp4.animedia.biz/dir291/7344_360.mp4, [480p]//mp4.animedia.biz/dir291/7344_480.mp4,[720p]//mp4.animedia.biz/dir291/7344.mp4",
        file:
          "https://slow.animedia.biz/video/dir158/smil:15861641376917391e12be240ea81c7a6acad607eff65b0e11.smil/playlist.m3u8",
      };
    }
    state.mount();
    state.load();
    return () => {
      state.unmount();
    };
  }, [history, state]);
  const showControls = !(
    (state.isVideoFocused && state.playState === PlayState.PLAYING) ||
    !state.isFocused
  );
  const onProgressClick = React.useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      state.seekTime = (state.totalTime * (e.clientX - rect.left)) / rect.width;
      state.currentTime = state.seekTime;
      state.player.currentTime(Math.floor(state.seekTime));
      (document.querySelector(".progress-dot") as HTMLElement).focus();
    },
    [state]
  );
  return (
    <div className="flex-1 flex flex-col min-h-screen min-w-full pointer-events-none">
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
        <video
          id="video"
          autoPlay
          className="video-js"
          ref={ref as any}
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
      <div
        className="flex flex-1 flex-col items-center justify-end z-10 text-2xl p-8 pointer-events-auto"
        onClick={() => {
          state.toggle();
          (document.querySelector(".player") as HTMLElement)?.focus();
        }}
      >
        <div
          className="w-full flex flex-col items-center justify-end py-6 rounded-lg px-10"
          style={{
            transition: "opacity 0.4s",
            opacity: showControls ? 1 : 0,
            background: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <div className="w-full flex justify-between items-center">
            <div className="pr-4">{state.server}</div>
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
              className={
                "px-4 w-full rounded-lg relative bg-gray-800 hover:bg-gray-600"
              }
              onClick={onProgressClick}
              style={{
                pointerEvents: showControls ? "all" : "none",
                borderRadius: "100px",
                height: "20px",
                transition: "background 0.4s",
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
          <div
            className={classNames(
              "w-full flex justify-center items-center mt-6",
              {
                "pointer-events-auto": showControls,
              }
            )}
          >
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
            {SHOW_FULLSCREEN && (
              <XFocusable
                className="text-4xl px-6 py-5 mx-2 leading-none"
                onClickEnter={service.toggleFullScreen}
              >
                {service.isFullscreen ? (
                  <i className="fas fa-compress"></i>
                ) : (
                  <i className="fas fa-expand"></i>
                )}
              </XFocusable>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
