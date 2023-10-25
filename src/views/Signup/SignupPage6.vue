<template>
    <div>
        <SignupLayout :pageNumber="userStore.user.userType === 'provider' ? 6 : 4" nextBtnText="next"
            :isError="notSelectedError" :errorText="msg" @handle="handleClick" @handleBack="handleBack"
            pageTitle=" Register " pageDesc=" so you can login to our platform wherever you are whenever you want ">
            <div
                class=" flex flex-col overflow-y-scroll h-[100vh]   justify-center py-2 items-center font-semibold text-md w-full md:h-full ">
                <!-- when it's loading -->
                <Loading v-if="userStore.loading" />
                <!-- the loading has stopped -->
                <div v-else class="w-full h-full">
                    <!-- when ther's an error -->
                    <div v-if="userStore.error.status" class="w-full ">
                        <Error :error="userStore.error.message" />
                    </div>
                    <!-- when there's no error  -->
                    <form v-else
                        class=" flex flex-col md:justify-start md:h-full md:gap-4   justify-between items-center px-4   sm:px-10 md:px-10    w-full  ">
                        <img v-if="userStore.$state.user.userType == 'client'" class="rounded-full w-24 md:pb-10 "
                            src="../../assets/patient.png" alt="">
                        <img v-else class="rounded-full w-24 md:pb-10  " src="../../assets/handyman.png" alt="">

                        <div
                            class=" flex flex-col md:flex-row md:justify-between justify-center items-center w-full h-fit gap-4 ">
                            <!-- Phone Number -->
                            <div class=" w-full h-fit ">
                                <label class="block text-[16px] font-semibold mb-2 ">Phone</label>
                                <div class="relative   ">
                                    <input type="text" autocomplete="phone"
                                        class="py-2.5 px-3 sm:py-3 sm:px-4  w-full rounded-lg outline-gray-500  text-sm  border-[2.5px] "
                                        :class="{ 'border-gray-300': isValidPhone, 'border-error focus:outline-error': !isValidPhone }"
                                        v-model="phone" placeholder="Enter your phone number">

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
                                    <Error error="Please enter a valid algerian number." />
                                </div>

                            </div>
                            <!-- Email-->
                            <div class=" w-full h-fit ">
                                <label class="block  text-[16px]  font-semibold mb-2 ">Email <span
                                        class=" text-xs text-red-600">optional</span> </label>
                                <div class="relative      ">
                                    <input type="text" autocomplete="email"
                                        class="py-2.5 px-3 sm:py-3 sm:px-4   w-full rounded-lg outline-gray-500  text-sm  border-[2.5px] "
                                        :class="{ 'border-gray-300': isValidEmail, 'border-error focus:outline-error': !isValidEmail }"
                                        v-model="email" placeholder="Enter your Email">

                                    <div v-if="!isValidEmail"
                                        class="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                        <svg class="h-5 w-5 text-red-600 " width="16" height="16" fill="currentColor"
                                            viewBox="0 0 16 16" aria-hidden="true">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                    </div>
                                </div>

                                <div
                                    :class="{ 'transition-all duration-300 ease-in-out ': true, 'hidden': isValidEmail, 'block': !isValidEmail }">
                                    <Error error="Please enter a valid Email." />
                                </div>

                            </div>
                        </div>

                        <div
                            class=" flex flex-col md:flex-row md:justify-between justify-center items-center w-full h-fit gap-4 ">
                            <!-- Password -->
                            <div class=" w-full h-fit ">
                                <label class="block  text-[16px]  font-semibold mb-2 ">Password</label>
                                <div class="relative      ">
                                    <input type="password" autocomplete="new-password"
                                        class="py-2.5 px-3 sm:py-3 sm:px-4   w-full rounded-lg outline-gray-500  text-sm  border-[2.5px] "
                                        id="password"
                                        :class="{ 'border-gray-300 ': isValidPassword, 'border-error focus:outline-error': !isValidPassword }"
                                        v-model="password" placeholder="Enter your Password">

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
                                    <Error error="Password should have at least 6 characters." />
                                </div>

                            </div>



                            <!-- confirmation password -->
                            <div class=" w-full h-fit ">
                                <label class="block  text-[16px]  font-semibold mb-2 ">Confirme Password</label>
                                <div class="relative       ">
                                    <input type="password" autocomplete="new-password"
                                        class="py-2.5 px-3 sm:py-3 sm:px-4  w-full rounded-lg outline-gray-500  text-sm  border-[2.5px] "
                                        id="passwordC"
                                        :class="{ 'border-gray-300 ': isValidPasswordC, 'border-error focus:outline-error': !isValidPasswordC }"
                                        v-model="passwordC" placeholder=" confirme password ">

                                    <div @click="togglePasswordC"
                                        class="absolute inset-y-0  right-0 flex items-center   pr-3 cursor-pointer">
                                        <span v-if="eyeIconC" class="material-icons  -none "
                                            :class="{ 'text-gray-500  ': isValidPasswordC, 'text-error ': !isValidPasswordC }">
                                            visibility
                                        </span>
                                        <span v-else class="material-icons cursor-pointer ">
                                            visibility_off
                                        </span>
                                    </div>
                                </div>

                                <div
                                    :class="{ 'transition-all duration-300 ease-in-out ': true, 'hidden': isValidPasswordC, 'block': !isValidPasswordC }">
                                    <Error error="Confirmation password doesn't match the password" />
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>


        </SignupLayout>
    </div>
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import Error from '../../components/Error.vue'
import Loading from '../../components/Loading.vue'
import { ref, computed, onBeforeMount } from 'vue';
import { useUserStore } from '../../store/userStore';
import { useAuthStore } from '../../store/authStore';
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore'
import { useClientStore } from '../../store/Client/clientStore'
import { useRouter } from 'vue-router';


