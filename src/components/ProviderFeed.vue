<template>
    <div class="flex flex-col max-w-lg gap-6 w-full">
        <Loading v-if="feedPostsStore.loadingFeed && !feedPostsStore.errorFeedPosts.status"
            class=" fixed right-0 left-0 top-0 bottom-0 z-50" />
        <Error v-if="feedPostsStore.errorFeedPosts.status && !feedPostsStore.loadingFeed"
            class=" fixed right-0 left-0 top-0 bottom-0 z-50" />
        <div v-if="!feedPostsStore.loadingFeed && !feedPostsStore.errorFeedPosts.status"
            class="w-full min-h-[85vh] pt-0 md:pt-6 ">
            <div v-if="feedPosts === null || feedPosts.length === 0"
                class=" flex flex-col justify-center items-center h-[80vh] ">
                <img class=" w-2/3 md:w-1/3" src="../assets/no_projects.svg" alt="no_projects">
                <span class="text-gray-400 text-lg font-semibold">No posts yet in your area</span>
            </div>

            <transition-group v-else name="post" tag="div" mode="out-in">

                <div @click="showProject(post)" v-for="post in feedPosts" :key="post.id"
                    class=" group hover:border-primary border border-black/10 post-container flex flex-col w-full group mb-4 bg-white  shadow-sm rounded-xl overflow-hidden hover:shadow-lg cursor-pointer  transition">
                    <div class="   h-[40vh] rounded-t-xl overflow-hidden">
                        <img v-if="!post?.image"
                            class="notification-item h-full group-hover:scale-[1.05]  w-full aspect-auto  object-cover object-center  transition-transform duration-500 ease-in-out rounded-t-xl"
                            :src="`/${backgImg}`" :alt="`${backgImg}`">
                        <img v-else
                            class="notification-item h-full  group-hover:scale-[1.05] w-full  object-cover object-center  transition-transform duration-500 ease-in-out rounded-t-xl"
                            :src="getPostImage(post)" :alt="getPostImage(post)">
                    </div>
                    <div class="notification-item space-y-2 p-2 md:p-3">
                        <div class="flex flex-col gap-2">
                            <div class="flex flex-row justify-between items-center  ">
                                <div>
                                    <h3 class="text-2xl font-semibold text-gray-800">
                                        {{ languageStore.getWord(post.subcategoryName) }}</h3>
                                    <label
                                        class="inline-block text-[14px] bg-secondary/20 py-0.5 px-2 rounded-xl font-medium text-secondary ">
                                        #{{ post.id.substring(0, 5) }}..
                                    </label>
                                </div>


                                <div class="flex flex-row gap-2 self-start  items-center">
                                    <span class="material-icons text-2xl text-primary">
                                        arrow_forward_ios
                                    </span>
                                </div>

                            </div>
                        </div>


                        <div class="flex  flex-row gap-1">
                            <span class="material-icons text-primary text-lg">
                                location_on
                            </span>
                            <!-- {{ wilayasStore.getCommuneById(post.stateId) }} -->
                            <span class="text-gray-500 text-sm self-center ">{{
                                wilayasStore.getWilayaById(post.stateId)
                            }},{{ post.cityName }}</span>
                        </div>
                        <div class="flex flex-row  justify-between items-center">
                            <div class="flex pl-0.5 flex-row gap-1">
                                <span class="material-icons text-primary self-center text-lg">
                                    schedule
                                </span>
                                <span class="text-gray-500 text-sm self-center">{{ formatTime(post.createdAt) }}</span>
                            </div>
                            <div class="flex mt-1 px-2 rounded-full flex-row gap-1 items-center self-start " :class="{
                                'text-red-500 bg-red-500/20': post.urgency === 'urgent',
                                'text-yellow-500 bg-yellow-500/20': post.urgency === 'normal',
                                'text-green-500 bg-green-500/20': post.urgency === 'low',
                                'text-blue-500 bg-blue-500/20': post.urgency === 'unplanned',
                            }">
                                <span class="material-icons text-lg" :class="{
                                    'text-red-500': post.urgency === 'urgent',
                                    'text-yellow-500': post.urgency === 'normal',
                                    'text-green-500': post.urgency === 'low',
                                    'text-blue-500': post.urgency === 'unplanned',
                                }">
                                    {{ post.urgency === 'urgent' ? 'hourglass_full' : post.urgency === 'low' ?
                                        'hourglass_empty' : post.urgency === 'normal' ? 'hourglass_bottom' :
                                            'hourglass_disabled' }}
                                </span>


                                {{ post.urgency }}
                            </div>
                        </div>

                        <div class=" w-full h-full   ">
                            <div class="w-full">
                                <button v-if="post.btnVisible && !post.btnLoading" @click="sendInterest(post.id)"
                                    class="btn flex-1 font-bold w-full  cursor-pointer z-20  gap-1 btn-sm sm:btn-md text-white btn-primary rounded-lg -white">
                                    demander
                                </button>

                                <button v-if="!post.btnVisible && post.btnLoading" @click="sendInterest(post.id)"
                                    class="btn loading flex-1 font-bold w-full  cursor-pointer z-20  gap-1 btn-sm sm:btn-md btn-outline btn-primary rounded-lg -white">
                                    loading
                                </button>


                                <button v-if="!post.btnVisible && !post.btnLoading"
                                    class="btn btn-sm md:btn-md z-20 bg-success/10 btn-primary w-full gap-2 cursor-not-allowed btn-disabled">
                                    <span class="material-icons text-success text-sm md:text-lg">
                                        check_circle
                                    </span>
                                    <span class="text-sm md:text-lg font-bold text-success">Request sent</span>
                                </button>
                            </div>
                        </div>
                        <!--  -->
                    </div>
                </div>

            </transition-group>
        </div>
    </div>
    <Toast :duration="5000" class="bottom-0 z-50" :color="errorColor" :isVisible="errorStatus" :message="errorMessage" />
