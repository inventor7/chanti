<template>
    <SignupLayout prevLink="desc" :pageNumber="7" :isError="notSelectedError" :errorText="errorText" nextBtnText="Next"
        @handle="handleClick" :pageTitle="languageStore.getWord('pros')"
        :pageDesc="languageStore.getWord('consult_&_request')"
        componentLocation="selectionProcess" :navigationVisibility="false" :deleteBtnVisibility="false">



        <div class=" flex flex-row justify-center self-center mb-20  w-full flex-1 gap-3  items-center ">
            <div class=" flex flex-col  justify-center  items-center  w-full h-full   ">
                <Loading v-if="clientStore.loadingPosting" />
                <!-- results -->
                <div v-else class=" w-full md:w-1/2 h-full  rounded-2xl my-2 md:p-2">
                    <div v-if="clientStore.errorPosting.status"
                        class=" h-full w-full flex flex-col justify-center items-center ">
                        <Error class=" text-xl font-semibold " :error="clientStore.errorPosting.message" />
                    </div>

                    <!-- if providers empty -->
                    <div v-else class="w-full flex flex-col justify-center  items-center ">
                        <div v-if="!providerStore.$state.providers || providerStore.$state.providers.length == 0"
                            class="w-full h-full flex flex-col justify-center items-center ">
                            <Error class=" text-xl font-semibold whitespace-pre-line "
                                error="No compatible providers found." />
                        </div>

                        <!-- showing results -->
                        <div class=" flex flex-col justify-start items-center gap-2 w-full md:max-w-sm  overflow-auto  h-[70%]  "
                            v-else>


                            <div v-for="provider in  providerStore.$state.providers" :key="provider.id"
                                class="flex flex-col w-full h-fit  border-2 rounded-xl p-3  md:p-2 bg-white gap-2  drop-shadow-lg  hover:border-primary  border-gray-100">
                                <div class="flex items-center">
                                    <!-- <img class="rounded-full w-20 h-20" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" alt="Image Description"> -->
                                    <div
                                        class=" w-16 h-16 rounded-full bg-sky-800 mr-4 flex flex-col justify-center items-center ">
                                        <p class=" text-white text-base uppercase font-bold ">
                                            {{ provider.firstName.slice(0, 1)}}
                                            {{ provider.lastName.slice(0, 1) }}
                                        </p>
                                    </div>
                                    <div @click="showProfile(provider)" class="grow hover:cursor-pointer ">
                                        <h3 class=" text-xl md:text-xl sm:text-lg font-medium  text-gray-800">
                                            {{ provider.firstName }} {{ provider.lastName }}
                                        </h3>

                                        <div class=" flex flex-row justify-start items-center w-full sm:mt-3 space-x-1">

                                            <span class=" text-black  ">
                                                {{ provider.rating }}
                                            </span>

                                            <span class="material-icons text-primary text-sm">
                                                star
                                            </span>
                                        </div>

                                        <p class=" text-xs md:text-sm font-semibold text-gray-400">
                                            <span class="material-icons text-primary text-sm">
                                                location_on
                                            </span>
                                            {{ provider.CityName }}
                                        </p>
                                    </div>
                                    <div class="flex flex-col justify-center items-center w-fit ">
                                        <span class="material-icons text-xl"
                                            :class="{ 'text-secondary': provider.verified === 1, ' text-gray-300 ': provider.verified === 0 }">
                                            verified
                                        </span>
                                    </div>


                                </div>


                                <button v-show="!provider.btnLoading" v-if="provider.btnVisible"
                                    @click="handleSendRequest(provider.id)"
                                    class="btn  w-full btn-sm sm:btn-md  btn-primary rounded-xl text-white">
                                {{ languageStore.getWord('send_request') }}
                                </button>
                                <button v-show="!provider.btnLoading" @click="makePhoneCall(provider)" v-else
                                    class="btn h-12 text-lg font-semibold text-white btn-sm md:btn-md z-20 bg-success btn-success w-full gap-2">
                                    <span class="material-icons text-xl">
                                        phone
                                    </span>
                                    {{ provider.phoneNumber }}
                                </button>
                                <button v-show="provider.btnLoading"
                                    class="btn loading btn-sm sm:btn-md btn-primary rounded-3xl text-white">
                                </button>
                            </div>



                        </div>

                        <!-- End Col -->
                    </div>

                </div>
            </div>
        </div>

    </SignupLayout>

    <div class="fixed z-50 md:bottom-8 bg-white  flex justify-center    bottom-4 w-full px-4">
        <button v-show="!clientStore.btnLoadingAll && clientStore.$state.btnVisibleAll" @click="handleSendRequest('all')"
            class="btn self-center text-white   w-full md:w-1/3  btn-primary mt-2 rounded-xl btn-md ">
           {{ languageStore.getWord('publish') }}
        </button>
        <!-- Loading button -->
        <button v-show="clientStore.btnLoadingAll && !clientStore.$state.btnVisibleAll"
            class="btn w-full md:w-1/3 loading btn-primary btn-sm md:btn-md ">
        </button>
        <!-- disabled button -->
        <button v-show="!clientStore.btnLoadingAll && !clientStore.$state.btnVisibleAll"
            class="btn h-12 md:w-1/3 font-semibold text-success btn-sm md:btn-md z-20 bg-succes/10 border-success btn-primary w-full gap-2 cursor-not-allowed btn-disabled">
            <span class="material-icons text-success text-lg">
                check_circle
            </span>
            demande envoyée
        </button>
    </div>
    <!-- error -->
    <Toast :isVisible="clientStore.$state.errorRequesting.status" color="error"
        :message="clientStore.$state.errorRequesting.message" />

    <!-- success -->
    <Toast class=" z-50 bottom-0 " :isVisible="clientStore.$state.isSent" color="success"
        message="request sent successfully" />

    <Toast class=" z-50 bottom-0 " :isVisible="clientStore.$state.isSentAll" color="success"
        message="request sent successfully" />
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import Error from '../../components/Error.vue'
import Loading from '../../components/Loading.vue'
import Toast from '../../components/Toast.vue';
import Rating from '../../components/Rating.vue';
import { useUserStore } from '../../store/userStore';
import { useLanguageStore } from '../../store/AppBasic/languageStore';
import { useCategoriesStore } from '../../store/categoriesStore';
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore'
import { useClientStore } from '../../store/Client/clientStore';
import { useProviderStore } from '../../store/Provider/providerStore';
import { usePortfolioStore } from '../../store/Provider/portfolioStore';

