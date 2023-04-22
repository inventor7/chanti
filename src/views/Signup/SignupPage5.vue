<template>
    <div>
        <SignupLayout :pageNumber="userStore.user.userType === 'provider' ? 5 : 3" nextBtnText="Next" @handle="handleClick"
            @handleBack="handleBack" pageTitle="Idendity"
            pageDesc=" Enter your full name so we can ensure your idendity for clients ">
            <div
                class=" flex flex-col  justify-center px-4 sm:px-8 pt-3 sm:pt-1 items-center font-semibold text-md w-full h-full ">
                <img v-if="userStore.$state.user.userType == 'client'" class="rounded-full w-24  "
                    src="../../assets/patient.png" alt="">
                <img v-else class="rounded-full w-24   " src="../../assets/handyman.png" alt="">
                <div class=" flex flex-col   sm:w-3/5 lg:w-3/6  sm:gap-x-2   w-full h-full ">
                    <!-- input for the first name of the user -->
                    <div class=" w-full  mt-2 ">
                        <label class="block text-[16px]  font-semibold mb-2 ">First Name</label>
                        <div class="relative">
                            <input type="text"
                                class="py-2.5 px-3 sm:py-3 sm:px-4   w-full rounded-lg outline-gray-500  text-sm  border-[2.5px] "
                                :class="{ 'border-gray-300  ': isValidFirstName, 'border-error focus:outline-error': !isValidFirstName }"
                                v-model="firstName" @input="validateFirstName" placeholder="Enter your name">

                            <div v-if="!isValidFirstName"
                                class="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                <svg class="h-5 w-5 text-red-600 " width="16" height="16" fill="currentColor"
                                    viewBox="0 0 16 16" aria-hidden="true">
                                    <path
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                        </div>


                        <div
                            :class="{ 'transition-all duration-300 ease-in-out ': true, 'opacity-0': isValidFirstName, 'opacity-100': !isValidFirstName }">
                            <Error error="Please enter a valid Name." />
                        </div>

                    </div>





                    <!-- input for  last name of the user -->
                    <div class=" w-full  mt-2 ">
                        <label class="block text-[16px]  font-semibold mb-2 ">Last Name</label>
                        <div class="relative">
                            <input type="text"
                                class="py-2.5 px-3 sm:py-3 sm:px-4   w-full rounded-lg outline-gray-500  text-sm  border-[2.5px] "
                                :class="{ 'border-gray-300  ': isValidLastName, 'border-error focus:outline-error': !isValidLastName }"
                                v-model="lastName" @input="validateLastName" placeholder="Enter your last name">

                            <div v-if="!isValidLastName"
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
                            <Error error="Please enter a valid Name." />
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
import { useRouter } from 'vue-router'


export default {
    name: 'SignupPage5',
    components: { SignupLayout, Error },
    setup() {
        // intialize the user store
        const userStore = useUserStore()
        const router = useRouter()

        const firstName = ref("")
        const lastName = ref("")
        const validF = ref(true)
        const isValidFirstName = ref(true)
        const isValidLastName = ref(true)




        let t1 = computed(() => {
            const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
            validF.value = nameRegex.test(firstName.value.trim()) && firstName.value.trim().length > 2
            if (validF.value) {
                userStore.user.firstName = firstName.value
            }

            return validF.value;
        });



        let t2 = computed(() => {
            const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
            let validL = nameRegex.test(lastName.value.trim()) && lastName.value.trim().length > 2
            if (validL) {
                userStore.user.lastName = lastName.value
            }
            return validL;
        });




        const handleClick = (data) => {
            if (data) {
                console.log(data)
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
            userStore
        }
    }
}


</script>