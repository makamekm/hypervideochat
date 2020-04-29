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
            <div id="20:0" className="figma-8">
              <svg
                className="vector figma-7"
                height="24"
                width="24"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 9H20" stroke="black" strokeLinecap="round" strokeWidth="2" />
                <path d="M4 15H20" stroke="black" strokeLinecap="round" strokeWidth="2" />
                <path d="M10 3L8 21" stroke="black" strokeLinecap="round" strokeWidth="2" />
                <path d="M16 3L14 21" stroke="black" strokeLinecap="round" strokeWidth="2" />
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
          width: 294px;
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
          margin-left: 12px;
          min-width: 24px;
          max-width: 24px;
          debug-v: CENTER;
          height: 24px;
          margin-top: -2px;
          min-height: 24px;
          max-height: 24px;
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
          min-height: 50px;
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
