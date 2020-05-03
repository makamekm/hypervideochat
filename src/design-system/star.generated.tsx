import * as React from 'react';
import { observer } from 'mobx-react';

export const StarGenerated: React.FC<{}> = observer(props => {
  return (
    <>
      <div className="figma-1">
        <div id="31:0" className="figma-0">
          <div className="figma-5">
            <div id="31:1" className="figma-4">
              <svg
                className="vector figma-3"
                height="27"
                width="29"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 29 27"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1956 0L18.582 8.88644L28.3912 10.3202L21.2934 17.2334L22.9685 27L14.1956 22.3864L5.42271 27L7.09779 17.2334L0 10.3202L9.80915 8.88644L14.1956 0Z"
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
          debug-h: LEFT_RIGHT;
          width: 28.33333396911621px;
          margin-left: 2.833332061767578px;
          margin-right: 2.833333969116211px;
          flex-grow: 1;
          debug-v: TOP_BOTTOM;
          margin-top: 2.83331298828125px;
          margin-bottom: 4.221687316894531px;
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

        .figma-3 {
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
