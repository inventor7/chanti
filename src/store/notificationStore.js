import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import axios from "../composables/axios";
import { useAuthStore } from "./authStore";

export const useNotificationStore = defineStore("notificationStore", {
  id: "notification",
  state: () => ({
    allNotifications: [],
    readNotifications: [],
    notReadNotifications: [],
    notificationPageVisibility: false,
    notificationsNumber: 0,

    loading: false,
    errorNotification: {
      status: false,
      message: "",
    },
  }),
  actions: {
    // fetch the results from the server with axios
    async getProviderNotification(providerId) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/notifications/requests-to-provider`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            providerId: providerId,
          },
          timeout: 13000, // 13 seconds
        });

        this.loading = false;
        if (response.data.message == "No notifications") {
          this.readNotifications = [];
          this.notReadNotifications = [];
        } else {
          this.readNotifications = response.data.result.readNotifications;
          this.notReadNotifications = response.data.result.notReadNotifications;
          //contact the read notifications and not read notifications to get all notifications
          this.allNotifications = this.readNotifications.providerResponse
            .concat(this.readNotifications.providerInterest)
            .concat(
              this.notReadNotifications.providerResponse.concat(
                this.notReadNotifications.providerInterest
              )
            );
        }

        this.errorNotification.status = false;
        this.errorNotification.message = "";

        return response;
      } catch (error) {
        this.loading = false;
        this.errorNotification.status = true;
        if (error.response) {
          this.errorNotification.message = error.response.data.message;
        } else if (error.request) {
          this.errorNotification.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorNotification.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    async getClientNotification(clientId) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/notifications/response-to-client`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            clientId: clientId,
          },
          timeout: 13000, // 13 seconds
        });

        this.loading = false;
        if (response.data.message == "No notifications") {
          this.readNotifications = [];
          this.notReadNotifications = [];
        } else {
          this.readNotifications = response.data.result.readNotifications;
          this.notReadNotifications = response.data.result.notReadNotifications;
          //contact the read notifications and not read notifications to get all notifications
          this.allNotifications = this.readNotifications.providerResponse
            .concat(this.readNotifications.providerInterest)
            .concat(
              this.notReadNotifications.providerResponse.concat(
                this.notReadNotifications.providerInterest
              )
            );
        }
        this.errorNotification.status = false;
        this.errorNotification.message = "";

        return response;
      } catch (error) {
        this.loading = false;
        this.errorNotification.status = true;
        if (error.response) {
          this.errorNotification.message = error.response.data.message;
        } else if (error.request) {
          this.errorNotification.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorNotification.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },
    //getters

    async getProviderNotificationNumber(providerId) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl
            }/notifications/requests-to-provider-number`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            providerId: providerId,
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
          this.errorNotification.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorNotification.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    async getClientNotificationNumber(clientId) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl
            }/notifications/response-to-client-number`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            clientId: clientId,
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
          this.errorNotification.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorNotification.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    //get Notification by id
    async getNotificationById(notificationId) {
      this.allNotifications.forEach((notification) => {
        if (notification._id == notificationId) {
          return notification;
        }
      });
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
