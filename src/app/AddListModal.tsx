import React from "react";
import { observer, useLocalStore } from "mobx-react";
import { useKeyPress } from "~/hooks";
import { Modal } from "~/components/Modal/Modal";
import { Button } from "~/components/Button/Button";
import { LoadingService } from "~/components/Loading/LoadingService";
import { ListService } from "./ListService";

const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 1.4L12.6 0L7 5.6L1.4 0L0 1.4L5.6 7L0 12.6L1.4 14L7 8.4L12.6 14L14 12.6L8.4 7L14 1.4Z"
      fill="currentColor"
      fillOpacity="0.87"
    />
  </svg>
);

const AddListModalContent: React.FC<{
  close: () => void;
}> = observer(({ close }) => {
  const loadingService = React.useContext(LoadingService);
  const listService = React.useContext(ListService);
  const state = useLocalStore(() => ({
    name: "",
    urls: [""],
    send: async () => {
      loadingService.setLoading(true, "dashboard");
      await fetch("http://localhost:5000/v1/add", {
        method: "POST",
        body: JSON.stringify({
          name: state.name,
          urls: state.urls,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      close();
      listService.load();
      loadingService.setLoading(false, "dashboard");
    },
    add: () => {
      state.urls.push("");
    },
    clear: () => {
      state.name = "";
      (state.urls as any).replace([""]);
    },
  }));
  useKeyPress("Escape", () => {
    close();
  });
  return (
    <div className="window rounded-lg shadow-md bg-white flex flex-col items-center pb-8">
      <div className="w-full flex items-center justify-end px-3 py-3">
        <Button onClickEnter={close}>
          <CloseIcon />
        </Button>
      </div>
      <div className="text-2xl -mt-6 font-medium">New Upload List</div>
      <div className="text-lg flex items-center justify-center mt-6 px-2 w-8/12">
        <div className="relative w-full">
          <input
            placeholder=" "
            className="input border-gray-400 border-2 bg-gray-100 appearance-none w-full px-4 py-3 pt-5 pb-2 focus focus:border-orange-500 focus:outline-none active:outline-none active:border-orange-500"
            type="text"
            onChange={(e) => {
              state.name = e.currentTarget.value;
            }}
            value={state.name || ""}
          />
          <label className="label absolute mb-0 -mt-2 pt-4 pl-4 leading-tighter text-gray-600 text-base cursor-text">
            List Name
          </label>
        </div>
      </div>
      <div className="w-8/12">
        <div className="table-overflow w-full px-2 flex flex-col items-center justify-start py-4">
          {state.urls.map((value, index) => (
            <div className="relative w-full mt-2" key={index}>
              <input
                placeholder=" "
                className="input border-gray-400 border-2 bg-gray-100 appearance-none w-full px-4 py-3 pt-5 pb-2 focus focus:border-orange-500 focus:outline-none active:outline-none active:border-orange-500"
                type="text"
                onChange={(e) => {
                  state.urls[index] = e.currentTarget.value;
                }}
                value={value || ""}
              />
              <label className="label absolute mb-0 -mt-2 pt-4 pl-4 leading-tighter text-gray-600 text-base cursor-text">
                URL
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="text-lg w-8/12 flex items-center justify-between mt-2 px-2">
        <div>
          <Button className="text-orange-500" onClickEnter={state.add}>
            + ADD MORE INPUTS
          </Button>
        </div>
        <div>
          <Button className="text-gray-900" onClickEnter={state.clear}>
            Clear all
          </Button>
        </div>
      </div>
      <div className="text-lg w-8/12 mt-4 px-2">
        <Button
          className="text-white w-full bg-orange-500 rounded-full"
          onClickEnter={state.send}
        >
          SUBMIT
        </Button>
      </div>
      <style jsx>{`
        .window {
          min-width: 30vw;
        }

        .table-overflow {
          max-height: 20vw;
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
});

export const AddListModal: React.FC<{
  className?: string;
  children?: (props: {
    open: () => void;
    close: () => void;
    isOpen: boolean;
  }) => JSX.Element;
}> = observer(({ children, className }) => {
  return (
    <Modal
      className={className}
      focusEl=".close"
      content={({ close }) => <AddListModalContent close={close} />}
    >
      {children}
    </Modal>
  );
});
