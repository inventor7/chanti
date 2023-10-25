<template>
    <div class="flex flex-col w-full">
        <Loading v-if="portfolioStore.loadingPortfolio" class="  h-fit z-50" />
        <div v-else class="w-full h-full mb-20 ">
            <div v-if="portfolioPosts.length === 0" class=" flex flex-col justify-center items-center h-[50vh] ">
                <span class="material-icons text-5xl text-gray-300">
                    no_photography
                </span>
                <span class="text-gray-300 text-lg font-semibold">No posts yet</span>
            </div>


            <div v-else class="griddy h-full">
                <transition-group name="post" tag="div" mode="out-in">
                    <div class=" w-full h-full flex flex-col justify-center items-center ">
                        <div v-for="post in portfolioPosts.portfolioPostsWithImages" :key="post.id"
                            class="relative h-fit mb-4 w-full flex flex-col md:max-w-xl self-center group  bg-gray-100 border  rounded-xl drop-shadow-md transition">
                            <div class="carousel carousel-center  h-full max-h-[55vh] w-full ">
                                <div v-for="(image, index) in post.images" :key="index"
                                    class="relative carousel-item h-full  w-full border  border-white ">
                                    <img class=" h-full rounded-t-xl  w-full object-cover" :src="getBase64Image(image.data)"
                                        :alt="image.type">
                                    <label
                                        class="material-icons z-10 text-3xl absolute top-1 right-1 bg-white/50 w-fit h-fit rounded-full px-0.5 "
                                        :class="{ 'text-warning': post.status === 'pending', 'text-success': post.status != 'pending' }">
                                        {{ post.status === 'pending' ? 'published_with_changes' : 'verified' }}
                                    </label>


                                    <!-- Indicator -->
                                    <div v-if="post.images.length > 1"
                                        class=" absolute  w-fit p-1.5 bg-blue-500/30 rounded-full   bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center">

                                        <div v-for="(image, index2) in post.images" :key="index"
                                            class="w-2 h-2 rounded-full mx-1 cursor-pointer   "
                                            :class="{ 'bg-blue-500 notification-item ': index === index2, 'bg-gray-100': index != index2 }">
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="relative w-full px-2 flex flex-row gap-2  justify-between items-center">
                                <p class="text-start text-lg font-medium ">{{ post.details }}</p>


                                <div v-if="authStore.$state.userAuth.id === providerStore.$state.provider.id"
                                    class="dropdown dropdown-top dropdown-end">
                                    <label tabindex="0" class="btn p-0 btn-circle btn-ghost -mx-1   cursor-pointer ">
                                        <span class="material-icons text-3xl  ">
                                            more_horiz
                                        </span>
                                    </label>
                                    <ul tabindex="0"
                                        class="dropdown-content font-semibold menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li class="border-b-2">
                                            <label @click="handleSendPostDelete(post)" for="delete-post-modal">
                                                <span class="material-icons text-error ">delete</span>
                                                Delete
                                            </label>
                                        </li>
                                        <li class="">
                                            <label @click="handleSendPostEdit(post)" for="edit-post-modal">
                                                <span class="material-icons text-primary ">edit</span>
                                                Edit
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- <div class="flex flex-row justify-between gap-2 items-center px-2 pb-2">
                                <div class="flex flex-row gap-2 items-center">
                                    <span class="material-icons text-lg text-gray-500">
                                        history
                                    </span>
                                    <p class="text-gray-500">12/12/2021</p>
                                </div>
                            </div> -->

                        </div>
                    </div>
                </transition-group>
            </div>
        </div>



    </div>
    <Toast :duration="5000" class="bottom-0 z-50" :color="errorColor" :isVisible="errorStatus" :message="errorMessage" />
</template>

<script>
import Loading from './Loading.vue';
import Error from './Error.vue';
import Toast from './Toast.vue';
import { ref, onMounted, watch, watchEffect, computed } from 'vue'
import { useUserStore } from '../store/userStore';
import { useProviderStore } from '../store/Provider/providerStore';
import { usePortfolioStore } from '../store/Provider/portfolioStore';
import { useWilayasStore } from '../store/wilayasStore';
import { useAuthStore } from '../store/authStore';


export default {
    name: 'ProviderPosts',
    components: {
        Loading,
        Error,
        Toast,
    },
    setup() {
        //store
        const userStore = useUserStore();
        const providerStore = useProviderStore();
        const portfolioStore = usePortfolioStore();

        const wilayasStore = useWilayasStore();
        const authStore = useAuthStore();

        //vars 
        const errorStatus = ref(false)
        const errorMessage = ref('')
        const errorColor = ref('')

        //computed
        let portfolioPosts = ref(portfolioStore.$state.portfolioPosts)

        // watch for any changes in the portfolioPosts in the store and update the local portfolioPosts
        watchEffect(() => {
            portfolioPosts.value = portfolioStore.$state.portfolioPosts
        })

        onMounted(() => {
            portfolioPosts.value = portfolioStore.$state.portfolioPosts
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


        const selectedPost = ref(null)

        // function to set the selected post
        function setSelectedPost(post) {
            selectedPost.value = post
        }

        const handleSendPostDelete = (post) => {
            portfolioStore.$state.postToDelete = post
      
        }

        const handleSendPostEdit = (post) => {
            portfolioStore.$state.postToEdit = post

        }



        return {

            //store
            userStore,
            providerStore,
            wilayasStore,
            authStore,
            portfolioStore,

            //vars
            portfolioPosts,
            errorStatus,
            errorMessage,
            errorColor,
            selectedPost,

            //methods
            getBase64Image,
            setSelectedPost,
            handleSendPostDelete,
            handleSendPostEdit



        };
    },
};


</script>
<style scoped >
/* for removing the post from the feed with a smooth transition slide in from left to right */
.post-enter-active,
.post-leave-active {
    transition: transform 1s ease-in-out;
}

.post-enter,
.post-leave-to {
    transform: translateX(-100%);
}

.griddy {
    display: grid;
    width: 100%;
    margin-right: 0px;
    margin-left: 0px;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(1fr, minmax(300px, 1fr));
    grid-gap: 1rem;
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
