import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { SelectRoom } from "./app/SelectRoom";
import { NotFound } from "./app/NotFound";
import { Room } from "./app/Room";

//------ Route Definitions --------
export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/select-room" exact />
      <Redirect from="/index.html" to="/select-room" exact />
      <Route path="/select-room" exact component={SelectRoom} />
      <Route path="/room/:room" exact component={Room} />

      {/*    404    */}
      <Route component={NotFound} />
    </Switch>
  );
};
