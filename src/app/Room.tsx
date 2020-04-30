import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { RoomService } from "./RoomService";
import { VideoStream } from "./Video";
import { useLayoutConfig } from "./LayoutService";

export const Room: React.FC = observer(() => {
  const service = React.useContext(RoomService);
  const { room } = useParams();
  useLayoutConfig({
    footer: false,
    scrollable: false,
  });
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
      <div className="main-video">
        {service.localStream && <VideoStream stream={service.localStream} />}
      </div>
      <style jsx>{`
        .container {
          height: 100%;
        }
        .main-video {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: stretch;
          align-items: stretch;
        }
        .main-video > :global(*) {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
});
