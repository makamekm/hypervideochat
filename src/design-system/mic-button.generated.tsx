import * as React from 'react';
import { observer } from 'mobx-react';

export const MicButtonGenerated: React.FC<{
  onKeyDown?: React.KeyboardEventHandler<any>;
  onClick?: React.MouseEventHandler<HTMLElement>;
}> = observer(props => {
  const { onKeyDown, onClick } = props;
  return (
    <>
      <div className="figma-1">
        <div id="24:53" tabIndex={0} onKeyDown={onKeyDown} onClick={onClick} className="figma-0 button">
          <div className="figma-5">
            <div id="24:20" className="figma-4">
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
                  d="M15 1.25C14.0054 1.25 13.0516 1.64509 12.3483 2.34835C11.6451 3.05161 11.25 4.00544 11.25 5V15C11.25 15.9946 11.6451 16.9484 12.3483 17.6517C13.0516 18.3549 14.0054 18.75 15 18.75C15.9946 18.75 16.9484 18.3549 17.6517 17.6517C18.3549 16.9484 18.75 15.9946 18.75 15V5C18.75 4.00544 18.3549 3.05161 17.6517 2.34835C16.9484 1.64509 15.9946 1.25 15 1.25V1.25Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <path
                  d="M23.75 12.5V15C23.75 17.3206 22.8281 19.5462 21.1872 21.1872C19.5462 22.8281 17.3206 23.75 15 23.75C12.6794 23.75 10.4538 22.8281 8.81282 21.1872C7.17187 19.5462 6.25 17.3206 6.25 15V12.5"
                  stroke="white"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <path d="M15 23.75V28.75" stroke="white" strokeLinecap="round" strokeWidth="2" />
                <path d="M10 28.75H20" stroke="white" strokeLinecap="round" strokeWidth="2" />
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
