/* eslint-disable no-restricted-globals */
import signalhub from "signalhub";
import crypto from "crypto";
import localforage from "localforage";

localforage.config({
  driver: localforage.INDEXEDDB,
});

let channels = [];
let hubs = [];

// init();

async function init() {
  channels = JSON.parse((await localforage.getItem("channels")) || "[]");
  hubs.forEach((hub) => hub.close());
  hubs = channels.map(connectHub);
}

async function updateClientChannels() {
  const clients = await self.clients.matchAll();
  clients.forEach((client) =>
    client.postMessage({
      type: "channels",
      channels: getChannels(),
    })
  );
}

addEventListener("message", (event) => {
  event.waitUntil(
    new Promise(async (r) => {
      try {
        if (event.data && event.data.type === "addChannel") {
          await addChannel(event.data.name);
          event.ports[0].postMessage(true);
          await updateClientChannels();
        }
        if (event.data && event.data.type === "removeChannel") {
          await removeChannel(event.data.name);
          event.ports[0].postMessage(true);
          await updateClientChannels();
        }
        if (event.data && event.data.type === "getChannels") {
          event.ports[0].postMessage(getChannels());
        }
      } catch (error) {
        console.error(error);
      }
      r();
    })
  );
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
    hubs[index].close();
    channels.splice(index, 1);
    await localforage.setItem("channels", JSON.stringify(channels));
  }
}

function getChannels() {
  return channels;
}

function getTopic(name) {
  return crypto
    .createHash("sha256")
    .update("HYPERCHAT_" + name)
    .digest()
    .toString("hex");
}

function getRoomNameFromUrl(url) {
  url = new URL(url);
  const arr = /^\/room\/(.+)$/gi.exec(url.pathname);
  return arr && arr[1];
}

async function onHubMessage(name, data) {
  if (Notification.permission && data.type === "connect" && data.id) {
    await new Promise((r) => setTimeout(r, 1000));
    const clients = await self.clients.matchAll();
    const existedRoom = clients.find((client) => {
      return getRoomNameFromUrl(client.url) === name;
    });

    if (existedRoom) {
      return;
    }

    await self.registration.showNotification(
      `HVC: [${data.username || "unknown"}] has joined "${name}" room`,
      {
        actions: [{ action: "open_url", title: "Open Now" }],
        data: { name },
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        requireInteraction: true,
        body: `"${name}" has got a new connection with a username: ${data.username ||
          "unknown"}`,
        icon: "./logo192.png",
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
          const name = getRoomNameFromUrl(client.url);
          if (name === event.notification.data.name && "focus" in client) {
            return client.focus();
          }
        }
        // If not, then open the target URL in a new window/tab.
        if (self.clients.openWindow) {
          return self.clients.openWindow(
            "https://hypervideochat.now.sh/room/" + event.notification.data.name
          );
        }
      })
    );
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    new Promise(async (r) => {
      await init();
      r();
    })
  );
});
