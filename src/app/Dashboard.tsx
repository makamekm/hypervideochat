import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { useLayoutConfig } from "./LayoutService";
import { ViewModal } from "./ViewModal";
import { ListService } from "./ListService";

export const Dashboard = observer(() => {
  const state = React.useContext(ListService);

  useLayoutConfig({});
  React.useEffect(() => {
    state.load();
  }, [state]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="w-4/6">
        <div className="text-4xl">View List History</div>
        <div className="text-sm text-gray-600 mt-1">112 results</div>
        <div className="mt-6 bg-white rounded-md w-full flex flex-col items-center justify-center shadow-2xl">
          <table className="w-full">
            <tbody>
              <tr>
                <th className="font-medium text-left px-8 py-4 w-4/6">
                  List Name
                </th>
                <th className="font-medium text-left px-8 py-4">Date</th>
                <th className="font-medium text-right px-8 py-4">
                  Num Contacts
                </th>
              </tr>
              {state.data.map((list) => {
                return (
                  <ViewModal key={list.id} data={list}>
                    {({ open }) => (
                      <tr className="table-row border-gray-300" onClick={open}>
                        <td className="text-left px-8 py-4 w-4/6">
                          {list.name}
                        </td>
                        <td className="text-left px-8 py-4">
                          {moment(list.date).format("YYYY-MM-DD")}
                        </td>
                        <td className="text-right px-8 py-4">
                          {list.contacts.length}
                        </td>
                      </tr>
                    )}
                  </ViewModal>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
