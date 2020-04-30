import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";

export const VideoStream: React.FC<{
  className?: string;
  stream: MediaStream;
  hide?: boolean;
}> = observer(({ className, stream, hide }) => {
  const element = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (element.current) {
      element.current.srcObject = stream;
      // element.current.play();
    }
  });
  return (
    <video autoPlay className={classNames(className, { hide })} ref={element} />
  );
});