export default {
    name: 'SignupPage6',
    components: { SignupLayout, Error, Loading },
    setup() {
        const userStore = useUserStore()
        const router = useRouter()
        const authStore = useAuthStore()
        const clientDemandeStore = useclientDemandeStore()
        const clientStore = useClientStore()

        // props
        const notSelectedError = ref(false)
        const msg = ref('')

        // inputs
        const email = ref('')
        const phone = ref('')
        const password = ref('')
        const passwordC = ref('')

        // icons
        const eyeIcon = ref(true)
        const eyeIconC = ref(true)


        // validation
        const isValidPassword = ref(true)
        const isValidEmail = ref(true)
        const isValidPhone = ref(true)
        const isValidPasswordC = ref(true)




        // check if email is valid and email is optional
        let t1 = computed(() => {
            let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            let validE = emailRegex.test(email.value) || email.value == ''
            if (validE) {
                userStore.user.email = email.value
            }
            return validE
        })

        // check if phone number is valid
        let t2 = computed(() => {
            let phoneRegex = /^(05|06|07)\d{8}$/
            let validPh = phoneRegex.test(phone.value)
            if (validPh) {
                userStore.user.phoneNumber = phone.value
            }
            return validPh
        })

        // check if password is valid
        let t3 = computed(() => {
            let validP = password.value.length >= 6
            if (validP) {
                userStore.user.password = password.value
            }
            return validP
        })

        // check if password and confirmation password are the same
        let t4 = computed(() => {
            return password.value === passwordC.value
        })


        // fill the inputs with data from the store
        onBeforeMount(() => {
            email.value = userStore.user.email
            phone.value = userStore.user.phoneNumber
            password.value = userStore.user.password
            passwordC.value = userStore.user.password

        })



        // check if all inputs are valid
        const handleClick = (clicked) => {
            if (clicked) {

                isValidEmail.value = t1.value
                isValidPhone.value = t2.value
                isValidPassword.value = t3.value
                isValidPasswordC.value = t4.value

                if (isValidEmail.value && isValidPhone.value && isValidPassword.value && isValidPasswordC.value) {
                    notSelectedError.value = false
                    if (userStore.$state.userType === 'provider') {
                        if (userStore.isEmptyProvider) { //check if all the fields are not empty else return it to the beggining
                            notSelectedError.value = true
                            msg.value = 'we will redirect you to fill all the fields'
                            setTimeout(() => {
                                router.push({ name: 'howitworks' })
                            }, 5000);
                        }
                        else {
                            userStore.extractSubCategoriesIds()
                            authStore.signup().then(() => {
                                if (authStore.$state.isAuthenticated) {
                                    userStore.emptyFields()
                                    router.push({ name: 'providerHome' })

                                } else {
                                    notSelectedError.value = true
                                    msg.value = authStore.error.message
                                }

                            })
                        }
                    }



                    if (userStore.$state.userType === 'client') {
                        if (userStore.isEmptyClient) { //check if all the fields are not empty else return it to the beggining
                            notSelectedError.value = true
                            msg.value = 'we will redirect you to fill all the fields'
                            setTimeout(() => {
                                router.push({ name: 'howitworks' })
                            }, 5000);
                        }
                        else {
                            authStore.signup().then(() => {
                                if (authStore.$state.isAuthenticated) {
                                    userStore.emptyFields()
                                    //redirect based on the previous page
                                    if (clientDemandeStore.$state.requestinProgress === true) {
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
                                        router.push({ name: 'home' })
                                    }

                                } else {
                                    notSelectedError.value = true
                                    msg.value = authStore.error.message
                                }

                            })
                        }
                    }
                }
            }


        }






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


        //toggle show password by a eyeIconC value
        const togglePasswordC = () => {
            const passwordCC = document.querySelector('#passwordC');
            eyeIconC.value = !eyeIconC.value
            if (passwordCC.type === 'password') {
                passwordCC.type = 'text';
            } else {
                passwordCC.type = 'password';
            }
        }

        const handleBack = () => {
            router.push({ name: 'idendity' })
        }



        return {

            //Props 
            notSelectedError,
            msg,

            // inputs
            email,
            phone,
            password,
            passwordC,


            // validation
            isValidPhone,
            isValidEmail,
            isValidPassword,
            isValidPasswordC,

            // toggle password
            togglePassword,
            togglePasswordC,

            // eyeIcon Password
            eyeIcon,
            eyeIconC,

            // handlers
            handleClick,
            handleBack,

            // stores
            userStore,




        }
    }
}



</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>