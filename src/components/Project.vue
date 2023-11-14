<template>
    <!-- project card -->
    <div id="main" class=" flex flex-col justify-start items-center w-[97%] gap-4 p-2 border border-gray-300 rounded-xl ">
        <div id="info-section" class=" flex flex-row justify-start items-start w-full gap-2 ">
            <img class=" w-1/2 " src="../assets/carpenter.svg" alt="">
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
    switch (project) {
        case 'moving_storage_services':
            return 'moving.svg'

        case 'home_inspection_appraisal':
            return 'maintenance.svg'

        case 'painting_finishing':
            return 'painting.svg'

        case 'landscape_outdoor_living':
            return 'gardening.svg'

        case 'plumbing_water_management':
            return 'plumber.svg'

        case 'electrical_hvac':
            return 'electrecian.svg'

        case 'cleaning_house_keeping':
            return 'cleaning.svg'

        case 'interior_design_decorating':
            return 'design.svg'

        case 'construction_remodelling':
            return 'remodeling.svg'

        case 'home_improvement_maintenance':
            return 'maintenance.svg'

    }
})

//stores
const { timeDifference } = useTimeDifference()
const { getCategoryById } = useCategoriesStore()
const { getWord } = useLanguageStore()



//methods
const formatTime = (date) => timeDifference(date)



</script>
