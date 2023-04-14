import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";
export const useProviderStore = defineStore("providerStore", {
  id: "provider",
  state: () => ({
    loading: false,
    errorrProvider: {
      message: "",
      status: false,
    },
    images: [],
    postDetails:[],
    portfolioPosts: {},
    provider: {},
  }),
  actions: { 
    async getProviderData(provider) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/profile/get-provider-data`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            "providerId": provider.id,
          },
          timeout: 13000, // 13 seconds
        });

        this.loading = false;

        this.errorrProvider.status = false;
        this.errorrProvider.message = "";
        this.provider = response.data.result.provider;
        this.portfolioPost= response.data.result.portfolioPosts;
        return response;
      } catch (error) {
        this.loading = false;
        this.errorrProvider.status = true;
        if (error.response) {
          this.errorrProvider.message = "Server error: please try again later"
        } else if (error.request) {
          this.errorrProvider.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    async sendPost(data) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/profile/add-portfolio-post`,
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${useAuthStore().$state.token}`,
          },
          data: data,
          timeout: 13000, // 13 seconds
        });
        console.log(response);
        this.loading = false;
        this.errorrProvider.status = false;
        this.errorrProvider.message = "";
        return response;
      } catch (error) {
        this.loading = false;
        if (error.response) {
          this.errorrProvider.status = true;
          this.errorrProvider.message = "Server error: please try again later"
        } else if (error.request) {
          this.errorrProvider.status = true;
          this.errorrProvider.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },


    async getPost(id) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/profile/get-provider-data`,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${useAuthStore().$state.token}`,
          },
          data: {
            "providerId": id,
          },
          timeout: 13000, // 13 seconds
        });
        console.log(response);
        this.provider = response.data.result.provider;
        this.provider.category = response.data.result.category; 
        this.loading = false;
        this.errorrProvider.status = false;
        this.errorrProvider.message = "";
       
        // Extract images from response and convert to URLs
        const images = response.data.result.portfolioPostsWithImages.flatMap(post => {
          return post.images.map(image => URL.createObjectURL(new Blob([new Uint8Array(image.data)])))
        })

        this.images = images;
        this.postDetails = response.data.result.portfolioPostsWithImages.map(post => post.details)
        // Return object with images and post details
        return response;
        
      } catch (error) {
        this.loading = false;
        if (error.response) {
          this.errorrProvider.status = true;
          this.errorrProvider.message = "Server error: please try again later"
        } else if (error.request) {
          this.errorrProvider.status = true;
          this.errorrProvider.message =
            "Network error: please check your internet connection and try again";
        }
      }
    }
    
  },

  persist: [
    {
      key: "providerData",
      storage: localStorage,
      paths: ["provider"],
    },
  ],
});
