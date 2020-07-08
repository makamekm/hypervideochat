import React from "react";
import { ToastContainer } from "react-toastify";
import { LayoutService } from "./LayoutService";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { Button } from "~/components/Button/Button";
// import { SHOW_FULLSCREEN } from "@env/config";

export const AppLayout: React.FC = observer(({ children }) => {
  const history = useHistory();
  const service = React.useContext(LayoutService);
  const scrollable = service.scrollable && service.nonScrollableStack === 0;
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="min-h-screen">
        <div className="lg:flex">
          {/* {service.sidebar && <SideMenu />} */}
          <div className="relative flex-1 flex flex-col min-h-screen">
            <div className="flex-1 flex flex-col">
              {!service.empty && (
                <div className="flex items-center justify-between px-6 py-3">
                  <div>
                    <Button
                      className="-mx-4"
                      onClickEnter={() => {
                        history.push("/");
                      }}
                    >
                      Dashboard
                    </Button>
                  </div>
                </div>
              )}
              {/* {service.topbar && <TopMenu />} */}
              {children}
            </div>
            {!service.empty && (
              <div className="text-gray-600 dark-mode:text-gray-300 text-center text-xs pb-2 pt-5 mx-auto no-print">
                #MaximKarpovApps |{" "}
                <a className="link" href="https://github.com/makamekm">
                  github.com/makamekm
                </a>{" "}
                | in 2020{" "}
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          :global(body) {
            max-height: ${scrollable ? "unset" : "100vh"};
            overflow-y: ${scrollable ? "visible" : "hidden"};
          }
        `}</style>
      </div>
    </>
  );
});
