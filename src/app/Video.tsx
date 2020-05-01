import React from "react";
import Visibility from "visibilityjs";
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

  React.useEffect(() => {
    const fn = Visibility.every(1000, async () => {
      if (element.current && element.current.paused && stream) {
        element.current.srcObject = stream;
        try {
          await element.current.play();
        } catch (e) {
          console.error(e);
        }
      }
    });
    return () => {
      Visibility.stop(fn);
    };
  }, [element, stream]);
  return (
    <video
      autoPlay
      playsInline
      muted={muted}
      className={classNames(className, { hide })}
      ref={element}
    />
  );
});
