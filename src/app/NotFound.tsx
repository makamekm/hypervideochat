import React from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { Logo } from "~/design-system/logo";
import { Logo404 } from "~/design-system/logo404";

export const NotFound: React.FC = observer(() => {
  const history = useHistory();
  const goHome = React.useCallback(() => {
    history.push(`/`);
  }, [history]);
  return (
    <div className="container column centered text-center">
      <div className="logo">
        <Logo404 />
      </div>
      <div className="header size-large mt-3">404</div>
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
        .logo {
          width: 80px;
          height: 80px;
        }
      `}</style>
    </div>
  );
});
