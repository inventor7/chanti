<template>
    <div :data-theme="themeStore.theme" ref="loginModal " @click.self="modalStore.toggleModalLogin();"
        :class="{ 'modal-open': modalVisibleLogin }" class="modal backdrop-blur-sm   bg-gray-700/80">
        <div class="modal-box   bg-base-100  w-full py-4 mx-2 md:px-10 md:mx-10 relative">
            <h2 :class="{ 'text-end': languageStore.getRtl }" class=" text-2xl md:text-4xl font-bold  pb-5 pt-2 ">{{ languageStore.getWord('login') }}</h2>
            <form action="" class="main-container flex flex-col justify-between items-center font-semibold gap-4">

                <!-- Email or Phone -->
                <div class=" w-full h-fit ">
                    <label :class="{ 'text-end': languageStore.getRtl }" class="block text-[16px] font-semibold mb-2 ">{{ languageStore.getWord('email_or_phone') }}</label>
                    <div class="relative   ">
                        <input type="text" autocomplete="email"
                            class="py-2.5 px-3 sm:py-3 sm:px-4  w-full rounded-lg outline-gray-500  text-sm  border-[2.5px] "
                            :class=" { 'border-gray-300': isValidPhone, 'border-error focus:outline-error': !isValidPhone } "
                            v-model=" phone " placeholder="07 XX XX XX XX">

                        <div v-if=" !isValidPhone "
                            class="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                            <svg class="h-5 w-5 text-red-600 " width="16" height="16" fill="currentColor"
                                viewBox="0 0 16 16" aria-hidden="true">
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                        </div>
                    </div>

                    <div
                        :class=" { 'transition-all duration-300 ease-in-out ': true, 'hidden': isValidPhone, 'block': !isValidPhone } ">
                        <Error :error="languageStore.getWord('valid-email')" />
                    </div>

                </div>


                <!-- Password -->
                <div class=" w-full h-fit ">
                    <label :class="{ 'text-end': languageStore.getRtl }" class="block  text-[16px]  font-semibold mb-2 ">{{  languageStore.getWord('password')  }}</label>
                    <div class="relative      ">
                        <input type="password" autocomplete="current-password"
                            class="py-2.5 px-3 sm:py-3 sm:px-4   w-full rounded-lg outline-gray-500  text-sm  border-[2.5px] "
                            id="password"
                            :class=" { 'border-gray-300 ': isValidPassword, 'border-error focus:outline-error': !isValidPassword } "
                            v-model=" password " placeholder="******">

                        <div @click=" togglePassword "
                            class="absolute inset-y-0  right-0 flex items-center   pr-3 cursor-pointer">
                            <span v-if=" eyeIcon " class="material-icons  -none "
                                :class=" { 'text-gray-500  ': isValidPassword, 'text-error ': !isValidPassword } ">
                                visibility
                            </span>
                            <span v-else class="material-icons cursor-pointer ">
                                visibility_off
                            </span>
                        </div>
                    </div>

                    <div
                        :class=" { 'transition-all duration-300 ease-in-out ': true, 'hidden': isValidPassword, 'block': !isValidPassword } ">
                        <Error :error="languageStore.getWord('valid-password')" />
                    </div>

                </div>




                <div dir="ltr" class="flex flex-row justify-between items-center w-full mt-2 gap-4">
                    <label dir="ltr" class="label gap-2 cursor-pointer">
                        <input type="checkbox" checked="checked" class="checkbox checkbox-xs checkbox-primary" />
                        <span class="label-text text-xs whitespace-nowrap ">{{  languageStore.getWord('remember_me')}} ?</span>
                    </label>

                    <span class="link text-xs whitespace-nowrap link-primary no-underline">{{
                        languageStore.getWord('forgot_password') }}</span>
                </div>

                <div class="flex flex-col w-full h-full gap-[3px]">
                    <button @click.prevent=" login() " :class=" { 'loading': authStore.loading } "
                        class="btn btn-sm md:btn-md btn-primary text-white w-full">
                        <span v-if=" !authStore.loading ">
                            {{ languageStore.getWord('sign_in') }}
                        </span>
                        <!-- <Loading class=" border-white bg-black  " /> -->
                    </button>
                    <div class="divider"> {{ languageStore.getWord('dont_have_account') }} </div>
                    <router-link @click=" toggleModalLogin " :to=" { name: 'howitworks' } ">
                        <span class="btn border-[1px] bg-gray-200 border-gray-200 btn-sm md:btn-md btn-ghost w-full ">{{ languageStore.getWord('register')
                            }}</span>
                    </router-link>
                </div>

            </form>
            <label @click=" modalStore.toggleModalLogin() "
                class="btn  btn-xs md:btn-sm btn-primary btn-circle absolute top-2"
                :class="{ 'left-2': languageStore.getRtl , 'right-2': !languageStore.getRtl }"
                >
                ✕
            </label>
        </div>


        <!-- Error Component -->
        <div v-show=" toggleError && authStore.error.status "
            class=" box toast toast-top toast-center w-fit whitespace-nowrap ">
            <div class="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ languageStore.getWord(authStore.error.message) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Error from "../components/Error.vue"
