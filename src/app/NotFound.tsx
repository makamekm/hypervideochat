import React from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router";

export const NotFound: React.FC = observer(() => {
  const history = useHistory();
  const goHome = React.useCallback(() => {
    history.push(`/`);
  }, [history]);
  return (
    <div className="container column centered text-center">
      <div className="header size-large">404</div>
      <div className="header size-small">You can try another route</div>
      <div className="column centered mt-4">
        <div className="text-big link" onClick={goHome}>
          Go Home
        </div>
      </div>
      <style jsx>{`
        .container {
          height: 100%;
        }
      `}</style>
    </div>
  );
});
