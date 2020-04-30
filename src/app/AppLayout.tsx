import React from "react";
import { LayoutService } from "./LayoutService";
import { observer } from "mobx-react";

export const AppLayout: React.FC = observer(({ children }) => {
  const service = React.useContext(LayoutService);
  return (
    <div className="column filled">
      <div className="main">{children}</div>
      {service.footer && (
        <div className="footer text-center text-small pb-2 pt-3 pl-2 pr-2">
          Serverless Apps |{" "}
          <a className="link" href="https://github.com/makamekm">
            github.com/makamekm
          </a>{" "}
          | in 2020
        </div>
      )}
      <style jsx>{`
        :global(body) {
          max-height: ${service.scrollable ? "unset" : "100vh"};
          overflow-y: ${service.scrollable ? "visible" : "hidden"};
        }
        .column {
          height: 100vh;
          min-height: 100vh;
        }
        .main {
          flex: 1;
        }
      `}</style>
    </div>
  );
});
