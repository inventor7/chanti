import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import  axios  from 'axios'
export const useSearchStore = defineStore("searchStore", {
  id: "search",
  state: () => ({
    searchInput: "",
    searchResults: [],
    searchPageVisibility: false,
    isClicked: false,
    pageNumber: 1,
    loading: false,
    error: {
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
          `https://chanti-dz-backend.herokuapp.com/search/${this.searchInput}/${this.pageNumber}/${useUserStore().user.language}`,
          { timeout: 15000 }
        );
        if (response.status !== 200) {
          throw new Error("An error has occurred, please refresh the page");
        }
        if(response.data.result)this.searchResults = response.data.result;
        this.loading = false;
        this.error.status = false;
      } catch (err) {
        this.loading = false;
        this.error.status = true;
        if (err.code === "ECONNABORTED") {
            // timeout
          this.error.message = "Check your internet connection and try again";
        } else if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
          this.error.message = `HTTP error: ${err.response.status}`;
        } else if (err.message.startsWith("Data error")) {
            // The request was made but no response was received
          this.error.message = err.message;
        } else {
            // Something happened in setting up the request that triggered an Error
          this.error.message ="Network error: please check your internet connection";
        }
      }
    },
  },
});
