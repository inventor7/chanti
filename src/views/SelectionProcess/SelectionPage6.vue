<template>
    <SignupLayout prevLink="emergency" :pageNumber="6" :isError="notSelectedError" :errorText="errorText" nextBtnText="Next"
        @handle="handleClick" :pageTitle="languageStore.getWord('login')" componentLocation="selectionProcess">

        <div class=" flex flex-row justify-around w-full h-full flex-1 gap-3  items-center ">
            <div class=" flex flex-col  justify-center items-center gap-3 w-full h-fit mb-16 md:mb-20  ">


                <form action=""
                    class="main-container flex flex-col justify-between items-center w-full px-4 sm:w-1/2 md:w-1/3  font-semibold gap-4">

                    <!-- Email or Phone -->
                    <div class=" w-full h-fit ">
                        <label :class="{ 'text-end': languageStore.getRtl }"
                            class="block text-[16px] font-semibold mb-2 ">{{ languageStore.getWord('email_or_phone')
                            }}</label>
                        <div class="relative   ">
                            <input type="text" autocomplete="email"
                                class="py-2.5 px-3 sm:py-3 sm:px-4  w-full rounded-lg outline-gray-500  text-sm  border-[2.5px] "
                                :class="{ 'border-gray-300': isValidPhone, 'border-error focus:outline-error': !isValidPhone }"
                                v-model="phone" placeholder="example@gmail.com">

                            <div v-if="!isValidPhone"
                                class="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                <svg class="h-5 w-5 text-red-600 " width="16" height="16" fill="currentColor"
                                    viewBox="0 0 16 16" aria-hidden="true">
                                    <path
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                        </div>

                        <div
                            :class="{ 'transition-all duration-300 ease-in-out ': true, 'hidden': isValidPhone, 'block': !isValidPhone }">
                            <Error :error="languageStore.getWord('valid-email')" />
                        </div>

                    </div>


                    <!-- Password -->
                    <div class=" w-full h-fit ">
                        <label :class="{ 'text-end': languageStore.getRtl }"
                            class="block  text-[16px]  font-semibold mb-2">{{ languageStore.getWord('password') }}</label>
                        <div class="relative      ">
                            <input type="password" autocomplete="current-password"
                                class="py-2.5 px-3 sm:py-3 sm:px-4   w-full rounded-lg outline-gray-500  text-sm  border-[2.5px] "
                                id="password"
                                :class="{ 'border-gray-300 ': isValidPassword, 'border-error focus:outline-error': !isValidPassword }"
                                v-model="password" placeholder="******">

                            <div @click="togglePassword"
                                class="absolute inset-y-0  right-0 flex items-center   pr-3 cursor-pointer">
                                <span v-if="eyeIcon" class="material-icons  -none "
                                    :class="{ 'text-gray-500  ': isValidPassword, 'text-error ': !isValidPassword }">
                                    visibility
                                </span>
                                <span v-else class="material-icons cursor-pointer ">
                                    visibility_off
                                </span>
                            </div>
                        </div>

                        <div
                            :class="{ 'transition-all duration-300 ease-in-out ': true, 'hidden': isValidPassword, 'block': !isValidPassword }">
                            <Error :error="languageStore.getWord('valid-password')" />
                        </div>

                    </div>




                    <div dir="ltr" class="flex flex-row justify-between items-center w-full mt-2 gap-4">
                        <label dir="ltr" class="label gap-2 cursor-pointer">
                            <input type="checkbox" checked="checked" class="checkbox checkbox-xs checkbox-primary" />
                            <span class="label-text text-xs whitespace-nowrap ">{{ languageStore.getWord('remember_me') }}
                                ?</span>
                        </label>

                        <span class="link text-xs whitespace-nowrap link-primary no-underline">{{
                            languageStore.getWord('forgot_password') }}</span>
                    </div>

                    <div class="flex flex-col w-full h-full gap-[3px]">
                        <button @click.prevent="login()" :class="{ 'loading': authStore.loading }"
                            class="btn btn-sm md:btn-md btn-primary text-white w-full">
                            <span v-if="!authStore.loading">
                                {{ languageStore.getWord('sign_in') }}
                            </span>
                            <!-- <Loading class=" border-white bg-black  " /> -->
                        </button>
                        <div class="divider"> {{ languageStore.getWord('dont_have_account') }} </div>
                        <router-link @click="toggleModalLogin" :to="{ name: 'howitworks' }"> <span
                                class="btn btn-sm md:btn-md btn-secondary btn-outline w-full border-2">{{
                                    languageStore.getWord('register')
                                }}</span> </router-link>
                    </div>

                </form>


            </div>
        </div>

    </SignupLayout>
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import Error from '../../components/Error.vue'
import Loading from '../../components/Loading.vue'
import { useLanguageStore } from '../../store/AppBasic/languageStore';
import { useAuthStore } from '../../store/authStore';
import { useModalStore } from '../../store/AppBasic/modaleStore';
import { useUserStore } from '../../store/userStore';
import { useThemeStore } from '../../store/AppBasic/themeStore';
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore'
import { useClientStore } from '../../store/Client/clientStore';
import { useRouter } from 'vue-router';
import { computed, ref, watch, reactive, watchEffect } from 'vue';
import Category from '../../components/Category/Category.vue';

