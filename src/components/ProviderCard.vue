<template>
    <loading-indicator-vue v-if="isLoading" class="top-[18px] right-2" />
    <div
        class="flex flex-row justify-start items-center w-full gap-2 sm:gap-3 shadow-md rounded-lg bg-white  border-t-2 border-x-2 p-2 ">


        <label tabindex="0" class="btn btn-ghost bg-sky-700 text-white btn-circle avatar">
            <!-- get the first letter of the firstname and lastname -->
            {{ provider.firstName[0] }} {{ provider.lastName[0] }}
        </label>
        <div @click="showProfile(provider)" class=" flex flex-col justify-start items-center  w-full py-3 gap-1  h-fit cursor-pointer ">
            <div class="relative flex flex-row justify-start items-end w-full  gap-2 ">
                <label v-if="componentLocation === 'RatingClientPage'" class="absolute w-full z-30 cursor-pointer h-full  "
                    for="alert-modal"></label>
                <div class="flex flex-col justify-start items-start w-full h-full font-semibold ">
                    <div class="flex flex-row justify-start ">
                        <p class="text-xl first-letter:uppercase  ">{{ provider.firstName }} {{ provider.lastName }}</p>
                        <span class="material-icons text-secondary self-center ml-2 text-lg">
                            verified
                        </span>
                    </div>

                </div>
            </div>
            <div class="flex flex-row justify-between items-center w-full">

                <div class="flex flex-row justify-center items-center gap-0.5  rounded-full  bg-transparent">
                    <span class="material-icons text-yellow-400 self-center text-sm ">
                        star
                    </span>
                    
                    <span v-if="provider.rating" class="text-sm font-bold text-[#282827]">
                        {{ provider.rating }} <span class=" text-xs ">({{ provider.ratingCount }})</span>
                    </span>
                    <span v-else class="text-sm font-bold text-primary">0</span>

                    <span class="text-gray-400 text-sm " v-if="!provider.rating">
                        (0)
                    </span>
                </div>
                <div class="flex flex-row justify-start items-center w-fit gap-2">
                    <p v-if="provider.status === 'pending'"
                        class="text-xs bg-warning/20 text-warning flex flex-row gap-1 items-center px-2 py-[1px] rounded-md">
                        pending
                    </p>
                    <p v-if="provider.status === 'accepted' || provider.status === 'accept'"
                        class="text-xs bg-success/20 text-success flex flex-row gap-1 items-center  px-2 py-[1px] rounded-md">
                        accept
                    </p>
                    <p v-if="provider.status === 'decline' || provider.status === 'declined'"
                        class="text-xs bg-error/20 text-error flex flex-row gap-1 items-center px-2 py-[1px] rounded-md">
                        decline
                    </p>
                </div>
            </div>

            <!-- Butoons -->
            <div class="relative flex flex-row w-full gap-2  justify-start items-start  ">
                <!-- Interested -->
                <!-- show accept and decline button when the client didn't responsed yet -->
                <div v-if="type === 'interested' && provider.status === 'pending'"
                    class="flex flex-row w-full gap-2  justify-start items-start">
                    <button @click="handleCallPro(provider, 'accepted')"
                        class="btn btn-sm h-10 w-full md:w-fit flex-1 btn-success flex flex-row justify-center items-center gap-2 text-white">
                        Accept
                    </button>
                    <button @click="handleCallPro(provider, 'declined')"
                        class="btn btn-sm h-10 btn-primary w-full md:w-fit flex-1   flex flex-row justify-center items-center gap-2 text-white">
                        Decline
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import LoadingIndicatorVue from './LoadingIndicator.vue';

import { defineComponent, ref } from 'vue';
import { useclientDemandeStore } from '../store/Client/clientDemandeStore';
import { usePortfolioStore } from '../store/Provider/portfolioStore';
import { useProviderStore } from '../store/Provider/providerStore';
import { useRatingStore } from '../store/ratingStore';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'ProviderCard',
    components: {
        LoadingIndicatorVue
    },
    props: {
        provider: {
            type: Object,
            required: true
        },
        type: {
            type: String,
        },
        componentLocation: {
            type: String,
        }
    },
    setup(props) {

        //store 
        const clientDemandeStore = useclientDemandeStore()
        const portfolioStore = usePortfolioStore()
        const providerStore = useProviderStore()
        const router = useRouter()
        const ratingStore = useRatingStore()

        //vars
        const selectedPost = clientDemandeStore.$state.selectedPost
        const isLoading = ref(false)

        //methods
        const showProfile = (provider) => {
            //show profile based on the component location 
            if (props.componentLocation != 'RatingClientPage') {
                //in case of client profile
                if (provider.status != 'declined') {
                    isLoading.value = true
                    portfolioStore.getProviderInfo(provider.id).then((res) => {
                        isLoading.value = false
                        router.push({
                            name: 'profile',
                            params: { name: provider.firstName + '-' + provider.lastName }
                        })
                        portfolioStore.getProviderPosts(provider.id).then((res) => {

                            if (res.status === 200) {
                                providerStore.$state.provider.notificationId = provider.notificationId
                                providerStore.$state.provider.type = props.type
                                providerStore.$state.provider.status = provider.status
                                if (props.type === 'interested') {
                                    if (provider.status === 'pending') {
                                        providerStore.$state.provider.btnVisible = true
                                        providerStore.$state.provider.interestedIndicator = true
                                    }
                                    else {
                                        providerStore.$state.provider.btnVisible = false
                                        providerStore.$state.provider.interestedIndicator = false
                                    }

                                }
                                if (props.type === 'responsed') {
                                    providerStore.$state.provider.interestedIndicator = false
                                    providerStore.$state.provider.btnVisible = false
                                    if (provider.status === 'pending' || provider.status === 'accept' || provider.status === 'accepted') { providerStore.$state.provider.btnVisible = false }
                                    if (provider.status === 'decline' || provider.status === 'declined') { providerStore.$state.provider.btnVisible = true }
                                }
                            }
                        })
                    })


                } else {
                }


            } else { //in case of rating page we don't go to profile , we select the provider to rate
                ratingStore.selectedProviderToRate = provider
            }

        }

        const handleCallPro = (provider, status) => {
            if (props.type === 'interested' && provider.status === 'pending') {
                //sending a request to mark as selected to show the phone number
                clientDemandeStore.changeProviderStatus(provider.notificationId, status).then((res) => {
                    if (res.status === 200) {
                        provider.status = status
                    }
                })
            }

            //call the provider directly
            if ((props.type === 'interested' && provider.status === 'accepted') || props.type === 'responsed') {
                window.open(`tel:${provider.phoneNumber}`)
            }
        }



        return {
            //store
            clientDemandeStore,
            portfolioStore,
            providerStore,

            //vars
            selectedPost,
            isLoading,

            //methods
            showProfile,
            handleCallPro
        }
    }
})

</script>

<style></style>