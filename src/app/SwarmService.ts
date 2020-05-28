import React from "react";
import Saga from "./Saga";
import hyperdrive from "hyperdrive";
// import createFile from "random-access-web";
// import createDB from "random-access-idb";
import memdb from "random-access-memory";
// import { RDD, kv } from "dat-transform";
// import randomAccess from "random-access-storage";
import hypercoreCrypto from "hypercore-crypto";
import pump from "pump";
import ndjson from "ndjson";
import { Transform } from "stream";
import crypto from "crypto";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import swarm from "@geut/discovery-swarm-webrtc";
import { debug } from "~/utils";
import { useSimpleSyncLocalStorage } from "~/hooks";

const STACK_LENGTH = 100;

// function fileReader(name) {
//   let fd = 0;
//   return randomAccess({
//     open: function(req) {
//       // called once automatically before the first read call
//       fs.open(name, "r", function(err, res) {
//         if (err) return req.callback(err);
//         fd = res;
//         req.callback(null);
//       });
//     },
//     read: function(req) {
//       var buf = Buffer.allocUnsafe(req.size);
//       fs.read(fd, buf, 0, buf.length, req.offset, function(err, read) {
//         if (err) return req.callback(err);
//         if (read < buf.length) return req.callback(new Error("Could not read"));
//         req.callback(null, buf);
//       });
//     },
//     close: function(req) {
//       if (!fd) return req.callback(null);
//       fs.close(fd, (err) => req.callback(err));
//     },
//   });
// }

export const generateDriveKeys = () => {
  const keyPair = hypercoreCrypto.keyPair();
  return {
    publicKey: keyPair.publicKey.toString("hex"),
    secretKey: keyPair.secretKey.toString("hex"),
  };
};

