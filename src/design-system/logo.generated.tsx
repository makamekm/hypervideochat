import * as React from 'react';
import { observer } from 'mobx-react';

export const LogoGenerated: React.FC<{}> = observer(props => {
  return (
    <>
      <div className="figma-1">
        <div id="20:18" className="figma-0">
          <div className="figma-5">
            <div id="3:1" className="figma-4">
              <svg
                className="vector figma-3"
                height="49"
                width="51"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 51 49"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50.9999 23.1389C51.0097 26.7319 50.1359 30.2763 48.4499 33.4834C46.4508 37.3264 43.3776 40.5589 39.5744 42.8186C35.7712 45.0783 31.3883 46.2761 26.9166 46.2778C23.177 46.2871 19.488 45.4477 16.15 43.8278L0 49L5.38332 33.4834C3.6973 30.2763 2.82358 26.7319 2.83333 23.1389C2.83506 18.8426 4.08173 14.6316 6.43369 10.9776C8.78566 7.32352 12.15 4.37078 16.15 2.45007C19.488 0.830167 23.177 -0.00929029 26.9166 7.75508e-05H28.3333C34.2389 0.31311 39.8169 2.70803 43.9992 6.72629C48.1814 10.7446 50.6741 16.1038 50.9999 21.7778V23.1389Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          <div className="figma-9">
            <div id="20:19" className="figma-8">
              <svg
                className="vector figma-7"
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
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
          background-size: auto;
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
          width: 85%;
          margin-left: 8.333333333333334%;
          margin-right: 6.666666666666667%;
          debug-v: SCALE;
          height: 81.66666666666667%;
          top: 8.333333333333334%;
          bottom: 10%;
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
        .figma-8 {
          position: relative;
          box-sizing: border-box;
          pointer-events: auto;
          z-index: 1;
          debug-h: SCALE;
          width: 50%;
          margin-left: 30%;
          margin-right: 20%;
          min-width: 50%;
          max-width: 50%;
          debug-v: SCALE;
          height: 50%;
          top: 23.333333333333332%;
          bottom: 26.666666666666668%;
          min-height: 50%;
          max-height: 50%;
        }
        .figma-9 {
          position: absolute;
          display: flex;
          width: 100%;
          pointer-events: none;
          justify-content: center;
          height: 100%;
          top: 0px;
          left: 0px;
          align-items: stretch;
          z-index: 1;
        }

        .figma-3 {
          left: 0;
          width: 100%;
          top: 0;
          height: 100%;
          transform: unset;
        }

        .figma-7 {
          left: 0;
          width: 100%;
          top: 0;
          height: 100%;
          transform: unset;
        }
      `}</style>
    </>
  );
});
