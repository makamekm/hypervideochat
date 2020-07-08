import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import {
  LoadingService,
  LoadingStore,
} from "~/components/Loading/LoadingService";
import { IList } from "./dto.interface";

export const ListService = createService(
  () => {
    const state = useLocalStore(() => ({
      loadingService: null as LoadingStore,
      data: [] as IList[],
      async load() {
        state.loadingService.setLoading(true, "dashboard");
        const data = await fetch("http://localhost:5000/v1/list");
        state.data = (await data.json()).map((l) => {
          const list = {
            id: l.id,
            name: l.name,
            date: l.uploadTime,
            contacts: l.domains.reduce((arr, d) => {
              d.contacts.forEach((c) => {
                arr.push({
                  id: c.id,
                  domain: d.name,
                  email: c.email,
                  firstName: c.firstName,
                  lastName: c.lastName,
                  confidence: c.confidence,
                });
              });
              return arr;
            }, []),
          };
          return list;
        });
        state.loadingService.setLoading(false, "dashboard");
      },
    }));
    return state;
  },
  (state) => {
    state.loadingService = React.useContext(LoadingService);
  }
);