import { useRouter } from 'vue-router';
import { computed, ref, onBeforeMount } from 'vue';
import Category from '../../components/Category/Category.vue';

export default {
    name: 'SelectionPage7',
    components: { SignupLayout, Category, Error, Loading, Toast, Rating },
    setup() {
        //props
        const notSelectedError = ref(false)


        // store
        const router = useRouter()
        const userStore = useUserStore()
        const languageStore = useLanguageStore()
        const categoriesStore = useCategoriesStore()
        const clientDemandeStore = useclientDemandeStore()
        const portfolioStore = usePortfolioStore()
        const clientStore = useClientStore()
        const providerStore = useProviderStore()

        //vars
        const errorText = ref('')

        const handleClick = () => {

        }

        const handleSendRequest = (providerId) => {
            clientStore.sendRequest(providerId, clientDemandeStore.$state.clientPostId).then((res) => {
                if (res.status == 200) {
                    if (providerId == 'all') {
                        clientStore.$state.isSentAll = true
                        clientStore.btnVisibleAll = false
                    } else {
                        clientStore.$state.isSent = true
                        providerStore.$state.providers.forEach((provider) => {
                            if (provider.id == providerId) {
                                provider.btnVisible = false
                            }
                        })
                    }


                    setTimeout(() => {
                        if (providerId == 'all') {
                            clientStore.$state.isSentAll = false
                        } else {
                            clientStore.$state.isSent = false
                        }
                    }, 3000);


                } else {
                    clientStore.$state.errorRequesting.status = true
                    clientStore.$state.errorRequesting.message = res.data.message
                    setTimeout(() => {
                        clientStore.$state.errorRequesting.status = false
                    }, 3000);
                }

            })





        }

        const makePhoneCall = (provider) => {
            window.open(`tel:${provider.phoneNumber}`)
        }

        const showProfile = (provider) => {
            //show profile based on the provider id
            portfolioStore.getProviderInfo(provider.id).then(() => {
            })

            portfolioStore.getProviderPosts(provider.id).then((res) => {

                providerStore.$state.provider.btnVisible = provider.btnVisible
            })
            router.push({
                name: 'profile',
                params: { name: provider.firstName + '-' + provider.lastName }
            })
        }

        return {
            //props
            notSelectedError,
            errorText,



            //store
            router,
            userStore,
            languageStore,
            providerStore,
            categoriesStore,
            clientDemandeStore,
            clientStore,


            //methods
            showProfile,
            handleClick,
            handleSendRequest,
            makePhoneCall
        }
    },

}

</script>

<style></style>