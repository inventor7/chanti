<template>
    <transition name="fade" mode="out-in">
        <div v-if="showArrow" class="fixed rounded-full py-1.5 px-1.5  hidden  animate-bounce flex-col justify-center items-center  bg-primary bottom-2 right-4 z-50">
            <span class="material-icons text-white ">
                arrow_downward
            </span>
        </div>
    </transition>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
    setup() {
        const showArrow = ref(true)

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

            if (scrollTop > 0) {
                showArrow.value = false
                window.removeEventListener('scroll', handleScroll)
            }
        }

        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll)
        })

        return {
            showArrow
        }
    }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition-property: opacity;
    transition-duration: 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
  