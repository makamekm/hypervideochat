import * as React from 'react';
import { observer } from 'mobx-react';

export const MicOffButtonGenerated: React.FC<{
  onKeyDown?: React.KeyboardEventHandler<any>;
  onClick?: React.MouseEventHandler<HTMLElement>;
}> = observer(props => {
  const { onKeyDown, onClick } = props;
  return (
    <>
      <div className="figma-1">
        <div id="26:18" tabIndex={0} onKeyDown={onKeyDown} onClick={onClick} className="figma-0 button">
          <div className="figma-5">
            <div id="24:28" className="figma-4">
              <svg
                className="vector figma-3"
                height="30"
                width="30"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.25 1.25L28.75 28.75" stroke="white" strokeLinecap="round" strokeWidth="2" />
                <path
                  d="M18.75 11.675V4.99999C18.7509 4.07003 18.4063 3.17289 17.783 2.48274C17.1597 1.79259 16.3021 1.35867 15.3769 1.26521C14.4516 1.17175 13.5246 1.42542 12.7759 1.97698C12.0272 2.52854 11.5101 3.33863 11.325 4.24999M11.25 11.25V15C11.2507 15.7412 11.4709 16.4656 11.883 17.0817C12.2951 17.6977 12.8806 18.1779 13.5654 18.4614C14.2502 18.745 15.0037 18.8192 15.7307 18.6748C16.4577 18.5304 17.1256 18.1738 17.65 17.65L11.25 11.25Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <path
                  d="M23.75 12.5V15C23.7495 15.5155 23.7035 16.0301 23.6125 16.5375M21.25 21.1875C20.0297 22.433 18.4652 23.2856 16.757 23.6357C15.0489 23.9859 13.275 23.8178 11.6631 23.1529C10.0512 22.4879 8.67469 21.3566 7.7102 19.9039C6.74572 18.4513 6.23723 16.7436 6.24999 15V12.5L21.25 21.1875Z"
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
          margin-top: 14px;
          margin-bottom: 16px;
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
