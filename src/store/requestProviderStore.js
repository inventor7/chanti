import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { useUserStore } from "./userStore";
export const userequestProviderStore = defineStore("requestProviderStore", {
  id: "requestProvider",
  state: () => ({
    loading: false,
    errorrequestProvider: {
      message: "",
      status: false,
    },
    clientRequestProvider: {},
    isSent: false,
   
  }),
  actions: { 
    async sendRequest(providerId, clientPostId) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/client-post/send-request`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            providerId: providerId,
            clientPostId: clientPostId,
          },
          timeout: 13000, // 13 seconds
        });

        this.loading = false;
        this.isSent = true;
        this.clientRequestProvider = response.data.result;

        this.errorrequestProvider.status = false;
        this.errorrequestProvider.message = "";
        
        return response;
      } catch (error) {
        this.loading = false;
        this.errorrequestProvider.status = true;
        if (error.response) {
          this.errorrequestProvider.message = error.response.data.message;
        } else if (error.request) {
          this.errorrequestProvider.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorrequestProvider.message="Network error: please check your internet connection and try again"
        }
      }
    },
  },
  persist: [
    {
      key: "providerRequest",
      storage: localStorage,
      paths: ["clientRequestProvider", "isSent"],
    },
  ],
});
