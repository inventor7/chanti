import { defineStore } from "pinia";
import axios from "axios";
import { useRoute } from "vue-router";
import { useAuthStore } from "./authStore";
export const useUserStore = defineStore("userStore", {
  id: "user",
  state: () => ({
    user: {
      userType: "",
      firstName: "",
      lastName: "",
      category: "",
      subCategories: "",
      wilaya: "",
      commune: "",
      email: "",
      phoneNumber: "",
      password: "",
      subCategoriesIds: [],
      language: "",
    },
    userType: "",
    error: {
      status: false,
      message: "",
    },
    loading: false,
    pNumber: 0,
  }),
  getters: {
    // return if one of the fields is empty and specify which one
    isEmptyProvider() {
      if (this.user.firstName === "") {
        return "firstName"; // first name is empty
      } else if (this.user.lastName === "") {
        return "lastName"; // last name is empty
      } else if (this.user.category === "") {
        return "category"; // category is empty
      } else if (this.user.subCategories === "") {
        return "subCategories"; // sub categories is empty
      } else if (this.user.wilaya === "") {
        return "wilaya"; // wilaya is empty
      } else if (this.user.commune === "") {
        return "commune"; // commune is empty
      } else if (this.user.phoneNumber === "") {
        return "phoneNumber"; // phone number is empty
      } else if (this.user.password === "") {
        return "password"; // password is empty
      } else return false; // all fields are filled
    },

    // return if one of the fields is empty and specify which one
    isEmptyClient() {
      if (this.user.firstName === "") {
        return "firstName"; // first name is empty
      } else if (this.user.lastName === "") {
        return "lastName"; // last name is empty
      } else if (this.user.wilaya === "") {
        return "wilaya"; // wilaya is empty
      } else if (this.user.commune === "") {
        return "commune"; // commune is empty
      } else if (this.user.phoneNumber === "") {
        return "phoneNumber"; // phone number is empty
      } else if (this.user.password === "") {
        return "password"; // password is empty
      } else return false; // all fields are filled
    },
  },
  actions: {
    //extract the sub categories ids from the sub categories array and pass them to subCategoriesIds
    extractSubCategoriesIds() {
      this.user.subCategoriesIds = [
        ...new Set(this.user.subCategories.map((obj) => obj.id)),
      ];
    },

    // empty fields
    emptyFields() {
      this.user.firstName = "";
      this.user.lastName = "";
      this.user.category = "";
      this.user.subCategories = "";
      this.user.wilaya = "";
      this.user.commune = "";
      this.user.email = "";
      this.user.phoneNumber = "";
      this.user.password = "";
    },
  },

  persist: [
    {
      key: "userStore",
      storage: localStorage,
      paths: [
        "user.language",
        "userType",
      ],
    },
  ],
});
