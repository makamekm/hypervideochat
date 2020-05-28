import React from "react";

export const XFocusableContext = React.createContext<{
  element: HTMLElement;
}>(null);
