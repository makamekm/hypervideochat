import React from "react";
import classNames from "classnames";
import { observer, useLocalStore } from "mobx-react";
import { useParams } from "react-router";
import { RoomService } from "./RoomService";
import { VideoStream } from "./Video";
import { useLayoutConfig } from "./LayoutService";
import { CamButton } from "~/design-system/cam-button";
import { MicButton } from "~/design-system/mic-button";
import { CamOffButton } from "~/design-system/cam-off-button";
import { MicOffButton } from "~/design-system/mic-off-button";
import { ScreenButton } from "~/design-system/screen-button";
import { SettingButton } from "~/design-system/setting-button";

export const Room: React.FC = observer(() => {
  const service = React.useContext(RoomService);
  const state = useLocalStore(() => ({
    settings: false,
  }));
  const { room } = useParams();
  useLayoutConfig({
    footer: false,
    scrollable: false,
  });
  React.useEffect(() => {
    service.room = room;
    service.run();
    return () => {
      service.room = null;
      service.stop();
    };
  }, [service, room]);
  return (
    <div className="no-select">
      <div className="main-video">
        <VideoStream stream={service.localStream} />
      </div>
      <div className="overlay">
        <div className="column split-layout">
          <div className="row started split-panels">
            <div className="column started pt-2 pb-2 pr-3 pl-3">
              <div className="header">{service.room}</div>
            </div>
            <div className="column started pt-2 pb-2 pr-3 pl-3">
              {service.connections.map((connection) => {
                return (
                  <div className="sub-video mb-2" key={connection.id}>
                    <VideoStream stream={connection.stream} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row pt-2 pb-2 pr-3 pl-3 centered middled">
            {!service.screenState && (
              <div className="pt-2 pb-2 pr-2 pl-2">
                {service.camState ? (
                  <CamButton
                    onClick={() => {
                      service.camState = !service.camState;
                    }}
                  />
                ) : (
                  <CamOffButton
                    onClick={() => {
                      service.camState = !service.camState;
                    }}
                  />
                )}
              </div>
            )}
            {service.screenState && (
              <div className="pt-2 pb-2 pr-2 pl-2">
                <CamButton
                  onClick={() => {
                    service.screenState = false;
                  }}
                />
              </div>
            )}
            <div className="pt-2 pb-2 pr-2 pl-2">
              {service.micState ? (
                <MicButton
                  onClick={() => {
                    service.micState = !service.micState;
                  }}
                />
              ) : (
                <MicOffButton
                  onClick={() => {
                    service.micState = !service.micState;
                  }}
                />
              )}
            </div>
            {!service.screenState && (
              <div className="pt-2 pb-2 pr-2 pl-2">
                <ScreenButton
                  onClick={() => {
                    service.screenState = true;
                  }}
                />
              </div>
            )}
            <div className="pt-2 pb-2 pr-2 pl-2">
              <SettingButton
                onClick={() => {
                  state.settings = true;
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          "settings column middled centered pt-4 pb-4 pr-4 pl-4",
          {
            visible: state.settings,
          }
        )}
      >
        <div className="column">
          <div className="column mb-3">
            <label className="mb-2">Choose audio input:</label>
            <select
              className="select"
              onChange={(e) => {
                service.selectedMic = e.currentTarget.value;
              }}
            >
              {service.mics.map((dev) => (
                <option
                  value={dev.deviceId}
                  selected={service.selectedMic === dev.deviceId}
                >
                  {dev.label}
                </option>
              ))}
            </select>
          </div>
          <div className="column mb-3">
            <label className="mb-2">Choose video input:</label>
            <select
              className="select"
              onChange={(e) => {
                service.selectedCam = e.currentTarget.value;
              }}
            >
              {service.cameras.map((dev) => (
                <option
                  value={dev.deviceId}
                  selected={service.selectedCam === dev.deviceId}
                >
                  {dev.label}
                </option>
              ))}
            </select>
          </div>
          <div className="column righted fill mt-2">
            <button
              className="button"
              onClick={(e) => {
                state.settings = false;
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          height: 100%;
        }
        .fill {
          width: 100%;
        }
        .settings {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
          will-change: opacity;
          background: rgba(0, 0, 0, 0.6);
        }
        .settings > * {
          transform: translateY(25px);
          transition: transform 0.2s;
          will-change: transform;
        }
        .settings.visible > * {
          transform: translateY(0);
        }
        .settings.visible {
          pointer-events: all;
          opacity: 1;
        }
        .select {
          color: #000;
        }
        .button {
          color: #000;
          padding: 0.5rem 1.5rem;
          border-radius: 5px;
          font-size: 1.2rem;
          text-transform: uppercase;
          transition: background 0.2s, box-shadow 0.2s, color 0.2s;
          will-change: background, box-shadow, color;
          border: none;
          color: var(--main-color);
          background: var(--color-primary);
          box-shadow: 0 0 0 0px var(--main-color);
          cursor: pointer;
          user-select: none;
          outline: none;
          font-weight: 500;
        }
        .button:hover,
        .button:focus {
          box-shadow: 0 0 0px 4px var(--main-color);
        }
        .button:active {
          background: var(--main-bg-color);
          color: var(--main-color);
          box-shadow: 0 0 0px 4px var(--main-color);
        }
        .overlay {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
        }
        .split-panels {
          justify-content: space-between;
        }
        .split-layout {
          justify-content: space-between;
          min-height: 100vh;
          max-height: 100vh;
        }
        .split-layout > * {
          width: 100%;
        }
        .main-video {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: stretch;
          align-items: stretch;
        }
        .main-video > :global(video) {
          width: 100%;
          height: 100%;
        }
        .sub-video {
          display: flex;
          justify-content: stretch;
          align-items: stretch;
          width: ${160 * 2}px;
          height: ${90 * 2}px;
          background: #000000;
          overflow: hidden;
          border-radius: 5px;
        }
        .sub-video > :global(video) {
          width: inherit;
          height: inherit;
        }
      `}</style>
    </div>
  );
});