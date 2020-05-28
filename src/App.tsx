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
            <LoadingScreen>
              <AppLayout>
                <RoutedContent />
              </AppLayout>
            </LoadingScreen>
          </SpatialNavigation>
        </ServiceProviderHook>
      </Router>
    </ServiceProvider>
  );
};
