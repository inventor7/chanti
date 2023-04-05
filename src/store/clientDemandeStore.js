import { defineStore } from "pinia";
import axios from "axios";
export const useClientRequestStore = defineStore("clientDemandeStore", {
  id: "clientDemande",
  state: () => ({
    loading: false,
    errorClientRequestStore: {
      message: "",
      status: false,
    },
    request: {
      clientId: null,
      categoryId: {},
      subCategoryId: {},
      stateId: {},
      cityId: {},
      emergencyId: {},
      images: [],
      desc: "",
    },
  }),
  actions: {
    async postClientRequest() {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: `https://chanti-dz-backend.herokuapp.com/clientRequest/${this.request.clientId}`,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          data: {
            'clientRequest':this.request
          },
          timeout: 13000, // 13 seconds
        });
        console.log(response.status);
        console.log(response);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errorClientRequestStore.status = true;
        //from the response
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response + "error res");
          console.log(error.response.status + " status erorr res ");
          console.log(error.response.headers + " headers error res ");
          this.errorClientRequestStore.message = 'server error, please try again later';
          //from the request
        } else if (error.request) {
          console.log(error.request + " error requesrt ");
          this.error.message ="Network error: please check your internet connection";
        }
      }
    },
  },
});
