<template>
    <div :data-theme="theme" dir="ltr"
        class="flex flex-row justify-between items-center px-1 w-full py-1 md:py-2 xl:py-2.5 border-b-2    fixed  top-0  fd bg-base-100  z-50 "
        ref="navbar">
        <div class=" h-fit  ">

            <!-- when loggedin -->
            <router-link v-if="!authStore.$state.isAuthenticated" :to="{ name: 'home' }">
                <svg class="  p-0 w-20 md:w-24 lg:w-28 h-fit object-contain btn btn-sm btn-link font fill-primary "
                    data-v-423bf9ae="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224.78573364505993 60">
                    <g data-v-423bf9ae="" id="4543de12-aaf0-4125-a132-5fbdb5bbcecc"
                        transform="matrix(5.357142948374458,0,0,5.357142948374458,-5.035717750082384,-9.000001226152698)">
                        <path
                            d="M3.92 9.65C3.92 9.21 4.09 8.84 4.43 8.54C4.77 8.24 5.16 8.09 5.60 8.09C6.48 8.09 7.08 8.36 7.41 8.90L7.87 6.36C7.40 6.04 6.64 5.88 5.59 5.88C4.21 5.88 3.10 6.25 2.23 6.98C1.37 7.71 0.94 8.65 0.94 9.80C0.94 10.79 1.26 11.55 1.90 12.08C2.54 12.61 3.43 12.88 4.59 12.88C5.56 12.88 6.30 12.72 6.79 12.40L7.25 9.84C6.73 10.39 6.02 10.67 5.14 10.67C4.78 10.67 4.49 10.58 4.26 10.40C4.03 10.22 3.92 9.97 3.92 9.65ZM11.62 8.51C11.76 8.01 12.07 7.76 12.54 7.76C12.81 7.76 12.97 7.83 13.03 7.98C13.10 8.13 13.10 8.36 13.05 8.68L12.36 12.60L15.09 12.60L15.86 8.26C15.99 7.50 15.92 6.94 15.64 6.57C15.36 6.19 14.74 6.01 13.79 6.01C13.01 6.01 12.36 6.38 11.86 7.13L12.82 1.68L10.09 1.68L8.16 12.60L10.89 12.60ZM22.55 6.16L22.33 7.39C22.03 6.48 21.34 6.02 20.24 6.02C19.86 6.02 19.46 6.11 19.05 6.29C18.64 6.46 18.26 6.71 17.91 7.03C17.56 7.36 17.27 7.77 17.05 8.29C16.82 8.80 16.70 9.36 16.70 9.95C16.70 11.81 17.56 12.74 19.28 12.74C20.11 12.74 20.88 12.32 21.60 11.47L21.39 12.60L24.12 12.60L25.28 6.16ZM19.64 9.62C19.64 9.21 19.78 8.88 20.05 8.63C20.33 8.38 20.65 8.26 21.01 8.26C21.28 8.26 21.52 8.33 21.71 8.48C21.90 8.63 21.99 8.85 21.99 9.14C21.99 9.57 21.85 9.90 21.56 10.14C21.27 10.38 20.95 10.50 20.61 10.50C20.32 10.50 20.09 10.42 19.91 10.26C19.73 10.10 19.64 9.89 19.64 9.62ZM28.97 8.55C29.11 8.02 29.42 7.76 29.90 7.76C30.17 7.76 30.33 7.83 30.39 7.98C30.46 8.13 30.46 8.36 30.41 8.68L29.72 12.60L32.59 12.60L33.36 8.26C33.49 7.52 33.40 6.96 33.10 6.58C32.79 6.20 32.19 6.01 31.29 6.01C30.42 6.01 29.73 6.39 29.20 7.15L29.39 6.16L26.66 6.16L25.52 12.60L28.25 12.60ZM35.66 3.92L35.27 6.16L34.22 6.16L33.84 8.33L34.89 8.33L34.13 12.60L36.72 12.60L37.48 8.33L38.53 8.33L38.91 6.16L37.86 6.16L38.25 3.92ZM39.87 3.89C39.87 4.27 40.02 4.60 40.31 4.86C40.61 5.13 40.96 5.26 41.38 5.26C41.80 5.26 42.16 5.13 42.45 4.86C42.75 4.60 42.90 4.27 42.90 3.89C42.90 3.51 42.75 3.18 42.45 2.92C42.16 2.65 41.80 2.52 41.38 2.52C40.96 2.52 40.61 2.65 40.31 2.92C40.02 3.18 39.87 3.51 39.87 3.89ZM39.66 6.16L38.53 12.60L41.15 12.60L42.28 6.16Z">
                        </path>
                    </g>
                </svg>
            </router-link>

            <!-- when not loggedin -->
            <button v-else @click="handleGetNotification" class=" btn-ghost hover:bg-transparent btn-circle">
                <div class="indicator  ">
                    <span class="material-icons text-primary text-4xl ">
                        circle_notifications
                    </span>
                    <span v-if="notificationStore.$state.notificationsNumber > 0"
                        class="badge p-2 m-1  badge-xs badge-secondary indicator-item animate-pulse ">
                        {{ notificationStore.$state.notificationsNumber }}
                    </span>
                </div>
            </button>
        </div>



        <div v-if="authStore.$state.isAuthenticated" class="navbar-center">

            <div v-if="userStore.$state.userType === 'client'">
                <p class="text-3xl font-sans font-extrabold text-primary  ">{{ pageTitle }}</p>
            </div>

            <router-link v-else :to="{ name: 'providerHome' }">
                <svg class="  px-0 w-24 h-auto fill-primary object-contain btn btn-link font " data-v-423bf9ae=""
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224.78573364505993 60">
                    <g data-v-423bf9ae="" id="4543de12-aaf0-4125-a132-5fbdb5bbcecc"
                        transform="matrix(5.357142948374458,0,0,5.357142948374458,-5.035717750082384,-9.000001226152698)">
                        <path
                            d="M3.92 9.65C3.92 9.21 4.09 8.84 4.43 8.54C4.77 8.24 5.16 8.09 5.60 8.09C6.48 8.09 7.08 8.36 7.41 8.90L7.87 6.36C7.40 6.04 6.64 5.88 5.59 5.88C4.21 5.88 3.10 6.25 2.23 6.98C1.37 7.71 0.94 8.65 0.94 9.80C0.94 10.79 1.26 11.55 1.90 12.08C2.54 12.61 3.43 12.88 4.59 12.88C5.56 12.88 6.30 12.72 6.79 12.40L7.25 9.84C6.73 10.39 6.02 10.67 5.14 10.67C4.78 10.67 4.49 10.58 4.26 10.40C4.03 10.22 3.92 9.97 3.92 9.65ZM11.62 8.51C11.76 8.01 12.07 7.76 12.54 7.76C12.81 7.76 12.97 7.83 13.03 7.98C13.10 8.13 13.10 8.36 13.05 8.68L12.36 12.60L15.09 12.60L15.86 8.26C15.99 7.50 15.92 6.94 15.64 6.57C15.36 6.19 14.74 6.01 13.79 6.01C13.01 6.01 12.36 6.38 11.86 7.13L12.82 1.68L10.09 1.68L8.16 12.60L10.89 12.60ZM22.55 6.16L22.33 7.39C22.03 6.48 21.34 6.02 20.24 6.02C19.86 6.02 19.46 6.11 19.05 6.29C18.64 6.46 18.26 6.71 17.91 7.03C17.56 7.36 17.27 7.77 17.05 8.29C16.82 8.80 16.70 9.36 16.70 9.95C16.70 11.81 17.56 12.74 19.28 12.74C20.11 12.74 20.88 12.32 21.60 11.47L21.39 12.60L24.12 12.60L25.28 6.16ZM19.64 9.62C19.64 9.21 19.78 8.88 20.05 8.63C20.33 8.38 20.65 8.26 21.01 8.26C21.28 8.26 21.52 8.33 21.71 8.48C21.90 8.63 21.99 8.85 21.99 9.14C21.99 9.57 21.85 9.90 21.56 10.14C21.27 10.38 20.95 10.50 20.61 10.50C20.32 10.50 20.09 10.42 19.91 10.26C19.73 10.10 19.64 9.89 19.64 9.62ZM28.97 8.55C29.11 8.02 29.42 7.76 29.90 7.76C30.17 7.76 30.33 7.83 30.39 7.98C30.46 8.13 30.46 8.36 30.41 8.68L29.72 12.60L32.59 12.60L33.36 8.26C33.49 7.52 33.40 6.96 33.10 6.58C32.79 6.20 32.19 6.01 31.29 6.01C30.42 6.01 29.73 6.39 29.20 7.15L29.39 6.16L26.66 6.16L25.52 12.60L28.25 12.60ZM35.66 3.92L35.27 6.16L34.22 6.16L33.84 8.33L34.89 8.33L34.13 12.60L36.72 12.60L37.48 8.33L38.53 8.33L38.91 6.16L37.86 6.16L38.25 3.92ZM39.87 3.89C39.87 4.27 40.02 4.60 40.31 4.86C40.61 5.13 40.96 5.26 41.38 5.26C41.80 5.26 42.16 5.13 42.45 4.86C42.75 4.60 42.90 4.27 42.90 3.89C42.90 3.51 42.75 3.18 42.45 2.92C42.16 2.65 41.80 2.52 41.38 2.52C40.96 2.52 40.61 2.65 40.31 2.92C40.02 3.18 39.87 3.51 39.87 3.89ZM39.66 6.16L38.53 12.60L41.15 12.60L42.28 6.16Z">
                        </path>
                    </g>
                </svg>
            </router-link>

        </div>


        <div class=" flex flex-row justify-between items-center w-fit gap-2   md:gap-4">


            <!-- loggedin -->
            <DropDownLang v-if="!authStore.$state.isAuthenticated" />
            <button v-if="!authStore.$state.isAuthenticated" @click="modalStore.toggleModal"
                class=" btn btn-primary  btn-xs gap-2 sm:btn-sm btn-outline ">
                <span class="material-icons text-[18px] hidden sm:block ">
                    login
                </span>
                {{ languageStore.getWord('login') }}
            </button>




            <!-- loggedin -->
            <div v-if="authStore.$state.isAuthenticated" class="dropdown dropdown-end  ">
                <label tabindex="0" class=" md:mr-2 ">
                    <!-- get the first letter of the firstname and lastname -->
                    <span class="  bg-primary text-white text-xs p-3 md:p-4 cursor-pointer aspect-square  rounded-full " > {{ authStore.$state.userAuth.firstName[0] }}{{ authStore.$state.userAuth.lastName[0] }}</span>
                </label>

                <ul tabindex="0"
                    class="menu menu-compact shadow-2xl border-2 font-semibold dropdown-right  dropdown-content gap-1 py-2 px-1  bg-base-100 rounded-box w-52">
                    <div class="py-2 px-4 overflow-hidden -mx-2 -mt-2 bg-gray-200 rounded-t-lg ">
                        <p class="text-sm text-gray-500 ">Signed in as</p>
                        <p class="text-sm font-medium text-gray-800 ">{{ authStore.$state.userAuth.firstName }} {{
                            authStore.$state.userAuth.lastName }} </p>
                        <p class="text-xs text-gray-500 ">{{ authStore.$state.userAuth.email }}</p>
                    </div>

                    <!-- profile/:name -->

                    <li v-if="userStore.$state.userType === 'provider'">
                        <div @click="handleGoProfile()">
                            <span class="flex flex-row justify-start gap-2 items-center">
                                <span class="material-icons">
                                    person
                                </span>
                                Profile
                            </span>
                        </div>
                    </li>
                    <li>
                        <label for="lang-modal" class="justify-start gap-2 items-center">
                            <span class="material-icons">
                                g_translate
                            </span>
                            {{ languageStore.getWord('language') }}
                        </label>
                    </li>
                    <li @click="handleGoSettings()">
                        <span class="justify-start gap-2 items-center">
                            <span class="material-icons">
                                settings
                            </span>
                            Params
                        </span>
                    </li>
                    <li @click="logout">
                        <span class="justify-start gap-2 items-center">
                            <span class="material-icons">
                                logout
                            </span>
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
        </div>


    </div>


    <input type="checkbox" id="lang-modal" class="modal-toggle" />
    <label for="lang-modal"
        class="modal w-full h-full bg-black/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
        <ul tabindex="0" class="p-2 modal-box  shadow menu menu-compact bg-base-100 rounded-box w-52 z-50 transform ">
            <li selected="true" @click="changeLang('en')">
                English
                <img src="https://flagcdn.com/16x12/us.png"
                    srcset="https://flagcdn.com/32x24/us.png 2x, https://flagcdn.com/48x36/us.png 3x" width="16" height="12"
                    alt="United States">
                <span class="material-icons flex-1 md:block p-0 m-0 text-green-600 flex items-end justify-end"
                    v-if="languageStore.$state.lang === 'en'">
                    check_circle
                </span>
            </li>


            <li @click="changeLang('ar')">
                العربية
                <img src="https://flagcdn.com/40x30/dz.png"
                    srcset="https://flagcdn.com/80x60/dz.png 2x, https://flagcdn.com/120x90/dz.png 3x" width="20"
                    height="24" alt="Algeria">
                <span class="material-icons flex-1 md:block p-0 m-0 text-green-600 flex items-end justify-end"
                    v-if="languageStore.$state.lang === 'ar'">
                    check_circle
                </span>


            </li>

            <li @click="changeLang('fr')">
                Français
                <img src="https://flagcdn.com/16x12/fr.png"
                    srcset="https://flagcdn.com/32x24/fr.png 2x, https://flagcdn.com/48x36/fr.png 3x" width="16" height="12"
                    alt="France">
                <span class="material-icons flex-1 md:block p-0 m-0 text-green-600 flex items-end justify-end"
                    v-if="languageStore.$state.lang === 'fr'">
                    check_circle
                </span>


            </li>

        </ul>
    </label>
