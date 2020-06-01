import React from "react";
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
import { FavoriteService } from "./app/FavoriteService";
import { ProgressService } from "./app/ProgressService";
import { FocusableRoot } from "./components/SpatialNavigation/SpatialNavigation";

const basePath = process.env.BASE_PATH || "/";

export const App = () => {
  const [ServiceProvider] = React.useState<React.FC>(() =>
    ServiceProviderFactory(
      LoadingService,
      LayoutService,
      FavoriteService,
      ProgressService
    )
  );

  return (
    <ServiceProvider>
      <Router basename={basePath}>
        <ServiceProviderHook>
          <FocusableRoot>
            <YBodyFocusableContainer>
              <LoadingScreen>
                <AppLayout>
                  <RoutedContent />
                </AppLayout>
              </LoadingScreen>
            </YBodyFocusableContainer>
          </FocusableRoot>
        </ServiceProviderHook>
      </Router>
    </ServiceProvider>
  );
};
