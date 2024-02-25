<template>
    <!-- <Error
        v-if="!notificationStore.loading && notificationStore.errorNotification.status && notificationStore.notificationPageVisibility" />
    <Loading
        v-if="notificationStore.loading && !notificationStore.errorNotification.status && notificationStore.notificationPageVisibility" />

    <div v-if="!notificationStore.errorNotification.status" class="w-full h-full"> -->


    <transition name="slideRight">
        <div v-if="clientDemandeStore.clientPostPageVisibility"
            class="bg-white right-0 top-0 w-screen md:w-5/12 xl:w-1/3  shadow-2xl overflow-y-scroll h-screen   z-[80] fixed">
            <div
                class=" flex fixed px-2 shadow-xl  w-screen md:w-5/12 xl:w-1/3 rounded-b-xl  bg-white h-16 z-10 top-0 flex-row justify-between items-center  ">
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
                        <img class=" object-cover h-full w-full max-h-[40vh] rounded-tl-xl  col-span-6 " alt="post image"
                            :src="getBase64Image(postImages[0].data)">
                        <div class="w-full col-span-6 gap-1 h-full overflow-hidden flex flex-col  ">
                            <img alt="post image" class=" object-cover h-full max-h-[20vh] rounded-tr-xl rounded "
                                :src="getBase64Image(postImages[1].data)">
                            <img alt="post image" class=" object-cover h-full max-h-[20vh] "
                                :src="getBase64Image(postImages[2].data)">
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


                <div class=" my-6 space-y-4 rounded-b-lg  ">
                    <h2 class="font-bold  text-2xl">{{
                        languageStore.getWord(categoriesStore.getCategoryById(post.categoryId)) }}
                    </h2>
                    <div class="w-full h-fit p-2 text-gray-400 rounded-md ">
                        <p class="text-xs  mb-2 ">#{{ post.id }}</p>
                        <div class="flex flex-col  justify-between items-start gap-2 w-full">
                            <div class="flex rounded-full flex-row gap-1  items-center self-start ">
                                <span class="material-icons text-primary text-sm">
                                    {{ post.urgency === 'urgent' ? 'hourglass_full' : post.urgency === 'low' ?
                                        'hourglass_empty' : post.urgency === 'normal' ? 'hourglass_bottom' :
                                            'hourglass_disabled' }}
                                </span>


                                <span class="text-sm">{{ post.urgency }}</span>
                            </div>

                            <p class="text-xs flex items-center gap-1  ">
                                <span class="material-icons text-center  text-sm text-primary">
                                    location_on
                                </span>
                                {{ wilayasStore.getWilayaById(post.stateId) }}
                            </p>
                            <p class="text-xs  flex items-center gap-1  text-gray-400">
                                <span class="material-icons text-center text-sm text-primary">
                                    access_time
                                </span>{{ formatTime(post.createdAt) }}
                            </p>
                        </div>
                        <h2 class=" text-base text-black font-semibold mt-5  " v-if="locationComponent != 'client'" >Description</h2>
                        <p class=" pl-1 text-black/40 text-xs mt-1">{{ post.description }}</p>
                    </div>
                </div>



                <div v-if="locationComponent==='client'"  class=" w-full h-full space-y-4  ">

                    <h2 class=" text-xl text-black/70 font-bold mb-3 ">Your Pros for the project</h2>
                    <div class=" w-full flex flex-col gap-4"
                        v-if="providersSentResponse && providersSentResponse.length === 0 && providersInterest && providersInterest.length === 0">
                        <p class="text-center text-gray-400 text-sm my-6 ">No providers responsed yet</p>
                        <div class=" w-full bg-info/20 p-4 rounded-md space-y-2 " v-if="!post.publish">
                            <p class=" flex flex-row justify-start items-center text-info text-sm gap-2 ">
                                <span class="material-icons text-info text-lg">
                                    info
                                </span>
                                You can publish the post to get more
                                providers
                            </p>
                            <button @click="publish(post.id)"
                                class="btn gap-2 btn-secondary btn-sm ml-4 sm:ml-0 text-white rounded-lg text-xs   ">
                                <span class="text-white text-sm">
                                    {{ languageStore.getWord('publish') }}
                                </span>
                                <div v-if="isLoading" class="loading animate-spin ">
                                    <svg class="animate-spin h-5 w-5 md:h-6 md:w-6" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                  3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>



                    <!-- Providers Responsed -->
                    <div v-if="!clientDemandeStore.loadingClientDemande" class="w-full space-y-3 box ">
                        <ProviderCard v-for="provider in providersSentResponse " :key="provider.id" :provider="provider"
                            type="responsed" componentLocation="ClientPostDetailsPage" />
                    </div>
                    <!-- Providers Interested -->
                    <div v-if="!clientDemandeStore.loadingClientDemande" class="w-full space-y-3 box ">
                        <ProviderCard v-for="provider in providersInterest" :key="provider.id" :provider="provider"
                            type="interested" componentLocation="ClientPostDetailsPage" />
                    </div>


                    <!-- Loading providers -->
                    <div v-if="clientDemandeStore.loadingClientDemande" class="w-full h-fit box">
                        <ProviderCardSqueleton />
                        <ProviderCardSqueleton />
                        <ProviderCardSqueleton />
                    </div>

                </div>
            </div>



            <!-- Action section -->
            <div v-if="locationComponent==='client'"
                class=" w-screen md:w-5/12 xl:w-1/3  fixed flex flex-col items-center justify-center right-0 z-50 bottom-0 px-2 py-2 bg-white   ">
                <div class=" post_action flex justify-between items-center  w-[95%] h-full py-1 gap-2 ">
                    <label for="delete-modal" @click="handleWorkStatus('delete')"
                        class=" btn btn-error btn-outline btn-sm text-white rounded-lg text-xs w-1/2  ">
                        Delete
                    </label> <button
                        :disabled="(providersSentResponse && providersSentResponse.length === 0 && providersInterest && providersInterest.length === 0)"
                        @click="handleWorkStatus('done')"
                        class=" btn btn-primary text-white btn-sm  rounded-lg text-xs w-1/2 ">
                        End Project
                    </button>
                </div>
            </div>

        </div>
    </transition>

    <!-- </div> -->
