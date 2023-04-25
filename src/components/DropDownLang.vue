<template>
    <div data-theme="clientTheme" dir="ltr" class="dropdown dropdown-end  ">
        <button class=" btn btn-primary btn-xs whitespace-nowrap sm:btn-sm text-white   ">

            <!-- translation icon -->
            <svg class="inline-block md:hidden h-4 w-4 fill-current md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" viewBox="0 0 512 512">
                <path d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"></path>
                <path
                    d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z">
                </path>
            </svg>

            <!-- down icon -->
            <svg width="12px" height="12px"
                class="ml-1 inline-block  md:hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>

            <span class="hidden md:inline-block  "> {{ languageStore.getWord('lang') }} </span>
            <span class="material-icons hidden md:block p-0 m-0 ">
                keyboard_arrow_down
            </span>

        </button>

        <ul tabindex="0" class="p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li selected="true" @click="changeLang('en')">
                <span class="">English
                    <img src="https://flagcdn.com/16x12/us.png"
                        srcset="https://flagcdn.com/32x24/us.png 2x, https://flagcdn.com/48x36/us.png 3x" width="16"
                        height="12" alt="United States">
                    <span class="material-icons flex-1 md:block p-0 m-0 text-green-600 flex items-end justify-end"
                        v-if="languageStore.$state.lang === 'en'">
                        check_circle
                    </span>
                </span>
            </li>


            <li @click="changeLang('ar')">
                <a>العربية
                    <img src="https://flagcdn.com/40x30/dz.png"
                        srcset="https://flagcdn.com/80x60/dz.png 2x, https://flagcdn.com/120x90/dz.png 3x" width="20"
                        height="24" alt="Algeria">
                    <span class="material-icons flex-1 md:block p-0 m-0 text-green-600 flex items-end justify-end"
                        v-if="languageStore.$state.lang === 'ar'">
                        check_circle
                    </span>
                </a>

            </li>

            <li @click="changeLang('fr')">
                <a>Français
                    <img src="https://flagcdn.com/16x12/fr.png"
                        srcset="https://flagcdn.com/32x24/fr.png 2x, https://flagcdn.com/48x36/fr.png 3x" width="16"
                        height="12" alt="France">
                    <span class="material-icons flex-1 md:block p-0 m-0 text-green-600 flex items-end justify-end"
                        v-if="languageStore.$state.lang === 'fr'">
                        check_circle
                    </span>
                </a>

            </li>

        </ul>
    </div>
</template>

<script>
import { useModalStore } from '../store/AppBasic/modaleStore'
import { useLanguageStore } from '../store/AppBasic/languageStore'
import { useThemeStore } from '../store/AppBasic/themeStore.js'
import { useUserStore } from '../store/userStore'
import { computed, onBeforeMount, defineComponent } from 'vue'


export default defineComponent({
    name: 'DropDownLang',
    props: {
        showLogin: {
            type: Boolean,
            default: false,
        }
    },
    setup() {
        const modalStore = useModalStore()
        const languageStore = useLanguageStore()
        const themeStore = useThemeStore()
        const userStore = useUserStore()

        const changeLang = (lang) => {
            languageStore.lang = lang
            userStore.user.language = languageStore.lang
            languageStore.getLang()
        }

        return {
            modalStore,
            languageStore,
            themeStore,
            userStore,
            changeLang,
        }
    },
})

</script>
