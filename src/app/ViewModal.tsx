import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { useKeyPress } from "~/hooks";
import { Modal } from "~/components/Modal/Modal";
import { Button } from "~/components/Button/Button";
import { IList } from "./dto.interface";

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

const ViewModalContent: React.FC<{
  close: () => void;
  data: IList;
}> = ({ data, close }) => {
  useKeyPress("Escape", () => {
    close();
  });
  return (
    <div className="window rounded-lg shadow-md bg-white flex flex-col items-center pb-6">
      <div className="w-full flex items-center justify-end px-3 py-3">
        <Button onClickEnter={close}>
          <CloseIcon />
        </Button>
      </div>
      <div className="text-2xl -mt-6 font-medium">{data.name}</div>
      <div className="text-lg w-full flex items-center justify-center mt-2">
        <div className="text-gray-700 px-3">Date</div>
        <div className="text-gray-900 px-3 font-medium -ml-2">
          {moment(data.date).format("YYYY-MM-DD")}
        </div>
        <div className="text-gray-700 px-3">Num Contact</div>
        <div className="text-gray-900 px-3 font-medium -ml-2">
          {data.contacts.length}
        </div>
      </div>
      <div className="w-full px-4 mt-2">
        <div className="table-overflow">
          <table className="w-full">
            <tbody>
              <tr>
                <th className="font-medium text-left px-8 py-4">Domain</th>
                <th className="font-medium text-left px-8 py-4">
                  Email Address
                </th>
                <th className="font-medium text-right px-8 py-4">First Name</th>
                <th className="font-medium text-right px-8 py-4">Last Name</th>
                <th className="font-medium text-right px-8 py-4">Confidence</th>
              </tr>
              {data.contacts.map((contact) => {
                return (
                  <tr
                    className="table-row-alt border-gray-300"
                    key={contact.id}
                  >
                    <td className="text-left px-8 py-4">{contact.domain}</td>
                    <td className="text-left px-8 py-4">{contact.email}</td>
                    <td className="text-right px-8 py-4">
                      {contact.firstName}
                    </td>
                    <td className="text-right px-8 py-4">{contact.lastName}</td>
                    <td className="text-right px-8 py-4">
                      {Number(contact.confidence).toFixed(0)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        .window {
          min-width: 40vw;
        }

        .table-overflow {
          max-height: 20vw;
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export const ViewModal: React.FC<{
  className?: string;
  children?: (props: {
    open: () => void;
    close: () => void;
    isOpen: boolean;
  }) => JSX.Element;
  data: IList;
}> = observer(({ data, children, className }) => {
  return (
    <Modal
      className={className}
      focusEl=".close"
      content={({ close }) => <ViewModalContent close={close} data={data} />}
    >
      {children}
    </Modal>
  );
});
