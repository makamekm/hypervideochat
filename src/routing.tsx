import React from "react";
import { AnimatedSwitch } from "react-router-transition";
import { Route, Redirect } from "react-router";
import { SelectRoom } from "./app/SelectRoom";
import { NotFound } from "./app/NotFound";

//------ Route Definitions --------
export const RoutedContent = () => {
  return (
    <AnimatedSwitch
      atEnter={{ opacity: 0, top: -50 }}
      atLeave={{ opacity: 0, top: 50 }}
      atActive={{ opacity: 1, top: 0 }}
      className="switch-wrapper"
    >
      <Redirect from="/" to="/select-room" exact />
      <Redirect from="/index.html" to="/select-room" exact />
      <Route path="/select-room" exact component={SelectRoom} />

      {/*    404    */}
      <Route component={NotFound} />
    </AnimatedSwitch>
  );
};
