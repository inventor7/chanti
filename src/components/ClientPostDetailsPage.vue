<template>
    <!-- <Error
        v-if="!notificationStore.loading && notificationStore.errorNotification.status && notificationStore.notificationPageVisibility" />
    <Loading
        v-if="notificationStore.loading && !notificationStore.errorNotification.status && notificationStore.notificationPageVisibility" />

    <div v-if="!notificationStore.errorNotification.status" class="w-full h-full"> -->

    <transition name="slideRight">
        <div v-if="clientDemandeStore.clientPostPageVisibility"
            class="bg-white right-0 top-0 w-screen md:w-1/2  shadow-2xl overflow-y-scroll h-screen   z-[80] fixed">
            <div
                class=" flex fixed px-2 shadow-xl  w-screen md:w-1/2 rounded-b-xl  bg-white h-16 z-10 top-0 flex-row justify-between items-center  ">
                <button class=" btn-circle " @click="handleClosePostPage">
                    <span class="material-icons text-primary font-bold md:text-2xl text-lg ">
                        arrow_back_ios
                    </span>
                </button>
                <span class="text-2xl font-bold text-primary">#23</span>
                <button class=" btn-circle opacity-0 ">
                    <span class="material-icons text-primary font-bold md:text-2xl text-lg ">
                        arrow_forward_ios
                    </span>
                </button>
            </div>
            <div class="flex flex-col pb-16 overflow-y-scroll px-2 pt-20 font-semibold w-full h-full">
                <div class="grid grid-cols-12 gap-1   grid-rows-1 w-full max-h-[40vh] ">
                    <img class=" object-cover h-full w-full max-h-[40vh] rounded-tl-xl  col-span-6 " src="../assets/OIG.jpg"
                        alt="">
                    <div class="w-full col-span-6 gap-1 h-full overflow-hidden flex flex-col  ">
                        <img class=" object-cover h-full max-h-[20vh] rounded-tr-xl rounded " src="../assets/OIG.jpg"
                            alt="">
                        <img class=" object-cover h-full max-h-[20vh] " src="../assets/OIG.jpg" alt="">
                    </div>
                </div>

                <div class="pt-1 mb-6 rounded-b-lg  border-2 ">
                    <h2 class="font-bold pt-2 pl-1 mb-1  text-xl">{{
                        languageStore.getWord(categoriesStore.getCategoryById(post.categoryId)) }}
                    </h2>
                    <div class="w-full h-fit bg-gray-300/30  rounded-lg px-2 pt-3 ">
                        <p class="text-xs text-gray-500 mb-2 ">{{ post.id }}</p>
                        <div class="flex flex-row  justify-between items-center w-full">
                            <div class="flex  px-2 rounded-full flex-row gap-1 items-center self-start " :class="{
                                'text-red-500 bg-red-500/20': post.urgency === 'urgent',
                                'text-yellow-500 bg-yellow-500/20': post.urgency === 'normal',
                                'text-green-500 bg-green-500/20': post.urgency === 'low',
                                'text-blue-500 bg-blue-500/20': post.urgency === 'unplanned',
                            }">
                                <span class="material-icons text-sm" :class="{
                                        'text-red-500': post.urgency === 'urgent',
                                        'text-yellow-500': post.urgency === 'normal',
                                        'text-green-500': post.urgency === 'low',
                                        'text-blue-500': post.urgency === 'unplanned',
                                    }">
                                    {{ post.urgency === 'urgent' ? 'hourglass_full' : post.urgency === 'low' ?
                                        'hourglass_empty' : post.urgency === 'normal' ? 'hourglass_bottom' :
                                            'hourglass_disabled' }}
                                </span>


                                <span class="text-sm">{{ post.urgency }}</span>
                            </div>

                            <p class="text-xs flex items-center text-gray-400 mr-2 ">
                                <span class="material-icons text-center text-sm text-primary">
                                    location_on
                                </span>
                                {{ wilayasStore.getWilayaById(post.stateId) }}
                            </p>
                            <p class="text-xs  text-gray-400">{{ formatTime(post.createdAt) }}</p>
                        </div>
                        <p class="pl-1 pb-2  mt-4">{{ post.description }}</p>
                    </div>



                </div>


                <h3 class="text-sm font-semibold text-gray-500  rounded-tr-xl bg-gray-500/10 w-fit px-2 py-0.5   ">Providers
                </h3>
                <div class="divider mt-0 mb-1 "></div>

                <!-- providers list -->
                <!-- no providers yet -->
                <div v-if="providersSentResponse && providersSentResponse.length === 0 && providersInterest && providersInterest.length === 0"
                    class="flex flex-col items-center justify-center w-full h-full">
                    <span class="material-icons text-gray-400 text-6xl">sentiment_dissatisfied</span>
                    <p class="text-gray-400 text-sm">No providers yet</p>
                </div>



                <div class="w-full">
                    <ProviderCard v-for="provider in providersSentResponse " :key="provider.id" :provider="provider"
                        type="responsed" componentLocation="ClientPostDetailsPage" />
                </div>

                <div class="w-full">
                    <ProviderCard v-for="provider in providersInterest" :key="provider.id" :provider="provider"
                        type="interested" componentLocation="ClientPostDetailsPage" />
                </div>

                <div v-if="post.status != 'pending'">
                    
                </div>
            </div>

            <div v-if="post.status === 'pending'"
                class="w-full md:w-[50vw]  fixed flex flex-col items-center justify-center right-0 z-50 bottom-0 px-2 py-2 bg-white   ">
                <div class="grid grid-rows-1 grid-cols-12 bg-transparent w-full  ">
                    <button @click="handleWorkStatus('delete')"
                        class="btn  btn-sm text-error btn-ghost hover:bg-error hover:text-white col-span-5  w-full px-0  ">
                        Delete
                    </button>
                    <div class="divider col-span-2 mx-0 divider-horizontal "></div>
                    <button
                        :disabled="(providersSentResponse && providersSentResponse.length === 0 && providersInterest && providersInterest.length === 0)"
                        @click="handleWorkStatus('done')"
                        class="btn  btn-sm  whitespace-nowrap text-success hover:bg-success hover:text-white col-span-5 btn-ghost  w-full  px-0  ">
                        Mark Done
                    </button>
                </div>

            </div>



        </div>
    </transition>

    <!-- </div> -->
