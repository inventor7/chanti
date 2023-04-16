<template>
<div v-if="isVisible" class=" h-fit w-4/5 sm:max-w-xs  fixed toast-enter-active left-1/2 transform -translate-x-1/2 shadow-xl z-20 bg-white border rounded-xl flex justify-center inset-8" role="alert">
        <div class="flex p-4">
            <div class="flex-shrink-0">
                <svg class="h-4 w-4 sm:h-6 sm:w-6 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm sm:text-lg text-gray-700 ">
                    {{ message }}
                </p>
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
            default: 'error'
        }
    },
    setup(props) {
        const isVisible = ref(false)
        const show = () => {
            isVisible.value = true
            setTimeout(() => {
                isVisible.value = false
            }, props.duration)
        }
        watchEffect(() => {
            if (props.isVisible) {
                show()
            }
        })
        return {
            isVisible,
        }
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
    animation: slide-in 0.5s  ;
}

@keyframes slide-in {
    from {
        transform: translateX(-300%);
    }

    to {
        transform: translateX(0%);
    }
}</style>
