<template>
  <div class="flex relative flex-col lg:flex-col  justify-center h-full  items-center px-2 py-8  gap-2  w-full   ">

    <div v-if="!clientDemandeStore.$state.requestinProgress && !isHome">
      <span :class="{ 'block  ': isActive, 'hidden ': !isActive }"
        class="material-icons absolute text-xl md:text-xl   top-0.5 left-1 sm:top-2 sm:left-2  text-white  ">
        check_circle_fill
      </span>
      <span :class="{ 'block ': !isActive, 'hidden ': isActive }"
        class="material-icons absolute text-xl md:text-xl  top-0.5 left-1 sm:top-2 sm:left-2  text-gray-200  ">
        radio_button_unchecked
      </span>
    </div>



    <div class=" flex flex-1 flex-center justify-start md:justify-center items-center ">
      <img :src="`${backgImg}`" alt="">
    </div>

    <div class="    ">
      <h2 class=" text-xs  font-semibold     "> {{ categoryName }}
      </h2>
    </div>

  </div>
</template>

<script setup >
import { useCategoriesStore } from '../../store/categoriesStore';
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore';
import { useRouter } from 'vue-router';
import { computed, onMounted, defineProps } from 'vue';


const props = defineProps({
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
});


onMounted(() => {
  console.log(props);
});

const categoriesStore = useCategoriesStore();
const clientDemandeStore = useclientDemandeStore();
const router = useRouter();

const isHome = router.currentRoute.value.name === "home";
let backgImg = computed(() => {

  switch (props.categoryId) {
    case 10:
      return 'moving_storage_services.svg'

    case 9:
      return 'home_inspection_appraisal.svg'

    case 8:
      return 'painting_finishing.svg'

    case 7:
      return 'landscape_outdoor_living.svg'

    case 6:
      return 'plumbing_water_management.svg'

    case 5:
      return 'electrical_hvac.svg'

    case 4:
      return 'cleaning_house_keeping.svg'

    case 3:
      return 'interior_design_decorating.svg'

    case 2:
      return 'construction_remodelling.svg'

    case 1:
      return 'home_improvement_maintenance.svg'

  }

})
</script>

