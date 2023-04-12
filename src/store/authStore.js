import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import axios from "axios";
export const useAuthStore = defineStore("authStore", {
  id: "auth",
  state: () => ({
    error: {
      status: false,
      message: "",
    },
    loading: false,
    baseUrl: "https://chanti-dz-backend.herokuapp.com",
    baseUrl2: 'https://chanti-dz-backend.herokuapp.com',
  }),
  

  actions: {
    // logout

    async logout() {
      try {
        const response = await axios({
          method: "get",
          url: `${this.baseUrl}/auth/logout`,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 13000, // 13 seconds
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userInfo");
        localStorage.setItem("isloggedin", false);
        if(response.status === 200)
        {
          useUserStore().userAuth = {};

        }
        window.location.reload();
        return response;
      } catch (error) {
        if (error.response) {
          this.error.status = true;
          this.error.message = error.response.data.message;
        } else if (error.request) {
          this.error.status = true;
          this.error.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.error.status = true;
          this.error.message = error.message;
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
            userType: useUserStore().user.userType,
            phoneNumber: phone,
            email: email,
            password: password,
            language: useUserStore().user.language,
          },
          timeout: 13000, // 13 seconds
        });

        localStorage.setItem(
          "userId",
          JSON.stringify(response.data.result.user.id)
        );
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.result.token)
        );

        useUserStore().userAuth = response.data.result.user;
        useUserStore().user = response.data.result.user;
        useUserStore().isloggedin = true;
        this.loading = false;
        return response;
      } catch (error) {
        this.loading = false;
        if (error.response) {
          this.error.status = true;
          this.error.message = error.response.data.message;
        } else if (error.request) {
          this.error.status = true;
          this.error.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },
  },
});