export const SwarmService = createService(
  () => {
    const state = useLocalStore(() => ({
      username: "makame",
      id: null as string,
      swarm: null as any, // No @type
      isLoading: false,
      incomingStream: null as Transform,
      outgoingStream: null as Transform,
      messagesStack: [],
      publicKey: null as string,
      secretKey: null as string,
      peers: [] as any[],
      sendData(data, id = state.id, messageId = state.randId) {
        state.outgoingStream.write({
          ...data,
          id,
          messageId,
        });
      },
      onData(data) {
        console.log("received!", data);
      },
      onIncomingStreamData(data) {
        if (
          data.id !== state.id &&
          !state.messagesStack.includes(data.messageId)
        ) {
          state.sendData(data, data.id, data.messageId);
          state.onData(data);
          state.messagesStack.unshift(data.messageId);
          state.messagesStack.splice(
            STACK_LENGTH,
            Math.max(STACK_LENGTH - state.messagesStack.length, 0)
          );
        }
      },
      async getKeys() {
        if (!state.publicKey || !state.secretKey) {
          const { publicKey, secretKey } = generateDriveKeys();
          state.publicKey = publicKey;
          state.secretKey = secretKey;
        }
        return { publicKey: state.publicKey, secretKey: state.secretKey };
      },
      async start() {
        // state.isLoading = true;
        // state.id = state.randId;
        // state.incomingStream = ndjson.parse();
        // state.outgoingStream = ndjson.stringify();
        // state.incomingStream.on("data", (data) => {
        //   state.onIncomingStreamData(data);
        // });

        // state.swarm = swarm({
        //   maxPeers: 6,
        //   bootstrap: ["localhost:4000"], // discovery-signal-webrtc --port=4000 || npm run start:proxy
        //   // bootstrap: ["https://geut-webrtc-signal.herokuapp.com/"],
        //   // stream: (info) => state.outgoingStream,
        // });
        // state.swarm.join(state.topic);
        // state.swarm.on("connection", (peer) => {
        //   if (peer.initiator) {

        //   }
        //   console.log("conection", peer);
        //   // peer.on("stream", (stream) => {
        //   // Only for Video Track Content
        //   // });
        //   peer.pipe(state.incomingStream);
        //   state.outgoingStream.pipe(peer);
        //   peer.on("close", () => {
        //     console.log("disconnect", peer);
        //     peer.unpipe(state.incomingStream);
        //     state.outgoingStream.unpipe(peer);
        //     const index = state.peers.indexOf(peer);
        //     if (index >= 0) {
        //       state.peers.splice(index, 1);
        //     }
        //   });
        //   state.peers.push(peer);
        // });
        // state.isLoading = false;

        // -----------

        state.username = String(Math.random());

        const saga = Saga(memdb, state.topic, String(state.username));

        await saga.initialize();

        state.swarm = swarm({
          // id: Buffer.from(String(state.username)),
          stream: () => {
            return saga.replicate();
          },
          // maxPeers: 6,
          bootstrap: ["localhost:4000"], // discovery-signal-webrtc --port=4000 || npm run start:proxy
          // bootstrap: ["https://geut-webrtc-signal.herokuapp.com/"],
          // stream: (info) => state.outgoingStream,
        });

        state.swarm.join(state.topic);

        state.swarm.on("connection", async (peer) => {
          console.log("connection", peer);
          try {
            const data = JSON.parse(peer.remoteUserData);
            console.log(data);

            await saga.connect(peer);
            console.log("sdfsdfsdf", peer);
          } catch (err) {
            console.error(err);
          }
        });

        saga.on("join", (data) => {
          console.log("NEW COLLABORATOR", data);
          // const { username } = data;
        });

        saga.on("operation", (data) => {
          const { username, operation } = data;
          // if (username === state.username) return;
          console.log("INCOMING OPERATION");
          console.log("new operation from:", username);
          console.log("new operation content:", operation);
        });

        debug("state", state);
        debug("saga", saga);

        // -----------

        // state.isLoading = true;

        // const { publicKey, secretKey } = generateDriveKeys();

        // const db = createDB("dbtest");
        // const storage = db("test.file");
        // const storage = createFile()(publicKey);

        // const storage = fileReader(publicKey);
        // const drive = new hyperdrive(storage, publicKey);

        // const storage = memdb;
        // console.log(storage);

        // drive.on("ready", () => {
        //   state.id = state.randId;
        //   state.incomingStream = ndjson.parse();
        //   state.outgoingStream = ndjson.stringify();
        //   state.incomingStream.on("data", (data) => {
        //     state.onIncomingStreamData(data);
        //   });

        //   state.swarm = swarm({
        //     maxPeers: 6,
        //     bootstrap: ["localhost:4000"],
        //     // bootstrap: ["https://geut-webrtc-signal.herokuapp.com/"],
        //     // stream: (info) => state.outgoingStream,
        //   });
        //   state.swarm.join(state.topic);
        //   state.swarm.on("connection", (peer) => {
        //     const stream = drive.replicate({
        //       initiator: peer.initiator,
        //       live: true,
        //       upload: true,
        //       download: true,
        //       encrypt: true,
        //     });

        //     pump(peer, stream, peer);

        //     console.log("conection", peer);

        //     // peer.pipe(state.incomingStream);
        //     // state.outgoingStream.pipe(peer);

        //     // peer.on("close", () => {
        //     //   console.log("disconnect", peer);
        //     //   peer.unpipe(state.incomingStream);
        //     //   state.outgoingStream.unpipe(peer);
        //     // });
        //   });
        // state.isLoading = false;
        // });
      },
      async stop() {
        state.isLoading = true;
        state.swarm.destroy();
        state.isLoading = false;
      },
      get topic() {
        return crypto
          .createHash("sha256")
          .update("HYPERCHAT_TEST_SWARM_")
          .digest();
      },
      get randId() {
        return crypto.randomBytes(32).toString("hex");
      },
    }));
    return state;
  },
  (state) => {
    React.useEffect(() => {
      setTimeout(() => {
        state.start();
      }, 1000);
      return () => state.stop();
    }, [state]);
    useSimpleSyncLocalStorage(state, "publicKey");
    useSimpleSyncLocalStorage(state, "secretKey");
  }
);
