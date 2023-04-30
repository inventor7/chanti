<template>
    <ClientLayout pageTitle="Projects">
        <div class="w-full pb-4 min-h-[70vh]">
            <div
                class="grid grid-rows-1  grid-cols-4 rounded-xl py-2 px-2 place-items-center   text-center w-full sm:w-full gap-1">
                <div @click="filterPosts('Total', 1)"
                    class="w-full bg-gray-400/20 rounded-t-xl pt-2  cursor-pointer relative">
                    <p class="text-2xl  font-bold text-blue-500">{{ clientDemandeStore.$state.clientPosts.length }}
                    </p>
                    <p class="text-gray-400 text-lg mb-1">Total</p>
                    <div :class="{
                        'opacity-100': position === 1,
                        'opacity-0': position !== 1,
                        'translate-x-0': position === 1,
                        '-translate-x-full': position < 1,
                        'translate-x-full': position > 1
                    }"
                        class="w-full h-1 bg-primary rounded-2xl absolute bottom-0 left-0 transition-transform duration-500">
                    </div>
                </div>
                <div @click="filterPosts('pending', 2)"
                    class="w-full bg-gray-400/20 rounded-t-xl  pt-2  cursor-pointer relative">
                    <p class="text-2xl font-bold text-blue-500">{{ pendingPosts.length }}</p>
                    <p class="text-gray-400 text-lg mb-1 ">Pending</p>
                    <div :class="{
                        'opacity-100': position === 2,
                        'opacity-0': position !== 2,
                        'translate-x-0': position === 2,
                        '-translate-x-full': position < 2,
                        'translate-x-full': position > 2
                    }"
                        class="w-full h-1 bg-primary rounded-2xl absolute bottom-0 left-0 transition-transform duration-500">
                    </div>
                </div>
                <div @click="filterPosts('done', 3)"
                    class="w-full bg-gray-400/20 rounded-t-xl  pt-2  cursor-pointer relative">
                    <p class="text-2xl font-bold text-blue-500">{{ donePosts.length }}</p>
                    <p class="text-gray-400 text-lg mb-1 ">Done</p>
                    <div :class="{
                        'opacity-100': position === 3,
                        'opacity-0': position !== 3,
                        'translate-x-0': position === 3,
                        '-translate-x-full': position < 3,
                        'translate-x-full': position > 3
                    }"
                        class="w-full h-1 bg-primary rounded-2xl absolute bottom-0 left-0 transition-transform duration-500">
                    </div>
                </div>
                <div @click="filterPosts('delete', 4)"
                    class="w-full bg-gray-400/20 rounded-t-xl  pt-2  cursor-pointer relative">
                    <p class="text-2xl font-bold text-blue-500">{{ deletePosts.length }}</p>
                    <p class="text-gray-400 text-lg mb-1 ">Deleted</p>
                    <div :class="{
                        'opacity-100': position === 4,
                        'opacity-0': position !== 4,
                        'translate-x-0': position === 4,
                        '-translate-x-full': position < 4,
                        'translate-x-full': position > 4
                    }"
                        class="w-full h-1 bg-primary rounded-2xl absolute bottom-0 left-0 transition-transform duration-500">
                    </div>
                </div>
            </div>
            <Loading v-if="clientDemandeStore.loadingClientDemande && !clientDemandeStore.errorClientDemande.status"
                class=" fixed right-0 left-0 top-0 bottom-0 z-50" />
            <Error v-if="clientDemandeStore.errorClientDemande.status && !clientDemandeStore.loadingClientDemande"
                class=" fixed right-0 left-0 top-0 bottom-0 z-50" />
            <div v-if="!clientDemandeStore.loadingClientDemande && !clientDemandeStore.errorClientDemande.status"
                class="w-full h-full ">
                <div v-if="Posts === null || Posts.length === 0"
                    class=" flex flex-col justify-center items-center h-[80vh] ">
                    <span class="material-icons text-5xl text-gray-300">
                        post_add
                    </span>
                    <span class="text-gray-300 text-lg font-semibold">No posts</span>
                </div>
                <div class="flex flex-col justify-center items-center   px-2 gap-4 w-full h-full ">
                    <!-- Posts -->
                    <div class=" grido max-w-2xl   gap-4 w-full h-full">
                        <Post v-for="post in Posts" :key="post.id" :post="post" />
                    </div>
                </div>
            </div>
        </div>
    </ClientLayout>
</template>

<script>
//layout
import Post from '../../components/Post.vue';
import Loading from '../../components/Loading.vue';
import Error from '../../components/Error.vue';

import ClientLayout from '../Layouts/ClientLayout.vue';
import ClientPostDetailsPage from '../../components/ClientPostDetailsPage.vue';
import RatingClientPage from '../../components/RatingClientPage.vue';

import { useclientDemandeStore } from '../../store/Client/clientDemandeStore';
import { computed, watchEffect, ref, onMounted } from 'vue';

export default {
    name: 'ClientPosts',
    components: {
        ClientPostDetailsPage,
        ClientLayout,
        Post,
        RatingClientPage,
        Loading,
        Error
    },
    setup() {
        //store
        const clientDemandeStore = useclientDemandeStore();

        //vars
        const Posts = ref([]);
        const position = ref(1);
        const errorStatus = ref(false)
        const errorMessage = ref('')
        const errorState = ref('')

        //computed
        const pendingPosts = computed(() => clientDemandeStore.$state.clientPosts.filter((post) => post.status == 'pending'));
        const donePosts = computed(() => clientDemandeStore.$state.clientPosts.filter((post) => post.status == 'done'));
        const deletePosts = computed(() => clientDemandeStore.$state.clientPosts.filter((post) => post.status == 'delete'));

        onMounted(() => {
            clientDemandeStore.getClientPosts();
            Posts.value = clientDemandeStore.$state.clientPosts;
        });

        const filterPosts = (filter) => {
            if (filter === 'Total') {
                Posts.value = clientDemandeStore.$state.clientPosts;
                position.value = 1;
            } else if (filter === 'pending') {
                Posts.value = pendingPosts.value;
                position.value = 2;
            } else if (filter === 'done') {
                Posts.value = donePosts.value;
                position.value = 3;
            } else if (filter === 'delete') {
                Posts.value = deletePosts.value;
                position.value = 4;
            }
        }


        //watch
        watchEffect(() => {
            if (errorStatus.value) {
                setTimeout(() => {
                    errorStatus.value = false
                }, 3000)
            }
        })

        return {
            //store
            clientDemandeStore,

            //computed
            Posts,
            pendingPosts,
            donePosts,
            deletePosts,

            //vars
            position,
            errorStatus,
            errorMessage,
            errorState,

            //methods
            filterPosts,
        };
    },
}

</script>

<style>
.grido {
    display: grid;
    grid-template-rows: 1;
    grid-template-columns: repeat(1, minmax(300px, 1fr));
    grid-gap: 1rem;
}
</style>