import React from "react";
import { Focusable as FocusableNative } from "react-js-spatial-navigation";
import { FocusableContext } from "./FocusableContext";
import { observer, useLocalStore } from "mobx-react";

const FocusableChild: React.FC<{
  className?: string;
  onFocus?: () => void;
  onUnfocus?: () => void;
  onClickEnter?: () => void;
}> = observer(({ className, onFocus, onUnfocus, onClickEnter, children }) => {
  const context = React.useContext(FocusableContext);
  const onUseFocus = React.useCallback(() => {
    onFocus && onFocus();
    context.focused = true;
  }, [context, onFocus]);
  const onUseUnfocus = React.useCallback(() => {
    onUnfocus && onUnfocus();
    context.focused = false;
  }, [context, onUnfocus]);
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
  onFocus?: () => void;
  onUnfocus?: () => void;
  onClickEnter?: () => void;
  className?: string;
}> = observer((props) => {
  const state = useLocalStore(() => ({
    focused: false,
  }));
  const onFocus = React.useCallback(() => {
    onFocus && onFocus();
  }, []);
  return (
    <FocusableContext.Provider value={state}>
      <FocusableChild {...props}>{props.children}</FocusableChild>
    </FocusableContext.Provider>
  );
});
