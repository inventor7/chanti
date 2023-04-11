<template>
    <SignupLayout prevLink="emergency" :pageNumber="7" :isError="notSelectedError" :errorText="errorText" nextBtnText="Next"
        @handle="handleClick" pageTitle="Local Providers"
        pageDesc=" Select a provider to send your request to and check their profiles ">

        <div class=" flex flex-row justify-around w-full h-full flex-1 gap-3  items-start ">
            <div class=" flex flex-col  justify-center items-center gap-3 w-full h-full ">
                <Loading v-if="loading" />
                <!-- results -->
                <div v-else class="w-full h-full">
                    <div v-if="clientDemandeStore.$state.errorClientDemande.status"
                        class=" h-full w-full flex flex-col justify-center items-center ">
                        <Error class=" text-xl font-semibold whitespace-pre-line "
                            :error="clientDemandeStore.$state.errorClientDemande.message" />
                    </div>

                    <!-- if providers empty -->
                    <div v-else class="w-full h-full">
                        <div v-if="!clientDemandeStore.$state.providers || clientDemandeStore.$state.providers.length == 0"
                            class="w-full h-full flex flex-col justify-center items-center ">
                            <Error class=" text-xl font-semibold whitespace-pre-line "
                                error="No compatible providers found." />
                        </div>

                        <!-- showing results -->
                        <div class=" flex flex-col justify-center items-center gap-2 md:gap-4 w-full h-full" v-else>

                            <div v-for="provider in  clientDemandeStore.$state.providers" :key="provider.id"
                                class="flex flex-col w-11/12 sm:w-10/12 md:w-1/2 rounded-xl p-3  md:p-2 bg-white border-2 hover:border-primary  border-gray-300">
                                <div class="flex items-center gap-x-4">
                                    <!-- <img class="rounded-full w-20 h-20" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" alt="Image Description"> -->
                                    <div @click="showProfile(provider)" class="grow hover:cursor-pointer ">
                                        <h3 class=" text-md sm:text-lg font-medium text-gray-800">
                                            {{ provider.firstName }} {{ provider.lastName }}
                                        </h3>
                                        <p class="text-xs uppercase text-gray-500">
                                            {{
                                                languageStore.getWord(categoriesStore.categories[clientDemandeStore.$state.request.categoryId].name)
                                            }}
                                        </p>
                                    </div>
                                    <button v-show="!provider.RequestisLoading" v-if="provider.BtnVisible"
                                        @click="handleSendRequest(provider.id)"
                                        class="btn btn-sm sm:btn-md btn-primary rounded-3xl text-white">
                                        send request
                                    </button>
                                    <button v-show="!provider.RequestisLoading" v-else disabled
                                        class="btn btn-disabled btn-sm sm:btn-md btn-success ">
                                        request sent
                                    </button>
                                    <button v-show="provider.RequestisLoading"
                                        class="btn loading btn-sm sm:btn-md btn-primary rounded-3xl text-white">
                                    </button>

                                </div>

                                <div class="  sm:mt-3 space-x-1">

                                    <Rating :rating="provider.rating" />

                                </div>

                            </div>
                        </div>
                        <!-- End Col -->
                    </div>
                </div>


                <Toast :duration="3000" :isVisible="requestProviderStore.$state.errorrequestProvider.status" color="error"
                    :message="requestProviderStore.$state.errorrequestProvider.message" />
                <Toast :duration="3000" :isVisible="requestProviderStore.$state.isSent" color="success"
                    message="request sent successfully" />
            </div>
        </div>

    </SignupLayout>
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import Error from '../../components/Error.vue'
import Loading from '../../components/Loading.vue'
import Toast from '../../components/Toast.vue';
import Rating from '../../components/Rating.vue';
import { useUserStore } from '../../store/userStore';
import { useLanguageStore } from '../../store/languageStore';
import { useCategoriesStore } from '../../store/categoriesStore';
import { useclientDemandeStore } from '../../store/clientDemandeStore';
import { userequestProviderStore } from '../../store/requestProviderStore';
import { useProviderStore } from '../../store/providerStore';
import { useRouter } from 'vue-router';
import { computed, ref, watch, reactive, watchEffect } from 'vue';
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
        const requestProviderStore = userequestProviderStore()
        const providerStore = useProviderStore()

        //vars
        const errorText = ref('')

        const handleClick = () => {

        }

        const handleSendRequest = (providerId) => {
            requestProviderStore.sendRequest(providerId, clientDemandeStore.$state.requestResponse.clientPostId).then((res) => {
                if (res.status == 200) {
                    requestProviderStore.$state.isSent = true
                    setTimeout(() => {
                        requestProviderStore.$state.isSent = false
                    }, 3000);
                }
            })

            clientDemandeStore.$state.providers.forEach((provider) => {
                if (provider.id == providerId) {
                    provider.BtnVisible = false
                    clientDemandeStore.$state.selectedProvider = provider

                }
            })
        }

        let loading = computed(() => {
            return clientDemandeStore.$state.loading
        })

        watchEffect(() => {
            if (!Object.keys(clientDemandeStore.$state.selectedProvider).length == 0) {
                clientDemandeStore.$state.selectedProvider.RequestisLoading = requestProviderStore.$state.loading
            }
        })

        const showProfile = (provider) => {
            //show profile based on the provider id
            router.replace({
                name: 'profile',
                params: { name: provider.firstName + '-' + provider.lastName }
            })
            providerStore.getProviderData(provider.id).then((res) => {
                if (res.status == 200) {
                   console.log(res)
                } else {
                    console.log('error')
                }
            })


        }

        return {
            //props
            notSelectedError,
            errorText,

            //computed
            loading,


            //store
            router,
            userStore,
            languageStore,
            categoriesStore,
            clientDemandeStore,
            requestProviderStore,


            //methods
            showProfile,
            handleClick,
            handleSendRequest
        }
    },

}

</script>

<style></style>