</template>

<script>
import { useThemeStore } from '../store/AppBasic/themeStore';
import { useModalStore } from '../store/AppBasic/modaleStore';
import { useAuthStore } from '../store/authStore';
import { useLanguageStore } from '../store/AppBasic/languageStore';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import { useProviderStore } from '../store/Provider/providerStore';
import { useNotificationStore } from '../store/notificationStore';
import { usePortfolioStore } from '../store/Provider/portfolioStore';
import { useclientDemandeStore } from '../store/Client/clientDemandeStore';
import DropDownLang from './DropDownLang.vue';
import { onBeforeMount, computed } from 'vue';
export default {
    name: 'Navbar',
    props: {
        pageTitle: {
            type: String,
            default: 'Chanti-DZ',
        },
    },
    components: {
        DropDownLang,
    },
    setup() {
        //Store
        const themeStore = useThemeStore();
        const modalStore = useModalStore();
        const authStore = useAuthStore();
        const portfolioStore = usePortfolioStore();
        const userStore = useUserStore();
        const clientDemandeStore = useclientDemandeStore();
        const languageStore = useLanguageStore();
        const providerStore = useProviderStore();
        const notificationStore = useNotificationStore()
        //Router
        const router = useRouter();

        //Methods
        const logout = () => {
            authStore.logout().then(() => {
                router.push({ name: 'home' })
            })
        }

        const handleGoProfile = () => {
            router.push({
                name: 'profile',
                params: { name: authStore.$state.userAuth.firstName + '-' + authStore.$state.userAuth.lastName }
            })


            portfolioStore.getProviderInfo(authStore.$state.userAuth.id).then((res) => { })
            portfolioStore.getProviderPosts(authStore.$state.userAuth.id).then((res) => { })


        }


        onBeforeMount(() => {
            if (authStore.$state.isAuthenticated) {
                if (userStore.$state.userType === 'provider') {
                    notificationStore.getProviderNotificationNumber(authStore.$state.userAuth.id).then((res) => {

                    })
                } else {
                    notificationStore.getClientNotificationNumber(authStore.$state.userAuth.id).then((res) => {

                    })
                }
            }

            if (authStore.$state.isAuthenticated === false) {
                router.push({ name: 'home' });
            }
        })



        const handleGetNotification = () => {
            notificationStore.notificationPageVisibility = true
            if (authStore.$state.userAuth != null) {
                if (userStore.$state.userType === 'provider') {
                    notificationStore.getProviderNotification(authStore.$state.userAuth.id).then((res) => {

                    })
                    //to do : get the provider's projects

                } else {
                    notificationStore.getClientNotification(authStore.$state.userAuth.id).then((res) => {

                        clientDemandeStore.getClientPosts().then((res) => {

                        })
                    })
                }
            }

        }

        const handleGoSettings = () => {
            if (userStore.$state.userType === 'provider') {
                router.push({ name: 'providerSettings' })
            } else {
                router.push({ name: 'clientSettings' })
            }

        }


        const changeLang = (lang) => {
            languageStore.lang = lang
            userStore.user.language = languageStore.lang
            languageStore.getLang()
        }

        //Vars
        const theme = computed(() => {
            if (userStore.$state.userType === 'provider' && authStore.$state.isAuthenticated) {
                return 'providerTheme'
            }
            if (userStore.$state.userType === 'client') {
                return 'clientTheme'
            }
        });



        return {
            //Store
            themeStore,
            modalStore,
            userStore,
            authStore,
            notificationStore,
            providerStore,
            portfolioStore,
            languageStore,
            userStore,

            //vars
            theme,


            //Methods
            logout,
            changeLang,
            handleGetNotification,
            handleGoSettings,
            handleGoProfile,
        };
    },

};

</script>