<template>
    <div @click="showProfile(provider)"
        class="relative flex flex-row justify-start items-start shadow-lg rounded-xl bg-white/40 border-t-2 border-x-2 mb-2 p-2 gap-2 w-full  h-fit cursor-pointer ">
        <label v-if="componentLocation === 'RatingClientPage'" class="absolute w-full z-30 cursor-pointer h-full  "
            for="alert-modal"></label>

        <img class="w-fit h-12 rounded-full" src="../assets/OIG.jpg" alt="profile picture" />
        <div class="flex flex-col justify-start items-start w-full h-full font-semibold ">
            <p v-if="provider.status === 'pending'" class="text-sm bg-warning/20 text-warning px-2 py-[1px] rounded-xl">
                pending
            </p>
            <p v-if="provider.status === 'accept'" class="text-sm bg-success/20 text-success px-2 py-[1px] rounded-xl">
                accept
            </p>
            <p v-if="provider.status === 'decline'" class="text-sm bg-error/20 text-error px-2 py-[1px] rounded-xl">
                decline
            </p>
            <p v-if="type === 'interested'" class="text-sm bg-primary/20 text-primary px-2 py-[1px] rounded-xl">
                interested
            </p>
            <p class="text-lg first-letter:uppercase  ">{{ provider.firstName }} {{ provider.lastName }}</p>
        </div>
        <div class="self-center">
            <div v-if="true" class="flex flex-row justify-start items-center gap-0.5 p-2 rounded-full bg-primary/10">
                <span class="text-lg md:text-lg font-bold text-primary">5</span>
                <span class="material-icons text-primary text-lg md:text-lg">
                    star
                </span>

            </div>
            <div v-else class="flex flex-row justify-start items-center gap-1">
                <span class="material-icons text-warning text-sm md:text-lg">
                    star
                </span>
                <span class="text-lg md:text-lg font-bold text-warning">0</span>
            </div>
        </div>
    </div>
</template>

<script>

import { defineComponent } from 'vue';
import { useclientDemandeStore } from '../store/Client/clientDemandeStore';
import { usePortfolioStore } from '../store/Provider/portfolioStore';
import { useProviderStore } from '../store/Provider/providerStore';
import { useRatingStore } from '../store/ratingStore';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'ProviderCard',
    props: {
        provider: {
            type: Object,
            required: true
        },
        type: {
            type: String,
        },
        componentLocation: {
            type: String,
        }
    },
    setup(props) {

        //store 
        const clientDemandeStore = useclientDemandeStore()
        const portfolioStore = usePortfolioStore()
        const providerStore = useProviderStore()
        const router = useRouter()
        const ratingStore = useRatingStore()

        //vars
        const selectedPost = clientDemandeStore.$state.selectedPost

        //methods
        const showProfile = (provider) => {
            //show profile based on the component location 
            if (props.componentLocation != 'RatingClientPage') {
                portfolioStore.getProviderPortfolio(provider.id).then((res) => {
                    console.log('Profile posts needed ', res)
                    providerStore.$state.provider.btnVisible = false
                })

                router.push({
                    name: 'profile',
                    params: { name: provider.firstName + '-' + provider.lastName }
                })
            } else {
                ratingStore.selectedProviderToRate = provider 
            }

        }


        return {
            //store
            clientDemandeStore,
            portfolioStore,
            providerStore,

            //vars
            selectedPost,

            //methods
            showProfile
        }
    }
})

</script>

<style></style>