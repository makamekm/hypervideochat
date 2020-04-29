import React from "react";
import {
  ServiceProviderFactory,
  ServiceProviderHook,
} from "./components/ServiceProvider/ServiceProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutedContent } from "./routing";

import "./app.scss";
import { AppLayout } from "./app/AppLayout";
import { LoadingScreen } from "./components/Loading/LoadingScreen";
import { LoadingService } from "./components/Loading/LoadingService";

const basePath = process.env.BASE_PATH || "/";

export const App = () => {
  const [ServiceProvider] = React.useState<React.FC>(() =>
    ServiceProviderFactory(LoadingService)
  );

  return (
    <ServiceProvider>
      <Router basename={basePath}>
        <ServiceProviderHook>
          <LoadingScreen>
            <AppLayout>
              <RoutedContent />
            </AppLayout>
          </LoadingScreen>
        </ServiceProviderHook>
      </Router>
    </ServiceProvider>
  );
};
