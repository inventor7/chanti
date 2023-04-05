import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("userStore", {
  id: "user",
  state: () => ({
    userAuth: {},
    user: {
      userType:"" ,
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
    isloggedin:false,
    error: {
      status: false,
      message: "",
    },
    loading: false,
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
    }



  },
  actions: {
    async signup() {
      try {
        this.loading = true;
        const response = await axios({
          method: "post",
          url: "https://chanti-dz-backend.herokuapp.com/auth/signup",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          data: {
            userType: this.user.userType,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            categoryId: this.user.category.id,
            subCategoriesIds: this.user.subCategoriesIds,
            stateId: this.user.wilaya.id,
            cityId: this.user.commune.id,
            email: this.user.email,
            phoneNumber: this.user.phoneNumber,
            password: this.user.password,
            language: this.user.language,
          },
          timeout: 13000, // 13 seconds
        });

        localStorage.setItem("userId", JSON.stringify(response.data.result.user.id));
        localStorage.setItem("token",JSON.stringify(response.data.result.token));
        this.isloggedin = true;
        this.userAuth = response.data.result.user;
       
        this.loading = false;
        return response;
      } catch (error) {
        this.loading = false;
        
        if (error.response) {
          this.error.message = error.response.data.message;
        } else if (error.request) {
          this.error.status = true;
          this.error.message ="Network error: please check your internet connection and try again";
        }
      }
    },

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
    }
  },
  persist:[
      {
        key: "userInfo",
        storage: localStorage,
        paths: [
          "userAuth",
          "user.language",
          "isloggedin",
          "user.userType",
        ],
      },
      {
        key: "userToken",
        storage: sessionStorage,
        paths: ["token"],
      },
    
    ],

}); 
