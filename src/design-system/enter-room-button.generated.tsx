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
