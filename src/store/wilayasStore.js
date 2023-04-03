import { defineStore } from "pinia";
import axios from "axios";

export const useWilayasStore = defineStore("wilayasStore", {
  id: "wilayas",
  actions: {
    //filter wilayas by searechedWilaya
    filterWilayas(searchedWilaya) {
      this.filteredWilayas = this.wilayas.filter((wilaya) => {
        return wilaya.name.toLowerCase().includes(searchedWilaya.toLowerCase());
      });
    },

    //filter communes by searechedCommune
    filterCommunes(searchedCommune) {
      this.filteredCommunes = this.communes.filter((commune) => {
        return commune.CityNameAscii
          .toLowerCase()
          .includes(searchedCommune.toLowerCase());
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
          `https://chanti-dz-backend.herokuapp.com/address/cities/${id}`
        );
        if (response.status !== 200) {
          throw new Error("An error has occurred, please refresh the page");
        }
        this.communes = response.data.result;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.error.status = true;
        if (err.code === 'ECONNABORTED') {
          this.error.message = 'Check your internet connection and try again'
        } else if (err.response) {
          this.error.message = `HTTP error: ${err.response.status}`
        } else if (err.message.startsWith('Data error')) {
          this.error.message = err.message
        } else {
          this.error.message = 'Network error: please check your internet connection'
        }
      
      }
    },
  },
  getters: {
    //get the selected wilaya if it's not an empty object
    getSelectedWilaya(state) {
      if (Object.keys(state.selectedWilaya).length !== 0) {
        return state.selectedWilaya.name;
      }
      else return "";
    },
    //get the selected commune if it's not an empty object
    getSelectedCommune(state) {
      if (Object.keys(state.selectedCommune).length !== 0) {
        return state.selectedCommune.CityNameAscii;
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
      { id: 1, name: "Adrar" },
      { id: 2, name: "Chlef" },
      { id: 3, name: "Laghouat" },
      { id: 4, name: "Oum El Bouaghi" },
      { id: 5, name: "Batna" },
      { id: 6, name: "Béjaïa" },
      { id: 7, name: "Biskra" },
      { id: 8, name: "Béchar" },
      { id: 9, name: "Blida" },
      { id: 10, name: "Bouira" },
      { id: 11, name: "Tamanghasset" },
      { id: 12, name: "Tébessa" },
      { id: 13, name: "Tlemcen" },
      { id: 14, name: "Tiaret" },
      { id: 15, name: "Tizi Ouzou" },
      { id: 16, name: "Algiers" },
      { id: 17, name: "Djelfa" },
      { id: 18, name: "Jijel" },
      { id: 19, name: "Sétif" },
      { id: 20, name: "Saïda" },
      { id: 21, name: "Skikda" },
      { id: 22, name: "Sidi Bel Abbès" },
      { id: 23, name: "Annaba" },
      { id: 24, name: "Guelma" },
      { id: 25, name: "Constantine" },
      { id: 26, name: "Médéa" },
      { id: 27, name: "Mostaganem" },
      { id: 28, name: "M'Sila" },
      { id: 29, name: "Mascara" },
      { id: 30, name: "Ouargla" },
      { id: 31, name: "Oran" },
      { id: 32, name: "El Bayadh" },
      { id: 33, name: "Illizi" },
      { id: 34, name: "Bordj Bou Arréridj" },
      { id: 35, name: "Boumerdès" },
      { id: 36, name: "El Tarf" },
      { id: 37, name: "Tindouf" },
      { id: 38, name: "Tissemsilt" },
      { id: 39, name: "El Oued" },
      { id: 40, name: "Khenchela" },
      { id: 41, name: "Souk Ahras" },
      { id: 42, name: "Tipasa" },
      { id: 43, name: "Mila" },
      { id: 44, name: "Aïn Defla" },
      { id: 45, name: "Naâma" },
      { id: 46, name: "Aïn Témouchent" },
      { id: 47, name: "Ghardaïa" },
      { id: 48, name: "Relizane" },
      { id: 49, name: "El M'Ghair" },
      { id: 50, name: "El Menia" },
      { id: 51, name: "Guelmim-Oued Noun" },
      { id: 52, name: "Tindouf Province" },
      { id: 53, name: "Tissemsilt Province" },
      { id: 54, name: "El Bayadh Province" },
      { id: 55, name: "Illizi Province" },
      { id: 56, name: "Bordj Badji Mokhtar" },
      { id: 57, name: "Béni Abbès" },
      { id: 58, name: "Timimoun" },
    ],
  }),
});
 
