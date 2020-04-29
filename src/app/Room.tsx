import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { RoomService } from "./RoomService";

export const Room: React.FC = observer(() => {
  const service = React.useContext(RoomService);
  const { room } = useParams();
  React.useEffect(() => {
    service.room = room;
    service.run();
    return () => {
      service.room = null;
      service.stop();
    };
  }, [service, room]);
  return (
    <div className="container column centered text-center">
      <div className="header">Chat</div>
      <style jsx>{`
        .container {
          height: 100%;
        }
      `}</style>
    </div>
  );
});
