import React from "react";
import moment from "moment";
import classNames from "classnames";
import { observer } from "mobx-react";
import { useLayoutConfig } from "./LayoutService";
import { ViewModal } from "./ViewModal";
import { ListService } from "./ListService";
import { EmptyIcon } from "./EmptyIcon";
import { Button } from "~/components/Button/Button";

export const Dashboard = observer(() => {
  const state = React.useContext(ListService);
  useLayoutConfig({});
  React.useEffect(() => {
    state.page = 0;
    state.load();
  }, [state]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="w-4/6">
        <div className="text-4xl">View List History</div>
        <div className="text-sm text-gray-600 mt-1">
          {state.total} result{state.total !== 1 && "s"}
        </div>
        <div className="mt-6 bg-white rounded-md w-full flex flex-col items-center justify-center shadow-2xl">
          {state.data && state.data.length > 0 ? (
            <table className="w-full">
              <tbody>
                <tr>
                  <th className="font-medium text-left px-8 py-4 w-4/6">
                    List Name
                  </th>
                  <th className="font-medium text-left px-8 py-4 whitespace-no-wrap">
                    Date
                  </th>
                  <th className="font-medium text-right px-8 py-4 whitespace-no-wrap">
                    Num Contacts
                  </th>
                </tr>
                {state.data.map((list) => {
                  return (
                    <ViewModal key={list.id} data={list}>
                      {({ open }) => (
                        <tr
                          className="table-row border-gray-300"
                          onClick={open}
                        >
                          <td className="text-left px-8 py-4 w-4/6">
                            {list.name}
                          </td>
                          <td className="text-left px-8 py-4 whitespace-no-wrap">
                            {moment(list.date).format("YYYY-MM-DD")}
                          </td>
                          <td className="text-right px-8 py-4 whitespace-no-wrap">
                            {list.contacts.length}
                          </td>
                        </tr>
                      )}
                    </ViewModal>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-20 flex flex-col items-center justify-center">
              <EmptyIcon />
              <div className="mt-4 text-lg">There are no List Names</div>
            </div>
          )}
        </div>

        {state.total > 0 && state.pages > 1 && (
          <div className="flex flex-row items-center justify-center mt-8">
            {state.pagesArray.map((value, index) => (
              <Button
                className={classNames("bg-white mx-1", {
                  "pointer-events-none": value == null || state.page === value,
                  "text-gray-800": state.page !== value,
                  "text-orange-500": state.page === value,
                })}
                key={value == null ? index + "_" : value}
                onClickEnter={() => state.changePage(value)}
              >
                {value == null ? "..." : value + 1}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
