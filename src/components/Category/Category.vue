<template>
  <div
    class="flex relative flex-col lg:flex-col  justify-center h-full  items-center md:py-4 md:px-2 pb-1   gap-2  w-full  ">

    <div v-if="!clientDemandeStore.$state.requestinProgress && !isHome  ">
      <span :class="{ 'block ': isActive, 'hidden ': !isActive }"
        class="material-icons absolute text-xl md:text-xl   top-0.5 left-1 sm:top-2 sm:left-2  text-white  ">
        check_circle_fill
      </span>
      <span :class="{ 'block ': !isActive, 'hidden ': isActive }"
        class="material-icons absolute text-xl md:text-xl  top-0.5 left-1 sm:top-2 sm:left-2  text-gray-200  ">
        radio_button_unchecked
      </span>

    </div>



    <div class=" flex flex-1 flex-center justify-start md:justify-center items-center ">
      <span :class="{ 'text-white    ': isActive, 'text-primary ': !isActive }"
        class="material-icons pt-2 text-3xl    md:text-5xl  ">
        {{ iconName }}
      </span>
    </div>

    <div class="  flex h-full flex-1 flex-col items-center justify-center  ">
      <h2 class=" md:text-[15px] lg:text-[17px] xl:text-xl sm:text-sm font-semibold   text-[12px]  "> {{ categoryName }}
      </h2>
    </div>

  </div>
</template>

<script>
import { useCategoriesStore } from '../../store/categoriesStore';
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore';
import { useRouter } from 'vue-router';
export default {
  name: "Category",
  props: {
    categoryImage: String,
    categoryName: String,
    categoryDesc: String,
    categoryId: Number,
    subcategories: Array,
    isActive: {
      type: Boolean,
      default: false
    },
    iconName: String,
  },
  setup() {
    const categoriesStore = useCategoriesStore();
    const clientDemandeStore = useclientDemandeStore();
    const router = useRouter();

    const isHome = router.currentRoute.value.name === "home";

    return {
      categoriesStore,
      clientDemandeStore,

      isHome,
    };
  },

};
</script>

