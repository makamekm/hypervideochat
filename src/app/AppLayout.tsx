import React from "react";

export const AppLayout: React.FC = ({ children }) => {
  return (
    <div className="column filled">
      <div className="main">{children}</div>
      <div className="footer text-center text-small pb-3 pt-3 pl-2 pr-2">
        P2P technologies by{" "}
        <a className="link" href="https://github.com/makamekm">
          github.com/makamekm
        </a>
      </div>
      <style jsx>{`
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
};
