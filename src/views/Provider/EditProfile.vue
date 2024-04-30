<template>
    <ProviderLayout>

        <!-- Card Section -->
        <div class=" max-w-7xl font-semibold ">
            <!-- Card -->
            <div class=" w-full md:rounded-xl md:shadow sm:p-7">
                <div class="mb-8">
                    <h2 class="text-xl font-bold text-gray-800 ">
                        Profile
                    </h2>
                    <p class="text-sm text-gray-600 ">
                        Manage your name, password and account settings.
                    </p>
                </div>

                <form>
                    <!-- Grid -->
                    <div class="grid w-full grid-cols-12 gap-y-4 gap-x-2 sm:gap-6">
                        <!-- <div class="col-span-3">
                            <label class="inline-block text-sm text-gray-800 mt-2.5 ">
                                Profile photo
                            </label>
                        </div> -->
                        <!-- End Col -->

                        <!-- <div class="col-span-9">
                            <div class="flex items-center gap-5">
                                <img class="inline-block h-16 w-16 rounded-full ring-2 ring-white "
                                    src="../../assets/OIG.jpg" alt="Image Description">
                                <div class="flex gap-x-2">
                                    <div>
                                        <button type="button"
                                            class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border-2  font-medium bg-white text-gray-700 shadow-sm align-middle       transition-all text-sm ">
                                            <span class="material-icons ">
                                                edit
                                            </span>
                                            Upload photo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <!-- End Col -->

                        <div class="col-span-3">
                            <label for="af-account-full-name" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                Full name
                            </label>
                            <div class="hs-tooltip inline-block">
                                <button type="button" class="hs-tooltip-toggle ml-1">
                                    <svg class="inline-block w-3 h-3 text-gray-400 " xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path
                                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                </button>
                                <span
                                    class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                    role="tooltip">
                                    Displayed on public forums, such as Preline
                                </span>
                            </div>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-9">
                            <div class="sm:flex">
                                <input id="af-account-full-name" type="text"
                                    class="py-2 px-3 pr-11 block w-full border-2 border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-2   "
                                    :value="provider.firstName">
                                <input type="text"
                                    class="py-2 px-3 pr-11 block w-full border-2 border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-2   "
                                    :value="provider.lastName">
                            </div>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-3">
                            <label for="af-account-email" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                Email
                            </label>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-9">
                            <input id="af-account-email" type="email"
                                class="py-2 px-3 pr-11 block w-full border-2 border-gray-200 shadow-sm text-sm rounded-lg focus:border-2   "
                                :value="provider.email">
                        </div>

                        <div class="col-span-3">
                            <div class="inline-block">
                                <label for="af-account-phone" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                    Phone
                                </label>
                                <span class="text-sm text-error ">
                                    (Optional)
                                </span>
                            </div>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-9">
                            <div class="sm:flex">
                                <input id="af-account-phone" type="text"
                                    class="py-2 px-3 pr-11 block w-full  border-2 border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-2   "
                                    :value="provider.phoneNumber">

                            </div>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-3">
                            <label for="af-account-bio" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                BIO
                            </label>
                        </div>
                        <!-- End Col -->

                        <div class="col-span-9">
                            <textarea id="af-account-bio"
                                class="py-2 px-3 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-2   "
                                rows="6"
                                value="Lorem ipsum dolor sit amet consectetur adipisicing elit.Recusandae ratione fugiat fugit sed tempore expedita eligendi quam officia tempora quae tenetur quia, ab blanditiis doloribus.Asperiores cum mollitia numquam recusandae."></textarea>
                        </div>
                        <!-- End Col -->
                        <div class="col-span-3">
                            <label for="af-account-bio" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                Address
                            </label>
                        </div>

                        <div class="col-span-9">
                            <div class=" gap-3 flex-col justify-center items-center">
                                <transition>
                                    <div class=" box flex flex-col  justify-center  items-center gap-3 w-full h-full ">
                                        <div
                                            class="dropdown   dropdown-open dropdown-bottom flex flex-col justify-start items-start  ">

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
                                                            :class="{ 'hidden': wilayassStore.filteredWilayas.length !== 0 }">
                                                            <span>{{ languageStore.getWord('no_state') }}</span>
                                                        </li>
                                                        <li class=" dropdown-open  px-3 cursor-pointer hover:bg-gray-400/30 font-semibold  py-1 sm:py-2  transition-all duration-200 ease-in-out  rounded-xl   "
                                                            @click="selectWilaya(wilaya)"
                                                            v-for="wilaya in wilayassStore.filteredWilayas"
                                                            :key="wilaya.id">
                                                            <span v-if="userStore.user.language === 'ar'">{{ wilaya.id }}
                                                                {{ wilaya.ascciName }}</span>
                                                            <span v-else>{{ wilaya.id }} {{ wilaya.name }}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                </transition>

                                <!-- communes -->

                                <div v-show="wilayaValidate"
                                    class=" box flex flex-col  justify-center items-center w-full h-full mt-2 gap-3 ">
                                    <div
                                        class="dropdown  dropdown-open dropdown-bottom flex flex-col justify-start items-start  ">

                                        <div
                                            class="flex flex-row justify-between items-center px-1 w-full border border-primary rounded-xl ">
                                            <input v-model="searchedCommune"
                                                class=" input focus:border-none border-none outline-none focus:outline-none input-md w-full input-primary text-lg font-semibold text-black"
                                                type="text" placeholder="Choose a commune"
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
                                                        :class="{ 'hidden': wilayassStore.filteredCommunes.length !== 0 }">
                                                        <span>{{ languageStore.getWord('no_city') }} </span>
                                                    </li>
                                                    <li class=" dropdown-open  z-10  px-3 cursor-pointer hover:bg-gray-400/30 font-semibold py-1 sm:py-2 transition-all duration-200 ease-in-out  rounded-xl   "
                                                        @click="selectCommune(commune)"
                                                        v-for="commune in wilayassStore.filteredCommunes" :key="commune.id">
                                                        <span v-if="userStore.user.language === 'ar'">{{ commune.CityName
                                                        }}</span>
                                                        <span v-else>{{ commune.CityNameAscii }}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </transition>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- End Col -->


                        <div class="col-span-3">
                            <label for="af-account-bio" class="inline-block text-sm text-gray-800 mt-2.5 ">
                                Profession
                            </label>
                        </div>

                        <div class="col-span-9">


                            <div class="sm:flex">
                                <label for="category-modal"
                                    class="py-2 px-3 pr-11 block w-full bg-white  border-2 border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-2">
                                    {{ languageStore.getWord(provider.category.name) }}
                                </label>
                            </div>

                            <div class="sm:flex mt-2">
                                <label for="subCategory-modal"
                                    class="py-2  hover:bg-gray-400/40  px-3 space-y-2 pr-11 block w-full bg-white  border-2 border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-2">
                                    <p class=" px-2 py-0.5 bg-primary/20 rounded-xl text-primary " v-for="subcat in provider.subcategories">{{ languageStore.getWord(subcat.name) }}</p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- End Grid -->

                    <div class="mt-5 flex justify-end gap-x-2">
                        <button type="button"
                            class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border-2  font-medium bg-white text-gray-700 shadow-sm align-middle     transition-all text-sm">
                            Cancel
                        </button>
                        <button type="button"
                            class="py-2 px-3 bg-blue-500 inline-flex justify-center items-center gap-2 rounded-md border-2   font-semibold  text-white      transition-all text-sm ">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
            <!-- End Card -->
        </div>
        <!-- End Card Section -->
        <Alert @handleCloseBtn="handleTreatPost" closeBtnText="Save" toggleBtnText="discard" 
            message="" modalName="category-modal">
            <CategoriesList />
        </Alert>
        <Alert @handleCloseBtn="handleTreatPost" closeBtnText="Save" toggleBtnText="discard" message=""
            modalName="subCategory-modal">
            <SubCategoriesList  />
        </Alert>
        <!-- End Container -->
    </ProviderLayout>
