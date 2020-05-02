/* eslint-disable no-restricted-globals */
import signalhub from "signalhub";
import crypto from "crypto";
import localforage from "localforage";

let channels = [];
let hubs = [];

init();

async function init() {
  channels = JSON.parse((await localforage.getItem("channels")) || "[]");
  hubs = channels.map(connectHub);
}

self.addEventListener("message", (evt) => {
  console.log("postMessage received", evt.data);
  if (evt.data.type === "addChannel") {
    addChannel(evt.data.name);
  }
  if (evt.data.type === "removeChannel") {
    removeChannel(evt.data.name);
  }
  if (evt.data.type === "getChannels") {
    getChannels();
  }
});

function connectHub(name) {
  const hub = signalhub(getTopic(name), [
    "https://signalhub-hzbibrznqa.now.sh",
    // "https://signalhub-jccqtwhdwc.now.sh",
  ]);

  hub.subscribe(getTopic(name)).on("data", (message) => {
    onHubMessage(name, message);
  });

  return hub;
}

async function addChannel(name) {
  if (!channels.includes(name)) {
    channels.push(name);
    await localforage.setItem("channels", JSON.stringify(channels));
    hubs.push(connectHub(name));
  }
}

async function removeChannel(name) {
  const index = channels.indexOf(name);
  if (index >= 0) {
    channels.splice(index, 1);
    hubs[index].destroy();
    channels.splice(index, 1);
    await localforage.setItem("channels", JSON.stringify(channels));
  }
}

async function getChannels() {
  return channels;
}

function getTopic(name) {
  return crypto
    .createHash("sha256")
    .update("HYPERCHAT_" + name)
    .digest()
    .toString("hex");
}

async function onHubMessage(name, data) {
  if (Notification.permission && data.type === "connect" && data.id) {
    await self.registration.showNotification(
      `[${data.username || "unknown"}] has joined "${name}" room`,
      {
        actions: [{ action: "open_url", title: "Open Now" }],
        data: { url: "/room/" + name },
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        // requireInteraction: true,
        body: `"${name}" has got a new connection with a username: ${data.username ||
          "unknown"}`,
      }
    );
  }
}

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Android needs explicit close.
  if (event.action === "open_url") {
    event.waitUntil(
      self.clients.matchAll({ type: "window" }).then((windowClients) => {
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          // If so, just focus it.
          const url =
            /(^\w+:\/\/[\w:]+)/gi.exec(client.url)[1] +
            event.notification.data.url;
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        // If not, then open the target URL in a new window/tab.
        if (self.clients.openWindow) {
          return self.clients.openWindow(
            "https://hypervideochat.now.sh" + event.notification.data.url
          );
        }
      })
    );
  }
});
