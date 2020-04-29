import React from "react";

export const SelectRoom: React.FC = () => {
  return (
    <div className="container column width-fill text-center">
      <div className="header">Hello! Please, select room.</div>
      <div className="mt-3">
        <input />
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
        }
      `}</style>
    </div>
  );
};
