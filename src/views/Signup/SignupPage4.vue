<template>
    <div>
        <SignupLayout :pageNumber="pNumber" :isError="notSelectedError"
            errorText="please select a wilaya and commune" 
            @handle="handleClick" @handleBack="handleBack"
            pageTitle=" Select location "
            pageDesc=" select your wilaya and commune so we can provide you with the clients in your area ">
            <div class=" flex flex-col sm:flex-row justify-around w-full  h-full flex-1 gap-3  items-start ">

                <!-- wilayas -->
                <transition>
                    <div v-if="!wilayassStore.error.status"
                        class=" box flex flex-col  justify-start items-start gap-3 w-full h-full ">
                        <h2 class="text-2xl font-bold"> Wilaya </h2>
                        <div class="dropdown   dropdown-open dropdown-bottom flex flex-col justify-start items-start  ">

                            <div
                                class="flex flex-row justify-between items-center px-1 w-full border border-primary rounded-xl ">
                                <input v-model="searchedWilaya"
                                    class=" input focus:border-none border-none outline-none focus:outline-none input-md w-full input-primary text-lg font-semibold text-black  "
                                    type="text" placeholder="Choose a wilaya"
                                    oninput="this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1)"
                                    @focus="openW = true" @blur="openW = false">

                                <span
                                    :class="{ 'material-icons pr-1 text-primary font-semibold ': true, 'hidden': searchedWilaya.length > 0 }">
                                    expand_more
                                </span>

                                <span
                                    :class="{ 'material-icons pr-1 text-primary font-semibold ': true, 'hidden': wilayaValidate || searchedWilaya.length == 0 }">
                                    expand_less
                                </span>

                                <span
                                    :class="{ 'material-icons pr-1  font-semibold text-green-600 ': true, 'hidden': !wilayaValidate }">
                                    check_circle
                                </span>

                            </div>
                            <!-- List -->
                            <transition name="fade">
                                <div v-if="openW && !wilayaValidate" class="overflow-x-hidden">
                                    <ul tabindex="0"
                                        class="dropdown-content   w-full max-h-32 sm:max-h-64 p-2 sm:shadow-2xl bg-base-100 rounded-box border-y-2 overflow-y-scroll">
                                        <li class="text-error px-3 font-semibold  py-1 sm:py-2 rounded-xl "
                                            :class="{ 'hidden': wilayassStore.filteredWilayas.length !== 0 }"><a>No such
                                                wilaya with this name </a></li>
                                        <li class=" dropdown-open  px-3 cursor-pointer hover:bg-gray-400/30 font-semibold  py-1 sm:py-2  transition-all duration-200 ease-in-out  rounded-xl   "
                                            @click="selectWilaya(wilaya)" v-for="wilaya in wilayassStore.filteredWilayas"
                                            :key="wilaya.id">
                                            <a>{{ wilaya.id }} {{ wilaya.name }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </transition>
                        </div>
                    </div>
                </transition>



                <!-- communes -->
                <transition>
                    <div v-if="!wilayassStore.error.status"
                        class=" box flex flex-col  justify-start items-start w-full h-full gap-3 ">
                        <h2 class="text-2xl font-bold "> City</h2>
                        <div class="dropdown  dropdown-open dropdown-bottom flex flex-col justify-start items-start  ">

                            <div
                                class="flex flex-row justify-between items-center px-1 w-full border border-primary rounded-xl ">
                                <input v-model="searchedCommune"
                                    class=" input focus:border-none border-none outline-none focus:outline-none input-md w-full input-primary text-lg font-semibold text-black"
                                    type="text" placeholder="Choose a commune"
                                    oninput="this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1)"
                                    @focus="openC = true" @blur="openC = false">

                                <span
                                    :class="{ 'material-icons pr-1 text-primary font-semibold ': true, 'hidden': searchedCommune.length > 0 }">
                                    expand_more
                                </span>

                                <span
                                    :class="{ 'material-icons pr-1 text-primary font-semibold ': true, 'hidden': communeValidate || searchedCommune.length == 0 }">
                                    expand_less
                                </span>

                                <span
                                    :class="{ 'material-icons pr-1  font-semibold text-green-600 ': true, 'hidden': !communeValidate }">
                                    check_circle
                                </span>

                            </div>
                            <!-- List -->
                            <transition>
                                <div v-if="(!communeValidate && wilayassStore.selectedWilaya)"
                                    class="overflow-x-hidden  ">
                                    <ul tabindex="0"
                                        class="dropdown-content   w-full max-h-32 sm:max-h-64 p-2 sm:shadow-2xl bg-base-100 rounded-box border-y-2 overflow-y-scroll">
                                        <li class="text-error px-3 font-semibold  py-1 sm:py-2 rounded-xl "
                                            :class="{ 'hidden': wilayassStore.filteredCommunes.length !== 0 }"><a>No such
                                                communes with this name </a></li>
                                        <li class=" dropdown-open  px-3 cursor-pointer hover:bg-gray-400/30 font-semibold py-1 sm:py-2 transition-all duration-200 ease-in-out  rounded-xl   "
                                            @click="selectCommune(commune)"
                                            v-for="commune in wilayassStore.filteredCommunes" :key="commune.id">
                                            <a>{{ commune.CityNameAscii }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </transition>
                        </div>

                    </div>


                    <div v-else class=" box h-full w-full flex flex-col justify-center items-center ">
                        <Error class="  text-center text-xl font-semibold  " :error="wilayassStore.error.message" />
                    </div>
                </transition>

            </div>
        </SignupLayout>
    </div>
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import { useWilayasStore } from '../../store/wilayasStore.js'
import { useUserStore } from '../../store/userStore';
import { computed, ref, onBeforeMount, watchEffect } from 'vue';
import Error from '../../components/Error.vue'
import { useRouter } from 'vue-router';

export default {
    name: 'SignupPage4',
    components: { SignupLayout, Error },
    setup() {

        //initialize the  store
        const wilayassStore = useWilayasStore()
        const userStore = useUserStore()
        const router = useRouter()

        const buttonDisabled = ref(true)
        const notSelectedError = ref(false)
        const pNumber = 4
        const searchedWilaya = ref("")
        const searchedCommune = ref("")
        const openW = ref(false)
        const openC = ref(false)




        //wilayas
        const selectWilaya = (wilaya) => {
            wilayassStore.selectedWilaya = wilaya
            searchedWilaya.value = wilaya.name

        }

        let wilayaValidate = computed(() => {
            if (searchedWilaya.value.includes(wilayassStore.selectedWilaya.name)) {
                return true
            } else {
                return false
            }
        })


        let communeValidate = computed(() => {
            if (searchedCommune.value.includes(wilayassStore.selectedCommune.CityNameAscii) && wilayaValidate.value) {
                return true
            } else {
                return false
            }
        })

        onBeforeMount(() => {
            searchedCommune.value = wilayassStore.getSelectedCommune
            searchedWilaya.value = wilayassStore.getSelectedWilaya
        })

        watchEffect(() => {

            wilayassStore.filterWilayas(searchedWilaya.value)
            if (wilayaValidate.value) {
                wilayassStore.fetchCommune(wilayassStore.selectedWilaya.id)
            } else {
                wilayassStore.filteredCommunes = []
            }
        })




        //communes
        const selectCommune = (commune) => {
            wilayassStore.selectedCommune = commune
            searchedCommune.value = commune.CityNameAscii
        }

        watchEffect(() => {
            wilayassStore.filterCommunes(searchedCommune.value)
        })


        const handleClick = (clicked) => {
            if (clicked) {

                //make sure when click on next btn that wilaya and commune are filled,else  error to props
                if (!wilayaValidate.value || !communeValidate.value) {
                    notSelectedError.value = true
                } else {
                    notSelectedError.value = false
                    router.replace({ name: 'idendity' })
                    userStore.user.wilaya = wilayassStore.selectedWilaya
                    userStore.user.commune = wilayassStore.selectedCommune
                }

                //end if
            }
            //End function
        }


        // check if the user type is client or a provider
        //to redirect him to the right "back btn"
        const handleBack = (clicked) => {
            if (clicked) {
                if (userStore.user.userType === "provider") {
                    router.replace({ name: 'profession' })
                }
                else {
                    router.replace({ name: 'howitworks' })
                }
                
            }
        }



        return {
            wilayassStore,
            openC, openW,
            pNumber, buttonDisabled,
            searchedWilaya, searchedCommune,
            selectCommune, selectWilaya,
            wilayaValidate, communeValidate,
            handleClick,handleBack,
            notSelectedError
        }
    },

}

</script>

<style>
.dropdown-content::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 20px;
}

.dropdown-content::-webkit-scrollbar-thumb {
    background-color: #db4024;
    border-radius: 10px;
}

.dropdown-content::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}
</style>