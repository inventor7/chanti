import { defineStore } from "pinia";
import { useAuthStore } from "../authStore";
import { useProviderStore } from "../Provider/providerStore";
import { useclientDemandeStore } from "./clientDemandeStore";
import axios from "../../composables/axios";
export const useClientStore = defineStore("clientStore", {
  id: "client",
  state: () => ({
    loadingPosting: false,
    errorPosting: {
      message: "",
      status: false,
    },

    client: {},
    clients: [],

    loadingRequesting: false,
    errorRequesting: {
      message: "",
      status: false,
    },


    isSent: false,
    isSentAll: false,

    btnVisibleAll: false,
    btnLoadingAll: false,

  }),

  actions: {
    // Get all providers by sending the client demand request to the server
    async postRequest(data) {
      try {
        this.loadingPosting = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/client-post/save`,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: data,
          timeout: 13000, // 13 seconds
        });

        if (response.data.status == 200) {
          //so the signup/login page know where to redirect after login
          this.requestinProgress = false;
        }
        this.loadingPosting = false;
        this.errorPosting.status = false;
        this.errorPosting.message = "";

        //get the client post to the clientDemande store
        useclientDemandeStore().clientPostId =
          response.data.result.clientPostId;

        //get all providers to the provider store
        useProviderStore().providers = response.data.result.providers;
        this.btnVisibleAll = true;

        // Add "isvisible" attribute to each provider object
        useProviderStore().providers.forEach((provider) => {
          provider.btnVisible = true;
          provider.btnLoading = false;
        });

        return response;
      } catch (error) {
        this.loadingPosting = false;
        this.errorPosting.status = true;
        if (error.response) {
          this.errorPosting.message = "Server error: please try again later";
        } else {
          this.errorPosting.message =
            "Network error: please check your internet connection and  try again ! ";
        }
      }
    },

    async sendRequest(providerId, clientPostId) {
      try {
        if (providerId === "all") {
          this.btnLoadingAll = true;
        } else {
          this.loadingRequesting = true;
        }
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/client-post/send-request`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            providerId: providerId,
            clientPostId: clientPostId,
          },
          timeout: 13000, // 13 seconds
        });

        this.loadingRequesting = false;
        this.btnLoadingAll = false;

        if (providerId === "all") {
          this.isSentAll = true;
          this.isSent = false;
        } else {
          this.isSentAll = false;
          this.isSent = true;
        }

        this.errorRequesting.status = false;
        this.errorRequesting.message = "";

        return response;
      } catch (error) {
        this.loadingRequesting = false;
        this.errorRequesting.status = true;
        if (error.response) {
          this.errorRequesting.message = error.response.data.message;
        } else {
          this.errorRequesting.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },
  },
  persist: [
    {
      key: "clientStore",
      storage: localStorage,
      paths: ["client", "clients", "isSent", "isSentAll", "btnVisibleAll"],
    },
  ],
});
