<template>
    <div class=" h-screen " :data-theme="themeStore.$state.theme">
        <div class=" md:flex md:flex-col md:justify-center md:items-center    md:py-6 max-h-screen  h-full w-full ">
            <div class=" flex flex-col  justify-start items-start w-full md:w-11/12  h-full  gap-2 sm:pb-2  rounded-2xl sm:shadow-2xl ">
                <!-- Title and description -->
                <div class="w-full bg-primary relative md:rounded-t-2xl gap-1 sm:gap-2  px-3 py-1 ">
                    <h2 class="text-2xl font-bold text-white "> {{ pageTitle }}</h2>
                    <p class="text-slate-200 text-xs sm:text-sm font-medium "> <span class="text-error">*</span> {{ pageDesc }} </p>

                    <!-- go home -->
                    <div class="absolute  top-1 right-2    block  text-white text-xl sm:text-base  ">
                        <span class="material-icons  text-2xl sm:text-3xl md:text-4xl ">
                            <label class="cursor-pointer" for="alert-modal"
                                v-if="componentLocation === 'selectionProcess' && deleteBtnVisibility">
                                delete
                            </label>
                            <label class="cursor-pointer" @click="handleGoHome" v-else> cancel </label>
                        </span>
                    </div>
                </div>

                <!-- the content -->

                <div ref="content" class="  overflow-auto next  h-fit  flex-1 w-full slide  px-2 sm:px-4 ">
                    <slot></slot>
                </div>



                <div dir="ltr" v-if="navigationVisibility"
                    class=" flex md:static fixed bottom-0 right-0 left-0 bg-white md:py-0 py-2 md:border-0 border-2 flex-row  w-full justify-center items-center pb-1 sm:pb-1  px-2 sm:px-3  gap-2  ">

                    <!-- the back button ((off at first page)) -->
                    <router-link class=" flex-1 flex-grow " :class="{ 'opacity-0  btn-disabled  ': backBtnVisibility }"
                        :to="{ name: prevLink }">
                        <button @click="handleBack"
                            class="btn h-10 sm:h-0 text-white btn-sm  whitespace-nowrap sm:btn-md btn-secondary btn-outline w-fit  gap-0 ">
                            <span class="material-icons -xs sm:text-lg hidden sm:block ">
                                chevron_left
                            </span>
                            {{ languageStore.getWord('back') }}
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

                    <!-- the progress bar -->
                    <ul v-else
                        class=" box  flex flex-1 border-gray-300  felx-row justify-between items-center border-2 gap-1 sm:gap-2 text-w  px-1 sm:px-2 py-[3px]  sm:py-1 rounded-2xl sm:border-2  "
                        ref="steps">
                        <NavigationNumber v-if="userStore.user.userType === 'provider'" v-for=" one in 6 " :num="one"
                            :pageNumber="pageNumber" />
                        <NavigationNumber v-else v-for=" one in 4 " :num="one" :pageNumber="pageNumber" />

                    </ul>

                    <!--  The Next button -->
                    <router-link class=" flex-1 flex-grow flex bg-white felx-row justify-end   " :to="{ name: nextLink }">
                        <button @click="handleNext"
                            class=" btn h-10 sm:h-0  text-white btn-sm whitespace-nowrap  sm:btn-md  btn-primary gap-0  ">
                            {{ languageStore.getWord('next') }}
                            <span v-show="nextBtnText == 'next'"
                                class="material-icons text-sm sm:text-lg hidden sm:block  ">
                                navigate_next
                            </span>
                        </button>
                    </router-link>

                </div>


            </div>




        </div>
        <Alert @handleCloseBtn="handleCancelDemande" closeBtnText="ok" toggleBtnText="Delete"
            message="do you really want to clear the Demeande ?" />
    </div>
</template>
<script>
import Navbar from '../../components/Navbar.vue'
import NavigationNumber from '../../components/NavigationNumber.vue'
import Alert from '../../components/Alert.vue';
import { useThemeStore } from '../../store/AppBasic/themeStore';
import { useCategoriesStore } from '../../store/categoriesStore';
import { useUserStore } from '../../store/userStore';
import { useLanguageStore } from '../../store/AppBasic/languageStore';
import { useWilayasStore } from '../../store/wilayasStore';
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore'
import { ref, onBeforeMount, watch } from 'vue'
import { useRouter } from 'vue-router'
export default {
    name: 'Signup',
    components: { Navbar, NavigationNumber, Alert },
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
            default: 'next'
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
        },
        componentLocation: {
            type: String,
            default: 'signup'
        },
        navigationVisibility: {
            type: Boolean,
            default: true
        },
        deleteBtnVisibility: {
            type: Boolean,
            default: true
        },

    },


    setup(props, context) {



        const transition = ref('back')
        const content = ref(null)

        //store
        const categoriesStore = useCategoriesStore()
        const userStore = useUserStore()
        const languageStore = useLanguageStore()
        const wilayasStore = useWilayasStore()
        const themeStore = useThemeStore()
        const router = useRouter()
        const clientDemandeStore = useclientDemandeStore()

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
            userStore.$state.userType = 'client'
            router.push({ name: 'home' })
        }

        onBeforeMount(() => {
            if (props.componentLocation == 'selectionProcess') {
                themeStore.theme = 'clientTheme'
            }
        })

        const handleCancelDemande = () => {
            //delete all the data
            categoriesStore.emptyFields()
            clientDemandeStore.emptyFields()
            clientDemandeStore.requestinProgress = false
            wilayasStore.emptyFields()
            router.push({ name: 'home' })
        }






        return {
            //store
            categoriesStore,
            userStore,
            wilayasStore,
            languageStore,

            //props
            themeStore,

            //vars 
            transition,

            //methods
            handleCancelDemande,
            handleNext,
            handleBack,
            handleGoHome
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