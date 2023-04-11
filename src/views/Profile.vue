<template>
    <Loading v-if="loading" />
    <div v-else class="w-full h-full">
        <!-- go home -->
        <div class="absolute  top-1 right-2 cursor-pointer  block  text-primary text-xl sm:text-base  " @click="handleGoHome">
            <span class="material-icons text-2xl ">
                cancel
            </span>
        </div>

        <Error v-if="providerStore.errorrProvider.status" :errorText="providerStore.errorrProvider.message" />
        <div v-else class="max-w-4xl  p-3 sm:py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div class=" sm:pt-10">
                <div class="w-full h-full">
                    <div>
                        <div class="  gap-3 flex flex-col rounded-2xl">
                            <div class="   flex-shrink-0 w-full items-center flex flex-row h-full group ">
                                <div class="avatar   online">
                                    <div class="h-[4.5rem] w-[4.5rem]  rounded-full">
                                        <img class="inline-block  flex-shrink-0  " src="../assets/mechanic.png"
                                            alt="Image Description" />
                                    </div>
                                </div>

                                <div class="ml-3  flex flex-col gap-1 justif-between  items-start w-full h-full ">
                                    <h3 class="font-semibold  text-xl text-gray-800 ">{{ provider.firstName }}
                                        {{ provider.lastName }}

                                    </h3>
                                    <div class="flex flex-row justify-between  items-center w-full h-full">
                                        <div
                                            class="flex flex-row justify-center px-2 border-2 rounded-2xl items-center gap-1">
                                            <span class="material-icons text-primary text-lg ">
                                                star
                                            </span>
                                            {{ provider.rating }}
                                        </div>
                                        <span class="material-icons  text-3xl text-secondary">
                                            verified
                                        </span>
                                    </div>
                                </div>



                            </div>


                            <div class="flex flex-row justify-between items-center w-full h-full mt-4">
                                <button
                                    class=" btn btn-sm h-10 rounded-3xl btn-primary btn-outline btn-ghost  btn-xsinline-flex items-center justify-center  font-medium  ">
                                    <span class="material-icons mr-2">
                                        add
                                    </span>
                                    request
                                </button>
                                <button
                                    class=" btn btn-sm h-10 rounded-3xl text-white btn-secondary inline-flex items-center justify-center  font-medium  ">
                                    <span class="material-icons mr-2">
                                        send
                                    </span>
                                    message
                                </button>
                            </div>
                        </div>


                        <div class="w-full  rounded-2xl  mt-4 h-full">
                            <h2 class="font-medium text-xl">Plumbery</h2>
                            <div class="flex flex-row   w-full overflow-y-scroll gap-2 mt-2">

                                <div
                                    class="flex btn btn-outline btn-ghost  btn-xs flex-row items-center justify-center rounded-full ">
                                    <span>Plumbing Repairs & Installations</span>
                                </div>
                                <div
                                    class="flex btn  btn-outline btn-ghost  btn-xs flex-row items-center justify-center rounded-full ">

                                    <span>Sewer & Drain Cleaning</span>
                                </div>
                                <div
                                    class="flex btn btn-outline btn-ghost  btn-xs flex-row items-center justify-center rounded-full ">

                                    <span>Water Filtration & Purification</span>
                                </div>
                                <div
                                    class="flex btn btn-outline btn-ghost  btn-xs flex-row items-center justify-center rounded-full ">

                                    <span>Pipe Inspection & Repair</span>
                                </div>
                            </div>
                        </div>

                        <!-- rating component -->






                        <div class="flex mt-4 flex-col bg-white border shadow-sm rounded-xl">
                            <div class="bg-gray-100 border-b rounded-t-xl pt-3 px-4 md:pt-4 md:px-5">
                                <nav class="flex space-x-2" aria-label="Tabs">
                                    <!-- Tab 1 -->
                                    <button
                                        class="flex items-center justify-center w-full h-full py-2 text-sm font-medium text-gray-500 rounded-t-xl hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:text-gray-700 focus:bg-gray-100"
                                        :class="{ 'text-gray-900 bg-white ': selectedTab === 2 }" @click="selectedTab = 2">
                                        <span class="material-icons">
                                            work
                                        </span>
                                        <span class="ml-2">portfolio</span>
                                    </button>

                                    <!-- Tab 2 -->
                                    <button
                                        class="flex items-center justify-center w-full h-full py-2 text-sm font-medium text-gray-500 rounded-t-xl hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:text-gray-700 focus:bg-gray-100"
                                        :class="{ 'text-gray-900 bg-white ': selectedTab === 1 }" @click="selectedTab = 1">
                                        <span class="material-icons">
                                            reviews
                                        </span>
                                        <span class="ml-2">reviws</span>
                                    </button>

                                    <!-- Tab 3 -->

                                    <!-- <button
                                        class="flex items-center justify-center w-full h-full py-2 text-sm font-medium text-gray-500 rounded-t-xl hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:text-gray-700 focus:bg-gray-100"
                                        :class="{ 'text-gray-900 bg-white ': selectedTab === 0 }"
                                        @click="selectedTab = 0">
                                        <span class="material-icons">
                                            info
                                        </span>
                                        <span class="ml-2">About</span>
                                    </button> -->


                                </nav>
                            </div>

                            <div class="p-4 text-center md:py-7 md:px-5">
                                <div v-if="selectedTab === 0">
                                    <Tab1 />
                                </div>
                                <div v-if="selectedTab === 1">
                                    <Tab2 :rating="provider.rating" />
                                </div>
                                <div v-if="selectedTab === 2">
                                    <Tab3 />
                                </div>
                            </div>
                        </div>





                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";
import Tab1 from "../components/Tab1.vue";
import Tab2 from "../components/Tab2.vue";
import Tab3 from "../components/Tab3.vue";
import Rating from "../components/Rating.vue";
import { useclientDemandeStore } from "../store/clientDemandeStore";
import { useProviderStore } from "../store/providerStore";
import { useRouter } from "vue-router";
import { ref } from "vue";
import router from "../router";
export default {
    name: "Profile",
    components: {
        Rating,
        Loading,
        Error,
        Tab1,
        Tab2,
        Tab3,
    },
    setup() {

        //store
        const clientDemandeStore = useclientDemandeStore()
        const providerStore = useProviderStore()
        const router = useRouter()

        //computed
        let provider = computed(() => clientDemandeStore.$state.providerProfile)
        let loading = computed(() => providerStore.loading)

        //tab
        const selectedTab = ref(0);
        const selectTab = (tab) => {
            selectedTab.value = tab;
        };

        const handleGoHome = () => {
            clientDemandeStore.emptyFields()
            providerStore.$state.provider = null
            router.replace({ name: "home" })
        }



        return {
            clientDemandeStore,
            provider,
            providerStore,
            loading,
            selectedTab,
            selectTab,
            handleGoHome
        };
    },
};

</script>
