import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { useUserStore } from "./userStore";
export const useclientDemandeStore = defineStore("clientDemandeStore", {
  id: "clientDemande",
  state: () => ({
    loading: false,
    errorClientDemande: {
      message: "",
      status: false,
    },

    requestResponse: {},
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

    providers: [],
    providerProfile: {},
    selectedProvider: {},

    urgencyState: [
      {
        id: 1,
        name: "urgent",
        description: "in 24 hours",
        color: "red",
        isSelected: false,
      },
      {
        id: 2,
        name: "normal",
        description: "in 48 hours",
        color: "green",
        isSelected: false,
      },
      {
        id: 3,
        name: "low",
        description: "this month",
        color: "yellow",
        isSelected: false,
      },
      {
        id: 4,
        name: "unplanned",
        description: "it doesn't matter",
        color: "blue",
        isSelected: false,
      },
],
  }),
  actions: {
    createTheformData() {
      let formData = new FormData();
      formData.append("clientId", this.request.clientId);
      formData.append("categoryId", this.request.categoryId);
      formData.append("subcategoryId", this.request.subCategoryId);
      formData.append("stateId", this.request.stateId);
      formData.append("cityId", this.request.cityId);
      formData.append("urgency", this.request.urgency);
      formData.append("description", this.request.description);
      for (let i = 0; i < this.request.images.length; i++) {
        formData.append("images", this.request.images[i]);
      }
      console.log(formData);
      return formData;
    },
    async postClientDemande(data) {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `${useAuthStore().baseUrl}/client-post/save`,
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${useAuthStore().$state.token}`,
          },
          data: data,
          timeout: 13000, // 13 seconds
        });
        console.log(response.data);
        this.loading = false;
        this.errorClientDemande.status = false;
        this.errorClientDemande.message = "";
        this.requestResponse = response.data.result;
        this.providers = response.data.result.providers;
        // Add "isvisible" attribute to each provider object
        this.providers.forEach(provider => {
        provider.BtnVisible = true; 
        provider.RequestisLoading=false;
        });
        console.log(providers);
        console.log(response.data.result);
        return response;
      } catch (error) {
        this.loading = false;
        if (error.response) {
          this.errorClientDemande.status = true;
          this.errorClientDemande.message = "Server error: please try again later"
        } else if (error.request) {
          this.errorClientDemande.status = true;
          this.errorClientDemande.message =
            "Network error: please check your internet connection and try again";
        }
      }
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
      this.providers = [];
      this.providerProfile = {};
      this.selectedProvider = {};
      this.requestResponse = {};
    },
  },
  persist: [
    {
      key: "clientRequest",
      storage: localStorage,
      paths: ["requestResponse","providers","request","selectedProvider","providerProfile"],
    },
  ],
});
