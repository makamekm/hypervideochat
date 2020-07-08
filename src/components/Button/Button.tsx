import React from "react";
import classNames from "classnames";

export const Button: React.FC<{
  className?: string;
  onClickEnter?: () => void;
}> = ({ children, onClickEnter, className }) => (
  <React.Fragment>
    <button
      onClick={onClickEnter}
      className={classNames("button px-4", className)}
    >
      {children}
    </button>
  </React.Fragment>
);
