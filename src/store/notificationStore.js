import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useNotificationStore = defineStore("notificationStore", {
  id: "notification",
  state: () => ({
    readNotifications: [],
    notReadNotifications: [],
    notificationPageVisibility: false,
    notificationsNumber: 2,

    loading: false,
    errorNotification: {
      status: false,
      message: "",
    },
  }),
  actions: {
    // fetch the results from the server with axios
    async getProviderNotification(providerId) {
      this.loading = true;
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/notifications/requests-to-provider`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            "providerId": providerId,
          },
          timeout: 13000, // 13 seconds
        });

        this.loading = false;
        this.readNotifications = response.data.result.readNotifications;
        this.notReadNotifications = response.data.result.notReadNotifications;
        this.errorNotification.status = false;
        this.errorNotification.message = "";

        return response;

      } catch (error) {
        this.loading = false;
        this.errorNotification.status = true;
        if (error.response) {
            this.errorNotification.message = error.response.data.message;
        } else if (error.request) {
            this.errorNotification.message ="Network error: please check your internet connection and try again";
        } else {
            this.errorNotification.message ="Network error: please check your internet connection and try again";
        }
      }
    },

    async getClientNotification(clientId) {
      this.loading = true;
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/notifications/response-to-client/`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            "clientId": clientId,
          },
          timeout: 13000, // 13 seconds
        });

        this.loading = false;
        this.readNotifications = response.data.result.readNotifications;
        this.notReadNotifications = response.data.result.notReadNotifications;
        this.errorNotification.status = false;
        this.errorNotification.message = "";

        return response;

      } catch (error) {
        this.loading = false;
        this.errorNotification.status = true;
        if (error.response) {
            this.errorNotification.message = error.response.data.message;
        } else if (error.request) {
            this.errorNotification.message ="Network error: please check your internet connection and try again";
        } else {
            this.errorNotification.message ="Network error: please check your internet connection and try again";
        }
      }
    },
    //getters


    async getProviderNotificationNumber(providerId) {
        this.loading = true;
        try {
          this.loading = true;
          const response = await axios({
            method: "post",
            url: `${useAuthStore().baseUrl}/notifications/requests-to-provider-number`,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${useAuthStore().$state.token}`,
            },
            data: {
              "providerId": providerId,
            },
            timeout: 13000, // 13 seconds
          });
  
          this.loading = false;
          this.notificationsNumber = response.data.result;
          this.errorNotification.status = false;
          this.errorNotification.message = "";
  
          return response;
          
        } catch (error) {
          this.loading = false;
          this.errorNotification.status = true;
          if (error.response) {
              this.errorNotification.message = error.response.data.message;
          } else if (error.request) {
              this.errorNotification.message ="Network error: please check your internet connection and try again";
          } else {
              this.errorNotification.message ="Network error: please check your internet connection and try again";
          }
        }
      },


      async getClientNotificationNumber(clientId) {
        this.loading = true;
        try {
          this.loading = true;
          const response = await axios({
            method: "post",
            url: `${useAuthStore().baseUrl}/notifications/response-to-client-number`,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${useAuthStore().$state.token}`,
            },
            data: {
              "clientId": clientId,
            },
            timeout: 13000, // 13 seconds
          });
  
          this.loading = false;
          this.notificationsNumber = response.data.result;
          this.errorNotification.status = false;
          this.errorNotification.message = "";
  
          return response;
          
        } catch (error) {
          this.loading = false;
          this.errorNotification.status = true;
          if (error.response) {
              this.errorNotification.message = error.response.data.message;
          } else if (error.request) {
              this.errorNotification.message ="Network error: please check your internet connection and try again";
          } else {
              this.errorNotification.message ="Network error: please check your internet connection and try again";
          }
        }
      },
  },
  persist: [
    {
      key: "notificationStore",
      storage: localStorage,
      paths: [
        "notifications",
        "notificationsNumber",
        "readNotifications",
        "notReadNotifications",
      ],
    },
  ],
});
