/* eslint-disable no-restricted-globals */
import localforage from "localforage";

localforage.config({
  driver: localforage.INDEXEDDB,
});

let channels = [];

async function init() {
  channels = JSON.parse((await localforage.getItem("channels")) || "[]");
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

async function addChannel(name) {
  if (!channels.includes(name)) {
    channels.push(name);
    await localforage.setItem("channels", JSON.stringify(channels));
  }
}

async function removeChannel(name) {
  const index = channels.indexOf(name);
  if (index >= 0) {
    channels.splice(index, 1);
    await localforage.setItem("channels", JSON.stringify(channels));
  }
}

function getChannels() {
  return channels;
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    new Promise(async (r) => {
      await init();
      r();
    })
  );
});
