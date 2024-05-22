import { defineStore } from "pinia";
import axios from "../composables/axios";
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

  actions: {
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
        this.error.status = false,
          this.error.message = ""

      } catch (error) {
        this.loading = false;
        this.error.status = true
        if (error.response) {
          this.error.message = "Server Error : Please try again";
        } else if (error.request) {
          this.error.message =
            "Network error: please check your internet connection and try again";
        } else {
          this.error.message = "Server Error : Please try again";
        }
      }
    },




    //getters

    // get category by id
    getCategoryById(id) {
      return this.categories.find((item) => item.id === id).name;
    },

    //get sub category by id
    getSubCategoryById(id) {
      return this.subCategories.find((item) => item.id === id);
    }

  },
});
