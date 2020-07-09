import React from "react";
import { useLocalStore } from "mobx-react";
import { toast } from "react-toastify";
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
      total: 0,
      limit: 8,
      page: 0,
      paginationWrap: 1,
      get skip() {
        return state.limit * state.page;
      },
      get pages() {
        return Math.ceil(state.total / state.limit);
      },
      get pagesArray() {
        const basement: number[] = [];
        const maxPage = state.pages - 1;
        const currentPage = state.page;

        basement.push(0);

        if (currentPage > 1 && basement[basement.length - 1] !== currentPage) {
          basement.push(currentPage);
        }

        if (maxPage > 1 && basement[basement.length - 1] !== maxPage) {
          basement.push(maxPage);
        }

        const pages: number[] = [];

        for (let i = 0; i < basement.length; i++) {
          const element = basement[i];
          for (
            let k = Math.max(element - state.paginationWrap, 0);
            k <= Math.min(element + state.paginationWrap, maxPage);
            k++
          ) {
            if (!pages.includes(k)) {
              pages.push(k);
            }
          }
        }

        for (let i = 0; i < pages.length; i++) {
          if (i !== pages.length - 1) {
            if (
              pages[i + 1] != null &&
              pages[i] != null &&
              pages[i] + 1 !== pages[i + 1]
            ) {
              pages.splice(2, 0, null);
            }
          }
        }

        return pages;
      },
      changePage(page: number) {
        state.page = page;
        state.load();
      },
      async load() {
        state.loadingService.setLoading(true, "dashboard");
        try {
          const responce = await fetch(
            `http://localhost:5000/v1/list?limit=${state.limit}&skip=${state.skip}`
          );
          const json = await responce.json();
          state.total = json.total;
          state.data = json.data.map((l) => {
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
        } catch (error) {
          console.error(error);
          toast("There was an error whilte creating a list", {
            type: "error",
          });
        }
        state.loadingService.setLoading(false, "dashboard");
      },
    }));
    return state;
  },
  (state) => {
    state.loadingService = React.useContext(LoadingService);
  }
);
