import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { useclientDemandeStore } from '../store/Client/clientDemandeStore'

export const useSearchStore = defineStore("searchStore", {
  id: "search",
  state: () => ({

    searchInput: "",
    searchResults: [],
    searchPageVisibility: false,
    isClicked: false,
    pageNumber: 1,
    loading: false,
    errorSearch: {
      status: false,
      message: "",
    },
  }),
  actions: {
    // fetch the results from the server with axios
    async fetchSearchResults() {
      this.loading = true;
      try {
        const response = await axios.get(
          `${useAuthStore().baseUrl}/search/${this.searchInput}/${
            this.pageNumber
          }/${useUserStore().user.language}`,
          { timeout: 15000 }
        );
        if (response.status !== 200) {
          throw new Error("An error has occurred, please refresh the page");
        }
        if (response.data.result) this.searchResults = response.data.result;
        this.loading = false;
        this.error.status = false;
      } catch (error) {
        this.loading = false;
        if (error.response) {
          this.errorSearch.message = error.response.data.message;
        } else if (error.request) {
          this.error.status = true;
          this.errorSearch.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },
  },
});
