<template>
    <div class="flex flex-col justify-between items-start w-full h-full border-[1] shadow-lg border-x-2 border-t-2 p-2 mb-3 rounded-xl gap-2 notification-item"
        :class="{ ' bg-gray-200/20': notifType === 'notRead' }">
        <!-- profile section -->
        <div @click="showProfile(notification)"
            class="flex flex-row justify-start items-start gap-2 w-full h-full cursor-pointer ">
            <div class="flex flex-row justify-start items-center gap-2 w-full h-full font-semibold ">
                <p class="text-xl first-letter:uppercase  ">{{ notification.firstName }} {{ notification.lastName }}</p>
                <p v-if="notification.type === 'providerInterest'"
                    class="text-sm bg-primary/20 text-primary px-2 py-[1px] rounded-xl">
                    interested
                </p>
                <div v-else class="w-fit h-full">
                    <p v-if="notification.status == 'accept'"
                        class="text-sm bg-success/20 text-success px-2 py-[1px] rounded-xl">
                        accepted you
                    </p>
                    <p v-if="notification.status == 'decline'"
                        class="text-sm bg-error/20 text-error px-2 py-[1px] rounded-xl">
                        declined you
                    </p>


                    <!-- provider -->
                    <p v-if="notificationLocation === 'provider' && notification.type === 'clientResponse' && notification.status === 'pending'"
                        class="text-sm bg-primary/20 text-primary px-2 py-[1px] rounded-xl">
                        vous a demandé
                    </p>
                    <p v-if="notification.status == 'accepted' && notificationLocation === 'provider' && notification.type === 'clientInterest'"
                        class="text-sm bg-success/20 text-success px-2 py-[1px] rounded-xl">
                        accepted you
                    </p>
                    <p v-if="notification.status == 'declined' && notificationLocation === 'provider' && notification.type === 'clientInterest'"
                        class="text-sm bg-error/20 text-error px-2 py-[1px] rounded-xl">
                        declined you
                    </p>
                </div>
            </div>
            <span v-if="notifType == 'notRead'"
                class="inline-flex absolute top-1 right-1 items-center gap-1.5 py-1 px-1 rounded-full text-xs font-medium bg-error/10 text-error">
                <span class="w-2 h-2 inline-block bg-error rounded-full"></span> <span>nouveau</span>
            </span>
        </div>

        <!-- content section -->
        <div @click="showPost(notification)"
            class="flex flex-row justify-between items-center gap-2 w-full h-full cursor-pointer ">
            <div class="flex flex-col justify-start items-start gap-0.5 w-full h-full font-semibold">
                <p class="text-xl  text-secondary/90 ">{{ languageStore.getWord(notification.subCategoryName) }}</p>
                <p class="text-xs text-gray-500 ">{{ notification.ClientPostId }}</p>
                <p class="text-xs text-gray-400 mt-1 flex flex-row items-center gap-1 ">
                    <span class="material-icons text-sm text-gray-400 ">
                        history
                    </span>
                    {{ formatTime(notification.createdAt) }}
                </p>
            </div>
            <span class="material-icons text-primary text-xl">
                arrow_forward_ios
            </span>
        </div>

        <!-- buttons section -->
        <div v-if="(notification.status === 'pending' && notification.type === 'providerInterest') || (notification.status === 'pending' && notification.type === 'clientResponse')"
            class="flex flex-row justify-between items-center gap-2 w-full h-full cursor-pointer ">
            <button @click="handleCallPro(notification, 'accepted')"
                class="btn btn-success btn-sm h-10 flex-1 flex flex-row justify-center items-center gap-1 w-full text-white rounded-lg px-2 py-1">
                <span class="material-icons text-sm">
                    check
                </span>
                <p class="text-sm font-semibold">Accepter</p>
            </button>
            <button @click="handleCallPro(notification, 'declined')"
                class="btn btn-error btn-sm h-10  flex-1 flex flex-row justify-center items-center gap-1 w-full text-white rounded-lg px-2 py-1">
                <span class="material-icons text-sm">
                    close
                </span>
                <p class="text-sm font-semibold">Refuser</p>
            </button>
        </div>
        <button
            v-if="(notification.status === 'declined' && notification.type === 'providerInterest') || (notification.type === 'clientResponse' && notification.status === 'declined')"
            class=" flex flex-row bg-error/20 px-2 text-sm rounded-2xl items-center gap-1 text-start text-error border-transparent  w-fit ">
            <span class="material-icons text-lg">
                cancel
            </span>
            <p class="text-start">You Declined Pro</p>
        </button>
        <button
            v-if="(notification.status === 'accepted' && notification.type === 'providerInterest') || (notification.status === 'accepted' && notification.type === 'clientResponse')"
            class=" flex flex-row bg-success/20 px-2 text-sm rounded-2xl items-center gap-1 text-start text-success border-transparent  w-fit ">
            <span class="material-icons text-lg">
                check_circle
            </span>
            <p class="text-start">You Accepted Pro</p>
        </button>

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
        const selecteddProvider = ref(null)


        //methods
        const formatTime = (date) => timeDifference(date)

        const showProfile = (notification) => {
            if (props.notificationLocation === 'client') {
                clientDemandeStore.$state.selectedPost = clientDemandeStore.getClientPostById(notification.ClientPostId)
                clientDemandeStore.getClientPostProviders(notification.ClientPostId).then((res) => {

                    if (res.status === 200) {

                        //getting more info about the provider from it's client Post
                        clientDemandeStore.$state.selectedPost.providers.forEach((provider) => {
                            if (provider.id === notification.providerId) {
                                selecteddProvider.value = provider
                            }
                        })

                        portfolioStore.getProviderInfo(notification.providerId).then((res) => {
                            portfolioStore.getProviderPosts(notification.providerId).then((res) => {

                                providerStore.$state.provider.notificationId = selecteddProvider.value.notificationId

                                //getting provider Type
                                providerStore.$state.provider.type = providerStore.getProviderType(selecteddProvider.value)
                                providerStore.$state.provider.status = selecteddProvider.value.status
                                if (providerStore.$state.provider.type === 'interested') {

                                    if (selecteddProvider.value.status === 'pending') {
                                        providerStore.$state.provider.btnVisible = true
                                        providerStore.$state.provider.interestedIndicator = true
                                    }
                                    else {
                                        providerStore.$state.provider.btnVisible = false
                                        providerStore.$state.provider.interestedIndicator = false
                                    }

                                }
                                if (providerStore.$state.provider.type === 'responsed') {
                                    providerStore.$state.provider.interestedIndicator = false
                                    providerStore.$state.provider.btnVisible = false
                                    if (selecteddProvider.value.status === 'pending' || selecteddProvider.value.status === 'accept' || selecteddProvider.value.status === 'accepted') { providerStore.$state.provider.btnVisible = false }
                                    if (selecteddProvider.value.status === 'decline' || selecteddProvider.value.status === 'declined') { providerStore.$state.provider.btnVisible = true }
                                }
                            })
                        })

                        router.push({
                            name: 'profile',
                            params: { name: providerStore.$state.provider.firstName + '-' + providerStore.$state.provider.lastName }
                        })
                    }

                })
                //show profile based on the provider id

            }

        }

        const showPost = (notification) => {
            // clientDemandeStore.$state.selectedPost = clientDemandeStore.getClientPostById(clientPostId)

            if (notification.ClientPostId != null) {
                clientDemandeStore.$state.selectedPost = clientDemandeStore.getClientPostById(notification.ClientPostId)
                clientDemandeStore.getClientPostProviders(notification.ClientPostId)
                clientDemandeStore.getClientPostImages(notification.ClientPostId)
                notificationStore.notificationPageVisibility = false
                clientDemandeStore.clientPostPageVisibility = true
            }
        }



        const handleCallPro = (notification, status) => {
            clientDemandeStore.$state.selectedPost = clientDemandeStore.getClientPostById(notification.ClientPostId)
            clientDemandeStore.getClientPostProviders(notification.ClientPostId).then((res) => {
                if (res.status === 200) {
                    //getting more info about the provider from it's client Post
                    clientDemandeStore.$state.selectedPost.providers.forEach((provider) => {
                        if (provider.id === notification.providerId) {
                            //getting provider Type
                            if (provider.notificationId === undefined) {
                                providerStore.$state.provider.type = 'responsed'
                            } else {
                                providerStore.$state.provider.type = 'interested'
                            }

                            if (providerStore.$state.provider.type === 'interested' && provider.status === 'pending') {
                                //sending a request to mark as selected to show the phone number
                                clientDemandeStore.changeProviderStatus(provider.notificationId, status).then((res) => {
                                    if (res.status === 200) {
                                        provider.status = status
                                        notification.status = status
                                    }
                                })
                            }

                        }

                    })

                }
            })


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
            showPost,
            handleCallPro,
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