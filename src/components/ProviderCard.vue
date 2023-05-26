<template>
    <div
        class=" flex flex-col justify-start items-start shadow-md rounded-xl bg-white  border-t-2 border-x-2 mb-2 p-2 w-full  h-fit cursor-pointer ">
        <div @click="showProfile(provider)" class="relative flex flex-row justify-start items-end w-full p-1  gap-2 ">
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
            <div class="flex flex-row justify-start items-center w-fit gap-2">
                <p v-if="provider.status === 'pending'"
                    class="text-sm bg-warning/20 text-warning flex flex-row gap-1 items-center px-2 py-[1px] rounded-xl">
                    pending
                    <span class="material-icons text-warning self-center text-sm">
                        pending_actions
                    </span>
                </p>
                <p v-if="provider.status === 'accepted' || provider.status === 'accept'"
                    class="text-sm bg-success/20 text-success flex flex-row gap-1 items-center  px-2 py-[1px] rounded-xl">
                    accept
                    <span class="material-icons text-success  self-center text-sm">
                        check_circle
                    </span>
                </p>
                <p v-if="provider.status === 'decline' || provider.status === 'declined'"
                    class="text-sm bg-error/20 text-error flex flex-row gap-1 items-center px-2 py-[1px] rounded-xl">
                    decline
                    <span class="material-icons text-error  self-center text-sm">
                        cancel
                    </span>
                </p>
            </div>

            <div class="flex flex-row justify-center items-center gap-0.5  rounded-full  bg-transparent">
                <span v-if="provider.rating" class="text-lg md:text-lg font-bold text-primary">
                    {{ provider.rating }} ({{ provider.ratingCount }})
                </span>
                <span v-else class="text-lg md:text-lg font-bold text-primary">0</span>
                <span class="material-icons text-primary self-center text-lg md:text-lg">
                    star
                </span>
                <span class="text-gray-400 text-sm " v-if="!provider.rating">
                    (0)
                </span>
            </div>

        </div>

        <div v-if="provider.status != 'declined'" class="divider my-0 "></div>
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
            <!-- show phone number if the client accept interest of the provider -->
            <button v-if="(provider.status === 'accepted' && type === 'interested')"
                @click="handleCallPro(provider, 'null')"
                class="btn  btn-xs text-[16px] h-10  w-full flex flex-row justify-center items-center gap-2 ">
                <span class="material-icons">
                    call
                </span>
                {{ provider.phoneNumber }}
            </button>



            <!-- Responsed -->
            <!-- only show phone number if the provider accept the request or still didn't answer -->
            <button v-if="((provider.status === 'pending' || provider.status === 'accept') && type === 'responsed')"
                @click="handleCallPro(provider, 'null')"
                class="btn  btn-xs text-[16px] h-10  w-full flex flex-row justify-center items-center gap-2 ">
                <span class="material-icons">
                    call
                </span>
                {{ provider.phoneNumber }}
            </button>

        </div>

    </div>
</template>

<script>

import { defineComponent } from 'vue';
import { useclientDemandeStore } from '../store/Client/clientDemandeStore';
import { usePortfolioStore } from '../store/Provider/portfolioStore';
import { useProviderStore } from '../store/Provider/providerStore';
import { useRatingStore } from '../store/ratingStore';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'ProviderCard',
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

        //methods
        const showProfile = (provider) => {
            //show profile based on the component location 
            if (props.componentLocation != 'RatingClientPage') {
                //in case of client profile
                if (provider.status != 'declined') {
                    portfolioStore.getProviderInfo(provider.id).then((res) => {
                        portfolioStore.getProviderPosts(provider.id).then((res) => {
                            console.log(' provider Posts')
                            console.log(res)
                            if (res.status === 200) {
                                providerStore.$state.provider.notificationId = provider.notificationId
                                providerStore.$state.provider.type = props.type
                                providerStore.$state.provider.status = provider.status
                                if (props.type === 'interested') {
                                    console.log('success to interested providers')
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
                                    console.log('success to responsed providers')
                                    if (provider.status === 'pending' || provider.status === 'accept' || provider.status === 'accepted') { providerStore.$state.provider.btnVisible = false }
                                    if (provider.status === 'decline' || provider.status === 'declined') { providerStore.$state.provider.btnVisible = true }
                                }
                            }
                        })
                    })

                    router.push({
                        name: 'profile',
                        params: { name: provider.firstName + '-' + provider.lastName }
                    })
                } else {
                    console.log('provider is declined you , you can not see his profile')
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
                        console.log('Marked as selected ', res)
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

            //methods
            showProfile,
            handleCallPro
        }
    }
})

</script>

<style></style>