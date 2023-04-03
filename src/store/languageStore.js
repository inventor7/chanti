import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./userStore";
//create a store of universal language
export const useLanguageStore = defineStore("languageStore", {
  id: "language",
  state: () => ({
    words: [] ,
    lang: navigator.language.substring(0, 2) || 'en',
    errorLang:{
      status:false,
      message:''
    },
    loading:false,
  }),
  actions: {
    async getLang() {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://chanti-dz-backend.herokuapp.com/translation/get/${this.lang}`
        );
        if (response.status !== 200) {
          throw new Error("An error has occurred, please refresh the page");
        }
        this.$state.words = response.data.result
        useUserStore().user.language=this.lang
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errorLang.status=true
        //from the response
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response + "error res");
          console.log(error.response.status + " status erorr res ");
          console.log(error.response.headers + " headers error res ");


        //from the request  
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request + " error requesrt ");
        } if (error.code === 'ECONNABORTED') {
          this.errorLang.message = 'Check your internet connection and try again'
        } else if (error.response) {
          this.errorLang.message = `HTTP error: ${error.response.status}`
        } else if (error.message.startsWith('Data error')) {
          this.errorLang.message = error.message
        } else {
          this.errorLang.message = 'Network error: please check your internet connection'
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
          }
          else{
            return 'error'
          }
        
        }
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'language',
        storage: localStorage,
        paths: ["lang"]
      },
    ],
  },
});