</template>

<script>
import ProviderLayout from '../Layouts/ProviderLayout.vue'
import CategoriesList from '../../components/Category/CategoriesList.vue'
import SubCategoriesList from '../../components/Category/SubCategoriesList.vue';
import Alert from '../../components/Alert.vue';
import { useThemeStore } from '../../store/AppBasic/themeStore';
import { useWilayasStore } from '../../store/wilayasStore';
import { useCategoriesStore } from '../../store/categoriesStore';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/userStore';
import { useProviderStore } from '../../store/Provider/providerStore';
import { useLanguageStore } from '../../store/AppBasic/languageStore';
import { useNotificationStore } from '../../store/notificationStore';

import { computed, ref, onBeforeMount, watchEffect, watch, onMounted, onUpdated } from 'vue';

export default {
    name: 'EditProfile',
    components: {
        ProviderLayout,
        CategoriesList,
        SubCategoriesList,
        Alert,
    },
    setup() {
        //initialisation the store
        const authStore = useAuthStore()
        const providerStore = useProviderStore()
        const categoriesStore = useCategoriesStore()
        const notificationStore = useNotificationStore()
        const wilayassStore = useWilayasStore()
        const userStore = useUserStore()
        const languageStore = useLanguageStore()
        const router = useRouter()

        //methods
        const searchedWilaya = ref("")
        const searchedCommune = ref("")
        const openW = ref(false)
        const openC = ref(false)



        //props
        const buttonDisabled = ref(true)
        const notSelectedError = ref(false)




        //wilayas
        const selectWilaya = (wilaya) => {
            wilayassStore.selectedWilaya = wilaya
            wilayassStore.selectedCommune = {}
            searchedCommune.value = ''
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
            searchedCommune.value = provider.value.city
            searchedWilaya.value = wilayassStore.getWilayaById(provider.value.stateId)

            wilayassStore.selectedCommune.CityName = provider.value.city
            wilayassStore.selectedWilaya.ascciName = wilayassStore.getWilayaById(provider.value.stateId)

            wilayassStore.selectedCommune.CityNameAscii = provider.value.city
            wilayassStore.selectedWilaya.name = wilayassStore.getWilayaById(provider.value.stateId)



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






        let provider = computed(() => {
            return providerStore.$state.provider
        })




        return {
            // store
            authStore,
            providerStore,
            userStore,
            notificationStore,
            wilayassStore,
            categoriesStore,
            languageStore,

            openC, openW,
            buttonDisabled,
            searchedWilaya, searchedCommune,
            selectCommune, selectWilaya,
            wilayaValidate, communeValidate,
            notSelectedError,
            //vars
            provider,
        }

    }
}

</script>
