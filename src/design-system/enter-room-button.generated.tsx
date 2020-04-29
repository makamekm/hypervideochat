import * as React from 'react';
import { observer } from 'mobx-react';

export const EnterRoomButtonGenerated: React.FC<{
  onKeyDown?: React.KeyboardEventHandler<any>;
  onClick?: React.MouseEventHandler<HTMLElement>;
}> = observer(props => {
  const { onKeyDown, onClick } = props;
  return (
    <>
      <div className="figma-1">
        <div id="17:2" tabIndex={0} onKeyDown={onKeyDown} onClick={onClick} className="figma-0 button">
          <div className="figma-5">
            <div id="17:1" className="figma-4">
              <span key="end">{`ENTER`}</span>
            </div>
          </div>
          <div className="figma-9">
            <div id="20:30" className="figma-8">
              <svg
                className="vector figma-7"
                height="28"
                width="28"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 28 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3465 8.75004L21.4298 4.66671M23.7632 2.33337L21.4298 4.66671L23.7632 2.33337ZM12.5515 13.545C13.1539 14.1394 13.6328 14.8471 13.9605 15.6273C14.2883 16.4075 14.4585 17.2448 14.4614 18.0911C14.4642 18.9374 14.2996 19.7758 13.9771 20.5582C13.6545 21.3406 13.1804 22.0515 12.582 22.6499C11.9836 23.2483 11.2727 23.7224 10.4904 24.0449C9.70797 24.3675 8.8695 24.5321 8.02324 24.5292C7.17698 24.5264 6.33964 24.3562 5.55942 24.0284C4.77921 23.7006 4.07155 23.2218 3.47717 22.6194C2.30832 21.4092 1.66156 19.7883 1.67618 18.1059C1.6908 16.4235 2.36563 14.8141 3.55533 13.6244C4.74503 12.4347 6.35441 11.7598 8.03684 11.7452C9.71927 11.7306 11.3401 12.3774 12.5503 13.5462L12.5515 13.545ZM12.5515 13.545L17.3465 8.75004L12.5515 13.545ZM17.3465 8.75004L20.8465 12.25L24.9298 8.16671L21.4298 4.66671L17.3465 8.75004Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        input {
          font: inherit;
          border: inherit;
          padding: inherit;
          background-color: inherit;
          color: inherit;
        }
        input:focus {
          outline: none;
        }
        .vector {
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          position: absolute;
          overflow: visible !important;
        }
        .figma-0 {
          position: relative;
          box-sizing: border-box;
          pointer-events: auto;
          width: 100%;
          height: 100%;
          debug-h: LEFT;
          debug-v: TOP;
          overflow: hidden;
          background: linear-gradient(to bottom, rgba(47, 206, 250, 1) 0%, rgba(47, 206, 250, 1) 100%),
            linear-gradient(to bottom, rgba(47, 206, 250, 1) 0%, rgba(47, 206, 250, 1) 100%);
          background-size: auto, auto;
          border-radius: 5px 5px 5px 5px;
        }
        .figma-1 {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .figma-4 {
          position: relative;
          box-sizing: border-box;
          pointer-events: auto;
          debug-h: LEFT_RIGHT;
          width: 300px;
          margin-left: 0px;
          margin-right: 0px;
          flex-grow: 1;
          debug-v: TOP_BOTTOM;
          margin-top: 0px;
          margin-bottom: 0px;
          color: rgba(255, 255, 255, 1);
          font-size: 26px;
          font-weight: 500;
          font-family: Roboto;
          text-align: center;
          font-style: normal;
          line-height: undefined%;
          letter-spacing: 0px;
          display: flex;
          max-width: -webkit-fill-available;
          align-content: center;
          justify-content: center;
          vertical-align: middle;
          align-items: center;
        }
        .figma-5 {
          position: absolute;
          display: flex;
          pointer-events: none;
          justify-content: stretch;
          width: 100%;
          height: 100%;
          top: 0px;
          left: 0px;
          align-items: stretch;
        }
        .figma-8 {
          position: relative;
          box-sizing: border-box;
          pointer-events: auto;
          z-index: 1;
          debug-h: RIGHT;
          width: 28px;
          margin-right: 18px;
          min-width: 28px;
          max-width: 28px;
          debug-v: SCALE;
          height: 47.45762711864407%;
          top: 25.423728813559322%;
          bottom: 27.11864406779661%;
          min-height: 47.45762711864407%;
          max-height: 47.45762711864407%;
        }
        .figma-9 {
          position: absolute;
          display: flex;
          width: 100%;
          pointer-events: none;
          justify-content: flex-end;
          height: 100%;
          top: 0px;
          left: 0px;
          align-items: stretch;
          z-index: 1;
        }

        .figma-7 {
          top: 0;
          height: 100%;
          transform: translateX(-50%);
        }

        .button {
          min-height: 60px;
          min-width: 200px;
          transition: background 0.2s, box-shadow 0.2s, color 0.2s;
          will-change: background, box-shadow, color;
          background: var(--color-primary);
          box-shadow: 0 0 0 0px var(--main-color);
          cursor: pointer;
          user-select: none;
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
      `}</style>
    </>
  );
});
