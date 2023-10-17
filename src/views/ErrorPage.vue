<template>
    <Navbar />
    <div :data-theme="themeStore.theme"
        class="text-sm  mt-16 self-center h-screen flex flex-col items-center text-error w-full  gap-1.5 justify-start">
        <img v-if="getErrorMessage === 'internet'" class=" h-4/6" src="../assets/no-internet.svg" alt="">
        <img v-if="getErrorMessage === '500'" class="h-4/6" src="../assets/Pages/500.svg" alt="">
        <img v-if="getErrorMessage === '404'" class="h-4/6" src="../assets/Pages/404.svg" alt="">
        <p class="text-lg text-center  ">{{ error }}</p>
        <div class="flex flex-row gap-2">

            <button v-if="getErrorMessage === 'internet'" @click="handleNoInternet"
                class="text-sm btn text-white btn-primary gap-2 rounded-full ">
                <span class="material-icons">loop</span>
                Reload
            </button>
            <button v-else @click="router.go(-1)" class="text-sm btn text-white btn-primary gap-2 rounded-full ">
                <span class="material-icons">arrow_back</span>
                Go Back
            </button>
            <button @click="router.push({ name: 'home' })" class="text-sm btn text-white btn-primary gap-2 rounded-full ">
                <span class="material-icons">home</span>
                Go Home
            </button>
        </div>

    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useThemeStore } from '../store/AppBasic/themeStore.js'
import Navbar from '../components/Navbar.vue';
import { useRouter } from 'vue-router'
export default {
    name: 'ErrorPage',
    components: { Navbar },
    props: {
        error: {
            type: String,
            default: '404'
        },
    },
    setup(props) {
        const themeStore = useThemeStore()
        const router = useRouter()

        //method to get the error message and check if it's a 404 or 500 error or connection error
        let getErrorMessage = computed(() => {
            if (props.error.includes('404')) {
                return '404'
            } else if (props.error.includes('Server')) {
                return '500'
            } else {
                return 'internet'
            }
        })

        const handleNoInternet = () => {
            window.location.reload()
        }

        return {
            error: computed(() => props.error),
            themeStore,
            getErrorMessage,
            router,
            handleNoInternet
        }
    }

}
</script>
