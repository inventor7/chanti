import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import axios from "axios";
export const useAuthStore = defineStore("authStore", {
  id: "auth",
  state: () => ({
    //same error object cz each action has the same error object and can not happen at the same time
    error: {
      status: false,
      message: "",
    },
    loading: false,
    baseUrl: "https://chanti-dz-backend.herokuapp.com",
    token: "",
    isAuthenticated: false,
    userAuth: {},
  }),
  

  actions: {

    async signup() {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/auth/signup`,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          data: {
            userType: useUserStore().$state.userType,
            firstName: useUserStore().user.firstName,
            lastName: useUserStore().user.lastName,
            categoryId: useUserStore().user.category.id,
            subCategoriesIds: useUserStore().user.subCategoriesIds,
            stateId: useUserStore().user.wilaya.id,
            cityId: useUserStore().user.commune.id,
            email: useUserStore().user.email,
            phoneNumber: useUserStore().user.phoneNumber,
            password: useUserStore().user.password,
            language: useUserStore().user.language,
          },
          timeout: 13000, // 13 seconds
        });

        this.token = response.data.result.token
        this.isAuthenticated = true;
        this.userAuth = response.data.result.user;
        this.loading = false;
        return response;
      } catch (error) {
        this.loading = false;
        if (error.response) {
          this.error.message = error.response.data.message;
        } else if (error.request) {
          this.error.status = true;
          this.error.message =
            "Network error: please check your internet connection and try again";
        } 
      }
    },

    async logout() {
      try {
        const response = await axios({
          method: "get",
          url: `${this.baseUrl}/auth/logout`,
          headers: {
            "Acces-Control-Allow-Origin": "*", // Required for CORS support to work
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          timeout: 13000, // 13 seconds
        });

        localStorage.removeItem("userInfo");
        localStorage.removeItem("authStore");
        window.location.reload();
        return response;
      } catch (error) {
        this.error.status = true;
        if (error.response) {
          this.error.message = error.response.data.message;
        } else if (error.request) {
          this.error.message ="Network error: please check your internet connection and try again";
        } else {
          this.error.message ="Network error: please check your internet connection and try again";
        }
      }
    },

    async login(phone, email, password) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/auth/login`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: {
            userType: useUserStore().userType,
            phoneNumber: phone,
            email: email,
            password: password,
            language: useUserStore().user.language,
          },
          timeout: 13000, // 13 seconds
        });

        this.token = response.data.result.token;
        this.userAuth = response.data.result.user;
        this.isAuthenticated = true;
        this.loading = false;
        return response;
      } catch (error) {
        this.loading = false;
        this.error.status = true;
        if (error.response) {
          this.error.message = error.response.data.message;
        } else if (error.request) {
          this.error.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.error.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },
  },
  persist: [
    {
      key: "authStore",
      storage: localStorage,
      paths: ["token", "isAuthenticated", "userAuth"],
    },
  ],
});
