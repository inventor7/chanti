<template>
    <Loading v-if="loading" />
    <div v-else class="w-full h-full">
        <Error v-if="providerStore.errorrProvider.status"
            class="h-screen w-full flex items-center justify-center text-lg font-semibold "
            :error="providerStore.errorrProvider.message" />
        <div v-else class="w-full h-full">

            <!-- navigation back -->
            <!-- <div class="w-full flex flex-row justify-between items-center p-4 ">
                <div class="flex flex-row justify-start items-center gap-2">

                    <span class="text-sm font-semibold text-gray-500">

                    </span>
                </div>
            </div> -->

            <!-- Card Section -->
            <div class="max-w-4xl px-1 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <form>
                    <!-- Card -->
                    <div class="bg-white rounded-xl shadow ">
                        <div
                            class="relative top-0 h-40 rounded-t-xl bg-[url('../assets/OIG.jpg')] bg-cover bg-center bg-no-repeat">
                            <!-- <div class="absolute top-1 btn  btn-circle left-1">
                                <button type="button"
                                    class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm ">
                                    <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" viewBox="0 0 16 16">
                                        <path
                                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                        <path
                                            d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                    </svg>
                                    Upload header
                                </button>
                                <span class="material-icons  text-white cursor-pointer" @click="router.replace({ name: 'results' })">
                                    arrow_back_ios
                                </span>
                            </div> -->
                        </div>

                        <div class="pt-0  p-2 sm:pt-0 sm:p-7">
                            <!-- Grid -->
                            <div class=" space-y-3 sm:space-y-6">
                                <div>
                                    <label class="sr-only">
                                        Product photo
                                    </label>

                                    <div class="flex justify-start items-start flex-row gap-x-5">
                                        <img class="-mt-8 relative z-10 inline-block h-24 w-24  rounded-full ring-4 ring-yellow-500 "
                                            src="../assets/OIG.jpg" alt="Image Description">
                                        <div class="flex flex-1 flex-row    justify-end items-center gap-1">
                                            <div
                                                class=" px-2 text-2xl btn btn-secondary  bg-blue-100 text-blue-700 -mt-6 z-10 border-none   w-fit">
                                                <span class=" self-center ">5</span>
                                                <span class="material-icons self-center text-primary">
                                                    star
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class=" flex flex-col ">
                                    <label for="af-submit-app-project-name"
                                        class=" flex flex-row text-2xl font-bold   text-gray-800 mt-1 ">
                                        <span class="self-center">
                                            {{ provider.firstName }} {{ provider.lastName }}
                                        </span>
                                        <span class="material-icons text-secondary self-center ml-2 text-xl">
                                            verified
                                        </span>
                                    </label>
                                    <!-- location -->
                                    <div class="flex text-sm flex-row justify-start items-center pt-1 gap-1">
                                        <span class="material-icons text-sm text-gray-500">
                                            location_on
                                        </span>
                                        <span class=" font-medium text-gray-500">
                                            {{ wilayasStore.getWilayaById(provider.stateId) }}
                                        </span>

                                    </div>
                                </div>

                                <div>
                                    <span class="inline-block text-lg font-medium text-gray-700 ">
                                        {{ languageStore.getWord(provider.category.name) }}
                                    </span>
                                    <p class=" w-full text-sm font-medium text-gray-600 ">
                                        Lorem ipsum dolor sit, amet consectetur and adipisicing elit. Eos vero a eligendi ab
                                        sed
                                        dolores beatae </p>
                                    <div class="space-x-1">
                                        <span v-for=" subcat in provider.subCategories" :key="subcat.id"
                                            class="inline-block mt-2 text-[12px] bg-secondary/20 py-0.5 px-2 rounded-xl font-medium text-secondary ">
                                            {{ languageStore.getWord(subcat.name) }}
                                        </span>
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <div
                                        class="mt-4 sm:mt-auto sm:mb-1.5 flex flex-1 flex-rox justify-between md:justify-start items-center  gap-2">
                                        <button type="button"
                                            class="py-2 btn btn-sm h-10 font-bold text-white  px-3 inline-flex justify-center items-center gap-2  border btn-primary  shadow-sm align-middle  ">
                                            <span class="material-icons">
                                                send
                                            </span>
                                            request
                                        </button>
                                        <button type="button"
                                            class="py-2 btn btn-sm px-3 font-bold inline-flex justify-center items-center gap-2 h-10 border  btn-secondary btn-outline  shadow-sm align-middle  ">

                                            <span class="material-icons ">
                                                chat_bubble
                                            </span>
                                            message

                                        </button>
                                    </div>
                                </div>




                            </div>
                            <!-- End Grid -->


                        </div>
                    </div>
                    <!-- End Card -->
                </form>


                <div class="flex flex-row rounded-xl bg-gray-400/20 text-center justify-between p-2 items-center w-full  sm:w-full mt-3 gap-1 ">
                    <!-- Stats -->
                    <div>
                        <p class="mt-2 sm:mt-3 text-xl font-bold text-blue-500">2,00+</p>
                        <p class="  text-gray-400">projects with Chanti</p>
                    </div>
                    <!-- End Stats -->

                    <!-- Stats -->
                    <!-- <div >
                        <p class="mt-2 sm:mt-3 text-xl font-bold text-blue-500">2,000+</p>
                        <p class="mt-1 text-gray-400">partner with Preline</p>
                    </div> -->
                    <!-- End Stats -->

                    <!-- Stats -->
                    <div>
                        <p class="mt-2 sm:mt-3 text-xl font-bold text-blue-500">85%</p>
                        <p class=" text-gray-400">saying it's worth it</p>
                    </div>
                    <!-- End Stats -->
                </div>
                <!-- End Grid -->


                <div class="flex mt-4 flex-col bg-white  shadow-sm rounded-xl">
                    <div class=" border-b rounded-t-xl pt-3 ">
                        <nav class="flex space-x-2" aria-label="Tabs">
                            <!-- Tab 1 -->
                            <button
                                class="flex items-center justify-center border-2 transition-all duration-300 ease-in-out w-full h-full py-2 text-sm font-medium text-gray-500 rounded-t-xl "
                                :class="{ ' text-primary border-2 bg-white ': selectedTab === 2 }" @click="selectedTab = 2">
                                <span class="material-icons">
                                    work
                                </span>
                                <span class="ml-2">portfolio</span>
                            </button>

                            <!-- Tab 2 -->
                            <button
                                class="flex items-center justify-center border-2 transition-all duration-300 ease-in-out w-full h-full py-2 text-sm font-medium text-gray-500 rounded-t-xl "
                                :class="{ ' text-primary border-2 bg-white ': selectedTab === 1 }" @click="selectedTab = 1">
                                <span class="material-icons">
                                    reviews
                                </span>
                                <span class="ml-2">reviws</span>
                            </button>
                        </nav>
                    </div>

                    <div class="p-4 text-center md:py-7 md:px-5">
                        
                        <div v-if="selectedTab === 1">
                            <Tab2 :rating="provider.rating" />
                        </div>
                        <div v-if="selectedTab === 2">
                            <Tab3 />
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Card Section -->
        </div>
    </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";
