<template>
    <div class="fixed  px-2  ">
        <div v-if="toastVisible" :class="{
             'toast-enter': toastVisibleClass, 'toast-enter-to': toastVisibleClassTo, 'toast-enter-active': toastVisibleClassActive
            , 'toast-leave': toastVisibleClass, 'toast-leave-to': toastVisibleClassTo, 'toast-leave-active': toastVisibleClassActive
        }" class=" w-full  self-center bg-white border rounded-md shadow-lg " role="alert">
            <div class="flex p-4 " :class="{ 'bg-success/10': color === 'success', 'bg-error/10': color === 'error' }">
                <div class="flex-shrink-0">
                    <span v-if="color === 'success'" class="material-icons text-2xl text-green-500">
                        check_circle
                    </span>
                    <span v-else class="material-icons text-2xl text-red-500">
                        error
                    </span>

                </div>
                <div class="ml-3 self-center ">
                    <p class="text-sm text-gray-700">
                        {{ message }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch, reactive, watchEffect } from 'vue';
export default {
    name: 'Toast',
    props: {
        message: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            default: 3000
        },
        isVisible: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'success'
        }
    },

    setup(props) {
        const toast = ref(null);
        const toastVisible = ref(false);
        const toastVisibleClass = ref('toast-enter');
        const toastVisibleClassTo = ref('toast-enter-to');
        const toastVisibleClassActive = ref('toast-enter-active');

        watchEffect(() => {
            if (props.isVisible) {
                toastVisible.value = true;
                setTimeout(() => {
                    toastVisible.value = false;
                }, props.duration);
            }
        });

        watch(toastVisible, (val) => {
            if (val) {
                toastVisibleClass.value = 'toast-enter';
                toastVisibleClassTo.value = 'toast-enter-to';
                toastVisibleClassActive.value = 'toast-enter-active';
            } else {
                toastVisibleClass.value = 'toast-leave';
                toastVisibleClassTo.value = 'toast-leave-to';
                toastVisibleClassActive.value = 'toast-leave-active';
            }
        });

        return {
            toast,
            toastVisible,
            toastVisibleClass,
            toastVisibleClassTo,
            toastVisibleClassActive
        };
    }
}

</script>


<style>
.toast-enter {
    transform: translateX(-100%);
}

.toast-enter-to {
    transform: translateX(0%);
}

.toast-enter-active {
    animation: slide-in 1.5s forwards;
}


.toast-leave {
    transform: translateX(0%);
}

.toast-leave-to {
    transform: translateX(-100%);
}

.toast-leave-active {
    animation: slide-in 1.5s forwards;
}



@keyframes slide-in {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(0%);
    }
}
</style>
