import React from "react";
import { useSpring } from "react-spring";
import classNames from "classnames";
import { XFocusableContext, YFocusableContext } from "./XFocusableContext";
import { Focusable } from "../Focusable/Focusable";
import { FocusableContext } from "../Focusable/FocusableContext";
import { observer, useLocalStore } from "mobx-react";
import { useOnChange } from "~/hooks";

const ItemContent: React.FC<{
  onClick?: () => void;
}> = observer(({ onClick, children }) => {
  const ref = React.useRef<HTMLElement>(null);
  const focusable = React.useContext(FocusableContext);
  const parentXContext = React.useContext(XFocusableContext);
  const parentYContext = React.useContext(YFocusableContext);
  const parentXContextElement = parentXContext && parentXContext.element;
  const parentYContextElement = parentYContext && parentYContext.element;
  const updatePos = React.useCallback(() => {
    if (focusable.focused && ref.current) {
      if (parentXContextElement) {
        const parentRect = parentXContext.getBoundingClientRect();
        const rect = ref.current.getBoundingClientRect();
        if (parentRect.right - rect.right < 0) {
          parentXContext.scrollTo(
            parentXContext.value + rect.right - parentRect.right + 100
          );
        } else if (parentRect.left - rect.left > 0) {
          parentXContext.scrollTo(
            parentXContext.value + rect.left - parentRect.left - 100
          );
        }
      }

      if (parentYContextElement) {
        const parentRect = parentYContext.getBoundingClientRect();
        const rect = ref.current.getBoundingClientRect();
        if (parentRect.bottom - rect.bottom < 0) {
          parentYContext.scrollTo(
            parentYContext.value + rect.bottom - parentRect.bottom + 100
          );
        } else if (parentRect.top - rect.top > 0) {
          parentYContext.scrollTo(
            parentYContext.value + rect.top - parentRect.top - 100
          );
        }
      }
    }
  }, [
    focusable.focused,
    parentXContext,
    parentXContextElement,
    parentYContext,
    parentYContextElement,
  ]);

  React.useEffect(updatePos);
  useOnChange(focusable, "focused", updatePos);

  return (
    <span className="flex-1" ref={ref} onClick={onClick}>
      {children}
    </span>
  );
});

export const XFocusable: React.FC<{
  className?: string;
  onClickEnter?: () => void;
  onUnfocus?: () => void;
  onFocus?: () => void;
}> = observer(({ onClickEnter, children, className, onUnfocus, onFocus }) => {
  const parentXContext = React.useContext(XFocusableContext);
  const parentYContext = React.useContext(YFocusableContext);
  const parentXContextElement = parentXContext && parentXContext.element;
  const parentYContextElement = parentYContext && parentYContext.element;
  return (
    <Focusable
      className={classNames(
        className,
        "inline-flex items-stretch text-sm font-semibold rounded-lg hover:bg-white focus:bg-white focus:text-gray-800 hover:text-gray-800 focus:outline-none focus:shadow-outline"
      )}
      onClickEnter={() => {
        onClickEnter && onClickEnter();
      }}
      onFocus={() => {
        onFocus && onFocus();
      }}
      onUnfocus={() => {
        onUnfocus && onUnfocus();
        if (parentXContextElement) {
          const value = parentXContext.value;
          requestAnimationFrame(() => {
            parentXContext.set(value);
          });
        }
        if (parentYContextElement) {
          const value = parentYContext.value;
          requestAnimationFrame(() => {
            parentYContext.set(value);
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
  const ref = React.useRef<HTMLDivElement>(null);
  const [, setX] = useSpring(
    () =>
      ({
        x: 0,
        onFrame: ({ x }) => {
          if (ref.current) {
            ref.current.scrollLeft = x;
          }
        },
      } as any)
  );
  const state = useLocalStore(() => ({
    element: null as HTMLDivElement,
    get value() {
      return ref.current && ref.current.scrollLeft;
    },
    set(value) {
      if (ref.current) {
        ref.current.scrollLeft = value;
      }
    },
    scrollTo: (value) => {
      if (ref.current) {
        setX({
          reset: true,
          x: value,
          from: { x: ref.current.scrollLeft },
        } as any);
      }
    },
    getBoundingClientRect: () => {
      return ref.current && ref.current.getBoundingClientRect();
    },
  }));
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

export const YBodyFocusableContainer: React.FC = observer(({ children }) => {
  const [, setX] = useSpring(
    () =>
      ({
        y: 0,
        onFrame: ({ y }) => {
          window.scroll(0, y);
        },
      } as any)
  );
  const state = useLocalStore(() => ({
    element: document.body,
    get value() {
      return window.scrollY;
    },
    set(value) {
      window.scroll(0, value);
    },
    scrollTo: (value) => {
      setX({
        reset: true,
        y: value,
        from: { y: window.scrollY },
      } as any);
    },
    getBoundingClientRect: () => {
      return {
        left: 0,
        right: window.innerWidth,
        top: 0,
        bottom: window.innerHeight,
        height: window.innerHeight,
        width: window.innerWidth,
      };
    },
  }));
  return (
    <YFocusableContext.Provider value={state}>
      {children}
    </YFocusableContext.Provider>
  );
});
