import * as React from 'react';
import { observer } from 'mobx-react';

export const CamButtonGenerated: React.FC<{
  onKeyDown?: React.KeyboardEventHandler<any>;
  onClick?: React.MouseEventHandler<HTMLElement>;
}> = observer(props => {
  const { onKeyDown, onClick } = props;
  return (
    <>
      <div className="figma-1">
        <div id="24:15" tabIndex={0} onKeyDown={onKeyDown} onClick={onClick} className="figma-0 button">
          <div className="figma-5">
            <div id="24:1" className="figma-4">
              <svg
                className="vector figma-3"
                height="30"
                width="30"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M28.75 8.75L20 15L28.75 21.25V8.75Z" stroke="white" strokeLinecap="round" strokeWidth="2" />
                <path
                  d="M17.5 6.25H3.75C2.36929 6.25 1.25 7.36929 1.25 8.75V21.25C1.25 22.6307 2.36929 23.75 3.75 23.75H17.5C18.8807 23.75 20 22.6307 20 21.25V8.75C20 7.36929 18.8807 6.25 17.5 6.25Z"
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
          border-radius: 100px 100px 100px 100px;
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
          debug-h: SCALE;
          width: 50%;
          margin-left: 25%;
          margin-right: 25%;
          min-width: 50%;
          max-width: 50%;
          debug-v: SCALE;
          height: 50%;
          top: 25%;
          bottom: 25%;
          min-height: 50%;
          max-height: 50%;
        }
        .figma-5 {
          position: absolute;
          display: flex;
          width: 100%;
          pointer-events: none;
          justify-content: center;
          height: 100%;
          top: 0px;
          left: 0px;
          align-items: stretch;
        }

        .figma-3 {
          left: 0;
          width: 100%;
          top: 0;
          height: 100%;
          transform: unset;
        }

        .button {
          height: 60px;
          width: 60px;
          min-height: 60px;
          min-width: 60px;
          transition: background 0.2s, box-shadow 0.2s, color 0.2s;
          will-change: background, box-shadow, color;
          background: var(--color-primary);
          box-shadow: 0 0 0 0px var(--main-color);
          cursor: pointer;
          user-select: none;
          outline: none;
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
