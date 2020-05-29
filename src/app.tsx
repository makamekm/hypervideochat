import React from "react";
import SpatialNavigation from "react-js-spatial-navigation";
import {
  ServiceProviderFactory,
  ServiceProviderHook,
} from "./components/ServiceProvider/ServiceProvider";
import { HashRouter as Router } from "react-router-dom";
import { RoutedContent } from "./routing";

import { AppLayout } from "./app/AppLayout";
import { LoadingScreen } from "./components/Loading/LoadingScreen";
import { LoadingService } from "./components/Loading/LoadingService";
import { LayoutService } from "./app/LayoutService";
import { YBodyFocusableContainer } from "./components/XFocusable/XFocusable";

const basePath = process.env.BASE_PATH || "/";

export const App = () => {
  const [ServiceProvider] = React.useState<React.FC>(() =>
    ServiceProviderFactory(LoadingService, LayoutService)
  );

  return (
    <ServiceProvider>
      <Router basename={basePath}>
        <ServiceProviderHook>
          <SpatialNavigation>
            <YBodyFocusableContainer>
              <LoadingScreen>
                <AppLayout>
                  <RoutedContent />
                </AppLayout>
              </LoadingScreen>
            </YBodyFocusableContainer>
          </SpatialNavigation>
        </ServiceProviderHook>
      </Router>
    </ServiceProvider>
  );
};
