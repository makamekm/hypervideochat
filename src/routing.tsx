import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Error404 } from "./app/Error404";

//------ Route Definitions --------
export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/select-room" exact />
      <Redirect from="/index.html" to="/select-room" exact />
      {/* <Route path="/select-room" exact component={SelectRoom} />
      <Route path="/room/:room" exact component={Room} /> */}

      {/*    404    */}
      <Route component={Error404} />
    </Switch>
  );
};
