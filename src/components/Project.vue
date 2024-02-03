<template>
    <!-- project card -->
    <div id="main" class=" flex flex-col justify-start items-center w-[97%] gap-4 p-2 border border-gray-300 rounded-xl ">
        <div id="info-section" class=" flex flex-row justify-start items-start w-full gap-2 ">
            <img class=" w-1/2 " :src="`${backgImg}`"  :alt="`${backgImg}`">
            <div id="info" class=" flex flex-col justify-start items-start w-full gap-2 ">
                <h1 class="text-xl font-bold text-gray-700 ">{{ project.id.slice(0,2) }}</h1>
                <p>{{ formatTime(project.createdAt) }}</p>
                <p class="text-gray-500 text-sm ">{{ getWord(getCategoryById(project.categoryId)) }}</p>
                <p class="text-gray-500 text-sm ">{{ project.description }}</p>
            </div>
        </div>
        <div id="action-section" class=" flex flex-row justify-between items-center  w-full gap-2 ">
            <button class="btn  btn-outline border-gray-500 text-gray-500 w-36 ">
                End Project
            </button>

            <button class="btn btn-primary   text-white w-36  ">
                Show Project
            </button>
        </div>
    </div>
</template>

<script setup>
import { useTimeDifference } from "../composables/timeDifference"
import { useCategoriesStore } from "../store/categoriesStore";
import { useLanguageStore } from "../store/AppBasic/languageStore";
import { computed, defineProps } from "vue"

//props
const props = defineProps({
    project: {
        type: Object,
        required: true
    }
})

//computed
let backgImg = computed(() => {
    switch (props.project.categoryId) {
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


//stores
const { timeDifference } = useTimeDifference()
const { getCategoryById } = useCategoriesStore()
const { getWord } = useLanguageStore()



//methods
const formatTime = (date) => timeDifference(date)



</script>
