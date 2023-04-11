import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";
export const useProviderStore = defineStore("providerStore", {
  id: "provider",
  state: () => ({
    loading: false,
    errorrProvider: {
      message: "",
      status: false,
    },
    provider: {},
  }),
  actions: { 
    async getProviderData(providerId) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/get-provider-data`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            providerId: providerId,
          },
          timeout: 13000, // 13 seconds
        });

        this.loading = false;
        this.provider = response.data.result;

        this.errorrProvider.status = false;
        this.errorrProvider.message = "";
        
        return response;
      } catch (error) {
        this.loading = false;
        this.errorrProvider.status = true;
        if (error.response) {
          this.errorrProvider.message = error.response.data.message;
        } else if (error.request) {
          this.errorrProvider.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },
  },
  persist: [
    {
      key: "providerData",
      storage: localStorage,
      paths: ["provider"],
    },
  ],
});
