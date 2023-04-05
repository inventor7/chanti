<template>
    <SignupLayout prevLink="selection-location" :pageNumber="pNumber" :isError="notSelectedError"
        errorText="Please select a service" nextBtnText="Next" @handle="handleClick" pageTitle=" Choose Services"
        pageDesc=" select the multiple services that you can provide for your clients ">

        <div class=" flex flex-row justify-around w-full h-full flex-1 gap-3  items-start ">
            <div class=" flex flex-col  justify-center items-center gap-3 w-full h-full ">
                <!-- a select component with modern design to select multiple emergency status as urgent , not urgent , etc -->
                <transition name="fade">
                    <div  class="overflow-x-hidden">
                        <ul tabindex="0"
                            class="dropdown-content   w-full max-h-32 sm:max-h-64 p-2 sm:shadow-2xl bg-base-100 rounded-box border-y-2 overflow-y-scroll">
            
                            <li class=" dropdown-open  px-3 cursor-pointer hover:bg-gray-400/30 font-semibold  py-1 sm:py-2  transition-all duration-200 ease-in-out  rounded-xl   ">
                                <a class="text-error" > urgent </a>
                                
                            </li>
                            <li class=" dropdown-open  px-3 cursor-pointer hover:bg-gray-400/30 font-semibold  py-1 sm:py-2  transition-all duration-200 ease-in-out  rounded-xl   ">
                                <a class="text-primary" >in 2 days</a>
                                
                            </li>
                            <li class=" dropdown-open  px-3 cursor-pointer hover:bg-gray-400/30 font-semibold  py-1 sm:py-2  transition-all duration-200 ease-in-out  rounded-xl   ">
                                <a class="text-warning" >this week </a>
                                
                            </li>
                            <li class=" dropdown-open  px-3 cursor-pointer hover:bg-gray-400/30 font-semibold  py-1 sm:py-2  transition-all duration-200 ease-in-out  rounded-xl   ">
                                <a class="text-green-700" >this month </a>
                                
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
import { useRouter } from 'vue-router';
import { computed, ref, onBeforeMount } from 'vue';
import Category from '../../components/Category/Category.vue';

export default {
    name: 'SelectionPage3',
    components: { SignupLayout, Category, Error, Loading },
    setup() {

        //props
        const pNumber = 3
        const buttonDisabled = ref(true)
        const notSelectedError = ref(false)


        // store
        const categoriesStore = useCategoriesStore()
        const languageStore = useLanguageStore()
        const userStore = useUserStore()
        const router = useRouter()











        return {
            //props
            pNumber,
            buttonDisabled,
            notSelectedError,

            //store
            categoriesStore,
            languageStore,
            userStore,
            router
        }
    },

}

</script>