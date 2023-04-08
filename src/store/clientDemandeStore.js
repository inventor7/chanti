import { defineStore } from "pinia";
import axios from "axios";
export const useclientDemandeStore = defineStore("clientDemandeStore", {
  id: "clientDemande",
  state: () => ({
    loading: false,
    errorClientDemande: {
      message: "",
      status: false,
    },
    request: {
      clientId: null,
      categoryId: {},
      subCategoryId: {},
      stateId: {},
      cityId: {},
      urgency: {},
      images: [],
      description: "",
    },
  }),
  actions: {
    async postClientDemande() {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `https://chanti-dz-backend.herokuapp.com/clientpost`,
          headers: {
            "Content-Type": "multipart/form-data",
             "Accept": "application/json"
          },
          data: {
            "clientId": this.request.clientId,
            "categoryId": this.request.categoryId,
            "subCategoryId": this.request.subCategoryId,
            "stateId": this.request.stateId,
            "cityId": this.request.cityId,
            "urgency": this.request.urgency,
            "images": this.request.images,
            "description": this.request.description,
          },
          timeout: 13000, // 13 seconds
        });
        console.log(response.status);
        console.log(response);
        this.loading = false;
      } catch (error) {
        this.loading = false;

        if (error.response) {
          this.errorClientDemande.message = error.response.data.message;
        } else if (error.request) {
          this.errorClientDemande.status = true;
          this.errorClientDemande.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },
  },
});