</template>

<script setup>
import Error from './Error.vue'
import ProviderCardSqueleton from '../components/Squeleton/ProviderCardSqueleton.vue'
import Loading from './Loading.vue'
import ProviderCard from './ProviderCard.vue';
import Alert from './Alert.vue';


import { useRouter } from 'vue-router';
import { useclientDemandeStore } from '../store/Client/clientDemandeStore';
import { useLanguageStore } from '../store/AppBasic/languageStore';
import { useCategoriesStore } from '../store/categoriesStore';
import { useClientStore } from '../store/Client/clientStore';
import { useTimeDifference } from '../composables/timeDifference';
import { computed, ref, defineComponent, onBeforeMount, defineProps } from 'vue'
import { useWilayasStore } from '../store/wilayasStore';


const props = defineProps({
    locationComponent: {
        type: String,
        default: 'client'
    }
})



//store
const clientDemandeStore = useclientDemandeStore()
const languageStore = useLanguageStore()
const clientStore = useClientStore()
const categoriesStore = useCategoriesStore()
const wilayasStore = useWilayasStore()
const router = useRouter()

//vars
const isLoading = ref(false)

//composables
const { timeDifference } = useTimeDifference()

//methods
const formatTime = (date) => timeDifference(date)

const handleClosePostPage = () => {
    clientDemandeStore.clientPostPageVisibility = false
    clientDemandeStore.selectedPost.images = []

}

const publish = (id) => {
    isLoading.value = true
    clientStore.sendRequest('all', id).then((res) => {
        isLoading.value = false
        if (res.status === 200) {
            clientDemandeStore.$state.selectedPost.publish = 1
        }

    })
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