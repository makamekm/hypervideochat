import React from "react";
import { Focusable as FocusableNative } from "react-js-spatial-navigation";
import { FocusableContext } from "./FocusableContext";
import { observer, useLocalStore } from "mobx-react";

const FocusableChild: React.FC<{
  className?: string;
  onFocus?: (e) => void | boolean;
  onUnfocus?: (e) => void | boolean;
  onClickEnter?: () => void;
}> = observer(({ className, onFocus, onUnfocus, onClickEnter, children }) => {
  const context = React.useContext(FocusableContext);
  const onUseFocus = React.useCallback(
    (e) => {
      // onFocus && onFocus(e);
      if (!onFocus || onFocus(e) !== false) {
        context.focused = true;
      }
    },
    [context, onFocus]
  );
  const onUseUnfocus = React.useCallback(
    (e) => {
      // onUnfocus && onUnfocus(e);
      if (!onUnfocus || onUnfocus(e) !== false) {
        context.focused = false;
      }
    },
    [context, onUnfocus]
  );
  const onUseClickEnter = React.useCallback(() => {
    onClickEnter && onClickEnter();
  }, [onClickEnter]);
  return (
    <FocusableNative
      className={className}
      onFocus={onUseFocus}
      onUnfocus={onUseUnfocus}
      onClickEnter={onUseClickEnter}
      onClick={onUseClickEnter}
    >
      {children}
    </FocusableNative>
  );
});

export const Focusable: React.FC<{
  onFocus?: (e) => void | boolean;
  onUnfocus?: (e) => void | boolean;
  onClickEnter?: () => void;
  className?: string;
}> = observer((props) => {
  const state = useLocalStore(() => ({
    focused: false,
  }));
  return (
    <FocusableContext.Provider value={state}>
      <FocusableChild {...props}>{props.children}</FocusableChild>
    </FocusableContext.Provider>
  );
});
