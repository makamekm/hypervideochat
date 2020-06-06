import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Error404 } from "./app/Error404";
import { Dashboard } from "./app/Dashboard";
import { TVShow } from "./app/TVShow";
import { Player } from "@env/app/Player";
import { DefaultPlayer } from "@env/app/DefaultPlayer";
import { Search } from "./app/Search";
import { Genre } from "./app/Genre";
import { Top100 } from "./app/Top100";

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
      <Route path="/default-player" exact component={DefaultPlayer} />
      <Route path="/search" exact component={Search} />
      <Route path="/genre/:genre/:page?" exact component={Genre} />
      <Route path="/top100" exact component={Top100} />

      {/*    404    */}
      <Route component={Error404} />
    </Switch>
  );
};
