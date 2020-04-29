import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { SelectRoom } from "./app/SelectRoom";

//------ Route Definitions --------
export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/select-room" exact />
      <Redirect from="/index.html" to="/select-room" exact />
      <Route path="/select-room" exact component={SelectRoom} />

      {/*    404    */}
      {/* <Route component={Error404} /> */}
    </Switch>
  );
};
