//projectsStore in pinia

import { defineStore } from "pinia";
import axios from "../../composables/axios";
import { useAuthStore } from "../authStore";
import { useFeedPostsStore } from "./feedPostsStore";
import { useclientDemandeStore } from "../Client/clientDemandeStore";

export const useProjectsStore = defineStore("projecstStore", {
  id: "project",
  state: () => ({
    //basic vars
    loading: false,
    errorrProvider: {
      message: "",
      status: false,
    },

    provider: {},
    projects: [],
  }),

  actions: {
    async getProviderProjects(providerId) {
      this.loading = true;
      try {
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/profile/provider-projects`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            providerId: useAuthStore().$state.userAuth.id,
          },
          timeout: 13000, // 13 seconds
        });

        this.projects = response.data.result;
        this.errorrProvider.status = false;
        this.errorrProvider.message = "";
        this.loading = false;
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
  },
  persist: [
    {
      key: "projectsStore",
      storage: localStorage,
      paths: ["projects"],
    },
  ],
});
