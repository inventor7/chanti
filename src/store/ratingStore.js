import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useRatingStore = defineStore("ratingStore", {
  id: "rating",
  state: () => ({
    rating: 0,
    selectedProviderToRate: {},

    ratingPageVisibility: false,
    loadingRating: false,
    errorStatus: false,
    errorMessage: "",
    errorState: 'success', //color of error message
  }),
  actions: {
    async ratePro(clientPostId,providerId, rating, comment) {
      try {
        this.loadingRating = true;
        const response = await axios({
          method: "post",
          url: `${
            useAuthStore().baseUrl
          }/client-post/rating-work`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            providerId: providerId,
            clientPostId: clientPostId,
            score: rating,
            comment: comment,
          },
          timeout: 13000, // 13 seconds
        });

        this.loadingRating = false;
        this.errorStatus = false;
        this.errorMessage = "";
        this.errorState = 'success';
        console.log(response);
        return response;
      } catch (error) {
        this.loadingRating = false;
        this.errorStatus = true;
        this.errorState = 'error';
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else if (error.request) {
          this.errorMessage =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorMessage =
            "Network error: please check your internet connection and try again";
        }
      }
    },
  },

  persist: [
    {
      key: "ratingStore",
      storage: localStorage,
      paths: ["rating", "selectedProviderToRate"],
    },
  ],
});
