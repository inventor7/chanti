<template>
    <Navbar :pageTitle="pageTitle" />
    <NavClient v-if="authStore.$state.isAuthenticated" class=" fixed left-0 right-0 bottom-0" />
    <div data-theme="clientTheme" class="main-content  flex flex-col justify-center mt-[4.5rem] items-start w-full ">

        <div class="flex flex-col  self-center gap-2 overflow-y-scroll mb-20  justify-center items-center w-full h-full ">
            <slot></slot>
        </div>

        <Alert v-if="provider" w="full" @handleCloseBtn="ratePro('done')" closeBtnText="Rate" closeBtnColor="primary"
            toggleBtnText="Create Post">
            <div class="flex flex-col justify-start gap-2 items-center min-h-[50vh] w-full font-semibold ">
                <h2 class="text-2xl text-center font-bold mb-2">Rating your provider</h2>

                <div
                    class="flex flex-row justify-start items-start shadow-lg rounded-xl bg-white/40 border-t-2 border-x-2 mb-2 p-2 gap-2 w-full  h-fit cursor-pointer">
                    <img class="w-fit h-12 rounded-full" src="../../assets/OIG.jpg" alt="profile picture" />
                    <div class="flex flex-col justify-start items-start w-full h-full font-semibold ">
                        <p class="text-lg first-letter:uppercase  ">{{ provider.firstName }} {{ provider.lastName }}</p>

                    </div>
                    <div v-if="true" class="flex flex-row justify-start items-center gap-0.5 rounded-full">
                        <span class="text-lg md:text-lg font-bold text-primary">{{ ratingNumber }}</span>
                        <span class="material-icons text-primary text-lg md:text-lg">
                            star
                        </span>

                    </div>
                </div>


                <h2 class="text-5xl text-center font-bold">{{ ratingNumber }}</h2>
                <Rating v-bind="{ rating: ratingNumber, isIndicatorActive: false, }" :styleStarHeight="40"
                    :styleStarWidth="40" />
                <p class="text-gray-500 text-sm ">click to rate</p>
                <div class="flex flex-1 w-full flex-col gap-2">
                    <textarea class="border  flex-1 h-full border-gray-300 rounded-md p-2"
                        placeholder="Write your review here..." v-model="review"></textarea>
                </div>
            </div>
        </Alert>
        <ConfirmationModal />
        <NotificationPage />
        <ClientPostDetailsPage />
        <RatingClientPage />
        <Toast class=" z-50 top-0 " :color="ratingStore.errorState" :message="ratingStore.errorMessage"
            :isVisible="ratingStore.errorStatus" />

    </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import NavClient from '../../components/NavClient.vue';


import { useAuthStore } from '../../store/authStore.js';
import { useThemeStore } from '../../store/AppBasic/themeStore';
import { useRatingStore } from '../../store/ratingStore';
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore';
import { defineAsyncComponent } from 'vue';
import { ref, watch, computed } from 'vue';
import ProviderCard from '../../components/ProviderCard.vue';


export default {
    name: 'ClientLayout',
    props: {
        pageTitle: {
            type: String,
            default: 'Chanti',
        },
    },
    components: {
        Navbar,
        NavClient,
        NotificationPage: defineAsyncComponent(() => import("../../components/NotificationPage.vue")),
        ClientPostDetailsPage: defineAsyncComponent(() => import("../../components/ClientPostDetailsPage.vue")),
        RatingClientPage: defineAsyncComponent(() => import("../../components/RatingClientPage.vue")),
        Alert: defineAsyncComponent(() => import("../../components/Alert.vue")),
        ProviderCard: defineAsyncComponent(() => import("../../components/ProviderCard.vue")),
        Rating: defineAsyncComponent(() => import("../../components/Rating.vue")),
        Toast: defineAsyncComponent(() => import("../../components/Toast.vue")),
        ConfirmationModal : defineAsyncComponent(() => import("../../components/ConfirmationModal.vue")),
    },
    setup() {
        const themeStore = useThemeStore();
        const authStore = useAuthStore();
        const ratingStore = useRatingStore();
        const clientDemandeStore = useclientDemandeStore();

        let provider = computed(() => ratingStore.$state.selectedProviderToRate);
        let ratingNumber = computed(() => ratingStore.$state.rating);
        const review = ref('');


        const ratePro = () => {
            if (review.value == '') { // check if the review is empty
                ratingStore.errorState = 'error';
                ratingStore.errorMessage = 'Please write a review';
                ratingStore.errorStatus = true;

            } else if (ratingNumber.value == 0) { // check if the rating is empty
                ratingStore.errorState = 'error';
                ratingStore.errorMessage = 'Please rate the provider';
                ratingStore.errorStatus = true;

            } else {

                clientDemandeStore.setWorkStatus('done', clientDemandeStore.$state.selectedPost.id).then((res) => {
                    if (res.status == 200) { // check if the work status is changed successfully
                        ratingStore.ratePro(clientDemandeStore.$state.selectedPost.id, provider.value.id, ratingNumber.value, review.value).then((res) => {
                            ;
                            if (res.status == 200) {

                                review.value = '';
                                ratingStore.errorState = 'success';
                                ratingStore.errorMessage = 'Rated successfully';
                                ratingStore.errorStatus = true;
                                clientDemandeStore.getClientPosts()
                                setTimeout(() => {
                                    clientDemandeStore.RatingPageVisibility = false
                                    ratingStore.errorStatus = false
                                    ratingStore.errorMessage = '';
                                }, 3000);
                                clientDemandeStore.$state.selectedPost.status = 'done';

                            } else {
                                ratingStore.errorState = 'error';
                                ratingStore.errorMessage = 'Error while rating';
                                ratingStore.errorStatus = true;

                                setTimeout(() => {
                                    ratingStore.errorStatus = false
                                    ratingStore.errorMessage = '';
                                }, 3000);

                            }
                        });
                    }
                    else {
                        ratingStore.errorState = 'error';
                        ratingStore.errorMessage = 'Error while rating , please try  again';
                        ratingStore.errorStatus = true;
                    }
                });


            }
        };
        return {

            //store
            ratingStore,
            themeStore,
            authStore,

            //methods
            ratePro,

            //vars
            provider,
            ratingNumber,
            review,

        };
    },
};

</script>