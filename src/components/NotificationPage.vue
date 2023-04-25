<template>
    <Error
        v-if="!notificationStore.loading && notificationStore.errorNotification.status && notificationStore.notificationPageVisibility" />

    <Loading
        v-if="notificationStore.loading && !notificationStore.errorNotification.status && notificationStore.notificationPageVisibility" />

    <div v-if="!notificationStore.errorNotification.status" class="w-full h-full">
        <transition name="slide">
            <div v-if="notificationStore.notificationPageVisibility"
                class="bg-white  w-screen md:w-1/2 overflow-y-scroll min-h-screen   z-50 inset-0 fixed">
                <div
                    class=" flex fixed  w-screen md:w-1/2 shadow-xl rounded-b-xl  bg-white h-16 z-10 top-0 flex-row justify-between items-center  ">
                    <button class=" opacity-0 btn-circle">
                        <span class="material-icons text-lg ">
                            arrow_forward_ios
                        </span>
                    </button>
                    <span class="text-2xl font-bold text-primary">Notification</span>
                    <button class=" btn-circle " @click="handleCloseNotificationPage">
                        <span class="material-icons text-primary font-bold md:text-2xl text-lg ">
                            arrow_forward_ios
                        </span>
                    </button>
                </div>

                <!-- notifications -->
                <div class="mt-20" v-if="userStore.$state.userType === 'provider'">
                    <div class="w-full space-y-2  px-1 sm:px-3 h-full ">
                        <Notification v-for="notif in notReadNotifications" :key="notif.id" :notif="notif"
                            notifType="notRead" notificationLocation="provider" />
                        <Notification v-for="notif in readNotifications" :key="notif.id" :notif="notif" notifType="read"
                            notificationLocation="provider" />
                    </div>
                </div>
                <div class="mt-20" v-if="userStore.$state.userType === 'client'">
                    <div class="w-full space-y-2 mt-16 px-1 sm:px-3 h-full ">
                        <Notification class="bg-black" v-for="notif in notReadNotificationsClient.notifications"
                            :key="notif.id" :notif="notif" notifType="notRead" notificationLocation="client" />
                        <Notification v-for="notif in readNotificationsClient.notifications" :key="notif.id" :notif="notif"
                            notifType="read" notificationLocation="client" />
                    </div>
                </div>
                <!-- end notifications -->

            </div>
        </transition>
    </div>

    <Alert @handleCloseBtn="handleCloseBtn" closeBtnText="ok" toggleBtnText="close"
        message="do you really want to clear the Demeande ?" />
</template>

<script>
import Alert from '../components/Alert.vue'
import Error from './Error.vue'
import Loading from './Loading.vue'

import { useNotificationStore } from '../store/notificationStore'
import { useProviderStore } from '../store/Provider/providerStore'
import { useAuthStore } from '../store/authStore'
import { useLanguageStore } from '../store/AppBasic/languageStore'
import { useUserStore } from '../store/userStore'

import { computed, onMounted, onBeforeMount, ref,watch , watchEffect , reactive } from 'vue'
import Notification from './Notification.vue'

export default {
    name: "NotificationPage",
    components: {
        Alert,
        Error,
        Loading,
        Notification
    },
    setup() {

        //store
        const notificationStore = useNotificationStore()
        const providerStore = useProviderStore()
        const authStore = useAuthStore()
        const languageStore = useLanguageStore()
        const userStore = useUserStore()
        console.log(notificationStore.$state.notReadNotifications);
        console.log(notificationStore.$state.readNotifications);
        //vars
        const notReadNotificationsClient = reactive({
            notifications: []
        });



        const readNotificationsClient = reactive({
            notifications: []
        });

        //onBefore Mount with async
        watchEffect(() => {
            if (notificationStore.$state.notReadNotifications.providerInterest) {
                notReadNotificationsClient.notifications = [
                    ...notificationStore.$state.notReadNotifications.providerInterest.map(notification => ({ ...notification, type: 'providerInterest' })),
                    ...notificationStore.$state.notReadNotifications.providerResponse.map(notification => ({ ...notification, type: 'providerResponse' }))
                ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }


            if (notificationStore.$state.readNotifications.providerInterest) {
                readNotificationsClient.notifications = [
                    ...notificationStore.$state.readNotifications.providerInterest.map(notification => ({ ...notification, type: 'providerInterest' })),
                    ...notificationStore.$state.readNotifications.providerResponse.map(notification => ({ ...notification, type: 'providerResponse' }))
                ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }
        })




        //computed
        let readNotifications = computed(() => notificationStore.$state.readNotifications)
        let notReadNotifications = computed(() => notificationStore.$state.notReadNotifications)


        const handleCloseNotificationPage = () => {
            notificationStore.notificationPageVisibility = false
            if (authStore.$state.userAuth != null) {
                if (userStore.$state.userType === 'provider') {
                    notificationStore.getProviderNotificationNumber(authStore.$state.userAuth.id).then((res) => {
                        console.log(res)
                    })
                } else {
                    notificationStore.getClientNotificationNumber(authStore.$state.userAuth.id).then((res) => {
                        console.log(res)
                    })
                }
            }
        }


        //for alert
        const handleCloseBtn = () => {

        }


        return {
            //store
            notificationStore,
            providerStore,
            languageStore,
            userStore,

            //vars
            readNotifications,
            notReadNotifications,

            readNotificationsClient,
            notReadNotificationsClient,

            //methods
            handleCloseBtn,
            handleCloseNotificationPage
        }
    }
}
</script>

<style scoped>
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
</style>
