import { defineStore } from "pinia";
import axios from "axios";
import { useRoute } from "vue-router";
import { useAuthStore } from "../authStore";
export const useFeedPostsStore = defineStore("feedPostsStore", {
  id: "feedPosts",
  state: () => ({
    //basic vars
    loadingFeed: false,
    errorFeedPosts: {
      message: "",
      status: false,
    },

    //feed posts
    feedPosts: [],
  }),
  actions: {
    //get feed posts to provider feed page
    async getFeedPosts() {
      try {
        this.loadingFeed = true;
        const response = await axios({
          method: "get",
          url: `${useAuthStore().baseUrl}/client-post/feed/${
            useAuthStore().$state.userAuth.categoryId
          }/${useAuthStore().$state.userAuth.stateId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {},
          timeout: 13000, // 13 seconds
        });

        this.feedPosts = response.data.result;
        //add btnVisible and btnLoading to each post
        this.feedPosts.forEach((post) => {
          post["btnVisible"] = true;
          post["btnLoading"] = false;
        });
        
        this.errorFeedPosts.status = false;
        this.errorFeedPosts.message = "";
        this.loadingFeed = false;

        return response;
      } catch (error) {
        this.loadingFeed = false;
        this.errorFeedPosts.status = true;
        if (error.response) {
          this.errorFeedPosts.message = error.response.data.message;
        } else {
          this.errorFeedPosts.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },
  },
  persist: [
    {
      key: "feedPostsStore",
      storage: localStorage,
      paths: ["feedPosts"],
    },
  ],
});
