import React from "react";
import classNames from "classnames";

export const VideoStream: React.FC<{
  className?: string;
  stream: MediaStream;
  hide?: boolean;
}> = ({ className, stream, hide }) => {
  const element = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    if (element.current) {
      element.current.srcObject = stream;
    }
  }, [element, stream]);
  return (
    <video autoPlay className={classNames(className, { hide })} ref={element} />
  );
};
