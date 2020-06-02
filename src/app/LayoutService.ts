import React from "react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import { isEqual } from "lodash";
import { focusFocusable } from "~/components/SpatialNavigation/SpatialNavigation";

const defaultState = {
  empty: false,
  scrollable: true,
};

export interface LayoutConfig {
  empty?: boolean;
  scrollable?: boolean;
  nonScrollableStack?: number;
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
}

function openFullscreen() {
  if (document.body.requestFullscreen) {
    document.body.requestFullscreen();
  } else if ((document.body as any).mozRequestFullScreen) {
    (document.body as any).mozRequestFullScreen();
  } else if ((document.body as any).webkitRequestFullscreen) {
    (document.body as any).webkitRequestFullscreen();
  } else if ((document.body as any).msRequestFullscreen) {
    (document.body as any).msRequestFullscreen();
  }
}

export const LayoutService = createService(
  () => {
    const state = useLocalStore(() => ({
      nonScrollableStack: 0,
      ...defaultState,
      isFullscreen: false,
      checkFullscreen: () => {
        const isInFullScreen =
          (document.fullscreenElement && document.fullscreenElement !== null) ||
          ((document as any).webkitFullscreenElement &&
            (document as any).webkitFullscreenElement !== null) ||
          ((document as any).mozFullScreenElement &&
            (document as any).mozFullScreenElement !== null) ||
          ((document as any).msFullscreenElement &&
            (document as any).msFullscreenElement !== null);

        console.log("dffdg", isInFullScreen);
        state.isFullscreen = !!isInFullScreen;
      },
      toggleFullScreen: () => {
        if (!state.isFullscreen) {
          openFullscreen();
        } else {
          closeFullscreen();
        }
      },
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
  },
  (state) => {
    document.addEventListener("webkitfullscreenchange", state.checkFullscreen);
    document.addEventListener("mozfullscreenchange", state.checkFullscreen);
    document.addEventListener("fullscreenchange", state.checkFullscreen);
    React.useEffect(state.checkFullscreen, [state]);
  }
);

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
  React.useEffect(() => {
    focusFocusable();
  }, []);
};
