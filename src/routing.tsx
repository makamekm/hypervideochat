import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Error404 } from "./app/Error404";
import { TVDemo } from "./app/TVDemo";

//------ Route Definitions --------
export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/dashboard" exact />
      <Redirect from="/index.html" to="/dashboard" exact />
      {/* {/* <Route path="/select-room" exact component={SelectRoom} /> */}
      <Route path="/dashboard" exact component={TVDemo} /> */}
      {/*    404    */}
      <Route component={Error404} />
    </Switch>
  );
};
