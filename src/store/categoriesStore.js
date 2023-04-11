import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "./authStore";
export const useCategoriesStore = defineStore("categoriesStore", {
  id: "categories",
  state: () => ({
    loading: false,
    error: {
      message: "",
      status: false,
    },

    isActiveDecoration: false,

    selectedCategory: {},
    selectedSubCategories: [],

    subCategories: [],
    categories: [
      {
        id: 1,
        name: "home_improvement_maintenance",
        iconName: "home",
        isActive: false,
      },
      {
        id: 2,
        name: "construction_remodelling",
        iconName: "hardware",
        isActive: false,
      },
      {
        id: 3,
        name: "interior_design_decorating",
        iconName: "chair",
        isActive: false,
      },
      {
        id: 4,
        name: "cleaning_house_keeping",
        iconName: "cleaning_services",
        isActive: false,
      },
      {
        id: 5,
        name: "electrical_hvac",
        iconName: "electrical_services",
        isActive: false,
      },
      {
        id: 6,
        name: "plumbing_water_management",
        iconName: "plumbing",
        isActive: false,
      },
      {
        id: 7,
        name: "landscape_outdoor_living",
        iconName: "yard",
        isActive: false,
      },
      {
        id: 8,
        name: "painting_finishing",
        iconName: "imagesearch_roller",
        isActive: false,
      },
      {
        id: 9,
        name: "home_inspection_appraisal",
        iconName: "engineering",
        isActive: false,
      },
      {
        id: 10,
        name: "moving_storage_services",
        iconName: "local_shipping",
        isActive: false,
      },
    ],
  }),
  getters: {
    //get the selected category
    getSelectedCategory(state) {
      return state.selectedCategory;
    },
    //get the selected sub category
    getSelectedSubCategories(state) {
      return state.selectedSubCategories;
    },
    getError(state) {
      return state.error;
    },
  },
  getters: {
    //get the selected category
    getSelectedCategory(state) {
      return state.selectedCategory;
    },
    // get isActiveDecoration based on the route
    getIsActiveDecoration() {
      const router = useRouter();
      if (router.currentRoute.value.path === "/") {
        return false;
      } else {
        return true;
      }
    },
    
  },

  actions: {
    isActiveCategory(category) {
      if (this.selectedCategory.id === category.id) {
        return true;
      } else {
        return false;
      }
    },
    emptyFields() {
      this.selectedCategory = {};
      this.selectedSubCategories = [];
    },

    selectSubCategory(subCategory) {
      if (this.selectedSubCategories.includes(subCategory)) {
        //unselected subCategory if it is already selected
        this.selectedSubCategories = this.selectedSubCategories.filter(
          (item) => item !== subCategory
        );
      } else {
        //add subCategory to the selectedSubCategory array
        this.selectedSubCategories.push(subCategory);
      }
    },

    //fetch sub-categories by id from the server with axios
    async fetchSubCategories(selectedCategory) {
      this.loading = true;
      try {
        const response = await axios.get(
          `${useAuthStore().baseUrl}/sub-categories/${selectedCategory.id}`,
          { timeout: 12000 }
        );
        if (response.status !== 200) {
          throw new Error("An error has occurred, please refresh the page");
        }
        this.subCategories = response.data.result;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.error.status = true;
        if (err.code === "ECONNABORTED") {
          this.error.message = "Check your internet connection and try again";
        } else if (err.response) {
          this.error.message = `HTTP error: ${err.response.status}`;
        } else if (err.message.startsWith("Data error")) {
          this.error.message = err.message;
        } else {
          this.error.message =
            "Network error: please check your internet connection";
        }
      }
    },
  },
});
