<template>
    <div class="flex flex-col w-full">
        <Loading v-if="portfolioStore.loadingPortfolio" class="  h-fit z-50" />
        <div v-else class="w-full h-full">
            <div v-if="portfolioPosts.length === 0"
                class=" flex flex-col justify-center items-center h-[50vh] ">
                <span class="material-icons text-5xl text-gray-300">
                    no_photography
                </span>
                <span class="text-gray-300 text-lg font-semibold">No posts yet</span>
            </div>


            <!-- Images -->
            <div v-for="post in portfolioPosts" :key="post.id" @click="setSelectedPost(post)"
                class="relative   w-full flex flex-col md:max-w-lg cursor-pointer mx-auto group mb-4 bg-gray-100 border shadow-md rounded-xl overflow-hidden focus:ring-2 transition hover:shadow-lg">
                <div class="grid  " :class="{
                        'grid-cols-1 grid-rows-1': post.images.length === 1,
                        'grid-cols-1 grid-rows-2': post.images.length === 2,
                        'grid-cols-2 grid-rows-2': post.images.length >= 3,
                    }">

                    <div v-for="(image, index) in post.images" :key="index"
                        class="relative border  border-white pb-[60%] lg:pb-[80%]" :class="{
                                'col-span-1 row-span-1': post.images.length < 3 || index < 2,
                                'col-span-2 row-span-2': post.images.length >= 3 && index === 2,
                            }">

                        <img class="absolute  top-0 left-0 object-cover w-full h-full  hover:scale-105 transition-transform duration-500"
                            :src="getBase64Image(image.data)" :alt="image.type">
                    </div>

                </div>

                <div class="relative w-full py-2 px-2 flex flex-row justify-between items-center">
                    <p>{{ post.details }}</p>
                    <span class="material-icons text-3xl"
                        :class="{ 'text-warning': post.status === 'pending', 'text-secondary': post.status != 'pending' }">
                        {{ post.status === 'pending' ? 'pending' : 'done' }}
                    </span>
                </div>

            </div>
        </div>



    </div>
    <PostImages v-if="selectedPost" :post="selectedPost" @close="selectedPost = null" />
    <Toast :duration="5000" class="bottom-0 z-50" :color="errorColor" :isVisible="errorStatus" :message="errorMessage" />
</template>

<script>
import Loading from './Loading.vue';
import Error from './Error.vue';
import Toast from './Toast.vue';
import PostImages from './PostImages.vue';
import { ref, onMounted, watch, computed } from 'vue'
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
        PostImages
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
        let portfolioPosts = computed(() => {
            return portfolioStore.$state.portfolioPosts
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
            setSelectedPost



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
