import * as React from 'react';
import { observer } from 'mobx-react';

export const SelectRoomInputGenerated: React.FC<{
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}> = observer(props => {
  const { onKeyDown, value, onChange } = props;
  return (
    <>
      <div className="figma-1">
        <div id="1:8" className="figma-0 input-wrapper">
          <div className="figma-5">
            <div id="1:7" className="figma-4 input">
              <input
                id="1:7"
                onKeyDown={onKeyDown}
                value={value}
                onChange={onChange}
                className="figma-3 input"
                type="text"
                placeholder="Room ID..."
              />
            </div>
          </div>
          <div className="figma-9">
            <div id="3:1" className="figma-8">
              <svg
                className="vector figma-7"
                height="18"
                width="18"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 8.50002C18.0034 9.81988 17.695 11.1219 17.1 12.3C16.3944 13.7118 15.3097 14.8992 13.9674 15.7293C12.6251 16.5594 11.0782 16.9994 9.49998 17C8.18012 17.0034 6.8781 16.6951 5.69999 16.1L0 18L1.9 12.3C1.30493 11.1219 0.996557 9.81988 0.999998 8.50002C1.00061 6.92178 1.44061 5.37487 2.27072 4.03257C3.10082 2.69027 4.28825 1.60559 5.69999 0.900027C6.8781 0.304959 8.18012 -0.00341276 9.49998 2.8488e-05H9.99998C12.0843 0.11502 14.053 0.994788 15.5291 2.47088C17.0052 3.94698 17.885 5.91567 18 8.00002V8.50002Z"
                  stroke="black"
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
          background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%),
            linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
          background-size: auto, auto;
          border-radius: 5px 5px 5px 5px;
        }
        .figma-1 {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .figma-3 {
          flex: 1;
          height: 100%;
        }
        .figma-4 {
          position: relative;
          box-sizing: border-box;
          pointer-events: auto;
          debug-h: LEFT_RIGHT;
          width: 296px;
          margin-left: 43px;
          margin-right: 16px;
          flex-grow: 1;
          debug-v: TOP_BOTTOM;
          margin-top: 0px;
          margin-bottom: 0px;
          color: rgba(0, 0, 0, 1);
          font-size: 20px;
          font-weight: 400;
          font-family: Roboto;
          text-align: left;
          font-style: normal;
          line-height: undefined%;
          letter-spacing: 0px;
          display: flex;
          max-width: -webkit-fill-available;
          align-content: center;
          justify-content: flex-start;
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
          debug-h: LEFT;
          margin-left: 15px;
          min-width: 18.000028610229492px;
          debug-v: CENTER;
          height: 18.000028610229492px;
          margin-top: -0.9999713897705078px;
        }
        .figma-9 {
          position: absolute;
          display: flex;
          width: 100%;
          pointer-events: none;
          align-items: center;
          height: 100%;
          top: 0px;
          left: 0px;
          z-index: 1;
        }

        .input-wrapper {
          min-height: 40px;
          transition: background 0.2s, box-shadow 0.2s;
          will-change: background, box-shadow;
          background: #dddddd;
          box-shadow: 0 0 0 0px var(--color-primary);
        }

        .input-wrapper:focus-within {
          background: #ffffff;
          box-shadow: 0 0 0px 4px var(--color-primary);
        }

        .input::placeholder {
          color: inherit;
        }
      `}</style>
    </>
  );
});
