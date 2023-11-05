<template>
    <div
        class=" relative sm:px-1    notification-item hover:bg-gray-300/40 transition-all duration-300 ease-in-out cursor-pointer  border-2  rounded-2xl   ">
        <!-- an alert model to show details -->
        <label class=" cursor-pointer  absolute rounded-xl -left-0 z-10  w-full h-full "></label>

        <span v-if="notifType == 'notRead'"
            class="inline-flex absolute top-1 right-1 items-center gap-1.5 py-1 px-1 rounded-full text-xs font-medium bg-error/10 text-error">
            <span class="w-2 h-2 inline-block bg-error rounded-full"></span> <span>New</span>
        </span>



        <div class="flex w-full h-full p-2 ">
            <!-- up section -->
            <div class="w-full h-full ">
                <div class="relative">
                    <div class="w-full h-full">
                        <h3 class="text-gray-800 uppercase font-semibold ">
                            {{ notification.firstName }} {{ notification.lastName }}
                        </h3>

                        <p class=" text-sm font-normal  ">
                            is requesting you for
                            <label for="alert-modal"
                                class="inline-block ml-1 text-[14px] bg-secondary/20 py-0.5 px-2 rounded-xl font-medium text-secondary ">
                                {{ languageStore.getWord(notification.subCategoryName) }}
                            </label>
                        </p>
                        <p class="text-gray-400 text-sm mt-1 ">{{ formatTime(notification.createdAt) }}</p>
                    </div>

                </div>


                <!-- Provider's buttons sections -->
                <div class="mt-2 w-full h-full   ">
                    <div class="w-full">
                        <div v-if="notification.status == 'pending'"
                            class="flex flex-row justify-start items-center gap-2  ">
                            <button @click="selectResponse('decline', notification.id, false)"
                                class="btn cursor-pointer z-20  gap-1 btn-sm sm:btn-md  btn-error rounded-lg text-white">
                                Decline
                            </button>
                            <button @click="selectResponse('accept', notification.id, false)"
                                class=" btn cursor-pointer z-20  gap-1 btn-sm sm:btn-md  btn-success rounded-lg text-white">
                                Accepter
                            </button>
                        </div>

                        <div v-else class="w-full">
                            <button v-if="notification.status == 'accept'"
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
                <!-- Provider's end buttons sections -->

            </div>
        </div>
    </div>
</template>

<script>
import { useLanguageStore } from '../store/AppBasic/languageStore'
import { useTimeDifference } from '../composables/timeDifference'
import { useProviderStore } from '../store/Provider/providerStore'
import { useNotificationStore } from '../store/notificationStore'
import { defineComponent, computed, ref, watch } from 'vue'
import { useUserStore } from '../store/userStore'

export default defineComponent({
    name: 'NotificationProvider',
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
        const userStore = useUserStore()

        //composables
        const { timeDifference } = useTimeDifference()

        //computed
        const readNotifications = ref(notificationStore.$state.readNotifications)
        const notReadNotifications = ref(notificationStore.$state.notReadNotifications)

        //vars  
        const notification = ref(props.notif)

        //watch any change in the notification and update the notification
        watch(() => props.notif, (newVal) => {
            notification.value = newVal
        })




        //methods
        const formatTime = (date) => timeDifference(date)

        const selectResponse = (descision, id, isRead) => {
            providerStore.sendRes(descision, id).then((res) => {
                if (res.status == 200) {
                    if (!isRead) {
                        props.notif.status = descision
                        props.notif.isRead = true
                        
                    } else {
                        props.notif.status = descision
                    }
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
            selectResponse
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