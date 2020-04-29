import React from "react";
import { SelectRoomInput } from "~/design-system/select-room-input";
import { observer, useLocalStore } from "mobx-react";
import { EnterRoomButton } from "~/design-system/enter-room-button";
import { useHistory } from "react-router";
import { Logo } from "~/design-system/logo";

export const SelectRoom: React.FC = observer(() => {
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
    <div className="container column centered text-center">
      <div className="logo">
        <Logo />
      </div>
      <div className="header mt-3">VIDEO CHAT</div>
      <div className="text-medium">... everithing is on your devices ...</div>
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
      </div>
      <style jsx>{`
        .container {
          height: 100%;
        }
        .logo {
          width: 80px;
          height: 80px;
        }
        .limit-width {
          width: 350px;
          max-width: calc(100vw - 40px);
        }
      `}</style>
    </div>
  );
});
