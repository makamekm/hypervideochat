import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";

export const VideoStream: React.FC<{
  className?: string;
  stream: MediaStream;
  hide?: boolean;
  muted?: boolean;
}> = observer(({ className, stream, hide, muted }) => {
  const element = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (element.current && element.current.srcObject !== stream) {
      element.current.srcObject = stream;
    }
  });
  return (
    <video
      autoPlay
      muted={muted}
      className={classNames(className, { hide })}
      ref={element}
    />
  );
});
