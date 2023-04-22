<template>
    <Error v-if="!notificationStore.loading && notificationStore.errorNotification.status" />
    <Loading v-if="notificationStore.loading && !notificationStore.errorNotification.status" />
    <div v-if="!notificationStore.loading && !notificationStore.errorNotification.status" class="w-full h-full">
        <transition name="slide">
            <div v-if="notificationStore.notificationPageVisibility"
                class="bg-white  w-screen md:w-1/2 overflow-y-scroll min-h-screen   z-50 inset-0 fixed">
                <div
                    class=" flex fixed  w-screen md:w-1/2 bg-white h-16 z-10 top-0 flex-row justify-between items-center  ">
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



                <div class="w-full space-y-2 mt-16 px-1 sm:px-3 h-full ">

                    <!-- not Read notification -->

                    <div v-for=" noNotif in notReadNotifications" :key="noNotif.id"
                        class=" relative sm:px-1    notification-item hover:bg-gray-300/40 transition-all duration-300 ease-in-out cursor-pointer  border-2  rounded-2xl   ">
                        <!-- an alert model to show details -->
                        <label class=" cursor-pointer  absolute rounded-xl -left-0 z-10  w-full h-full "></label>

                        <span v-if="noNotif.status == 'pending'"
                            class="inline-flex absolute top-1 right-1 items-center gap-1.5 py-1 px-1 rounded-full text-xs font-medium bg-error/10 text-error">
                            <span class="w-2 h-2 inline-block bg-error rounded-full"></span> <span>New</span>
                        </span>
                        <div class="flex w-full h-full p-2 ">

                            <!-- up section -->
                            <div class="w-full h-full ">
                                <div class="relative">
                                    <div class="w-full h-full">
                                        <h3 class="text-gray-800 uppercase font-semibold ">
                                            {{ noNotif.clientName }}
                                        </h3>
                                        <p class=" text-sm font-normal  ">
                                            is requesting you for
                                            <label for="alert-modal"
                                                class="inline-block ml-1 text-[14px] bg-secondary/20 py-0.5 px-2 rounded-xl font-medium text-secondary ">
                                                {{ languageStore.getWord(noNotif.subCategoryName) }}
                                            </label>
                                        </p>
                                        <p class="text-gray-400 text-sm mt-1 ">{{ formatTime(noNotif.createdAt) }}</p>
                                    </div>



                                </div>

                                <a class="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700"
                                    href="#">
                                    <span>Read more</span>
                                    <svg class="w-2.5 h-auto" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                </a>

                                <!-- buttons sections -->
                                <div class="mt-2 w-full h-full   ">
                                    <div class="w-full">
                                        <div v-if="noNotif.status == 'pending'"
                                            class="flex flex-row justify-start items-center gap-2  ">
                                            <button @click="selectResponse('decline', noNotif.id, false)"
                                                class="btn cursor-pointer z-20  gap-1 btn-sm sm:btn-md  btn-error rounded-lg text-white">

                                                Decline
                                            </button>
                                            <button @click="selectResponse('accept', noNotif.id, false)"
                                                class="btn cursor-pointer z-20  gap-1 btn-sm sm:btn-md  btn-success rounded-lg text-white">

                                                Accept
                                            </button>
                                        </div>

                                        <div v-else class="w-full">
                                            <button v-if="noNotif.status == 'accept'"
                                                class="btn btn-sm md:btn-md z-20 bg-success/10 btn-primary w-full gap-2 cursor-not-allowed btn-disabled">
                                                <span class="material-icons text-success text-sm md:text-lg">
                                                    check_circle
                                                </span>
                                                <span class="text-sm md:text-lg font-bold text-success">Accepted</span>
                                            </button>
                                            <button v-else
                                                class="btn btn-sm md:btn-md z-20 bg-error/10  btn-primary w-full gap-2 cursor-not-allowed btn-disabled">
                                                <span class="material-icons text-error text-sm md:text-lg">
                                                    cancel
                                                </span>
                                                <span class="text-sm md:text-lgfont-bold text-error">Declined</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- end buttons sections -->
                            </div>
                        </div>
                    </div>



                    <!-- readed notification -->
                    <div v-for=" noNotif in readNotifications" :key="noNotif.id"
                        class=" relative sm:px-1    notification-item hover:bg-gray-300/40 transition-all duration-300 ease-in-out cursor-pointer  border-2  rounded-2xl   ">
                        <label class=" cursor-pointer  absolute rounded-xl -left-0 z-10  w-full h-full "></label>


                        <div class="flex w-full h-full p-2 ">

                            <!-- up section -->
                            <div class="w-full h-full ">
                                <div class="relative">
                                    <div class="w-full h-full">
                                        <h3 class="text-gray-800 uppercase font-semibold ">
                                            {{ noNotif.clientName }}
                                        </h3>
                                        <p class=" text-sm font-normal  ">
                                            is requesting you for
                                            <label for="alert-modal"
                                                class="inline-block ml-1 text-[14px] bg-secondary/20 py-0.5 px-2 rounded-xl font-medium text-secondary ">
                                                {{ languageStore.getWord(noNotif.subCategoryName) }}
                                            </label>
                                        </p>
                                        <p class="text-gray-400 text-sm mt-1 ">{{ formatTime(noNotif.createdAt) }}</p>
                                    </div>



                                </div>

                                <a class="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700"
                                    href="#">
                                    <span>Read more</span>
                                    <svg class="w-2.5 h-auto" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                </a>
                                <!-- buttons sections -->
                                <div class="mt-2 w-full h-full   ">
                                    <div class="w-full">
                                        <div v-if="noNotif.status == 'pending'"
                                            class="flex flex-row justify-start items-center gap-2  ">
                                            <button @click="selectResponse('decline', noNotif.id, true)"
                                                class="btn cursor-pointer z-20  gap-1 btn-sm sm:btn-md  btn-error rounded-lg text-white">
                                                Decline
                                            </button>
                                            <button @click="selectResponse('accept', noNotif.id, true)"
                                                class="btn cursor-pointer z-20  gap-1 btn-sm sm:btn-md  btn-success rounded-lg text-white">
                                                Accept
                                            </button>
                                        </div>

                                        <div v-else class="w-full">
                                            <button v-if="noNotif.status == 'accept'"
                                                class="btn btn-sm md:btn-md z-20 bg-success/10 btn-primary w-full gap-2 cursor-not-allowed btn-disabled">
                                                <span class="material-icons text-success text-sm md:text-lg">
                                                    check_circle
                                                </span>
                                                <span class="text-sm md:text-lg font-bold text-success">Accepted</span>
                                            </button>
                                            <button v-else
                                                class="btn btn-sm md:btn-md z-20 bg-error/10  btn-primary w-full gap-2 cursor-not-allowed btn-disabled">
                                                <span class="material-icons text-error text-sm md:text-lg">
                                                    cancel
                                                </span>
                                                <span class="text-sm md:text-lgfont-bold text-error">Declined</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- end buttons sections -->
                            </div>
                        </div>
                    </div>
                </div>
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
import { useTimeDifference } from '../composables/timeDifference'

