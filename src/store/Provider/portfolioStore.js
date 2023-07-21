import { defineStore } from "pinia";
import axios from "axios";
import { useProviderStore } from "./providerStore";
import { useAuthStore } from "../authStore";
export const usePortfolioStore = defineStore("portfolioStore", {
  state: () => ({
    //basic vars
    loadingPortfolio: false,
    errorPortfolio: {
      message: "",
      status: false,
    },

    loadingDeletePost: false,
    errorDeletePost: {
      message: "",
      status: false,
    },

    loadingEditPost: false,
    errorEditPost: {
      message: "",
      status: false,
    },

    loadingPortfolioPosts : false ,
    errorPortfolioPosts : {
      message : "" ,
      status : false
    } ,


    //portfolio posts
    portfolioPosts: [],
    postToDelete: {},
    postToEdit: {},
  }),
  actions: {
    //Profile
    async getProviderInfo(providerId) {
      try {
        this.loadingPortfolio = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/profile/get-provider-info`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            providerId: providerId,
          },
          timeout: 13000, // 13 seconds
        });

        useProviderStore().$state.provider = response.data.result.provider;
        useProviderStore().$state.provider.category =
          response.data.result.category;
        useProviderStore().$state.provider.subcategories =
          response.data.result.subcategories;
        useProviderStore().$state.provider.city = response.data.result.city;

        this.loadingPortfolio = false;
        this.errorPortfolio.status = false;
        this.errorPortfolio.message = "";

        return response;
      } catch (error) {
        this.loadingPortfolio = false;
        this.errorPortfolio.status = true;
        if (error.response) {
          this.errorPortfolio.message = error.response.data.message;
        } else if (error.request) {
          this.errorPortfolio.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorPortfolio.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    async getProviderPosts(providerId) {
      try {
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/profile/portfolio`,
          headers: {
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            "providerId" :providerId
          },
          timeout: 13000, // 13 seconds
        });

        this.portfolioPosts = response.data.result
        this.loadingPortfolioPosts = false;
        this.errorPortfolioPosts.status = false;
        this.errorPortfolioPosts.message = "";

        return response;
      } catch (error) {
        this.loadingPortfolioPosts = false;
        this.errorPortfolioPosts.status = true;
        if (error.response) {
          this.errorPortfolioPosts.message = error.response.data.message;
        } else if (error.request) {
          this.errorPortfolioPosts.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorPortfolioPosts.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },


    //Posts
    async deletePost(portfolioPostId) {
      try {
        this.loadingDeletePost = true;
        const response = await axios({
          method: "delete",
          url: `${useAuthStore().baseUrl}/profile/delete-portfolio-post`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            portfolioPostId:portfolioPostId,
          },
          timeout: 13000, // 13 seconds
        });

        this.loadingDeletePost = false;
        this.errorDeletePost.status = false;
        this.errorDeletePost.message = "";

        return response;
      } catch (error) {
        this.loadingDeletePost = false;
        this.errorDeletePost.status = true;
        if (error.response) {
          this.errorDeletePost.message = error.response.data.message;
        } else if (error.request) {
          this.errorDeletePost.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorDeletePost.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    async editPost(postToEdit) {
      try {
        this.loadingEditPost = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/profile/edit-portfolio-post`,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            "portfolioPostId":postToEdit.id,
            "details":postToEdit.details,
            "images":postToEdit.images,
          },
          timeout: 13000, // 13 seconds
        });

        this.loadingEditPost = false;
        this.errorEditPost.status = false;
        this.errorEditPost.message = "";
        console.log(response)
        return response;
      } catch (error) {
        this.loadingEditPost = false;
        this.errorEditPost.status = true;
        if (error.response) {
          this.errorEditPost.message = error.response.data.message;
        } else if (error.request) {
          this.errorEditPost.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorEditPost.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },
  },
  persist: [
    {
      key: "portfolioStore",
      storage: localStorage,
      paths: ["portfolioPosts", "postToDelete", "postToEdit"],
    },
  ],
});
