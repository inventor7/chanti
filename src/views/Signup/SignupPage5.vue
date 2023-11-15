<template>
    <div>
        <SignupLayout :pageNumber="userStore.user.userType === 'provider' ? 5 : 3" nextBtnText="Next" @handle="handleClick"
            @handleBack="handleBack" :pageTitle="languageStore.getWord('PersonalInfo')"
            :pageDesc="languageStore.getWord('descSP5')">
            <div
                class=" flex flex-col md:flex-row  items-center justify-start md:justify-start px-4 pt-10  gap-10  sm:pt-1 font-semibold text-md w-full h-full ">
                <div class=" flex-col justify-center items-center hidden md:flex  w-1/2 p-10 ">
                    <img v-if="userStore.$state.user.userType == 'client'" class=" text-center w-full    "
                        src="../../assets/personal-info.svg" alt="client">
                    <img v-else src="../../assets/personal-info.svg" alt="pro pic" class=" w-full   ">
                </div>
                <img class=" flex md:hidden w-28 " src="../../assets/info.svg" alt="">
                <div class=" flex flex-col justify-center max-w-xs w-full  h-fit ">
                    <!-- input for the first name of the user -->
                    <div class=" w-full    mt-2 ">
                        <label :class="{ 'text-end': languageStore.getRtl }" class="block text-sm  font-semibold mb-2 ">{{
                            languageStore.getWord('first_name') }}</label>
                        <div class="relative">
                            <input type="text"
                                class="py-2.5 px-3    w-full rounded-lg outline-primary  text-sm  border-[1px] "
                                :class="{ 'border-gray-300  ': isValidFirstName, 'border-error focus:outline-error': !isValidFirstName, 'text-end': languageStore.getRtl }"
                                v-model="firstName" @input="validateFirstName" placeholder="">

                            <div v-if="!isValidFirstName"
                                :class="{ ' left-2 ': languageStore.getRtl, 'right-0': !languageStore.getRtl }"
                                class="absolute inset-y-0  flex items-center pointer-events-none pr-3">
                                <svg class="h-5 w-5 text-red-600 " width="16" height="16" fill="currentColor"
                                    viewBox="0 0 16 16" aria-hidden="true">
                                    <path
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                        </div>


                        <div
                            :class="{ 'transition-all duration-300 ease-in-out ': true, 'opacity-0': isValidFirstName, 'opacity-100': !isValidFirstName }">
                            <Error :error="languageStore.getWord('valid-first_name')" />
                        </div>

                    </div>





                    <!-- input for  last name of the user -->
                    <div class=" w-full  mt-2 ">
                        <label :class="{ 'text-end': languageStore.getRtl }" class="block text-sm font-semibold mb-2 ">{{
                            languageStore.getWord('last_name') }}</label>
                        <div class="relative">
                            <input type="text"
                                class="py-2.5 px-3    w-full rounded-lg outline-primary  text-sm  border-[1px] "
                                :class="{ 'border-gray-300  ': isValidLastName, 'border-error focus:outline-error': !isValidLastName, 'text-end': languageStore.getRtl }"
                                v-model="lastName" @input="validateLastName" placeholder="">

                            <div v-if="!isValidLastName"
                                :class="{ ' left-2 ': languageStore.getRtl, 'right-0': !languageStore.getRtl }"
                                class="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                <svg class="h-5 w-5 text-red-600 " width="16" height="16" fill="currentColor"
                                    viewBox="0 0 16 16" aria-hidden="true">
                                    <path
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                        </div>

                        <div
                            :class="{ 'transition-all duration-300 ease-in-out ': true, 'opacity-0': isValidLastName, 'opacity-100': !isValidLastName }">
                            <Error :error="languageStore.getWord('valid-last_name')" />
                        </div>

                    </div>


                </div>
            </div>

        </SignupLayout>
    </div>
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import Error from '../../components/Error.vue'
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useUserStore } from '../../store/userStore';
import { useLanguageStore } from '../../store/AppBasic/languageStore';
import { useRouter } from 'vue-router'


export default {
    name: 'SignupPage5',
    components: { SignupLayout, Error },
    setup() {
        // intialize the user store
        const userStore = useUserStore()
        const languageStore = useLanguageStore()
        const router = useRouter()

        const firstName = ref("")
        const lastName = ref("")
        const validF = ref(true)
        const isValidFirstName = ref(true)
        const isValidLastName = ref(true)




        let t1 = computed(() => {
            const nameRegex = /^[a-zA-Z\u0600-\u06FF]+(?:\s[a-zA-Z\u0600-\u06FF]+)?$/;
            validF.value = nameRegex.test(firstName.value.trim()) && firstName.value.trim().length > 2
            if (validF.value) {
                userStore.user.firstName = firstName.value
            }

            return validF.value;
        });



        let t2 = computed(() => {
            const nameRegex = /^[a-zA-Z\u0600-\u06FF]+(?:\s[a-zA-Z\u0600-\u06FF]+)?$/;
            let validL = nameRegex.test(lastName.value.trim()) && lastName.value.trim().length > 2
            if (validL) {
                userStore.user.lastName = lastName.value
            }
            return validL;
        });




        const handleClick = (data) => {
            if (data) {
                isValidFirstName.value = t1.value
                isValidLastName.value = t2.value
                if (isValidFirstName.value && isValidLastName.value) {
                    router.push('registrations')
                }
            }
        }




        const handleBack = () => {
            router.push({ name: 'location' })
        }

        onBeforeMount(() => {
            firstName.value = userStore.user.firstName
            lastName.value = userStore.user.lastName
        })

        return {
            firstName,
            lastName,
            isValidFirstName,
            isValidLastName,

            handleClick,
            handleBack,

            //Store
            userStore,
            languageStore
        }
    }
}


</script>