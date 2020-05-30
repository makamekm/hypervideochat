import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Error404 } from "./app/Error404";
import { Dashboard } from "./app/Dashboard";
import { TVShow } from "./app/TVShow";
import { Player } from "./app/Player";
import { Search } from "./app/Search";

//------ Route Definitions --------
export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/dashboard" exact />
      <Redirect from="/index.html" to="/dashboard" exact />
      {/* {/* <Route path="/select-room" exact component={SelectRoom} /> */}
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/tvshow/:id" exact component={TVShow} />
      <Route path="/player" exact component={Player} />
      <Route path="/search" exact component={Search} />

      {/*    404    */}
      <Route component={Error404} />
    </Switch>
  );
};
