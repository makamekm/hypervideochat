import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Error404 } from "./app/Error404";
import { Dashboard } from "./app/Dashboard";
import { DefaultPlayer } from "@env/app/DefaultPlayer";

//------ Route Definitions --------
export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/dashboard" exact />
      <Redirect from="/index.html" to="/dashboard" exact />

      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/player" exact component={DefaultPlayer} />

      {/*    404    */}
      <Route component={Error404} />
    </Switch>
  );
};
