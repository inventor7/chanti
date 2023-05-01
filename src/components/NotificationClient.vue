<template>
    <div class="flex flex-col justify-between items-start w-full h-full border-[1] shadow-lg border-x-2 border-t-2 p-2 mb-3 rounded-xl notification-item"
        :class="{ ' bg-gray-200/20': notifType === 'notRead' }">
        <!-- profile section -->
        <div @click="showProfile(notification.providerId)"
            class="flex flex-row justify-start items-start gap-2 w-full h-full cursor-pointer ">
            <img class="w-fit h-14 rounded-full" src="../assets/OIG.jpg" alt="profile picture" />
            <div class="flex flex-col justify-start items-start w-full h-full font-semibold ">
                <p class="text-xl first-letter:uppercase  ">{{ notification.firstName }} {{ notification.lastName }}</p>
                <p v-if="notification.type === 'providerInterest'"
                    class="text-sm bg-primary/20 text-primary px-2 py-[1px] rounded-xl">
                    interested
                </p>
                <div v-else class="w-fit h-full">
                    <p v-if="notification.status == 'accept'"
                        class="text-sm bg-success/20 text-success px-2 py-[1px] rounded-xl">
                        accepted
                    </p>
                    <p v-if="notification.status == 'decline'"
                        class="text-sm bg-error/20 text-error px-2 py-[1px] rounded-xl">
                        declined
                    </p>
                </div>

            </div>
            <span v-if="notifType == 'notRead'"
                class="inline-flex absolute top-1 right-1 items-center gap-1.5 py-1 px-1 rounded-full text-xs font-medium bg-error/10 text-error">
                <span class="w-2 h-2 inline-block bg-error rounded-full"></span> <span>New</span>
            </span>
        </div>
        <div class=" divider my-0 w-1/2 self-center text-white opacity-0 "></div>
        <!-- content section -->
        <div @click="showPost(notification)"
            class="flex flex-row justify-between items-center gap-2 w-full h-full cursor-pointer ">
            <div class="flex flex-col justify-start items-start gap-0.5 w-full h-full font-semibold">
                <p class="text-xl  text-secondary/90 ">{{ languageStore.getWord(notification.subCategoryName) }}</p>
                <p class="text-xs text-gray-500 ">{{ notification.ClientPostId }}</p>
                <p class="text-xs text-gray-400 mt-1 ">{{ formatTime(notification.createdAt) }}</p>
            </div>
            <span class="material-icons text-primary text-xl">
                arrow_forward_ios
            </span>
        </div>

    </div>
</template>

<script>
import { useLanguageStore } from '../store/AppBasic/languageStore'
import { useTimeDifference } from '../composables/timeDifference'
import { useProviderStore } from '../store/Provider/providerStore'
import { useNotificationStore } from '../store/notificationStore'
import { useclientDemandeStore } from '../store/Client/clientDemandeStore'
import { useRouter } from 'vue-router'
import { usePortfolioStore } from '../store/Provider/portfolioStore'
import { defineComponent, computed, ref, watch } from 'vue'
import { useUserStore } from '../store/userStore'

export default defineComponent({
    name: 'Notification',
    props: {
        notif: {
            type: Object,
            required: true
        },
        notifType: {
            type: String,
            required: true
        },
        notificationLocation: {
            type: String,
            required: true
        },
    },
    setup(props, context) {

        //store
        const languageStore = useLanguageStore()
        const notificationStore = useNotificationStore()
        const providerStore = useProviderStore()
        const clientDemandeStore = useclientDemandeStore()
        const userStore = useUserStore()
        const router = useRouter()
        const portfolioStore = usePortfolioStore()

        //composables
        const { timeDifference } = useTimeDifference()

        //computed
        const readNotifications = ref(notificationStore.$state.readNotifications)
        const notReadNotifications = ref(notificationStore.$state.notReadNotifications)

        //vars  
        const notification = ref(props.notif)


        //methods
        const formatTime = (date) => timeDifference(date)

        const showProfile = (providerId) => {
            //show profile based on the provider id
            portfolioStore.getProviderPortfolio(providerId).then((res) => {
                console.log('Profile posts needed ', res)
                providerStore.$state.provider.btnVisible = false
            })

            router.push({
                name: 'profile',
                params: { name: providerStore.$state.provider.firstName + '-' + providerStore.$state.provider.lastName }
            })
        }

        const showPost = (notification) => {
            // clientDemandeStore.$state.selectedPost = clientDemandeStore.getClientPostById(clientPostId)

            if (notification.ClientPostId === null) {
                console.log('notification.ClientPostId is null')
            } else {
                console.log('notification.ClientPostId is nottttttttttt null')
                clientDemandeStore.$state.selectedPost = clientDemandeStore.getClientPostById(notification.ClientPostId)
                clientDemandeStore.getClientPostProviders(notification.ClientPostId)
                clientDemandeStore.getClientPostImages(notification.ClientPostId)
                notificationStore.notificationPageVisibility = false
                clientDemandeStore.clientPostPageVisibility = true
            }
        }




        return {
            //store
            languageStore,
            notificationStore,
            providerStore,
            userStore,

            //computed
            notification,
            notReadNotifications,
            readNotifications,

            //methods
            formatTime,
            showProfile,
            showPost
        }
    }
})

</script>

<style>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    transform: translateX(0);
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

.notification-item:nth-child(4) {
    animation-delay: 0.4s;
}




@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>