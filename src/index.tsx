import "./styles/normalize.scss";
import "./tailwind.generated.css";
import "./styles/main.scss";

import "mobx-react/batchingForReactDom";

import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

requestNotificationPermission();

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }

  return true;
}

async function requestNotificationPermission() {
  if (checkNotificationPromise()) {
    Notification.requestPermission().then((permission) => {
      handlePermission(permission);
    });
  } else {
    Notification.requestPermission((permission) => {
      handlePermission(permission);
    });
  }
}

function handlePermission(permission) {
  if (!("permission" in Notification)) {
    (Notification as any).permission = permission;
  }

  if (
    Notification.permission === "denied" ||
    Notification.permission === "default"
  ) {
    console.error("No Notification Permission!", permission);
  }
}
