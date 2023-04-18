<template>
    <div ref="posts" class="flex flex-col w-full">
        <transition-group name="post" tag="div">
           
            <div class="w-full h-full"  >
            <div v-if=" providerStore.$state.feedPosts === null || providerStore.$state.feedPosts.length === 0"
            class="flex flex-col justify-center items-center h-[50vh] ">
                    <span class="material-icons text-5xl text-gray-300">
                        no_photography
                    </span>
                    <span class="text-gray-300 text-lg font-semibold">No posts yet</span>
                </div>
            <div v-else v-for="post in providerStore.$state.feedPosts" :key="post.id"
                class="post-container flex flex-col w-full group mb-4 bg-white border-2 shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition">

                <div class="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">
                    <img class=" w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
                        src="../assets/OIG.jpg" alt="Image Description">
                    <!-- <span class="material-icons absolute top-0 right-0  text-3xl z-10 text-secondary">
                            verified
                        </span> -->
                </div>
                <div class="p-2 md:p-3">
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row justify-between items-center">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800">Home Improvement</h3>
                                <label
                                    class="inline-block text-[14px] bg-secondary/20 py-0.5 px-2 rounded-xl font-medium text-secondary ">
                                    #{{ post.id.substring(0, 5) }}..
                                </label>
                            </div>

                            <div class="flex flex-row gap-1 items-center self-start " :class="{
                                'text-red-500': post.urgency === 'urgent',
                                'text-yellow-500': post.urgency === 'normal',
                                'text-green-500': post.urgency === 'low',
                                'text-blue-500': post.urgency === 'unplanned',
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
                    </div>
                    <div class="flex flex-row justify-between items-center mt-2">
                        <div class="flex flex-row gap-1">
                            <span class="material-icons text-primary text-lg">
                                location_on
                            </span>
                            <!-- {{ wilayasStore.getCommuneById(post.stateId) }} -->
                            <span class="text-gray-500 text-sm self-center ">{{
                                wilayasStore.getWilayaById(post.stateId)
                            }}, Ouled
                                Fayet</span>
                        </div>
                        <div class="flex flex-row gap-1">
                            <span class="text-gray-500 text-sm self-center">{{ formatTime(post.createdAt) }}</span>
                            <span class="material-icons text-primary self-center mt-1 text-lg">
                                schedule
                            </span>
                        </div>
                    </div>
                    <div class="mt-2 w-full h-full   ">
                        <div class="w-full">
                            <div v-if="post.status == 'pending'" class="flex flex-row justify-start items-center gap-2  ">
                                <button @click="sendInterest(post.id)"
                                    class="btn flex-1 font-bold  cursor-pointer z-20  gap-1 btn-sm sm:btn-md btn-outline btn-primary rounded-lg -white">
                                    request job
                                </button>
                            </div>

                            <div v-else class="w-full">
                                <button v-if="post.status == 'accept'"
                                    class="btn btn-sm md:btn-md z-20 bg-success/10 btn-primary w-full gap-2 cursor-not-allowed btn-disabled">
                                    <span class="material-icons text-success text-sm md:text-lg">
                                        check_circle
                                    </span>
                                    <span class="text-sm md:text-lg font-bold text-success">Accepted</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!--  -->
                </div>
            </div>
        </div>
        </transition-group>
    </div>
</template>

<script>
import Loading from './Loading.vue';
import Error from './Error.vue';
import { ref, onMounted, onBeforeMount, computed } from 'vue'
import { useTimeDifference } from '../composables/timeDifference.js'
import { useUserStore } from '../store/userStore';
import { useProviderStore } from '../store/providerStore';
import { useWilayasStore } from '../store/wilayasStore';
import { useAuthStore } from '../store/authStore';

export default {
    name: 'ProviderFeed',
    components: {
        Loading,
        Error
    },
    setup() {
        //vars 
        const posts = ref(null);

        //store
        const userStore = useUserStore();
        const providerStore = useProviderStore();
        const wilayasStore = useWilayasStore();
        const authStore = useAuthStore();


        //composables
        const { timeDifference } = useTimeDifference()

        //methods
        const formatTime = (date) => timeDifference(date)

        const sendInterest = (clientPostId) => {
            providerStore.sendInterest(clientPostId).then((res) => {
                console.log(res)
                for (let i = 0; i < providerStore.feedPosts; i++) {
                    if (providerStore.feedPosts[i].id == id) {
                        providerStore.feedPosts[i].status = descision
                    }
                }
            })
        }



        onBeforeMount(() => {
            //get the feed posts
            providerStore.getFeedPosts().then((res) => {
                console.log(res)
            })
        })

        onMounted(() => {
            const delay = 500;
            const postElements = posts.value.querySelectorAll('.post-container');

            postElements.forEach((post, index) => {
                setTimeout(() => {
                    post.style.opacity = 1;
                    post.style.transform = 'translateY(0)';
                }, index * delay);
            });
        })




        return {

            //store
            userStore,
            providerStore,
            wilayasStore,
            authStore,

            //vars
            posts,

            //methods
            sendInterest,
            formatTime

        };
    },
};


</script>
<style>
.post-enter-active,
.post-leave-active {
    transition: transform 1s ease-in-out;
}

.post-enter,
.post-leave-to {
    transform: translateY(100%);
}

.post-container {
    opacity: 0;
    transform: translateY(50%);
    transition: all 0.75s ease;
}
</style>