<template>
    <div  :data-theme="userType === 'client' ? 'clientTheme' : 'providerTheme'" class=" h-screen w-full flex flex-col justify-center items-center p-4 py-10 ">
        <div
         dir="ltr" class="navbar border-b-2 -xl mb-6 fixed  top-0  fd  py-1 bg-base-100  z-50 "
            ref="navbar">
            <div class="navbar-start"></div>
            <div class="navbar-center">
             
                    <svg @click="goHome" class="  px-0 w-28 h-auto object-contain btn btn-link font fill-primary " data-v-423bf9ae=""
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224.78573364505993 60">
                        <g data-v-423bf9ae="" id="4543de12-aaf0-4125-a132-5fbdb5bbcecc"
                            transform="matrix(5.357142948374458,0,0,5.357142948374458,-5.035717750082384,-9.000001226152698)">
                            <path
                                d="M3.92 9.65C3.92 9.21 4.09 8.84 4.43 8.54C4.77 8.24 5.16 8.09 5.60 8.09C6.48 8.09 7.08 8.36 7.41 8.90L7.87 6.36C7.40 6.04 6.64 5.88 5.59 5.88C4.21 5.88 3.10 6.25 2.23 6.98C1.37 7.71 0.94 8.65 0.94 9.80C0.94 10.79 1.26 11.55 1.90 12.08C2.54 12.61 3.43 12.88 4.59 12.88C5.56 12.88 6.30 12.72 6.79 12.40L7.25 9.84C6.73 10.39 6.02 10.67 5.14 10.67C4.78 10.67 4.49 10.58 4.26 10.40C4.03 10.22 3.92 9.97 3.92 9.65ZM11.62 8.51C11.76 8.01 12.07 7.76 12.54 7.76C12.81 7.76 12.97 7.83 13.03 7.98C13.10 8.13 13.10 8.36 13.05 8.68L12.36 12.60L15.09 12.60L15.86 8.26C15.99 7.50 15.92 6.94 15.64 6.57C15.36 6.19 14.74 6.01 13.79 6.01C13.01 6.01 12.36 6.38 11.86 7.13L12.82 1.68L10.09 1.68L8.16 12.60L10.89 12.60ZM22.55 6.16L22.33 7.39C22.03 6.48 21.34 6.02 20.24 6.02C19.86 6.02 19.46 6.11 19.05 6.29C18.64 6.46 18.26 6.71 17.91 7.03C17.56 7.36 17.27 7.77 17.05 8.29C16.82 8.80 16.70 9.36 16.70 9.95C16.70 11.81 17.56 12.74 19.28 12.74C20.11 12.74 20.88 12.32 21.60 11.47L21.39 12.60L24.12 12.60L25.28 6.16ZM19.64 9.62C19.64 9.21 19.78 8.88 20.05 8.63C20.33 8.38 20.65 8.26 21.01 8.26C21.28 8.26 21.52 8.33 21.71 8.48C21.90 8.63 21.99 8.85 21.99 9.14C21.99 9.57 21.85 9.90 21.56 10.14C21.27 10.38 20.95 10.50 20.61 10.50C20.32 10.50 20.09 10.42 19.91 10.26C19.73 10.10 19.64 9.89 19.64 9.62ZM28.97 8.55C29.11 8.02 29.42 7.76 29.90 7.76C30.17 7.76 30.33 7.83 30.39 7.98C30.46 8.13 30.46 8.36 30.41 8.68L29.72 12.60L32.59 12.60L33.36 8.26C33.49 7.52 33.40 6.96 33.10 6.58C32.79 6.20 32.19 6.01 31.29 6.01C30.42 6.01 29.73 6.39 29.20 7.15L29.39 6.16L26.66 6.16L25.52 12.60L28.25 12.60ZM35.66 3.92L35.27 6.16L34.22 6.16L33.84 8.33L34.89 8.33L34.13 12.60L36.72 12.60L37.48 8.33L38.53 8.33L38.91 6.16L37.86 6.16L38.25 3.92ZM39.87 3.89C39.87 4.27 40.02 4.60 40.31 4.86C40.61 5.13 40.96 5.26 41.38 5.26C41.80 5.26 42.16 5.13 42.45 4.86C42.75 4.60 42.90 4.27 42.90 3.89C42.90 3.51 42.75 3.18 42.45 2.92C42.16 2.65 41.80 2.52 41.38 2.52C40.96 2.52 40.61 2.65 40.31 2.92C40.02 3.18 39.87 3.51 39.87 3.89ZM39.66 6.16L38.53 12.60L41.15 12.60L42.28 6.16Z">
                            </path>
                        </g>
                    </svg>
            
            </div>
            <div class="navbar-end"></div>
        </div>
        <img src="../assets/Pages/unauthorised.svg" class=" w-full h-full " alt="Unauthorised">
        <button class=" btn btn-primary gap-2 text-white" @click="router.go(-1)">
            <span class="material-icons text-white   ">
                arrow_back
            </span>
            Back
        </button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import { defineAsyncComponent , computed } from 'vue';

export default {
    name: 'UnauthorisedPage',
    setup() {

        //store
        const router = useRouter()
        const userStore = useUserStore()

        //methods
        const goHome = () => {
            if(userStore.$state.userType==='provider')
            {
                router.push({ name: 'providerHome' })
            } else {
                router.push({ name: 'home' })
            }
        }

        let userType = userStore.$state.userType


        return {
            //store
            router,
            userStore,

            //vars 
            userType,

            //methods
            goHome
        }

    }

}
</script>
