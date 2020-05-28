import React from "react";
import classNames from "classnames";
import { XFocusableContext } from "./XFocusableContext";
import { Focusable } from "../Focusable/Focusable";
import { FocusableContext } from "../Focusable/FocusableContext";
import { observer, useLocalStore } from "mobx-react";

const ItemContent: React.FC<{
  onClick?: () => void;
}> = observer(({ onClick, children }) => {
  const ref = React.useRef<HTMLElement>(null);
  const focusable = React.useContext(FocusableContext);
  const parentContext = React.useContext(XFocusableContext);
  React.useEffect(() => {
    if (focusable.focused && ref.current && parentContext.element) {
      const parentRect = parentContext.element.getBoundingClientRect();
      const rect = ref.current.getBoundingClientRect();
      if (parentRect.right - rect.right < 0) {
        parentContext.element.scrollLeft =
          parentContext.element.scrollLeft +
          rect.right -
          parentRect.right +
          100;
      } else if (parentRect.left - rect.left > 0) {
        parentContext.element.scrollLeft =
          parentContext.element.scrollLeft + rect.left - parentRect.left - 100;
      }
    }
  }, [focusable.focused, parentContext.element]);
  return (
    <span className="flex-1" ref={ref} onClick={onClick}>
      {children}
    </span>
  );
});

export const XFocusable: React.FC<{
  className?: string;
  onClickEnter?: () => void;
}> = observer(({ onClickEnter, children, className }) => {
  const parentContext = React.useContext(XFocusableContext);
  return (
    <Focusable
      className={classNames(
        className,
        "inline-flex items-stretch my-1 mx-2 py-1 px-1 text-sm font-semibold rounded-lg hover:bg-white focus:bg-white focus:text-gray-800 hover:text-gray-800 focus:outline-none focus:shadow-outline"
      )}
      onClickEnter={() => {
        onClickEnter && onClickEnter();
      }}
      onFocus={() => {}}
      onUnfocus={() => {
        if (parentContext.element) {
          const left = parentContext.element.scrollLeft;
          requestAnimationFrame(() => {
            parentContext.element.scrollLeft = left;
          });
        }
      }}
    >
      <ItemContent onClick={onClickEnter}>{children}</ItemContent>
    </Focusable>
  );
});

export const XFocusableContainer: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = observer(({ className, style, children }) => {
  const state = useLocalStore(() => ({
    element: null as HTMLDivElement,
  }));
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    state.element = ref.current;
  }, [state, ref]);
  return (
    <div
      ref={ref}
      className={classNames(className, "overflow-x-hidden whitespace-no-wrap")}
      style={style}
    >
      <XFocusableContext.Provider value={state}>
        {children}
      </XFocusableContext.Provider>
    </div>
  );
});
