import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "../authStore";
import { useFeedPostsStore } from "./feedPostsStore";
import { useclientDemandeStore } from "../Client/clientDemandeStore";
export const useProviderStore = defineStore("providerStore", {
  id: "provider",
  state: () => ({
    //basic vars
    loading: false,
    errorrProvider: {
      message: "",
      status: false,
    },

    provider: {},
    selecteddProvider: {},
    providers: [],
  }),

  actions: {
    // post a new post
    async sendPost(data) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/profile/add-portfolio-post`,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: data,
          timeout: 13000, // 13 seconds
        });

        this.loading = false;
        this.errorrProvider.status = false;
        this.errorrProvider.message = "";
        return response;
      } catch (error) {
        this.loading = false;
        this.errorrProvider.status = true;
        if (error.response) {
          this.errorrProvider.message = "Server error: please try again later";
        } else if (error.request) {
          this.errorrProvider.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    // response to the notification from the client
    async sendRes(status, notificationId) {
      this.loading = true;
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/client-post/send-response`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            notificationId: notificationId,
            status: status,
          },
          timeout: 13000, // 13 seconds
        });

        this.errorrProvider.status = false;
        this.errorrProvider.message = "";
        this.loading = false;

        return response;
      } catch (error) {
        this.loading = false;
        this.errorrProvider.status = true;
        if (error.response) {
          this.errorrProvider.message = error.response.data.message;
        } else {
          this.errorrProvider.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    // send interest about the client's post
    async sendInterest(clientPostId) {
      useFeedPostsStore().feedPosts.map((post) => {
        if (post.id == clientPostId) {
          post.btnVisible = false;
          post.btnLoading = true;
        }
      });

      try {
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/client-post/send-interest`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            providerId: useAuthStore().$state.userAuth.id,
            clientPostId: clientPostId,
          },
          timeout: 13000, // 13 seconds
        });

        this.res = response.data.result;
        this.errorrProvider.status = false;
        this.errorrProvider.message = "";

        useFeedPostsStore().feedPosts.map((post) => {
          if (post.id == clientPostId) {
            post.btnLoading = false;
          }
        });

        return response;
      } catch (error) {
        this.errorrProvider.status = true;
        if (error.response) {
          this.errorrProvider.message = error.response.data.message;
        } else {
          this.errorrProvider.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    //////////////////////////////Offline Methods //////////////////////////////

    // get provider by it's id
    getProviderById(id) {
      return useclientDemandeStore().$state.providers.find(
        (provider) => provider.id === id
      );
    },

    // get provider type
    getProviderType(notificationId) {
      if (notificationId) { //if the provider have a notification id
        return "interested";
      } else {
        return "responsed";
      }
    },
  },

  persist: [
    {
      key: "providerStore",
      storage: localStorage,
      paths: ["provider", "providers", "selecteddProvider"],
    },
  ],
});
