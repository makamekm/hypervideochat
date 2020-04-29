import React from "react";
import { SelectRoomInput } from "~/design-system/select-room-input";

export const SelectRoom: React.FC = () => {
  return (
    <div className="container column width-fill text-center">
      <div className="header">SELECT CHAT</div>
      <div className="mt-4 row centered">
        <div className="input">
          <SelectRoomInput />
        </div>
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
        }
        .input {
          width: 350px;
        }
      `}</style>
    </div>
  );
};
