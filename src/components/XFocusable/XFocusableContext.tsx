import React from "react";

export const XFocusableContext = React.createContext<{
  element: HTMLElement;
  value: number;
  getBoundingClientRect: () => {
    left: number;
    right: number;
    top: number;
    bottom: number;
    height: number;
    width: number;
  };
  scrollTo: (value: number) => void;
  set: (value: number) => void;
}>(null);

export const YFocusableContext = React.createContext<{
  element: HTMLElement;
  value: number;
  getBoundingClientRect: () => {
    left: number;
    right: number;
    top: number;
    bottom: number;
    height: number;
    width: number;
  };
  scrollTo: (value: number) => void;
  set: (value: number) => void;
}>(null);
