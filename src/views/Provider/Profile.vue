<template>
    <!-- navigation back -->
    <div
        class="w-full fixed z-50 top-0 bg-white rounded-b-xl shadow-xl h-fit flex flex-row justify-between items-center px-3 py-2 ">
        <button class=" btn-circle " @click="handleGoHome">
            <span class="material-icons text-primary font-bold md:text-2xl text-lg ">
                arrow_back_ios
            </span>
        </button>

        <span v-if="providerIsAuth" class="material-icons md:text-3xl text-2xl  text-secondary cursor-pointer"
            @click="router.push({ name: 'editProfile', params: { id: provider.id } })">
            edit_square
        </span>
    </div>




    <ErrorPage v-if="!portfolioStore.loadingPortfolio && portfolioStore.errorPortfolio.status"
        :error="portfolioStore.errorPortfolio.message" />
    <Loading v-if="portfolioStore.loadingPortfolio && !portfolioStore.errorPortfolio.status" />
    <div v-if="!portfolioStore.loadingPortfolio && !portfolioStore.errorPortfolio.status" class="w-full h-full">
        <!-- Card Section -->
        <div class="max-w-4xl mt-20 px-1 sm:px-6 lg:px-8 lg:py-1 mx-auto">

            <!-- Card -->
            <div class="bg-white rounded-xl shadow ">
                <div class="relative top-0 h-52 md:h-[60vh] rounded-t-xl   bg-cover bg-center bg-no-repeat">
                    <img class="w-full h-full object-cover object-top md:object-cover rounded-t-xl" :src="`../assets/${backgImg}`"
                        alt="Image Description">


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
                            </div> -->
                </div>

                <div class="pt-0  p-2 sm:pt-0 sm:p-7">
                    <!-- Grid -->
                    <div class=" space-y-3 sm:space-y-6">
                        <div>
                            <label class="sr-only">
                                Product photo
                            </label>

                            <!-- <div class="flex justify-start items-start flex-row gap-x-5">
                                <img class="-mt-8 relative z-10 inline-block h-24 w-24  rounded-full ring-4 ring-yellow-500 "
                                    src="../../src/assets/OIG.jpg" alt="Image Description">
                                <div class="flex flex-1 flex-row    justify-end items-center gap-1">
                                    <div
                                        class=" px-2 text-2xl btn btn-secondary  bg-blue-100 text-blue-700 -mt-6 z-10 border-none   w-fit">
                                        <span class=" self-center ">5</span>
                                        <span class="material-icons self-center text-primary">
                                            star
                                        </span>
                                    </div>
                                </div>
                            </div> -->
                        </div>


                        <div class=" flex flex-col space-y-2 ">
                            <label for="af-submit-app-project-name"
                                class=" flex flex-row text-2xl font-bold   text-gray-800 mt-1 ">
                                <span class="self-center mb-1 first-letter:uppercase ">
                                    {{ provider.firstName }} {{ provider.lastName }}
                                </span>
                                <span class="material-icons text-secondary self-center ml-2 text-xl">
                                    verified
                                </span>
                            </label>
                            <!-- <div v-if="!provider.btnVisible && !provider.btnLoading"
                                class="flex box flex-row justify-start items-center gap-1">
                                <span class="material-icons   text-primary">
                                    phone
                                </span>
                                <span class=" font-medium text-gray-500">
                                    {{ provider.phoneNumber }}
                                </span>
                            </div> -->

                            <!-- email -->
                            <!-- <div class="flex flex-row justify-start items-center pt-1 gap-1">
                                    <span class="material-icons   text-primary">
                                        email
                                    </span>
                                    <span class=" font-medium text-gray-500">
                                        {{ provider.email }}
                                    </span>
                                </div> -->

                            <!-- location -->
                            <div class="flex  flex-row justify-start items-center pt-1 gap-1">
                                <span class="material-icons  text-primary">
                                    location_on
                                </span>
                                <span class=" font-medium text-gray-500">
                                    {{ wilayasStore.getWilayaById(provider.stateId) }} , {{ provider.city }}
                                </span>

                            </div>
                        </div>

                        <div>
                            <span class="inline-block text-lg font-medium text-gray-700 ">
                                {{ languageStore.getWord(provider.category.name) }}
                            </span>
                            <p class=" w-full text-sm font-medium text-gray-600 ">
                                votre solution pratique pour tous vos besoins de réparation, rénovation et entretien
                                résidentiel. Nos experts en bricolage qualifiés vous offrent des services fiables et
                                professionnels pour embellir votre maison et en prendre soin. </p>
                            <div class="space-x-1">
                                <span v-for=" subcat in provider.subcategories" :key="subcat.id"
                                    class="inline-block mt-2 text-[12px] bg-secondary/20 py-0.5 px-2 rounded-xl font-medium text-secondary ">
                                    {{ languageStore.getWord(subcat.name) }}
                                </span>
                            </div>
                        </div>

                        <div v-if="!providerIsAuth" class="space-y-2">
                            <div
                                class="mt-4 sm:mt-auto sm:mb-1.5 flex flex-1 w-full flex-row justify-center md:justify-start items-center  gap-2">

                                <!-- request buttons -->
                                <button v-if="provider.btnVisible && !provider.btnLoading && !provider.interestedIndicator"
                                    @click="handleSendRequest(provider.id)"
                                    class="btn w-full sm:w-1/2 md:w-fit btn-sm h-10 py-2  font-bold text-white  px-3 inline-flex justify-center items-center gap-2  border btn-primary  shadow-sm align-middle  ">
                                    <span class="material-icons">
                                        send
                                    </span>
                                  {{ languageStore.getWord('request') }}
                                </button>

                                <button @click="makePhoneCall"
                                    v-if="!provider.btnVisible && (provider.status === 'accepted' || provider.status === 'pending') && !provider.btnLoading && !provider.interestedIndicator"
                                    class="btn w-full sm:w-1/2 md:w-fit h-12 text-lg font-semibold text-white btn-sm md:btn-md z-20 bg-success btn-success gap-2">
                                    <span class="material-icons text-xl ">
                                        phone
                                    </span>
                                    {{ provider.phoneNumber }}
                                </button>

                                <button
                                    v-if="!provider.btnVisible && provider.status === 'declined' && !provider.btnLoading && !provider.interestedIndicator"
                                    class="btn w-full btn-error sm:w-1/2 md:w-fit h-12 text-lg font-semibold text-error btn-sm md:btn-md z-20 bg-error/20 btn-disabled  gap-2">
                                    <span class="material-icons text-error text-xl ">
                                        cancel
                                    </span>
                                    Declined
                                </button>

                                <!-- Interested or no -->
                                <button v-if="provider.interestedIndicator && !provider.btnLoading"
                                    @click="handleCallPro(provider, 'accepted')"
                                    class="btn btn-sm h-10 w-full md:w-fit flex-1 btn-success flex flex-row justify-center items-center gap-2 text-white">
                                    Accept
                                </button>
                                <button v-if="provider.interestedIndicator && !provider.btnLoading"
                                    @click="handleCallPro(provider, 'declined')"
                                    class="btn btn-sm h-10 btn-primary w-full md:w-fit flex-1   flex flex-row justify-center items-center gap-2 text-white">
                                    Decline
                                </button>
                                <!-- end Interested or no -->

                                <!-- loading  button -->
                                <button v-if="!provider.btnVisible && provider.btnLoading"
                                    class="py-2 loading btn w-full sm:w-1/2 md:w-fit btn-sm h-10 font-bold text-white  px-3 inline-flex justify-center items-center gap-2  border btn-primary  shadow-sm align-middle  ">
                                    <span class="material-icons">
                                        loop
                                    </span>
                                </button>

                                <!-- end request buttons -->

                            </div>
                        </div>




                    </div>
                    <!-- End Grid -->


                </div>
            </div>
            <!-- End Card -->



            <!-- <div
                class="flex flex-row rounded-xl bg-gray-400/20 text-center justify-between md:justify-around  p-2 items-center w-full  sm:w-full mt-3 gap-1 ">
                Stats
                <div>
                    <p class="mt-2 sm:mt-3 text-xl font-bold text-blue-500">2,00+</p>
                    <p class="  text-gray-400">projects with Chanti</p>
                </div>
                End Stats

                Stats
                <div >
                        <p class="mt-2 sm:mt-3 text-xl font-bold text-blue-500">2,000+</p>
                        <p class="mt-1 text-gray-400">partner with Preline</p>
                    </div>
                End Stats

                Stats
                <div>
                    <p class="mt-2 sm:mt-3 text-xl font-bold text-blue-500">85%</p>
                    <p class=" text-gray-400">saying it's worth it</p>
                </div>
                End Stats
            </div> -->
            <!-- End Grid -->


            <div class="flex px-1 mt-4 flex-col bg-white  shadow-sm rounded-xl">
                <div class=" border-b rounded-t-xl pt-3 pb-2 ">
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
                            <span class="ml-2">avis</span>
                        </button>
                    </nav>
                </div>

                <div class="  text-center md:py-7 mb-4 md:px-5">

                    <div v-if="selectedTab === 1">
                        <RatingSection :rating="provider.rating" />
                    </div>
                    <div v-if="selectedTab === 2">
                        <ProviderPosts :key="1" />
                    </div>
                </div>
            </div>
        </div>
        <!-- End Card Section -->
    </div>