import Loading from "../components/Loading.vue"
import { useModalStore } from "../store/AppBasic/modaleStore.js"
import { useLanguageStore } from "../store/AppBasic/languageStore.js"

import { useThemeStore } from "../store/AppBasic/themeStore";
import { useUserStore } from "../store/userStore";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
export default {
    name: "LoginModal",
    components: {
        Error,
        Loading
    },
    setup() {
        //initiate the modal store
        const modalStore = useModalStore()
        const themeStore = useThemeStore()
        const languageStore = useLanguageStore()
        const userStore = useUserStore()
        const authStore = useAuthStore()
        const router = useRouter()

        //vars 
        const phone = ref('')
        const password = ref('')
        const email = ref('')
        const toggleError = ref(false)
        // icons
        const eyeIcon = ref(true)


        const isValidPassword = ref(true)
        const isValidPhone = ref(true)


        // check if phone number is valid
        let t2 = computed(() => {
            let phoneRegex = /^(?:\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3})|(?:0[5-7]\d{8})$/
            let validPh = phoneRegex.test(phone.value)
            return validPh
        })

        // check if password is valid
        let t3 = computed(() => {
            let validP = password.value.length >= 6
            return validP
        })

        //toggle show password by a eyeIcon value
        const togglePassword = () => {
            const password = document.querySelector('#password');
            eyeIcon.value = !eyeIcon.value
            if (password.type === 'password') {
                password.type = 'text';
              
            } else {
                password.type = 'password';
           
            }
        }






        const login = () => {
            isValidPhone.value = t2.value
            isValidPassword.value = t3.value
            if (isValidPhone.value && isValidPassword.value) { // if phone and password are valid

                if (phone.value.includes('@')) { // if phone is an email
                    authStore.login('', phone.value, password.value).then(() => {
                        if (authStore.isAuthenticated) {
                            modalStore.toggleModalLogin();
                            if (userStore.$state.userType === 'provider') {
                                router.push({ name: 'providerHome' })
                            }
                        } else {
                            toggleError.value = true
                            setTimeout(() => {
                                toggleError.value = false
                            }, 3000);
                        }
                    })
                } else { // if phone is a phone number
                    authStore.login(phone.value, '', password.value).then(() => {

                        if (authStore.isAuthenticated) {
                            modalStore.toggleModalLogin();
                        } else {
                            toggleError.value = true
                            setTimeout(() => {
                                toggleError.value = false
                            }, 3000);
                        }
                    })
                }

                phone.value = ''
                password.value = ''

            }


        }

        //toggle the modal visibility
        const toggleModalLogin = () => {
            modalStore.toggleModalLogin();

        };

        const modalVisibleLogin = computed(() => {
            return modalStore.modalVisibleLogin;
        });








        return {
            //methods
            login,
            togglePassword,
            toggleModalLogin,

            //vars
            eyeIcon,
            phone, password,
            isValidPassword, isValidPhone,
            modalVisibleLogin,
            toggleError,


            //Store
            modalStore,
            themeStore,
            languageStore,
            authStore,
        };
    },
};
</script>

<style>
/* Hide the number input arrows in WebKit-based browsers */
.appearance-none::-webkit-outer-spin-button,
.appearance-none::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    color: #7c7978;
}
</style>
