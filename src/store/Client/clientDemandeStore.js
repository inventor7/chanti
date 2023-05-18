import { defineStore } from "pinia";
import { useAuthStore } from "../authStore";
import { useProviderStore } from "../Provider/providerStore";
import axios from "axios";
export const useclientDemandeStore = defineStore("clientDemandeStore", {
  id: "clientDemande",
  state: () => ({
    //basic vars
    loadingClientDemande: false,
    loadingPostImage: false,
    errorClientDemande: {
      message: "",
      status: false,
    },

    //vars for mark selected provider's post
    loadingMarkSelected: false,
    errorMarkSelected: {
      message: "",
      status: false,
    },

    clientPostPageVisibility: false,
    RatingPageVisibility: false,

    clientPosts: [],
    selectedPost: {},
    PostToDelte: {},
    clientPostId: {}, //used to store the client post that recieved from postRequest in clientStore
    requestinProgress: false, //this vars is used if we came up from the request procudure page

    request: {
      clientId: "",
      categoryId: {},
      subCategoryId: {},
      stateId: {},
      cityId: {},
      urgency: "",
      images: [],
      description: "",
    },
    urgencyState: [
      {
        id: 1,
        name: "urgent",
        description: "in 24 hours",
        icon: "hourglass_full",
        isSelected: false,
      },
      {
        id: 2,
        name: "low",
        description: "this month",
        icon: "hourglass_top",
        isSelected: false,
      },
      {
        id: 3,
        name: "normal",
        description: "in 48 hours",
        icon: "hourglass_empty",
        isSelected: false,
      },
      {
        id: 4,
        name: "unplanned",
        description: "time is flexible",
        icon: "hourglass_disabled",
        isSelected: false,
      },
    ],
  }),
  actions: {
    async getClientPosts() {
      try {
        this.loadingClientDemande = true;
        const response = await axios({
          method: "get",
          url: `${useAuthStore().baseUrl}/client-post/work`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          //empty data:
          data: {},
          timeout: 13000, // 13 seconds
        });

        this.loadingClientDemande = false;
        this.errorClientDemande.status = false;
        this.errorClientDemande.message = "";

        this.clientPosts = response.data.result;
        console.log(response);
        return response;
      } catch (error) {
        this.loadingClientDemande = false;
        this.errorClientDemande.status = true;
        if (error.response) {
          this.errorClientDemande.message =
            "Server error: please try again later";
        } else {
          this.errorClientDemande.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    async getClientPostProviders(clientPostId) {
      try {
        this.loadingClientDemande = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/client-post/responses-and-interests`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            clientPostId: clientPostId,
          },
          timeout: 13000, // 13 seconds
        });

        this.loadingClientDemande = false;
        this.errorClientDemande.status = false;
        this.errorClientDemande.message = "";

        //get all the providers to the providers store
        this.selectedPost.providersSentInterest =
          response.data.result.providersSentInterest;
        this.selectedPost.providersSentResponse =
          response.data.result.providersSentResponse;

          //make all providers in one array
          this.selectedPost.providers = this.selectedPost.providersSentInterest.concat(this.selectedPost.providersSentResponse);

        // this.selectedPost.providersSentInterest.forEach((provider) => {
        //   provider.btnVisible = false;
        // });
        // this.selectedPost.providersSentResponse.forEach((provider) => {
        //   provider.btnVisible = false;
        // });

        return response;
      } catch (error) {
        this.loadingClientDemande = false;
        this.errorClientDemande.status = true;
        if (error.response) {
          this.errorClientDemande.message =
            "Server error: please try again later";
        } else {
          this.errorClientDemande.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    async getClientPostImages(clientPostId) {
      try {
        this.loadingPostImage = true;
        const response = await axios({
          method: "get",
          url: `${useAuthStore().baseUrl}/client-post/images/${clientPostId}`,
          headers: {
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          //empty data:
          data: {},
          timeout: 13000, // 13 seconds
        });

        this.loadingPostImage = false;
        this.errorClientDemande.status = false;
        this.errorClientDemande.message = "";

        if (response.data.result.length > 0) {
          this.selectedPost.images = response.data.result;
        } else {
          this.selectedPost.images = [];
        }

        return response;
      } catch (error) {
        this.loadingPostImage = false;
        this.errorClientDemande.status = true;
        if (error.response) {
          this.errorClientDemande.message =
            "Server error: please try again later";
        } else {
          this.errorClientDemande.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    async setWorkStatus(status, clientPostId) {
      try {
        this.loadingClientDemande = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/client-post/work-status`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            clientPostId: clientPostId,
            status: status,
          },
          timeout: 13000, // 13 seconds
        });

        this.loadingClientDemande = false;
        this.errorClientDemande.status = false;
        this.errorClientDemande.message = "";

        return response;
      } catch (error) {
        this.loadingClientDemande = false;
        this.errorClientDemande.status = true;
        if (error.response) {
          this.errorClientDemande.message = error.response.data.message;
        } else if (error.request) {
          this.errorClientDemande.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorClientDemande.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    async changeProviderStatus(notificationId, status) {
      try {
        this.loadingMarkSelected = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/client-post/interest/change-status`,
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

        this.loadingMarkSelected = false;
        this.errorMarkSelected.status = false;
        this.errorMarkSelected.message = "";

        return response;
      } catch (error) {
        this.loadingMarkSelected = false;
        this.errorMarkSelected.status = true;
        if (error.response) {
          this.errorMarkSelected.message = error.response.data.message;
        } else if (error.request) {
          this.errorMarkSelected.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.errorMarkSelected.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    getClientPostById(clientPostId) {
      let post = {};
      this.clientPosts.forEach((clientPost) => {
        if (clientPost.id === clientPostId) {
          post = clientPost;
        }
      });
      return post;
    },

   
    

    uploadFiles(files) {
      this.request.images = files;
    },

    emptyFields() {
      this.request = {
        clientId: "",
        categoryId: {},
        subCategoryId: {},
        stateId: {},
        cityId: {},
        urgency: "",
        images: [],
        description: "",
      };
    },

  },
  persist: [
    {
      key: "clientDemandeStore",
      storage: localStorage,
      paths: [
        "requestinProgress",
        "clientPostId",
        "clientPosts",
        "selectedPost",
      ],
    },
  ],
});
