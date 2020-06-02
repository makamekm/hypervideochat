import React from "react";
import classNames from "classnames";
import "focus-options-polyfill";
import { navigate } from "./utils";

const config = {
  activeClassName: "active",
  focusableClassName: "focusable",
  selector: ".focusable",
  straightOnly: false,
  straightOverlapThreshold: 0.5,
  lastFocused: null as HTMLElement,
};

const KEYMAPPING = {
  "37": "left",
  "38": "up",
  "39": "right",
  "40": "down",
};

export const focusFocusable = () => {
  if (
    document.activeElement === document.body ||
    !document.contains(config.lastFocused)
  ) {
    if (config.lastFocused && document.contains(config.lastFocused)) {
      config.lastFocused.focus();
    } else {
      (document.querySelector(config.selector) as HTMLElement)?.focus();
    }
  }
};

export const FocusableRoot: React.FC = ({ children }) => {
  const onKeyDown = React.useCallback((e) => {
    const direction = KEYMAPPING[e.keyCode];
    if (direction) {
      e.preventDefault();
      e.stopPropagation();
      focusFocusable();
    }
  }, []);
  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    (document.querySelector(config.selector) as HTMLElement)?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
  return <>{children}</>;
};

export const FocusableElement: React.FC<{
  className?: string;
  onClick?: (e) => void;
  onFocus?: (e) => void;
  onUnfocus?: (e) => void;
  onClickEnter?: (e) => void;
  onBeforeFocus?: (e) => void;
  onAfterFocus?: (e) => void;
  onBeforeNext?: (e) => HTMLElement | void | boolean;
}> = ({
  children,
  onClick,
  className,
  onUnfocus,
  onClickEnter,
  onFocus,
  onBeforeNext,
  onBeforeFocus,
  onAfterFocus,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const componentFocused = React.useCallback(
    (e) => {
      config.lastFocused = ref.current;
      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus]
  );
  const componentUnfocused = React.useCallback(
    (e) => {
      if (onUnfocus) {
        onUnfocus(e);
      }
    },
    [onUnfocus]
  );
  const componentClickEnter = React.useCallback(
    (e) => {
      if (onClickEnter) {
        onClickEnter(e);
      }
    },
    [onClickEnter]
  );
  const componentGetBeforeNext = React.useCallback(
    (e) => {
      if (onBeforeNext) {
        const el = onBeforeNext(e);
        if (el) {
          return el;
        } else if (el === false) {
          return null;
        }
      }
      return e.nextElement;
    },
    [onBeforeNext]
  );
  const componentBeforeNext = React.useCallback(
    (direction) => {
      const nextElement = navigate(
        ref.current,
        direction,
        Array.from<HTMLElement>(
          document.querySelectorAll(config.selector)
        ).filter((s) => s !== ref.current),
        config
      );
      return componentGetBeforeNext({
        direction,
        nextElement,
        currentElement: ref.current,
      });
    },
    [componentGetBeforeNext, ref]
  );
  const componentOnKeyDown = React.useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const direction = KEYMAPPING[e.keyCode];
      if (direction) {
        const nextElement = componentBeforeNext(direction);
        if (nextElement) {
          onBeforeFocus &&
            onBeforeFocus({
              direction,
              nextElement,
              currentElement: ref.current,
            });
          nextElement.focus({ preventScroll: true });
          onAfterFocus &&
            onAfterFocus({
              direction,
              nextElement,
              currentElement: ref.current,
            });
        }
      } else if (e.keyCode === 13) {
        componentClickEnter(e);
      }
    },
    [componentClickEnter, componentBeforeNext, onAfterFocus, onBeforeFocus]
  );
  return (
    <div
      ref={ref}
      className={classNames(config.focusableClassName, className)}
      onClick={onClick}
      onFocus={componentFocused}
      onBlur={componentUnfocused}
      tabIndex={-1}
      onKeyDown={componentOnKeyDown}
    >
      {children}
    </div>
  );
};