</template>

<script>
import { computed, onMounted, onBeforeMount } from "vue";
import Loading from "../../components/Loading.vue";
import Error from "../../components/Error.vue";
import ProviderPosts from "../../components/ProviderPosts.vue";
import RatingSection from "../../components/RatingSection.vue";
import Rating from "../../components/Rating.vue";
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore'
import { usePortfolioStore } from "../../store/Provider/portfolioStore";
import { useClientStore } from "../../store/Client/clientStore";
import { useProviderStore } from "../../store/Provider/providerStore";
import { useLanguageStore } from "../../store/AppBasic/languageStore";
import { useWilayasStore } from "../../store/wilayasStore";
import { useUserStore } from "../../store/userStore";
import { useNotificationStore } from "../../store/notificationStore";
import { useCategoriesStore } from "../../store/categoriesStore";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "vue-router";
import { ref } from "vue";
import router from "../../router";
import ErrorPage from "../ErrorPage.vue";
export default {
    name: "Profile",
    components: {
        Rating,
        Loading,
        Error,
        RatingSection,
        ProviderPosts,
        ErrorPage
    },
    setup() {

        //store
        const clientDemandeStore = useclientDemandeStore()
        const providerStore = useProviderStore()
        const portfolioStore = usePortfolioStore()
        const authStore = useAuthStore()
        const clientStore = useClientStore()
        const userStore = useUserStore()
        const languageStore = useLanguageStore()
        const notificationStore = useNotificationStore()
        const wilayasStore = useWilayasStore()
        const categoriesStore = useCategoriesStore()
        const router = useRouter()


        const handleSendRequest = (providerId) => {
            clientStore.sendRequest(providerId, clientDemandeStore.$state.clientPostId).then((res) => {
                if (res.status == 200) {
                    clientStore.$state.isSent = true
                    setTimeout(() => {
                        clientStore.$state.isSent = false
                    }, 3000);
                }

            })

            provider.value.btnVisible = false

            providerStore.$state.providers.map((provider) => {
                if (provider.id == providerId) {
                    provider.btnVisible = false
                }
            })
        }


        //computed
        let provider = computed(() => {
            return providerStore.$state.provider
        })

        let loading = computed(() => providerStore.loading)

        let backgImg = computed(() => {
            switch (provider.value.category.name) {
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

        //tab
        const selectedTab = ref(2);
        const selectTab = (tab) => {
            selectedTab.value = tab;
        };

        const handleGoHome = () => {

            providerStore.$state.provider.status = provider.value.status

            if (provider.value.type === 'interested') { //update the status for going back
                clientDemandeStore.$state.selectedPost.providersSentInterest.forEach((pro) => {
                    if (pro.id === provider.value.id) {
                        pro.status = provider.value.status; // use assignment operator to update status property

                    }
                });
            }
            if (provider.value.type === 'responsed') {
                clientDemandeStore.$state.selectedPost.providersSentResponse.forEach((pro) => {
                    if (pro.id === provider.value.id) {
                        pro.status = provider.value.status; // use assignment operator to update status property

                    }
                });
            }

            //update notification status
            notificationStore.getClientNotification(authStore.$state.userAuth.id)
            router.go(-1)

        }


        //
        const handleGoBack = () => {
            router.push({ name: "results" })
        }

        let providerIsAuth = computed(() => {
            return authStore.$state.userAuth.id === providerStore.$state.provider.id
        })

        //
        const makePhoneCall = () => {
            window.open(`tel:${provider.value.phoneNumber}`)
        }

        const handleCallPro = (provider, status) => {
            clientDemandeStore.changeProviderStatus(provider.notificationId, status).then((res) => {
                if (res.status === 200) {
                    provider.status = status
                    provider.interestedIndicator = false
                    provider.btnVisible = false
                }
            })
        }



        return {
            //store
            providerStore,
            clientDemandeStore,
            languageStore,
            wilayasStore,
            categoriesStore,
            portfolioStore,
            authStore,
            userStore,
            router,

            //computed
            provider,
            loading,
            selectedTab,
            providerIsAuth,
            backgImg,

            //methods
            selectTab,
            handleGoHome,
            handleGoBack,
            handleSendRequest,
            makePhoneCall,
            handleCallPro

        };
    },
};

</script>
