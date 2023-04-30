<template>
    <transition name="slideRight">
        <div v-if="RatingPageVisibility"
            class="bg-white right-0 top-0 w-screen md:w-1/2 overflow-y-scroll h-screen    z-50 fixed">
            <div
                class=" flex fixed px-2 shadow-xl  w-screen md:w-1/2 rounded-b-xl  bg-white h-16 z-10 top-0 flex-row justify-between items-center  ">
                <button class=" btn-circle " @click="handleBack">
                    <span class="material-icons text-primary font-bold md:text-2xl text-lg ">
                        arrow_back_ios
                    </span>
                </button>
                <span class="text-2xl font-bold text-primary">Rating</span>
                <button class=" btn-circle opacity-0 ">
                    <span class="material-icons text-primary font-bold md:text-2xl text-lg ">
                        arrow_forward_ios
                    </span>
                </button>
            </div>
            <div
                class=" flex fixed w-full md:w-1/2 overflow-y-scroll h-screen rounded-b-xl pb-4  px-2 pt-20 flex-col justify-between items-center  ">
                <div class="flex flex-col mb-3 bg-base-100 w-full  rounded-xl ">
                    <img src="../assets/Rating.svg" class="max-h-[30vh] w-full object-cover" alt="rating info" />
                    <div class="card-body p-3">
                        <h2 class="card-title">Rate your provider</h2>
                        <p>Choose the provider that work with you and rate it !</p>
                    </div>
                </div>
                <div class="h-[50vh] p-2 border-2 rounded-xl w-full  overflow-y-scroll">
                    <div class="w-full">
                        <ProviderCard v-for="provider in providersSentResponse " :key="provider.id" :provider="provider"
                            type="responsed" componentLocation="RatingClientPage" />
                    </div>

                    <div class="w-full">
                        <ProviderCard v-for="provider in providersInterest" :key="provider.id" :provider="provider"
                            type="interested" componentLocation="RatingClientPage" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template> 

<script>
import ProviderCard from './ProviderCard.vue'
import { useRatingStore } from '../store/ratingStore';
import { useclientDemandeStore } from '../store/Client/clientDemandeStore';
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'RatingCleintPage',
    components: {
        ProviderCard,
    },
    setup() {

        //store
        const clientDemandeStore = useclientDemandeStore()
        const router = useRouter()
        const ratingStore = useRatingStore()



        //computed
        let providersSentResponse = computed(() => {
            return clientDemandeStore.$state.selectedPost.providersSentResponse
        })

        let providersInterest = computed(() => {
            return clientDemandeStore.$state.selectedPost.providersSentInterest
        })

        let RatingPageVisibility = computed(() => {
            return clientDemandeStore.RatingPageVisibility
        })


        //methods
        const handleBack = () => {
            clientDemandeStore.RatingPageVisibility = false
            clientDemandeStore.clientPostPageVisibility = true
        }






        return {

            //vars
            RatingPageVisibility,

            //store
            clientDemandeStore,
            ratingStore,
            router,

            //computed
            providersSentResponse,
            providersInterest,

            //methods
            handleBack

        }

    }
})
</script>

<style></style>