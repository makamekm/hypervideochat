import * as React from 'react';
import { observer } from 'mobx-react';

export const CallOffButtonGenerated: React.FC<{
  onKeyDown?: React.KeyboardEventHandler<any>;
  onClick?: React.MouseEventHandler<HTMLElement>;
}> = observer(props => {
  const { onKeyDown, onClick } = props;
  return (
    <>
      <div className="figma-1">
        <div id="35:8" tabIndex={0} onKeyDown={onKeyDown} onClick={onClick} className="figma-0 button">
          <div className="figma-5">
            <div id="35:9" className="figma-4">
              <svg
                className="vector figma-3"
                height="28"
                width="28"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 28 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.055 14.945C4.09017 11.9151 2.86342 8.46666 2.47334 4.87664C2.44418 4.55402 2.48252 4.22886 2.58592 3.92187C2.68932 3.61487 2.8555 3.33277 3.0739 3.09353C3.29229 2.85428 3.55811 2.66313 3.85443 2.53225C4.15074 2.40136 4.47107 2.33361 4.795 2.3333H8.295C8.86119 2.32773 9.41009 2.52823 9.83939 2.89743C10.2687 3.26662 10.5491 3.77933 10.6283 4.33997C10.7761 5.46005 11.05 6.55982 11.445 7.6183C11.602 8.03588 11.6359 8.4897 11.5429 8.926C11.4498 9.36229 11.2337 9.76277 10.92 10.08L9.43834 11.5616M12.46 15.5283C13.644 16.7133 14.9821 17.7336 16.4383 18.5616L17.92 17.08C18.2372 16.7663 18.6377 16.5501 19.074 16.4571C19.5103 16.364 19.9641 16.398 20.3817 16.555C21.4402 16.9499 22.5399 17.2239 23.66 17.3716C24.2207 17.4509 24.7334 17.7313 25.1026 18.1606C25.4717 18.5899 25.6722 19.1388 25.6667 19.705V23.205C25.668 23.5299 25.6014 23.8515 25.4713 24.1492C25.3411 24.4469 25.1502 24.7142 24.9108 24.9338C24.6713 25.1535 24.3887 25.3207 24.0809 25.4248C23.7731 25.5289 23.4469 25.5675 23.1233 25.5383C19.5333 25.1482 16.0848 23.9215 13.055 21.9566C11.6495 21.0642 10.3466 20.0196 9.17 18.8416L12.46 15.5283Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <path d="M26.8334 1.16669L1.16669 26.8334" stroke="white" strokeLinecap="round" strokeWidth="2" />
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
          background: linear-gradient(to bottom, rgba(250, 47, 108, 1) 0%, rgba(250, 47, 108, 1) 100%),
            linear-gradient(to bottom, rgba(250, 47, 108, 1) 0%, rgba(250, 47, 108, 1) 100%);
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
          margin-left: 16px;
          min-width: 28px;
          max-width: 28px;
          debug-v: TOP;
          margin-top: 16px;
          margin-bottom: 16px;
          min-height: 28px;
          max-height: 28px;
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
          background: var(--color-error);
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