import { computed, onMounted, ref } from 'vue'

export default {
    name: "NotificationPage",
    components: {
        Alert,
        Error,
        Loading,
    },
    setup() {

        //store
        const notificationStore = useNotificationStore()
        const providerStore = useProviderStore()
        const authStore = useAuthStore()
        const languageStore = useLanguageStore()


        //composables
        const { timeDifference } = useTimeDifference()


        //computed
        let readNotifications = computed(() => notificationStore.$state.readNotifications)
        let notReadNotifications = computed(() => notificationStore.$state.notReadNotifications)


        //methods
        const formatTime = (date) => timeDifference(date)

        const selectResponse = (descision, id, isRead) => {
            providerStore.sendRes(descision, id).then((res) => {
                console.log(res)
                if (!isRead) {
                    for (let i = 0; i < notReadNotifications.value.length; i++) {
                        if (notificationStore.notReadNotifications[i].id == id) {
                            notificationStore.notReadNotifications[i].status = descision
                        }
                    }
                } else {

                    for (let i = 0; i < readNotifications.value.length; i++) {
                        if (notificationStore.readNotifications[i].id == id) {
                            notificationStore.readNotifications[i].status = descision
                        }
                    }
                }

            })
        }

        const handleCloseNotificationPage = () => {
            notificationStore.notificationPageVisibility = false
            notificationStore.getNotificationNumber(authStore.$state.userAuth.id)
        }


        //for alert
        const handleCloseBtn = () => {

        }


        return {
            //store
            notificationStore,
            providerStore,
            languageStore,

            //vars
            readNotifications,
            notReadNotifications,

            //methods
            selectResponse,
            formatTime,
            handleCloseBtn,
            handleCloseNotificationPage
        }
    }
}
</script>
<style scoped >
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

.notification-item:nth-child(5) {
    animation-delay: 0.5s;
}

.notification-item:nth-child(6) {
    animation-delay: 0.6s;
}

.notification-item:nth-child(7) {
    animation-delay: 0.7s;
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