export default {
    name: 'SelectionPage6',
    components: { SignupLayout, Category, Error, Loading },
    setup() {
        //props
        const notSelectedError = ref(false)
        const errorText = ref('')

        // clientDemandeStore
        const router = useRouter()
        const userStore = useUserStore()
        const languageStore = useLanguageStore()
        const authStore = useAuthStore()
        const modalStore = useModalStore()
        const themeStore = useThemeStore()
        const clientDemandeStore = useclientDemandeStore()
        const clientStore = useClientStore()
        //vars

        const descText = ref('')
        const phone = ref('')
        const password = ref('')
        const email = ref('')
        // icons
        const eyeIcon = ref(true)


        const isValidPassword = ref(true)
        const isValidPhone = ref(true)


        const handleClick = () => {
            clientDemandeStore.request.description = descText.value
            if (authStore.isAuthenticated) {
                router.push({ name: 'results' })
            } else {
                router.push({ name: 'loginSelection' })
            }

        }




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
                        if (authStore.$state.isAuthenticated) {
                            // set client id to the request
                            clientDemandeStore.request.clientId = authStore.$state.userAuth.id
                            // send request to server
                            const formData = new FormData();
                            formData.append("clientId", clientDemandeStore.$state.request.clientId);
                            formData.append("categoryId", clientDemandeStore.$state.request.categoryId);
                            formData.append("subcategoryId", clientDemandeStore.$state.request.subCategoryId);
                            formData.append("stateId", clientDemandeStore.$state.request.stateId);
                            formData.append("cityId", clientDemandeStore.$state.request.cityId);
                            formData.append("urgency", clientDemandeStore.$state.request.urgency);
                            formData.append("description", clientDemandeStore.$state.request.description);
                            for (let i = 0; i < clientDemandeStore.$state.request.images.length; i++) {
                                formData.append("images", clientDemandeStore.$state.request.images[i]);
                            }


                            clientStore.postRequest(formData)

                            router.push({ name: 'results' })

                        } else {

                            notSelectedError.value = true
                            errorText.value = authStore.error.message
                            setTimeout(() => {
                                notSelectedError.value = false
                            }, 3000);
                        }
                    })
                } else { // if phone is a phone number

                    authStore.login(phone.value, '', password.value).then(() => {

                        if (authStore.$state.isAuthenticated) {
                            // set client id to the request
                            clientDemandeStore.request.clientId = authStore.$state.userAuth.id
                            // send request to server
                            const formData = new FormData();
                            formData.append("clientId", clientDemandeStore.$state.request.clientId);
                            formData.append("categoryId", clientDemandeStore.$state.request.categoryId);
                            formData.append("subcategoryId", clientDemandeStore.$state.request.subCategoryId);
                            formData.append("stateId", clientDemandeStore.$state.request.stateId);
                            formData.append("cityId", clientDemandeStore.$state.request.cityId);
                            formData.append("urgency", clientDemandeStore.$state.request.urgency);
                            formData.append("description", clientDemandeStore.$state.request.description);
                            for (let i = 0; i < clientDemandeStore.$state.request.images.length; i++) {
                                formData.append("images", clientDemandeStore.$state.request.images[i]);
                            }


                            clientStore.postRequest(formData)

                            router.push({ name: 'results' })

                        } else {

                            notSelectedError.value = true
                            errorText.value = authStore.error.message
                            setTimeout(() => {
                                notSelectedError.value = false
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
            errorText,
            descText,
            handleClick,
            notSelectedError,



            //Store
            modalStore,
            themeStore,
            languageStore,
            authStore,
        };
    },

}

</script>

<style></style>