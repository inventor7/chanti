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

                <!------------------------------------ Post Images ------------------------------------>
                <div v-if="clientDemandeStore.loadingPostImage"
                    class="w-full h-full flex flex-col items-center justify-center">
                    <div class="w-full h-[40vh] bg-gray-100 rounded-t-xl flex flex-col items-center justify-center">
                        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
                    </div>
                </div>

                <div v-if="postImages.length === 0 && !clientDemandeStore.loadingPostImage"
                    class="w-full h-[40vh] flex flex-col items-center justify-center">
                    <span class="material-icons text-9xl text-gray-300">image</span>
                    <p class="text-gray-300 text-xl">No images </p>
                </div>

                <div v-if="postImages.length != 0 || !clientDemandeStore.loadingPostImage" class="w-full h-full ">
                    <div v-if="postImages.length === 3" class="grid grid-cols-12 gap-1   grid-rows-1 w-full max-h-[40vh] ">
                        <img class=" object-cover h-full w-full max-h-[40vh] rounded-tl-xl  col-span-6 "
                            :src="getBase64Image(postImages[0].data)">
                        <div class="w-full col-span-6 gap-1 h-full overflow-hidden flex flex-col  ">
                            <img class=" object-cover h-full max-h-[20vh] rounded-tr-xl rounded "
                                :src="getBase64Image(postImages[1].data)">
                            <img class=" object-cover h-full max-h-[20vh] " :src="getBase64Image(postImages[2].data)">
                        </div>
                    </div>

                    <div v-if="postImages.length === 2" class="grid grid-cols-12 gap-1   grid-rows-1 w-full max-h-[40vh] ">
                        <img class=" object-cover w-full h-[40vh] rounded-tl-xl  col-span-6 "
                            :src="getBase64Image(postImages[0].data)">
                        <img class=" object-cover w-full h-[40vh] rounded-tr-xl  col-span-6 "
                            :src="getBase64Image(postImages[1].data)">

                    </div>

                    <img v-if="postImages.length === 1"
                        class=" object-cover h-full w-full max-h-[40vh] rounded-tl-xl  col-span-6 "
                        :src="getBase64Image(postImages[0].data)">
                </div>


                <!------------------------------------ Post Images ------------------------------------>


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



                <!-- Providers Responsed -->
                <h3 class="font-semibold text-secondary  rounded-t-xl bg-secondary/10 w-fit px-2 py-0.5   ">Providers
                    Responsed</h3>
                <div class=" border-secondary p-1 bg-secondary/10 rounded-b-xl rounded-tr-xl  ">
                    <div v-if="providersSentResponse && providersSentResponse.length === 0"
                        class="flex flex-col items-center justify-center w-full min-h-[50vh] ">
                        <span class="material-icons text-secondary text-6xl">sentiment_dissatisfied</span>
                        <p class="text-secondary text-sm">No providers responsed yet</p>
                    </div>
                    <div v-if="!clientDemandeStore.loadingClientDemande" class="w-full space-y-3 box ">
                        <ProviderCard v-for="provider in providersSentResponse " :key="provider.id" :provider="provider"
                            type="responsed" componentLocation="ClientPostDetailsPage" />
                    </div>
                </div>


                <!-- Providers Interested -->
                <h3 class="mt-8 font-semibold text-primary  rounded-t-xl bg-primary/10 w-fit px-2 py-0.5   ">Providers
                    Interested </h3>
                <div class=" border-primary p-1 bg-primary/10 rounded-b-xl rounded-tr-xl  ">
                    <div v-if="providersInterest && providersInterest.length === 0"
                        class="flex flex-col items-center justify-center w-full min-h-[50vh] ">
                        <span class="material-icons text-primary text-6xl">sentiment_dissatisfied</span>
                        <p class="text-primary text-sm">No providers interested yet</p>
                    </div>
                    <div v-if="!clientDemandeStore.loadingClientDemande" class="w-full space-y-3 box ">
                        <ProviderCard v-for="provider in providersInterest" :key="provider.id" :provider="provider"
                            type="interested" componentLocation="ClientPostDetailsPage" />
                    </div>
                </div>

                <div v-if="clientDemandeStore.loadingClientDemande" class="w-full h-fit box">
                    <ProviderCardSqueleton />
                    <ProviderCardSqueleton />
                    <ProviderCardSqueleton />
                    <ProviderCardSqueleton />
                    <ProviderCardSqueleton />
                    <ProviderCardSqueleton />
                </div>
            </div>

            <div v-if="post.status === 'pending'"
                class="w-full md:w-[50vw]  fixed flex flex-col items-center justify-center right-0 z-50 bottom-0 px-2 py-2 bg-white   ">
                <div class="grid grid-rows-1 grid-cols-12 bg-transparent w-full  ">
                    <label for="delete-modal" @click="handleWorkStatus('delete')"
                        class="btn  btn-sm text-error btn-ghost hover:bg-error hover:text-white col-span-5  w-full px-0  ">
                        Delete
                    </label>
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
import ProviderCardSqueleton from '../components/Squeleton/ProviderCardSqueleton.vue'
import Loading from './Loading.vue'
import ProviderCard from './ProviderCard.vue';
import Alert from './Alert.vue';

import { useRouter } from 'vue-router';
import { useclientDemandeStore } from '../store/Client/clientDemandeStore';
import { useLanguageStore } from '../store/AppBasic/languageStore';
import { useCategoriesStore } from '../store/categoriesStore';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { useTimeDifference } from '../composables/timeDifference';
import { computed, ref, defineComponent, onBeforeMount } from 'vue'
import { useWilayasStore } from '../store/wilayasStore';

export default defineComponent({
    name: 'ClientPostDetailsPage',
    components: {
        Error,
        Loading,
        ProviderCard,
        Alert,
        ProviderCardSqueleton
    },
    setup() {

        //store
        const clientDemandeStore = useclientDemandeStore()
        const languageStore = useLanguageStore()
        const notificationStore = useNotificationStore()
        const categoriesStore = useCategoriesStore()
        const authStore = useAuthStore()
        const wilayasStore = useWilayasStore()
        const router = useRouter()

        //composables
        const { timeDifference } = useTimeDifference()

        //methods
        const formatTime = (date) => timeDifference(date)

        const handleClosePostPage = () => {
            clientDemandeStore.clientPostPageVisibility = false
            clientDemandeStore.selectedPost.images = []
            
        }

        const handleWorkStatus = (status) => {
            if (status === 'delete') {
                clientDemandeStore.PostToDelte = post.value
            } else {
                clientDemandeStore.clientPostPageVisibility = false
                clientDemandeStore.RatingPageVisibility = true
            }

        }





        let post = computed(() => {
            return clientDemandeStore.$state.selectedPost
        })

        let postImages = computed(() => {
            if (clientDemandeStore.$state.selectedPost.images) {
                return clientDemandeStore.$state.selectedPost.images
            } else {
                return []
            }
        })


        let providersSentResponse = computed(() => {
            return clientDemandeStore.$state.selectedPost.providersSentResponse
        })

        let providersInterest = computed(() => {
            return clientDemandeStore.$state.selectedPost.providersSentInterest
        })

        function getBase64Image(imgData) {
            const base64 = btoa(
                new Uint8Array(imgData).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            );
            return `data:image/jpeg;base64,${base64}`;
        }

        return {
            //store
            clientDemandeStore,
            languageStore,
            categoriesStore,
            wilayasStore,
            router,

            //vars
            post,
            postImages,

            //methods
            handleClosePostPage,
            formatTime,
            handleWorkStatus,
            getBase64Image,


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