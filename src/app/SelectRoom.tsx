import React from "react";
import { SelectRoomInput } from "~/design-system/select-room-input";
import { observer, useLocalStore } from "mobx-react";
import { EnterRoomButton } from "~/design-system/enter-room-button";

export const SelectRoom: React.FC = observer(() => {
  const state = useLocalStore(() => ({
    value: "",
  }));
  const onOpenRoom = React.useCallback(() => {
    state.value = "";
  }, [state]);
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
      <div className="header">SELECT CHAT</div>
      <div className="column centered">
        <div className="input mt-4">
          <SelectRoomInput
            value={state.value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className="button mt-4">
          <EnterRoomButton onClick={onOpenRoom} onKeyDown={onKeyDown} />
        </div>
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
        }
        .input {
          width: 350px;
        }
        .button {
          width: 350px;
        }
      `}</style>
    </div>
  );
});