</template>

<script>
import Error from './Error.vue'
import Loading from './Loading.vue'
import ProviderCard from './ProviderCard.vue';

import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import { useclientDemandeStore } from '../store/Client/clientDemandeStore';
import { useLanguageStore } from '../store/AppBasic/languageStore';
import { useCategoriesStore } from '../store/categoriesStore';
import { useNotificationStore } from '../store/notificationStore';
import { useTimeDifference } from '../composables/timeDifference';
import { computed, ref, onBeforeMount } from 'vue'
import { useWilayasStore } from '../store/wilayasStore';

export default defineComponent({
    name: 'ClientPostDetailsPage',
    components: {
        Error,
        Loading,
        ProviderCard
    },
    setup() {

        //store
        const clientDemandeStore = useclientDemandeStore()
        const languageStore = useLanguageStore()
        const notificationStore = useNotificationStore()
        const categoriesStore = useCategoriesStore()
        const wilayasStore = useWilayasStore()
        const router = useRouter()

        //composables
        const { timeDifference } = useTimeDifference()

        //methods
        const formatTime = (date) => timeDifference(date)

        const handleClosePostPage = () => {
            clientDemandeStore.clientPostPageVisibility = false
            if (router.currentRoute.value.name != 'clientPosts') {
                notificationStore.notificationPageVisibility = true
            }
        }

        const handleWorkStatus = (status) => {
            clientDemandeStore.clientPostPageVisibility = false
            clientDemandeStore.RatingPageVisibility = true
        }




        //computed
        let post = computed(() => {
            return clientDemandeStore.$state.selectedPost
        })

        let providersSentResponse = computed(() => {
            return clientDemandeStore.$state.selectedPost.providersSentResponse
        })

        let providersInterest = computed(() => {
            return clientDemandeStore.$state.selectedPost.providersSentInterest
        })




        return {
            //store
            clientDemandeStore,
            languageStore,
            categoriesStore,
            wilayasStore,
            router,

            //vars
            post,

            //methods
            handleClosePostPage,
            formatTime,
            handleWorkStatus,


            //computed
            providersSentResponse,
            providersInterest,
        }
    }
})
</script>


<style>
.slideRight-enter-active,
.slideRight-leave-active {
    transition: all 0.3s ease;
}

.slideRight-enter-from,
.slideRight-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.slideRight-enter-to,
.slideRight-leave-from {
    opacity: 1;
    transform: translateX(0%);
}
</style>