import * as React from 'react';
import { observer } from 'mobx-react';

export const CamOffButtonGenerated: React.FC<{
  onKeyDown?: React.KeyboardEventHandler<any>;
  onClick?: React.MouseEventHandler<HTMLElement>;
}> = observer(props => {
  const { onKeyDown, onClick } = props;
  return (
    <>
      <div className="figma-1">
        <div id="26:26" tabIndex={0} onKeyDown={onKeyDown} onClick={onClick} className="figma-0 button">
          <div className="figma-5">
            <div id="24:25" className="figma-4">
              <svg
                className="vector figma-3"
                height="30"
                width="30"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.325 6.25H17.5C18.163 6.25 18.7989 6.51339 19.2678 6.98223C19.7366 7.45107 20 8.08696 20 8.75V12.925L21.25 14.175L28.75 8.75V21.25M20 20V21.25C20 21.913 19.7366 22.5489 19.2678 23.0178C18.7989 23.4866 18.163 23.75 17.5 23.75H3.75C3.08696 23.75 2.45107 23.4866 1.98223 23.0178C1.51339 22.5489 1.25 21.913 1.25 21.25V8.75C1.25 8.08696 1.51339 7.45107 1.98223 6.98223C2.45107 6.51339 3.08696 6.25 3.75 6.25H6.25L20 20Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <path d="M1.25 1.25L28.75 28.75" stroke="white" strokeLinecap="round" strokeWidth="2" />
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
          debug-h: LEFT;
          margin-left: 15px;
          min-width: 30px;
          max-width: 30px;
          debug-v: TOP;
          margin-top: 15px;
          margin-bottom: 15px;
          min-height: 30px;
          max-height: 30px;
        }
        .figma-5 {
          position: relative;
          display: flex;
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