import Tab1 from "../components/Tab1.vue";
import Tab2 from "../components/Tab2.vue";
import Tab3 from "../components/Tab3.vue";
import Rating from "../components/Rating.vue";
import { useclientDemandeStore } from "../store/clientDemandeStore";
import { useProviderStore } from "../store/providerStore";
import { useLanguageStore } from "../store/languageStore";
import { useWilayasStore } from "../store/wilayasStore";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import { ref } from "vue";
import router from "../router";
export default {
    name: "Profile",
    components: {
        Rating,
        Loading,
        Error,
        Tab1,
        Tab2,
        Tab3,
    },
    setup() {

        //store
        const clientDemandeStore = useclientDemandeStore()
        const providerStore = useProviderStore()
        const authStore = useAuthStore()
        const languageStore = useLanguageStore()
        const wilayasStore = useWilayasStore()
        const router = useRouter()


        //computed
        let provider = computed(() => {
            if(providerStore.$state.provider)
                return providerStore.$state.provider
            else
                return authStore.$state.userAuth
        })
        let loading = computed(() => providerStore.loading)

        //tab
        const selectedTab = ref(2);
        const selectTab = (tab) => {
            selectedTab.value = tab;
        };

        const handleGoHome = () => {
            clientDemandeStore.emptyFields()
            providerStore.$state.provider = null
            router.replace({ name: "home" })
        }

        const handleGoBack = () => {
            router.replace({ name: "results" })
        }



        return {
            clientDemandeStore,
            provider,
            providerStore,
            languageStore,
            wilayasStore,
            loading,
            selectedTab,
            selectTab,
            handleGoHome,
            handleGoBack,
            router
        };
    },
};

</script>
