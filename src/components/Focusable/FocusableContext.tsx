import React from "react";

export const FocusableContext = React.createContext<{
  focused: boolean;
}>(null);
