<template>
    <div class="relative flex flex-col justify-between items-start w-full h-full font-semibold shadow-lg border-x-2 border-t-2 px-2 pb-2 mb-2 rounded-xl notification-item "
        :class="{ 'bg-white': post.status == 'pending', 'bg-green-500/10': post.status == 'done', 'bg-red-500/10': post.status == 'delete' }">
        <div @click="showPost(post.id, post.status)" class="flex flex-row items-center w-full h-full cursor-pointer ">
            <div class="flex flex-col justify-start items-start gap-0.5 w-full font-semibold">
                <p class="text-lg  text-secondary/90 ">{{
                    languageStore.getWord(categoriesStore.getCategoryById(post.categoryId)) }}</p>


                <div class="flex flex-row justify-between items-center w-full mt-4">
                    <div class="flex px-2 rounded-full flex-row gap-1 items-center self-start " :class="{
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

                    <p class="text-xs text-gray-400 mr-2 flex items-center "><span
                            class="material-icons text-sm text-gray-400">
                            location_on
                        </span>{{ wilayasStore.getWilayaById(post.stateId) }}</p>

                    <p class="text-xs text-gray-400">{{ formatTime(post.createdAt) }}</p>
                </div>
            </div>
            <!-- <div class="flex-1 flex flex-col justify-end items-end w-full">
                <span class="material-icons mt-1  text-primary text-xl">
                    arrow_forward_ios
                </span>
            </div> -->
        </div>

        <div v-if="post.status === 'pending'" class="divider my-1 "></div>

        <!-- only shows when post is pending -->
        <div v-if="post.status === 'pending'" class="w-full h-full">
            <button @click="handleWorkStatus('done')"
                class="btn btn-sm text-success hover:bg-success hover:text-white btn-ghost w-full px-0  ">
                marque faite
            </button>
            <div class="divider my-1 "></div>
            <label for="delete-modal" @click="handleWorkStatus('delete', post.id)"
                class="btn btn-sm text-error btn-ghost hover:bg-error hover:text-white w-full px-0  ">
                supprimer
            </label>
        </div>

        <button v-if="post.status === 'done'"
            class="btn btn-sm btn-ghost mt-2 text-success btn-disabled bg-success/0 w-full px-0  ">
            Done
        </button>

        <button v-if="post.status === 'delete'"
            class="btn btn-sm mt-2 btn-ghost btn-disabled  text-error bg-error/0  w-full px-0  ">
            Deleted
        </button>


    </div>
</template>

<script>
//layout
import Image from './Image.vue';

//store
import { useCategoriesStore } from '../store/categoriesStore';
import { useLanguageStore } from '../store/AppBasic/languageStore';
import { useWilayasStore } from '../store/wilayasStore';
import { useclientDemandeStore } from '../store/Client/clientDemandeStore';

//composables
import { useTimeDifference } from '../composables/timeDifference';

export default {
    name: 'Project',
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    components: {
        Image,
    },
    setup(props, context) {

        //store
        const categoriesStore = useCategoriesStore();
        const languageStore = useLanguageStore();
        const wilayasStore = useWilayasStore();
        const clientDemandeStore = useclientDemandeStore();

        //composables
        const { timeDifference } = useTimeDifference()

        //methods
        const formatTime = (date) => timeDifference(date)

        const showPost = (clientPostId, status) => {
            if (status != 'delete') { //if post is done or pending 

                clientDemandeStore.$state.selectedPost = clientDemandeStore.getClientPostById(clientPostId)

                clientDemandeStore.getClientPostProviders(clientPostId).then((res) => {


                })

                clientDemandeStore.getClientPostImages(clientPostId).then((res) => {

                })

                clientDemandeStore.clientPostPageVisibility = true;
            }
        }

        const handleWorkStatus = (status) => {
            if (status == 'done') {
                clientDemandeStore.$state.selectedPost = props.post
                clientDemandeStore.getClientPostProviders(props.post.id)
                clientDemandeStore.getClientPostImages(props.post.id).then((res) => {

                })
                clientDemandeStore.clientPostPageVisibility = false
                clientDemandeStore.RatingPageVisibility = true
            } else {
                clientDemandeStore.PostToDelte = props.post
            }
        }




        return {
            //store
            categoriesStore,
            languageStore,
            wilayasStore,
            clientDemandeStore,

            //composables
            formatTime,

            //methods
            showPost,
            handleWorkStatus,
        };
    },
}

</script>

<style scoped > .notification-item {
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