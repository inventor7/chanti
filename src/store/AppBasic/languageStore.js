import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "../userStore";
import { useAuthStore } from "../authStore";
//create a store of universal language
export const useLanguageStore = defineStore("languageStore", {
  id: "language",
  state: () => ({
    words: [],
    lang: navigator.language.substring(0, 2) || "en",
    errorLang: {
      status: false,
      message: "",
    },
    rtl: false,
    loading: false,
  }),

  getters: {
    getRtl() {
      if (this.lang === "ar") {
        return true;
      } else {
        return false;
      }
    },
  },

  actions: {
    async getLang() {
      this.loading = true;
      try {
        const response = await axios({
          method: "get",
          url: `${useAuthStore().baseUrl}/translation/get/${this.lang}`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 25000, // 13 seconds
        });

        this.words = response.data.result;
        useUserStore().user.language = this.lang;
        this.loading = false;

        if (response.data.result.length == 0) {
          this.errorLang.status = true;
          this.errorLang.message = "server error";
        } else {
          this.errorLang.status = false;
          this.errorLang.message = "";
        }
      } catch (error) {
        this.loading = false;
        if (error.response) {
          this.errorLang.message = error.response.data.message;
        } else if (error.request) {
          this.errorLang.status = true;
          this.errorLang.message =
            "Network error: please check your internet connection and try again";
        }
      }
    },

    //get a word from the Localstorage array
    getWord(word) {
      if (this.words.length != 0) {
        {
          let wordFound = this.words.find((item) => item.keyword === word);
          if (wordFound) {
            return wordFound.val;
          } else {
            return "error";
          }
        }
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "languageStore",
        storage: localStorage,
        paths: ["lang"],
      },
    ],
  },
});
