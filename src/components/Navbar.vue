<template>
    <div :data-theme="theme" dir="ltr"
        class="fixed top-0 w-full z-50 bg-base-100 border-b border-gray-200 shadow-sm transition-all duration-300"
        ref="navbar">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-16 md:h-20">
                <!-- Logo / Back Section -->
                <div class="flex items-center">
                    <!-- Logo for non-authenticated users -->
                    <router-link v-if="!authStore.$state.isAuthenticated" :to="{ name: 'home' }"
                        class="transition-transform duration-300 hover:scale-105">
                        <svg class="w-24 md:w-28 h-auto fill-primary" data-v-423bf9ae="" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 224.78573364505993 60">
                            <g data-v-423bf9ae="" id="4543de12-aaf0-4125-a132-5fbdb5bbcecc"
                                transform="matrix(5.357142948374458,0,0,5.357142948374458,-5.035717750082384,-9.000001226152698)">
                                <path
                                    d="M3.92 9.65C3.92 9.21 4.09 8.84 4.43 8.54C4.77 8.24 5.16 8.09 5.60 8.09C6.48 8.09 7.08 8.36 7.41 8.90L7.87 6.36C7.40 6.04 6.64 5.88 5.59 5.88C4.21 5.88 3.10 6.25 2.23 6.98C1.37 7.71 0.94 8.65 0.94 9.80C0.94 10.79 1.26 11.55 1.90 12.08C2.54 12.61 3.43 12.88 4.59 12.88C5.56 12.88 6.30 12.72 6.79 12.40L7.25 9.84C6.73 10.39 6.02 10.67 5.14 10.67C4.78 10.67 4.49 10.58 4.26 10.40C4.03 10.22 3.92 9.97 3.92 9.65ZM11.62 8.51C11.76 8.01 12.07 7.76 12.54 7.76C12.81 7.76 12.97 7.83 13.03 7.98C13.10 8.13 13.10 8.36 13.05 8.68L12.36 12.60L15.09 12.60L15.86 8.26C15.99 7.50 15.92 6.94 15.64 6.57C15.36 6.19 14.74 6.01 13.79 6.01C13.01 6.01 12.36 6.38 11.86 7.13L12.82 1.68L10.09 1.68L8.16 12.60L10.89 12.60ZM22.55 6.16L22.33 7.39C22.03 6.48 21.34 6.02 20.24 6.02C19.86 6.02 19.46 6.11 19.05 6.29C18.64 6.46 18.26 6.71 17.91 7.03C17.56 7.36 17.27 7.77 17.05 8.29C16.82 8.80 16.70 9.36 16.70 9.95C16.70 11.81 17.56 12.74 19.28 12.74C20.11 12.74 20.88 12.32 21.60 11.47L21.39 12.60L24.12 12.60L25.28 6.16ZM19.64 9.62C19.64 9.21 19.78 8.88 20.05 8.63C20.33 8.38 20.65 8.26 21.01 8.26C21.28 8.26 21.52 8.33 21.71 8.48C21.90 8.63 21.99 8.85 21.99 9.14C21.99 9.57 21.85 9.90 21.56 10.14C21.27 10.38 20.95 10.50 20.61 10.50C20.32 10.50 20.09 10.42 19.91 10.26C19.73 10.10 19.64 9.89 19.64 9.62ZM28.97 8.55C29.11 8.02 29.42 7.76 29.90 7.76C30.17 7.76 30.33 7.83 30.39 7.98C30.46 8.13 30.46 8.36 30.41 8.68L29.72 12.60L32.59 12.60L33.36 8.26C33.49 7.52 33.40 6.96 33.10 6.58C32.79 6.20 32.19 6.01 31.29 6.01C30.42 6.01 29.73 6.39 29.20 7.15L29.39 6.16L26.66 6.16L25.52 12.60L28.25 12.60ZM35.66 3.92L35.27 6.16L34.22 6.16L33.84 8.33L34.89 8.33L34.13 12.60L36.72 12.60L37.48 8.33L38.53 8.33L38.91 6.16L37.86 6.16L38.25 3.92ZM39.87 3.89C39.87 4.27 40.02 4.60 40.31 4.86C40.61 5.13 40.96 5.26 41.38 5.26C41.80 5.26 42.16 5.13 42.45 4.86C42.75 4.60 42.90 4.27 42.90 3.89C42.90 3.51 42.75 3.18 42.45 2.92C42.16 2.65 41.80 2.52 41.38 2.52C40.96 2.52 40.61 2.65 40.31 2.92C40.02 3.18 39.87 3.51 39.87 3.89ZM39.66 6.16L38.53 12.60L41.15 12.60L42.28 6.16Z">
                                </path>
                            </g>
                        </svg>
                    </router-link>

                    <!-- Notification button for authenticated users -->
                    <button v-else @click="handleGetNotification"
                        class="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 mr-2">
                        <span class="material-icons text-primary text-3xl">circle_notifications</span>
                        <span v-if="notificationStore.$state.notificationsNumber > 0"
                            class="absolute top-0 right-0 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                            {{ notificationStore.$state.notificationsNumber }}
                        </span>
                    </button>
                </div>

                <!-- Middle section: Page title or Logo -->
                <div v-if="authStore.$state.isAuthenticated" class="absolute left-1/2 transform -translate-x-1/2">
                    <!-- Title for client -->
                    <div v-if="userStore.$state.userType === 'client'">
                        <p class="text-2xl md:text-3xl font-bold text-primary">{{ pageTitle }}</p>
                    </div>

                    <!-- Logo for provider -->
                    <router-link v-else :to="{ name: 'providerHome' }" class="transition-transform duration-300 hover:scale-105">
                        <svg class="w-24 md:w-28 h-auto fill-primary" data-v-423bf9ae="" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 224.78573364505993 60">
                            <g data-v-423bf9ae="" id="4543de12-aaf0-4125-a132-5fbdb5bbcecc"
                                transform="matrix(5.357142948374458,0,0,5.357142948374458,-5.035717750082384,-9.000001226152698)">
                                <path
                                    d="M3.92 9.65C3.92 9.21 4.09 8.84 4.43 8.54C4.77 8.24 5.16 8.09 5.60 8.09C6.48 8.09 7.08 8.36 7.41 8.90L7.87 6.36C7.40 6.04 6.64 5.88 5.59 5.88C4.21 5.88 3.10 6.25 2.23 6.98C1.37 7.71 0.94 8.65 0.94 9.80C0.94 10.79 1.26 11.55 1.90 12.08C2.54 12.61 3.43 12.88 4.59 12.88C5.56 12.88 6.30 12.72 6.79 12.40L7.25 9.84C6.73 10.39 6.02 10.67 5.14 10.67C4.78 10.67 4.49 10.58 4.26 10.40C4.03 10.22 3.92 9.97 3.92 9.65ZM11.62 8.51C11.76 8.01 12.07 7.76 12.54 7.76C12.81 7.76 12.97 7.83 13.03 7.98C13.10 8.13 13.10 8.36 13.05 8.68L12.36 12.60L15.09 12.60L15.86 8.26C15.99 7.50 15.92 6.94 15.64 6.57C15.36 6.19 14.74 6.01 13.79 6.01C13.01 6.01 12.36 6.38 11.86 7.13L12.82 1.68L10.09 1.68L8.16 12.60L10.89 12.60ZM22.55 6.16L22.33 7.39C22.03 6.48 21.34 6.02 20.24 6.02C19.86 6.02 19.46 6.11 19.05 6.29C18.64 6.46 18.26 6.71 17.91 7.03C17.56 7.36 17.27 7.77 17.05 8.29C16.82 8.80 16.70 9.36 16.70 9.95C16.70 11.81 17.56 12.74 19.28 12.74C20.11 12.74 20.88 12.32 21.60 11.47L21.39 12.60L24.12 12.60L25.28 6.16ZM19.64 9.62C19.64 9.21 19.78 8.88 20.05 8.63C20.33 8.38 20.65 8.26 21.01 8.26C21.28 8.26 21.52 8.33 21.71 8.48C21.90 8.63 21.99 8.85 21.99 9.14C21.99 9.57 21.85 9.90 21.56 10.14C21.27 10.38 20.95 10.50 20.61 10.50C20.32 10.50 20.09 10.42 19.91 10.26C19.73 10.10 19.64 9.89 19.64 9.62ZM28.97 8.55C29.11 8.02 29.42 7.76 29.90 7.76C30.17 7.76 30.33 7.83 30.39 7.98C30.46 8.13 30.46 8.36 30.41 8.68L29.72 12.60L32.59 12.60L33.36 8.26C33.49 7.52 33.40 6.96 33.10 6.58C32.79 6.20 32.19 6.01 31.29 6.01C30.42 6.01 29.73 6.39 29.20 7.15L29.39 6.16L26.66 6.16L25.52 12.60L28.25 12.60ZM35.66 3.92L35.27 6.16L34.22 6.16L33.84 8.33L34.89 8.33L34.13 12.60L36.72 12.60L37.48 8.33L38.53 8.33L38.91 6.16L37.86 6.16L38.25 3.92ZM39.87 3.89C39.87 4.27 40.02 4.60 40.31 4.86C40.61 5.13 40.96 5.26 41.38 5.26C41.80 5.26 42.16 5.13 42.45 4.86C42.75 4.60 42.90 4.27 42.90 3.89C42.90 3.51 42.75 3.18 42.45 2.92C42.16 2.65 41.80 2.52 41.38 2.52C40.96 2.52 40.61 2.65 40.31 2.92C40.02 3.18 39.87 3.51 39.87 3.89ZM39.66 6.16L38.53 12.60L41.15 12.60L42.28 6.16Z">
                                </path>
                            </g>
                        </svg>
                    </router-link>
                </div>

                <!-- Right actions section -->
                <div class="flex items-center gap-3">
                    <!-- Language button for non-authenticated users -->
                    <div v-if="!authStore.$state.isAuthenticated" class="dropdown dropdown-end">
                        <label tabindex="0" 
                            class="flex items-center gap-1 bg-white border border-primary hover:bg-gray-50 text-primary px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                            <span class="material-icons text-base">g_translate</span>
                            <span>{{ getCurrentLanguageName() }}</span>
                        </label>
                        
                        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2 border border-gray-200">
                            <li>
                                <a @click="changeLang('en')" class="flex items-center gap-2">
                                    <img src="https://flagcdn.com/32x24/us.png" width="20" height="15" alt="United States">
                                    <span>English</span>
                                    <span v-if="languageStore.$state.lang === 'en'" class="material-icons text-primary ml-auto">check</span>
                                </a>
                            </li>
                            <li>
                                <a @click="changeLang('ar')" class="flex items-center gap-2">
                                    <img src="https://flagcdn.com/32x24/dz.png" width="20" height="15" alt="Algeria">
                                    <span>العربية</span>
                                    <span v-if="languageStore.$state.lang === 'ar'" class="material-icons text-primary ml-auto">check</span>
                                </a>
                            </li>
                            <li>
                                <a @click="changeLang('fr')" class="flex items-center gap-2">
                                    <img src="https://flagcdn.com/32x24/fr.png" width="20" height="15" alt="France">
                                    <span>Français</span>
                                    <span v-if="languageStore.$state.lang === 'fr'" class="material-icons text-primary ml-auto">check</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Login button for non-authenticated users -->
                    <button v-if="!authStore.$state.isAuthenticated" @click="modalStore.toggleModal"
                        class="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md">
                        <span class="material-icons text-base">login</span>
                        <span>{{ languageStore.getWord('login') }}</span>
                    </button>

                    <!-- User dropdown for authenticated users -->
                    <div v-if="authStore.$state.isAuthenticated" class="dropdown dropdown-end">
                        <label tabindex="0" class="cursor-pointer">
                            <div class="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center font-medium transition-transform hover:scale-105 shadow-sm">
                                {{ authStore.$state.userAuth.firstName[0] }}{{ authStore.$state.userAuth.lastName[0] }}
                            </div>
                        </label>

                        <!-- Dropdown menu -->
                        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-64 mt-2 border border-gray-200">
                            <!-- User info section -->
                            <div class="bg-gray-100 p-4 -mt-2 -mx-2 rounded-t-box mb-2">
                                <div class="text-sm text-gray-500">Signed in as</div>
                                <div class="font-medium text-gray-800">{{ authStore.$state.userAuth.firstName }} {{ authStore.$state.userAuth.lastName }}</div>
                                <div class="text-xs text-gray-500 truncate">{{ authStore.$state.userAuth.email }}</div>
                            </div>

                            <!-- Menu items -->
                            <li v-if="userStore.$state.userType === 'provider'">
                                <a @click="handleGoProfile()" class="flex gap-2 hover:bg-gray-100">
                                    <span class="material-icons text-gray-500">person</span>
                                    Profile
                                </a>
                            </li>
                            
                            <li>
                                <label for="lang-modal" class="flex gap-2 hover:bg-gray-100">
                                    <span class="material-icons text-gray-500">g_translate</span>
                                    {{ languageStore.getWord('language') }}
                                </label>
                            </li>
                            
                            <li>
                                <a @click="handleGoSettings()" class="flex gap-2 hover:bg-gray-100">
                                    <span class="material-icons text-gray-500">settings</span>
                                    Params
                                </a>
                            </li>
                            
                            <li>
                                <a @click="logout" class="flex gap-2 text-red-600 hover:bg-red-50">
                                    <span class="material-icons text-red-500">logout</span>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Language selection modal - properly using Daisy UI -->
    <input type="checkbox" id="lang-modal" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box max-w-sm">
            <h3 class="font-bold text-lg mb-4">Select Language</h3>
            <div class="space-y-2">
                <button @click="changeLang('en'); closeLangModal()" 
                        class="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <div class="flex items-center">
                        <img src="https://flagcdn.com/32x24/us.png" width="24" height="18" alt="United States" class="mr-3">
                        <span>English</span>
                    </div>
                    <span v-if="languageStore.$state.lang === 'en'" class="material-icons text-primary">check_circle</span>
                </button>
                
                <button @click="changeLang('ar'); closeLangModal()" 
                        class="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <div class="flex items-center">
                        <img src="https://flagcdn.com/32x24/dz.png" width="24" height="18" alt="Algeria" class="mr-3">
                        <span>العربية</span>
                    </div>
                    <span v-if="languageStore.$state.lang === 'ar'" class="material-icons text-primary">check_circle</span>
                </button>
                
                <button @click="changeLang('fr'); closeLangModal()" 
                        class="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <div class="flex items-center">
                        <img src="https://flagcdn.com/32x24/fr.png" width="24" height="18" alt="France" class="mr-3">
                        <span>Français</span>
                    </div>
                    <span v-if="languageStore.$state.lang === 'fr'" class="material-icons text-primary">check_circle</span>
                </button>
            </div>
            <div class="modal-action">
                <label for="lang-modal" class="btn btn-primary btn-sm rounded-full px-6">Close</label>
            </div>
        </div>
    </div>
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
import { onBeforeMount, computed, ref } from 'vue';

