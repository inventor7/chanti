import { defineStore } from "pinia";
import axios from "axios";
export const useclientDemandeStore = defineStore("clientDemandeStore", {
  id: "clientDemande",
  state: () => ({
    //basic vars
    loading: false,
    errorClientDemande: {
      message: "",
      status: false,
    },


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
    },
  },
  persist: [
    {
      key: "clientDemandeStore",
      storage: localStorage,
      paths: ["requestinProgress","clientPostId"],
    },
  ],
});
