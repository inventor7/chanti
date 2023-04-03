<template>
    <div class=" h-screen " :data-theme="themeStore.theme">
        <div class=" md:flex md:flex-col md:justify-center md:items-center    md:py-6 max-h-screen  h-full w-full ">
            <div class=" flex flex-col  justify-start items-start w-full md:w-11/12  h-full  gap-2 sm:pb-2  rounded-2xl sm:shadow-2xl ">
                <!-- Title and description -->
                <div class="w-full bg-primary relative md:rounded-t-2xl gap-1 sm:gap-2  px-3 py-1 ">
                    <h2 class="text-2xl font-bold text-white "> {{ pageTitle }}</h2>
                    <p class="text-slate-200 text-xs sm:text-sm font-medium "> <span class="text-error">*</span> {{
                        pageDesc }} </p>

                    <!-- go home -->
                    <div class="absolute  top-1 right-2  block  text-white text-xl sm:text-base  "
                     @click="handleGoHome"   >
                        <span class="material-icons text-2xl ">
                            cancel
                        </span>
                    </div>
                </div>

                <!-- the content -->

                <div ref="content" class=" next bg-white flex-1 w-full slide  px-2 sm:px-4 ">
                    <slot></slot>
                </div>



                <div dir="ltr" class=" flex  flex-row  w-full justify-center items-center pb-1 sm:pb-1  px-2 sm:px-3  gap-2  ">

                    <!-- the back button ((off at first page)) -->
                    <router-link class=" flex-1 flex-grow " :class="{ 'opacity-0  btn-disabled  ': backBtnVisibility }"
                        :to="{ name: prevLink }">
                        <button @click="handleBack"
                            class="btn text-white btn-sm  whitespace-nowrap sm:btn-md btn-secondary btn-outline w-fit  gap-0 ">
                            <span class="material-icons -xs sm:text-lg hidden sm:block ">
                                chevron_left
                            </span>
                            Back
                        </button>
                    </router-link>


                    <!-- show the progress bar if no error else show error -->
                    <div v-if="isError" class="alert box w-fit text-xs sm:text-sm  py-2 sm:py-3   alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="stroke-current hidden sm:block flex-shrink-0 h-6 w-6" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span> {{ errorText }} </span>
                        </div>
                    </div>

                    <ul v-else
                        class=" box flex flex-1 border-gray-300  felx-row justify-between items-center border-2 gap-1 sm:gap-2 text-w  px-1 sm:px-2 py-[3px]  sm:py-1 rounded-2xl sm:border-2  "
                        ref="steps">
                        <NavigationNumber v-for=" one in 6 " :num="one" :pageNumber="pageNumber" />
                    </ul>

                    <!--  The Next button -->
                    <router-link class=" flex-1 flex-grow flex bg-white felx-row justify-end   " :to="{ name: nextLink }">
                        <button @click="handleNext"
                            class=" btn  text-white btn-sm whitespace-nowrap  sm:btn-md  btn-primary gap-0  ">
                            {{ nextBtnText }}
                            <span v-show="nextBtnText == 'Next'"
                                class="material-icons text-sm sm:text-lg hidden sm:block  ">
                                navigate_next
                            </span>
                        </button>
                    </router-link>

                </div>


            </div>



        </div>
    </div>
</template>
<script>
import Navbar from '../../components/Navbar.vue'
import NavigationNumber from '../../components/NavigationNumber.vue'
import { useThemeStore } from '../../store/themeStore';
import { useCategoriesStore } from '../../store/categoriesStore';
import { useUserStore } from '../../store/userStore';
import { useWilayasStore } from '../../store/wilayasStore';
import { ref, onBeforeMount , onUpdated } from 'vue'
import { useRouter } from 'vue-router'
export default {
    name: 'Signup',
    components: { Navbar, NavigationNumber },
    props: {
        //for passing custom event to next and back btn
        emit: Function,

        //if there's an error type of 'not selected cat or sub-cat'
        isError: {
            type: Boolean,
            default: false
        },
        errorText: {
            type: String,
            default: null
        },

        //define where to go ((props on next and back btn))
        nextLink: {
            type: String,
            default: null
        },
        prevLink: {
            type: String,
            default: null
        },

        //define the page number for the progress bar
        pageNumber: {
            type: Number
        },

        //to disable nextbtn

        //to change the "next" btn to "done" btn
        nextBtnText: {
            type: String,
            default: 'Next'
        },

        //the second button on the next which fires handle function


        //to hide the backBtn at the first page 
        backBtnVisibility: {
            type: Boolean,
            default: false
        },

        //title and desc of the page
        pageTitle: {
            type: String
        },
        pageDesc: {
            type: String
        }

    },


    setup(props, context) {
        const themeStore = useThemeStore()
        const transition = ref('back')
        const content = ref(null)
        const router = useRouter()

        //store
        const categoriesStore = useCategoriesStore()
        const userStore = useUserStore()
        const wilayasStore = useWilayasStore()

        
        const handleNext = () => {
            context.emit('handle', true);
        }

        const handleBack = () => {
            context.emit('handleBack', true);
        }

        const handleGoHome = () => {
            //delete all the data
            categoriesStore.emptyFields()
            userStore.emptyFields()
            wilayasStore.emptyFields()
            router.push({ name: 'home' })
        }



        return {
            themeStore, handleNext, handleBack, transition,handleGoHome
        }
    },




}
</script>

<style>
/* fix the animation to make it look like it's slide */

.box {
    opacity: 0;
    animation: fade-in 0.5s ease-in-out forwards;
}



@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* slide translate */
.slide {
    animation: slide 0.5s ease-in-out forwards;

}

@keyframes slide {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0%);
    }
}

.slide-back {
    animation: slide-back 1s ease-out forwards;

}

@keyframes slide-back {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0%);
    }
}
</style>