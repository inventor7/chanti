<template>
    <ClientLayout pageTitle="">

        <div class="relative flex flex-col justify-center items-center pb-4 px-1 space-y-4 md:space-y-6  w-full  md:w-1/2 ">
            <div class=" w-full px-1  " >
                <h2 class=" text-2xl sm:text-3xl md:mt-4 font-bold text-start text-black/70 ">My Projects</h2>
            </div>
            <!-- Filters -->
            <div
                class=" sticky bg-gray-100/20 px-1  z-30  flex flex-row justify-between w-full   items-center  h- gap-1 rounded-3xl border border-gray-300 my-2 p-1 text-sm font-semibold ">

                <div @click="filterPosts('inProgress')"
                    class=" cursor-pointer  w-full text-center p-2 rounded-3xl transition-all duration-300 ease-in-out "
                    :class="{ 'bg-primary  text-white': Tab === 'inProgress', 'text-black': Tab !== 'inProgress' }">
                    In progress
                </div>

                <div @click="filterPosts('done')"
                    class=" cursor-pointer  w-full text-center p-2 rounded-3xl transition-all duration-300 ease-in-out "
                    :class="{ 'bg-primary  text-white': Tab === 'done', 'text-black': Tab !== 'done' }">
                    Done
                </div>
            </div>


            <!-- Loading ns error -->
            <Loading v-if="clientDemandeStore.loadingClientDemande && !clientDemandeStore.errorClientDemande.status"
                class=" fixed right-0 left-0 top-0 bottom-0 z-50" />
            <Error v-if="clientDemandeStore.errorClientDemande.status && !clientDemandeStore.loadingClientDemande"
                class=" fixed right-0 left-0 top-0 bottom-0 z-50" />

            <!-- Projetcts -->
            <div v-if="!clientDemandeStore.loadingClientDemande && !clientDemandeStore.errorClientDemande.status"
                class=" posts-list flex flex-col justify-between items-center px-1  gap-4 lg:gap-6 w-full  h-screen overflow-y-scroll ">
                <!-- if projects empty -->
                <div v-if="Posts.length <= 0" class=" flex flex-col justify-center items-center w-full h-screen ">
                    <img class="w-full  " src="../../assets/no_posts.svg" alt="no_posts">
                    <h2 class=" font-semibold mt-2 ">No Project under this tab</h2>
                </div>

                <!-- else -->
                <ClientPost class="w-full " v-for="post in Posts" :key="post.id" :post="post" />

            </div>



        </div>

        <Alert @handleCloseBtn="handleTreatPost" closeBtnText="ok ?" toggleBtnText="close"
            message="do you really want to delete your project ???" modalName="delete-modal" />
    </ClientLayout>
    <Toast class=" z-50 top-0 " :color="errorState" :message="errorMessage" :isVisible="errorStatus" />
</template>

<script>
//layout
import ClientPost from '../../components/ClientPost.vue';
import Loading from '../../components/Loading.vue';
import Error from '../../components/Error.vue';
import Alert from '../../components/Alert.vue';
import Toast from '../../components/Toast.vue';

import ClientLayout from '../Layouts/ClientLayout.vue';
import ClientPostDetailsPage from '../../components/ClientPostDetailsPage.vue';
import RatingClientPage from '../../components/RatingClientPage.vue';

import { useclientDemandeStore } from '../../store/Client/clientDemandeStore';
import { computed, watchEffect, ref, watch, reactive, onMounted, toRaw } from 'vue';

export default {
    name: 'ClientPosts',
    components: {
        ClientPostDetailsPage,
        ClientLayout,
        ClientPost,
        RatingClientPage,
        Loading,
        Error,
        Alert,
        Toast
    },
    setup() {
        //store
        const clientDemandeStore = useclientDemandeStore();

        //vars
        const Posts = ref([]);
        let Tab = ref('inProgress');
        const position = ref(1);
        const errorStatus = ref(false)
        const errorMessage = ref('')
        const errorState = ref('')
        const postToTreat = reactive({
            id: null,
            status: null
        })

        //hooks
        onMounted(() => {
            clientDemandeStore.getClientPosts().then((res) => {
                Posts.value = inProgressProjects.value
            })
        });

        //update posts when store changes
      

        //computed


        let inProgressProjects = computed(() => {
            Posts.value = clientDemandeStore.$state.clientPosts.filter(item => item.status === 'pending').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            return Posts.value
        })

        let doneProjects = computed(() => {
            Posts.value = clientDemandeStore.$state.clientPosts.filter(item => item.status === 'done').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            return Posts.value
        })







        //methods


        const filterPosts = (filter) => {
            switch (filter) {

                case 'inProgress':
                    Posts.value = inProgressProjects.value
                    Tab.value = 'inProgress'
                    break;

                case 'done':
                    Posts.value = doneProjects.value
                    Tab.value = 'done'
                    break;

                default:
                    break;
            }
        }






        const handleWorkStatus = (clientPostId, status) => {
            if (status === 'delete') {
                postToTreat.id = clientPostId;
                postToTreat.status = status;
            }
        }


        const handleTreatPost = () => {
            clientDemandeStore.setWorkStatus('delete', clientDemandeStore.PostToDelte.id).then((res) => {

                clientDemandeStore.clientPostPageVisibility = false
                if (res.status === 200) {
                    errorStatus.value = true
                    errorMessage.value = 'Post deleted successfully'
                    errorState.value = 'success'
                    filterPosts('delete')
                    clientDemandeStore.getClientPosts();
                    setTimeout(() => {
                        errorStatus.value = false
                    }, 3000)
                } else {
                    errorStatus.value = true
                    errorMessage.value = 'Post not deleted'
                    errorState.value = 'error'
                    setTimeout(() => {
                        errorStatus.value = false
                    }, 3000)
                }


            })
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
            inProgressProjects,
            doneProjects,
            Tab,

            //vars
            position,
            errorStatus,
            errorMessage,
            errorState,
            postToTreat,


            //methods
            filterPosts,
            handleWorkStatus,
            handleTreatPost
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

.posts-list {
    height: 80vh;
    overflow-y: auto;
}

.posts-list::-webkit-scrollbar {
    width: 10px;
    
}

.posts-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
    
  
}

.posts-list::-webkit-scrollbar-thumb {
    background: #FF731D;
    border-radius: 10px;
}

.posts-list::-webkit-scrollbar-thumb:hover {
    background: #FF731D;
}
</style>