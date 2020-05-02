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

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
};

requestNotificationPermission();

// function initializeUI() {
//   // Set the initial subscription value
//   registration.getSubscription()
//   .then(function(subscription) {
//     const isSubscribed = !(subscription === null);

//     if (isSubscribed) {
//       console.log('User IS subscribed.');
//     } else {
//       console.log('User is NOT subscribed.');
//     }
//   });
// }
