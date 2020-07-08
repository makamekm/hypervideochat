import React from "react";
// import { useHistory } from "react-router";
import { observer, useLocalStore } from "mobx-react";
import { useLayoutConfig } from "./LayoutService";
import { LoadingService } from "~/components/Loading/LoadingService";
// import { PROXY } from "@env/config";

export const Dashboard = observer(() => {
  const loadingService = React.useContext(LoadingService);
  // const history = useHistory();
  const state = useLocalStore(() => ({
    async load() {
      loadingService.setLoading(true, "dashboard");
      // Loading
      loadingService.setLoading(false, "dashboard");
    },
  }));
  useLayoutConfig({});
  React.useEffect(() => {
    state.load();
  }, [state]);
  return (
    <div className="flex flex-1 flex-col items-start justify-start px-6">
      Hello World!
    </div>
  );
});
