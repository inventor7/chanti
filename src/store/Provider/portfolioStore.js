import { defineStore } from "pinia";
import axios from "axios";
import { useProviderStore } from "./providerStore";
import { useAuthStore } from "../authStore";
export const usePortfolioStore = defineStore("portfolioStore", {
  state: () => ({
    //basic vars
    loadingPortfolio: false,
    errorPortfolio: {
      message: "",
      status: false,
    },

    //portfolio posts
    portfolioPosts: [],
  }),
  actions: {
    async getProviderPortfolio(provider) {
      useProviderStore().$state.provider = {};
      this.portfolioPosts = [];
      try {
        this.loadingPortfolio = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/profile/get-provider-data`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            providerId: provider.id,
          },
          timeout: 17000, // 13 seconds
        });

        useProviderStore().$state.provider = response.data.result.provider;
        useProviderStore().$state.provider.category = response.data.result.category;
        useProviderStore().$state.provider.subcategories = response.data.result.subcategories;

         if(response.data.result.portfolioPostsWithImages){
          this.portfolioPosts = response.data.result.portfolioPostsWithImages;
        }else{
          this.portfolioPosts = [];
        }

        this.loadingPortfolio = false;
        this.errorPortfolio.status = false;
        this.errorPortfolio.message = "";

        return response;
      } catch (error) {
        this.loadingPortfolio = false;
        this.errorPortfolio.status = true;
        if (error.response) {
          this.errorPortfolio.message = "Server error: please try again later";
        } else {
          this.errorPortfolio.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },
  },
  persist: [
    {
      key: "portfolioStore",
      storage: localStorage,
      paths: ["portfolioPosts"],
    },
  ],
});
