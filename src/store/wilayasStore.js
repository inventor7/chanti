import { defineStore } from "pinia";
import axios from "axios"; 
import { useUserStore } from "./userStore";
import { useAuthStore } from "./authStore";
export const useWilayasStore = defineStore("wilayasStore", {
  id: "wilayas",
  actions: {
    //filter wilayas by searechedWilaya
    filterWilayas(searchedWilaya) {
      this.filteredWilayas = this.wilayas.filter((wilaya) => {
        if(useUserStore().$state.user.language === 'ar'){
          return wilaya.ascciName.toLowerCase().includes(searchedWilaya.toLowerCase());
        } else {
          return wilaya.name.toLowerCase().includes(searchedWilaya.toLowerCase());
        }
      });
    },

    //filter communes by searechedCommune
    filterCommunes(searchedCommune) {
      this.filteredCommunes = this.communes.filter((commune) => {
        if(useUserStore().$state.user.language === 'ar'){
          return commune.CityName.toLowerCase().includes(searchedCommune.toLowerCase());
        } else {
          return commune.CityNameAscii.toLowerCase().includes(searchedCommune.toLowerCase());
        }
      });
    },

    // empty all fields
    emptyFields() {
      this.selectedWilaya = {};
      this.selectedCommune = {};
      this.filteredWilayas = [];
      this.filteredCommunes = [];
      this.communes = [];
    },

    //fetch communes from the server
    async fetchCommune(id) {
      this.loading = true;
      try {
        const response = await axios.get(
          `${useAuthStore().baseUrl}/address/cities/${id}`
        );
        if (response.status !== 200) {
          throw new Error("An error has occurred, please refresh the page");
        }
        this.communes = response.data.result;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        if (error.response) {
          this.error.status = true;
          this.error.message = "Server Error : please try again later";
        } else if (error.request) {
          this.error.message =
            "Network error: please check your internet connection and try again !";
        } else {
          this.error.message = "Server Error : please try again later";
        }
      }
    },
    //get wilaya by id depend on the language
    getWilayaById(id) {
    if(useUserStore().$state.user.language === 'ar'){
      let wilaya = this.wilayas.find((wilaya) => wilaya.id === id);
      return wilaya.ascciName;
    } else {
      let wilaya = this.wilayas.find((wilaya) => wilaya.id === id);
      return wilaya.name;
    }
    },

    //get commune by id depend on the language
    getCommuneById(id) {
     if(useUserStore().$state.user.language === 'ar'){
      let commune = this.communes.find((commune) => commune.id === id);
      return commune.CityName;
      } else {
      let commune = this.communes.find((commune) => commune.id === id);
      return commune.CityNameAscii;
      }
    }
  },
  getters: {
    //get the selected wilaya if it's not an empty object
    getSelectedWilaya(state) {
      if (Object.keys(state.selectedWilaya).length !== 0) {
        if(useUserStore().$state.user.language === 'ar'){
          return state.selectedWilaya.ascciName;
        } else {  
          return state.selectedWilaya.name;
        }
      }
      else return "";
    },
    //get the selected commune if it's not an empty object
    getSelectedCommune(state) {
      if (Object.keys(state.selectedCommune).length !== 0) {
        if(useUserStore().$state.user.language === 'ar'){
          return state.selectedCommune.CityName;
        } else {  
          return state.selectedCommune.CityNameAscii;
        }
      }
      else return "";
    }
  },

  state: () => ({
    loading: false,
    error:{
      status :false,
      message : ''
    },

    selectedWilaya: {},
    selectedCommune: {},

    filteredWilayas: [],
    filteredCommunes: [],

    communes: [],
    wilayas: [
      { id: 1, name: "Adrar", ascciName: "أدرار" },
      { id: 2, name: "Chlef", ascciName: "الشلف" },
      { id: 3, name: "Laghouat", ascciName: "الأغواط" },
      { id: 4, name: "Oum El Bouaghi", ascciName: "أم البواقي" },
      { id: 5, name: "Batna", ascciName: "باتنة" },
      { id: 6, name: "Béjaïa", ascciName: "بجاية" },
      { id: 7, name: "Biskra", ascciName: "بسكرة" },
      { id: 8, name: "Béchar", ascciName: "بشار" },
      { id: 9, name: "Blida", ascciName: "البليدة" },
      { id: 10, name: "Bouira", ascciName: "البويرة" },
      { id: 11, name: "Tamanghasset", ascciName: "تمنراست" },
      { id: 12, name: "Tébessa", ascciName: "تبسة" },
      { id: 13, name: "Tlemcen", ascciName: "تلمسان" },
      { id: 14, name: "Tiaret", ascciName: "تيارت" },
      { id: 15, name: "Tizi Ouzou", ascciName: "تيزي وزو	" },
      { id: 16, name: "Alger", ascciName: "الجزائر	" },
      { id: 17, name: "Djelfa", ascciName: "الجلفة" },
      { id: 18, name: "Jijel", ascciName: "جيجل" },
      { id: 19, name: "Sétif", ascciName: "سطيف" },
      { id: 20, name: "Saïda", ascciName: "سعيدة" },
      { id: 21, name: "Skikda", ascciName: "سكيكدة" },
      { id: 22, name: "Sidi Bel Abbès", ascciName: "سيدي بلعباس	" },
      { id: 23, name: "Annaba", ascciName: "عنابة	" },
      { id: 24, name: "Guelma", ascciName: "قالمة" },
      { id: 25, name: "Constantine", ascciName: "قسنطينة" },
      { id: 26, name: "Médéa", ascciName: "المدية	" },
      { id: 27, name: "Mostaganem", ascciName: "مستغانم" },
      { id: 28, name: "M'Sila", ascciName: "المسيلة" },
      { id: 29, name: "Mascara", ascciName: "معسكر" },
      { id: 30, name: "Ouargla", ascciName: "ورقلة" },
      { id: 31, name: "Oran", ascciName: "وهران" },
      { id: 32, name: "El Bayadh", ascciName: "البيض" },
      { id: 33, name: "Illizi", ascciName: "اليزي" },
      { id: 34, name: "Bordj Bou Arréridj", ascciName: "برج بوعريريج" },
      { id: 35, name: "Boumerdès", ascciName: "بومرداس" },
      { id: 36, name: "El Tarf", ascciName: "الطارف" },
      { id: 37, name: "Tindouf", ascciName: "تندوف" },
      { id: 38, name: "Tissemsilt", ascciName: "تسمسيلت" },
      { id: 39, name: "El Oued", ascciName: "الوادي" },
      { id: 40, name: "Khenchela", ascciName: "خنشلة" },
      { id: 41, name: "Souk Ahras", ascciName: "سوق أهراس" },
      { id: 42, name: "Tipasa", ascciName: "تيبازة	" },
      { id: 43, name: "Mila", ascciName: "ميلة" },
      { id: 44, name: "Aïn Defla", ascciName: "عين الدفلى" },
      { id: 45, name: "Naâma", ascciName: "النعامة" },
      { id: 46, name: "Aïn Témouchent", ascciName: "عين تموشنت" },
      { id: 47, name: "Ghardaïa", ascciName: "غرداية" },
      { id: 48, name: "Relizane", ascciName: "غليزان" },
      { id: 49, name: "El M'Ghair", ascciName: "المغير" },
      { id: 50, name: "El Menia", ascciName: "المنيعة" },
      { id: 51, name: "Ouled Djellal", ascciName: "أولاد جلال" },
      { id: 52, name: "Bordj Baji Mokhtar", ascciName: "برج باجي مختار" },
      { id: 53, name: "Béni Abbès", ascciName: "بني عباس" },
      { id: 54, name: "Timimoun", ascciName: "تيميمون" },
      { id: 55, name: "Touggourt", ascciName: "تقرت" },
      { id: 56, name: "Djanet", ascciName: "جانت" },
      { id: 57, name: "Ain Salah", ascciName: "عين صالح" },
      { id: 58, name: "Ain Guezzam", ascciName: "عين قزّام" },
    ],
  }),
});
 