</template>

<script setup >

import Loading from './Loading.vue'
import Error from './Error.vue'
import Toast from './Toast.vue'
import { ref, computed, onMounted, watch, onBeforeMount } from 'vue'
import { useTimeDifference } from '../composables/timeDifference.js'
import { useclientDemandeStore } from '../store/Client/clientDemandeStore'
import { useFeedPostsStore } from '../store/Provider/feedPostsStore';
import { useProviderStore } from '../store/Provider/providerStore';
import { useWilayasStore } from '../store/wilayasStore';
import { useLanguageStore } from '../store/AppBasic/languageStore';
import { useAuthStore } from '../store/authStore';

//store
const providerStore = useProviderStore();
const clientDemandeStore = useclientDemandeStore()
const wilayasStore = useWilayasStore();
const languageStore = useLanguageStore();
const feedPostsStore = useFeedPostsStore();
const authStore = useAuthStore();

//vars 
const feedPosts = ref([])
const errorStatus = ref(false)
const errorMessage = ref('')
const errorColor = ref('')


//composables
const { timeDifference } = useTimeDifference()

//methods
const formatTime = (date) => timeDifference(date)

const showProject = (post) => {
        clientDemandeStore.clientPostPageVisibility = true;
        clientDemandeStore.$state.selectedPost = post
        clientDemandeStore.getClientPostImages(post.id).then((res) => { })
}

const getPostImage = (post) => {
    const arrayBuffer = post.image.data
    const bytes = new Uint8Array(arrayBuffer);
    const blob = new Blob([bytes], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    return url
}

const sendInterest = (clientPostId) => {
    providerStore.sendInterest(clientPostId).then((res) => {
        if (res.data.status == 200) {
            errorColor.value = 'error'
            errorStatus.value = true;
            errorMessage.value = res.data.message
        } else {
            errorColor.value = 'success'
            errorStatus.value = true;
            errorMessage.value = res.data.message + ' ' + 'the post will be added to your projects tab'

            feedPostsStore.feedPosts = feedPostsStore.$state.feedPosts.filter((post) => post.id != clientPostId)
        }
    })
}

let backgImg = computed(() => {
    switch (authStore.$state.userAuth.categoryId) {
        case 10:
            return 'moving_storage_services.svg'

        case 9:
            return 'home_inspection_appraisal.svg'

        case 8:
            return 'painting_finishing.svg'

        case 7:
            return 'landscape_outdoor_living.svg'

        case 6:
            return 'plumbing_water_management.svg'

        case 5:
            return 'electrical_hvac.svg'

        case 4:
            return 'cleaning_house_keeping.svg'

        case 3:
            return 'interior_design_decorating.svg'

        case 2:
            return 'construction_remodelling.svg'

        case 1:
            return 'home_improvement_maintenance.svg'

    }
})


watch(() => feedPostsStore.$state.feedPosts, (newVal, oldVal) => {
    feedPosts.value = newVal
}, { deep: true }
)

onBeforeMount(() => {
    //get the feed posts 
    feedPostsStore.getFeedPosts().then((res) => {
    })
})





</script>
<style>
/* for removing the post from the feed with a smooth transition slide in from left to right */
.post-enter-active,
.post-leave-active {
    transition: transform 1s ease-in-out;
}

.post-enter,
.post-leave-to {
    transform: translateX(-100%);
}






.notification-item {
    animation: slideIn 0.5s ease forwards;
    opacity: 0;
    transform: translateX(100%);
}

.notification-item:nth-child(1) {
    animation-delay: 0.1s;
}

.notification-item:nth-child(2) {
    animation-delay: 0.2s;
}

.notification-item:nth-child(3) {
    animation-delay: 0.3s;
}



@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>