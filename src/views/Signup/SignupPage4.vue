<template>
    <div>
        <SignupLayout :pageNumber="userStore.user.userType === 'provider' ? 4 : 2" :isError="notSelectedError"
            errorText="please select a wilaya and commune" @handle="handleClick" @handleBack="handleBack"
            :pageTitle="languageStore.getWord('selectLocation')" :pageDesc="languageStore.getWord('location_desc_client')">
            <div class=" flex overflow-y-scroll flex-row justify-start w-full h-full  flex-1 gap-3  items-start ">
                <div
                    class=" flex flex-col sm:flex-row   justify-start items-start w-full mb-20 md:mb-0  sm:gap-2 h-[70%] md:h-1/2 ">

                    <!-- wilayas -->
                    <transition>
                        <div v-if="!wilayassStore.error.status"
                            class=" box flex flex-col  justify-center  items-center gap-3 w-full h-full ">
                            <div class="dropdown   dropdown-open dropdown-bottom flex flex-col justify-start items-start  ">

                                <div
                                    class="flex flex-row justify-between items-center px-1 w-full border border-primary rounded-xl ">
                                    <input v-model="searchedWilaya"
                                        class=" input focus:border-none border-none outline-none focus:outline-none input-md w-full input-primary text-lg font-semibold text-black  "
                                        type="text" :placeholder="languageStore.getWord('ch_wilaya')"
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
                                                :class="{ 'hidden': wilayassStore.filteredWilayas.length !== 0, 'text-end': languageStore.getRtl }">
                                                <span>{{ languageStore.getWord('no_state') }}</span>
                                            </li>
                                            <li class=" dropdown-open  px-3 cursor-pointer hover:bg-gray-400/30 font-semibold  py-1 sm:py-2  transition-all duration-200 ease-in-out  rounded-xl   "
                                                @click="selectWilaya(wilaya)"
                                                v-for="wilaya in wilayassStore.filteredWilayas" :key="wilaya.id">
                                                <span v-if="userStore.user.language === 'ar'">{{ wilaya.id }} {{
                                                    wilaya.ascciName }}</span>
                                                <span v-else>{{ wilaya.id }} {{ wilaya.name }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </transition>



                    <!-- communes -->

                    <div v-show="!wilayassStore.error.status && wilayaValidate"
                        class=" box flex flex-col  justify-center items-center w-full h-full gap-3 ">
                        <div class="dropdown  dropdown-open dropdown-bottom flex flex-col justify-start items-start  ">

                            <div
                                class="flex flex-row justify-between items-center px-1 w-full border border-primary rounded-xl ">
                                <input v-model="searchedCommune"
                                    class=" input focus:border-none border-none outline-none focus:outline-none input-md w-full input-primary text-lg font-semibold text-black"
                                    type="text" :placeholder="languageStore.getWord('ch_city')"
                                    oninput="this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1)"
                                    @focus="openC = true">

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
                                <div v-if="openC && !communeValidate" class="overflow-x-hidden  ">
                                    <ul tabindex="0"
                                        class="dropdown-content   w-full max-h-32 sm:max-h-64 p-2 sm:shadow-2xl bg-base-100 rounded-box border-y-2 overflow-y-scroll">
                                        <li class="text-error px-3 font-semibold  py-1 sm:py-2 rounded-xl "
                                            :class="{ 'hidden': wilayassStore.filteredCommunes.length !== 0, 'text-end': languageStore.getRtl }">
                                            <span>{{ languageStore.getWord('no_city') }} </span></li>
                                        <li class=" dropdown-open  z-10  px-3 cursor-pointer hover:bg-gray-400/30 font-semibold py-1 sm:py-2 transition-all duration-200 ease-in-out  rounded-xl   "
                                            @click="selectCommune(commune)"
                                            v-for="commune in wilayassStore.filteredCommunes" :key="commune.id">
                                            <span v-if="userStore.user.language === 'ar'">{{ commune.CityName }}</span>
                                            <span v-else>{{ commune.CityNameAscii }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </transition>
                        </div>

                    </div>



                    <div v-show="wilayassStore.error.status || !wilayaValidate"
                        class=" box h-full w-full flex flex-col justify-center items-center ">
                        <Error class="  text-center text-lg  font-semibold  " :error="wilayassStore.error.message" />
                    </div>



                </div>
            </div>
        </SignupLayout>
    </div>
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import { useWilayasStore } from '../../store/wilayasStore.js'
import { useLanguageStore } from '../../store/AppBasic/languageStore.js'
import { useUserStore } from '../../store/userStore';
import { computed, ref, onBeforeMount, watchEffect, watch, onMounted } from 'vue';
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
        const languageStore = useLanguageStore()

        const buttonDisabled = ref(true)
        const notSelectedError = ref(false)
        const searchedWilaya = ref("")
        const searchedCommune = ref("")
        const openW = ref(false)
        const openC = ref(false)



        //wilayas
        const selectWilaya = (wilaya) => {
            wilayassStore.selectedWilaya = wilaya
            if (userStore.user.language == "ar") {
                searchedWilaya.value = wilaya.ascciName
            } else {
                searchedWilaya.value = wilaya.name
            }


        }

        let wilayaValidate = computed(() => {
            if (userStore.user.language == "ar") {
                if (searchedWilaya.value.includes(wilayassStore.selectedWilaya.ascciName)) {
                    return true
                } else {
                    return false
                }
            } else {
                if (searchedWilaya.value.includes(wilayassStore.selectedWilaya.name)) {
                    return true
                } else {
                    return false
                }
            }

        })


        let communeValidate = computed(() => {
            if (userStore.user.language == "ar") {
                if (searchedCommune.value.includes(wilayassStore.selectedCommune.CityName)) {
                    return true
                } else {
                    return false
                }
            } else {
                if (searchedCommune.value.includes(wilayassStore.selectedCommune.CityNameAscii)) {
                    return true
                } else {
                    return false
                }
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

        watchEffect(() => {
            wilayassStore.filterCommunes(searchedCommune.value)
        })


        //communes
        const selectCommune = (commune) => {
            wilayassStore.selectedCommune = commune
            if (userStore.user.language == "ar") {
                searchedCommune.value = commune.CityName
            } else {
                searchedCommune.value = commune.CityNameAscii
            }
        }




        const handleClick = (clicked) => {
            if (clicked) {
                //make sure when click on next btn that wilaya and commune are filled,else  error to props
                if (!wilayaValidate.value || !communeValidate.value) {
                    notSelectedError.value = true
                } else {
                    notSelectedError.value = false
                    router.push({ name: 'idendity' })
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
                    router.push({ name: 'profession' })
                }
                else {
                    router.push({ name: 'howitworks' })
                }

            }
        }



        return {
            //store
            wilayassStore,
            userStore,
            languageStore,

            //vars
            openC, openW,
            buttonDisabled,
            searchedWilaya, searchedCommune,
            selectCommune, selectWilaya,
            wilayaValidate, communeValidate,
            handleClick, handleBack,
            notSelectedError
        }
    },

}

</script>

<style scoped >
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