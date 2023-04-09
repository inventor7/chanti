<template>
    <SignupLayout prevLink="selection-location" :pageNumber="3" :isError="notSelectedError"
        errorText="Please select the time " nextBtnText="Next" @handle="handleClick" pageTitle=" Choose Urgency"
        pageDesc=" select the urgency of your request ">

        <div class=" flex flex-row justify-around w-full h-full flex-1 gap-3  items-start ">
            <div class=" flex flex-col  justify-center items-center gap-3 w-full h-full ">
                <!-- a select component with modern design to select multiple emergency status as urgent , not urgent , etc -->
                <transition name="fade">
                    <div  class="overflow-x-hidden  h-full w-4/5 sm:w-1/3 flex flex-col justify-center items-center ">
                        <ul tabindex="0"
                            class="dropdown-content w-full h-fit  border-2 p-2  bg-base-100 rounded-box border-y-2 overflow-y-scroll">
            
                            <li
                            @click="selectUrgency(urgency)"
                             v-for="urgency in clientDemandeStore.urgencyState" :key="urgency.id"  
                             :class="{ 'bg-primary text-white scale-[103%] shadow-2xl hover:bg-primary ': urgency.isSelected }"
                             class="dropdown-open flex flex-row justify-start items-center gap-2 mt-1 px-2  cursor-pointer border hover:bg-gray-400/30 font-semibold  py-3   transition-all duration-200 ease-in-out  rounded-xl   ">
                                     <span v-if="!urgency.isSelected" class="material-icons">
                                        radio_button_unchecked
                                     </span>
                                     <span v-else class="material-icons" >
                                        radio_button_checked
                                     </span>
                              
                                <span 
                                class=" font-semibold " > {{ urgency.name.toUpperCase() }} </span>
                            </li>
                            
                        </ul>
                    </div>
                </transition>

            </div>
        </div>

    </SignupLayout>
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import Error from '../../components/Error.vue'
import Loading from '../../components/Loading.vue'
import { useCategoriesStore } from '../../store/categoriesStore';
import { useLanguageStore } from '../../store/languageStore';
import { useUserStore } from '../../store/userStore';
import { useclientDemandeStore } from '../../store/clientDemandeStore';
import { useRouter } from 'vue-router';
import { computed, ref, onBeforeMount } from 'vue';
import Category from '../../components/Category/Category.vue';

export default {
    name: 'SelectionPage3',
    components: { SignupLayout, Category, Error, Loading },
    setup() {

        //props
        const notSelectedError = ref(false)


        // store
        const categoriesStore = useCategoriesStore()
        const languageStore = useLanguageStore()
        const userStore = useUserStore()
        const router = useRouter()
        const clientDemandeStore = useclientDemandeStore()

        const handleClick = () => {
            if (clientDemandeStore.urgencyState.some(urgency => urgency.isSelected)) {
                router.replace({ name: 'images' })
            } else {
                notSelectedError.value = true
            }
        }

        const selectUrgency = (urgency) => {
         //slect only one urgency
            clientDemandeStore.urgencyState.forEach(urgency => {
                urgency.isSelected = false
            })
            urgency.isSelected = true
        }



        return {
            //props
            notSelectedError,

            //store
            categoriesStore,
            languageStore,
            userStore,
            clientDemandeStore,
            router,

            //methods
            handleClick,
            selectUrgency
        }
    },

}

</script>