export default {
    name: 'Navbar',
    props: {
        pageTitle: {
            type: String,
            default: 'Chanti',
        },
    },
    setup() {
        // Store
        const themeStore = useThemeStore();
        const modalStore = useModalStore();
        const authStore = useAuthStore();
        const portfolioStore = usePortfolioStore();
        const userStore = useUserStore();
        const clientDemandeStore = useclientDemandeStore();
        const languageStore = useLanguageStore();
        const providerStore = useProviderStore();
        const notificationStore = useNotificationStore();
        
        // Router
        const router = useRouter();
        
        // Helper function to get current language name
        const getCurrentLanguageName = () => {
            switch (languageStore.$state.lang) {
                case 'en': return 'English';
                case 'ar': return 'العربية';
                case 'fr': return 'Français';
                default: return 'Language';
            }
        };

        // Methods
        const logout = () => {
            authStore.logout().then(() => {
                router.push({ name: 'home' });
            });
        };

        const handleGoProfile = () => {
            router.push({
                name: 'profile',
                params: { name: authStore.$state.userAuth.firstName + '-' + authStore.$state.userAuth.lastName }
            });

            portfolioStore.getProviderInfo(authStore.$state.userAuth.id).then((res) => {});
            portfolioStore.getProviderPosts(authStore.$state.userAuth.id).then((res) => {});
        };

        const closeLangModal = () => {
            // Using Daisy UI's pattern for closing modals
            const modalCheckbox = document.getElementById('lang-modal');
            if (modalCheckbox) {
                modalCheckbox.checked = false;
            }
        };

        onBeforeMount(() => {
            if (authStore.$state.isAuthenticated) {
                if (userStore.$state.userType === 'provider') {
                    notificationStore.getProviderNotificationNumber(authStore.$state.userAuth.id).then((res) => {});
                } else {
                    notificationStore.getClientNotificationNumber(authStore.$state.userAuth.id).then((res) => {});
                }
            }

            if (authStore.$state.isAuthenticated === false) {
                router.push({ name: 'home' });
            }
        });

        const handleGetNotification = () => {
            notificationStore.notificationPageVisibility = true;
            if (authStore.$state.userAuth != null) {
                if (userStore.$state.userType === 'provider') {
                    notificationStore.getProviderNotification(authStore.$state.userAuth.id).then((res) => {});
                    //to do : get the provider's projects
                } else {
                    notificationStore.getClientNotification(authStore.$state.userAuth.id).then((res) => {
                        clientDemandeStore.getClientPosts().then((res) => {});
                    });
                }
            }
        };

        const handleGoSettings = () => {
            if (userStore.$state.userType === 'provider') {
                router.push({ name: 'providerSettings' });
            } else {
                router.push({ name: 'clientSettings' });
            }
        };

        const changeLang = (lang) => {
            languageStore.lang = lang;
            userStore.user.language = languageStore.lang;
            languageStore.getLang();
        };

        // Vars
        const theme = computed(() => {
            if (userStore.$state.userType === 'provider' && authStore.$state.isAuthenticated) {
                return 'providerTheme';
            }
            if (userStore.$state.userType === 'client') {
                return 'clientTheme';
            }
        });

        return {
            // Store
            themeStore,
            modalStore,
            userStore,
            authStore,
            notificationStore,
            providerStore,
            portfolioStore,
            languageStore,
            userStore,

            // Vars
            theme,

            // Methods
            logout,
            changeLang,
            handleGetNotification,
            handleGoSettings,
            handleGoProfile,
            closeLangModal,
            getCurrentLanguageName
        };
    },
};
</script>