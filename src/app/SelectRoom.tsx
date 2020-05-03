import React from "react";
import { SelectRoomInput } from "~/design-system/select-room-input";
import { observer, useLocalStore } from "mobx-react";
import { EnterRoomButton } from "~/design-system/enter-room-button";
import { useHistory } from "react-router";
import { Logo } from "~/design-system/logo";
import { useLayoutConfig } from "./LayoutService";

export const SelectRoom: React.FC = observer(() => {
  useLayoutConfig({});
  const history = useHistory();
  const state = useLocalStore(() => ({
    value: "",
  }));
  const onOpenRoom = React.useCallback(() => {
    if (state.value) {
      history.push(`/room/${state.value}`);
      state.value = "";
    }
  }, [history, state]);
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      state.value = e.currentTarget.value;
    },
    [state]
  );
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        onOpenRoom();
      }
    },
    [onOpenRoom]
  );
  return (
    <div className="container column centered text-center pt-4">
      <div className="logo">
        <Logo />
      </div>

      <div className="header mt-3">
        <div className="row started">
          <div className="text-small">JUST A</div>
          <div>VIDEO CHAT</div>
        </div>
      </div>
      <div className="text-medium">... no servers, no spies ...</div>
      <div className="column centered">
        <div className="limit-width mt-4">
          <SelectRoomInput
            value={state.value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className="limit-width mt-4">
          <EnterRoomButton onClick={onOpenRoom} onKeyDown={onKeyDown} />
        </div>
        <div className="text-small limit-width-alt text-transparent mt-4">
          <p>
            We don't use servers, so we don't collect any data. All your
            messages and video & voice stream will be directly passed to your
            interlocutor.
          </p>
          <p>
            This application also does not use cookies, but to collect messages
            and calls it uses local storage built in your browser.
          </p>
        </div>
      </div>
      <style jsx>{`
        .container {
          min-height: 100%;
        }
        .logo {
          width: 80px;
          height: 80px;
        }
        .limit-width {
          width: 350px;
          max-width: calc(100vw - 40px);
        }
        .limit-width-alt {
          width: 400px;
          max-width: calc(100vw - 40px);
        }
      `}</style>
    </div>
  );
});
