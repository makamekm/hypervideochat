import React from "react";
import { FocusableContext } from "./FocusableContext";
import { observer, useLocalStore } from "mobx-react";
import { FocusableElement } from "../SpatialNavigation/SpatialNavigation";

export const Focusable: React.FC<{
  onFocus?: (e) => void;
  onUnfocus?: (e) => void;
  onClickEnter?: () => void;
  onBeforeNext?: (e) => HTMLElement | void | boolean;
  className?: string;
}> = observer(
  ({ children, className, onClickEnter, onFocus, onUnfocus, onBeforeNext }) => {
    const state = useLocalStore(() => ({
      focused: false,
    }));
    const onUseFocus = React.useCallback(
      (e) => {
        onFocus && onFocus(e);
        state.focused = true;
      },
      [state, onFocus]
    );
    const onUseUnfocus = React.useCallback(
      (e) => {
        onUnfocus && onUnfocus(e);
        state.focused = false;
      },
      [state, onUnfocus]
    );
    const onUseClickEnter = React.useCallback(() => {
      onClickEnter && onClickEnter();
    }, [onClickEnter]);
    return (
      <FocusableContext.Provider value={state}>
        <FocusableElement
          onBeforeNext={onBeforeNext}
          className={className}
          onFocus={onUseFocus}
          onUnfocus={onUseUnfocus}
          onClickEnter={onUseClickEnter}
          onClick={onUseClickEnter}
        >
          {children}
        </FocusableElement>
      </FocusableContext.Provider>
    );
  }
);
