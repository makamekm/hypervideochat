import React from "react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import { isEqual } from "underscore";

const defaultState = {
  footer: true,
  scrollable: true,
};

export interface LayoutConfig {
  footer?: boolean;
  scrollable?: boolean;
}

export const LayoutService = createService(() => {
  const state = useLocalStore(() => ({
    ...defaultState,
    change: (config: LayoutConfig) => {
      const newObj = {
        ...defaultState,
        ...config,
      };
      for (const key in newObj) {
        state[key] = newObj[key];
      }
    },
  }));
  return state;
});

export const useLayoutConfig = (config: LayoutConfig) => {
  const service = React.useContext(LayoutService);
  const [storage] = React.useState(() => ({
    config: null,
  }));
  React.useEffect(() => {
    const areObjsDifferent =
      storage.config == null || isEqual(config, storage.config);
    if (areObjsDifferent) {
      storage.config = config;
      service.change(config);
    }
  }, [service, config, storage]);
};
