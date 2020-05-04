import React from "react";
import ndjson from "ndjson";
import { Transform } from "stream";
import crypto from "crypto";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import swarm from "@geut/discovery-swarm-webrtc";
import { debug } from "~/utils";

const STACK_LENGTH = 100;

export const SwarmService = createService(
  () => {
    const state = useLocalStore(() => ({
      id: null as string,
      swarm: null as any, // No @type
      isLoading: false,
      incomingStream: null as Transform,
      outgoingStream: null as Transform,
      messagesStack: [],
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
      async start() {
        state.isLoading = true;
        state.id = state.randId;
        state.incomingStream = ndjson.parse();
        state.outgoingStream = ndjson.stringify();
        state.incomingStream.on("data", (data) => {
          state.onIncomingStreamData(data);
        });
        debug("send", state.sendData);

        state.swarm = swarm({
          maxPeers: 6,
          bootstrap: ["localhost:4000"],
          // bootstrap: ["https://geut-webrtc-signal.herokuapp.com/"],
          // stream: (info) => state.outgoingStream,
        });
        state.swarm.join(state.topic);
        state.swarm.on("connection", (peer) => {
          console.log("conection", peer);
          // peer.on("stream", (stream) => {
          // Only for Video Track Content
          // });
          peer.pipe(state.incomingStream);
          state.outgoingStream.pipe(peer);
          peer.on("close", () => {
            console.log("disconnect", peer);
            peer.unpipe(state.incomingStream);
            state.outgoingStream.unpipe(peer);
          });
        });
        state.isLoading = false;
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
      state.start();
      return () => state.stop();
    }, [state]);
  }
);
