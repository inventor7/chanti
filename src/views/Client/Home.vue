<template>
    <ClientLayout>
        <div class="grid place-items-center  w-full h-full    ">

            <div class=" relative flex flex-col justify-between w-full min-h-[60vh] md:min-h-[80vh]      ">
                <!-- add an overlay image -->
                <img src="/wall.svg" class="w-full object-cover absolute top-0 right-0 z-0  h-full  sm:object-cotain  " />

                <!-- add a gradient -->
                <div class="absolute top-0 left-0 z-10 w-full h-full  bg-gradient-to-b from-secondary  to-white/30 "></div>

                <div class="px-2 z-20 flex-1  sm:px-4 w-full h-fit  flex flex-row items-center py-0  "
                    :class="{ 'justify-end': languageStore.getRtl, 'justify-start': !languageStore.getRtl }">
                    <div class="flex flex-col justify-between items-start py-4 w-full md:w-2/3 max-w-5xl h-1/2 md:h-2/3  ">
                        <h1 v-if="authStore.$state.isAuthenticated == false" :class="{ 'text-end': languageStore.getRtl }"
                            class="  text-2xl  sm:text-4xl md:text-5xl    text-white whitespace-normal mb-5 font-bold">
                            {{ languageStore.getWord('title') }}
                            <span class="text-primary">
                                {{ languageStore.getWord('endTitle') }}
                            </span>
                        </h1>
                        <h1 v-else :class="{ 'text-end': languageStore.getRtl }"
                            class=" first-letter:uppercase  text-3xl  sm:text-6xl  text-white whitespace-normal mb-5 font-bold">
                            {{ languageStore.getWord('welcome_back') }}
                            <span class="text-primary">
                                {{ authStore.$state.userAuth.lastName.toUpperCase() }}
                            </span>
                        </h1>

                        <SearchBar componentLocation="home" class=" w-full shadow-xl" />
                    </div>
                </div>

                <div v-if="authStore.$state.isAuthenticated === false"
                    class="md:hidden z-20 flex flex-row justify-between bg-primary rounded-b-xl px-2 md:p-1.5 items-center w-full  ">
                    <span class="text-white text-sm md:text-xl  font-semibold ">
                        {{ languageStore.getWord('r_u_pro') }} ?
                    </span>
                    <div @click="handleJoinNetwork"
                        class="flex  flex-row justify-between  items-center w-fit cursor-pointer ">
                        <span class="text-white underline-offset-1 text-sm md:text-xl  font-semibold ">
                            {{ languageStore.getWord('JoinTheChantiTeam') }}
                        </span>
                        <span class="material-icons self-center text-white text-sm sm:text-2xl">
                            chevron_right
                        </span>
                    </div>

                </div>
            </div>
            <!-- join our network -->

        </div>



        <div class="h-full w-full pt-8  px-2 md:p-6 lg:p-8 flex flex-col justify-center items-start gap-4  ">
            <h2 :class="{ 'text-end': languageStore.getRtl }" class=" text-xl md:text-2xl  w-full font-bold ">{{
                languageStore.getWord('browse_cat') }} </h2>
            <div
                class="grid grid-cols-2 grid-rows-5 h-full  sm:grid-cols-4 sm:grid-rows-3   md:grid-cols-4  md:grid-rows-3 lg:grid-cols-5 lg:grid-rows-2  rounded-md  w-full gap-2">
                <Category v-for=" category in categoriesStore.$state.categories  " :key="category.id"
                    @click="selectCategory(category)" :categoryName="languageStore.getWord(category.name)"
                    :isActive="category === selectedCategory && !clientDemandeStore.$state.requestinProgress"
                    :iconName="category.iconName" :categoryId="category.id"
                    :class="{ 'bg-black   text-sky-700 scale-[103%]   ': category === categoriesStore.selectedCategory && !clientDemandeStore.$state.requestinProgress }"
                    class=" text-center cursor-pointer rounded-md shadow-md   hover:shadow-xl border-gray-300 border-t border-l md:shadow-none md:border     transition-all duration-300 ease-in-out">
                </Category>
            </div>
        </div>

        <Howitworks />
        <SearchPage />
        <LoginModal />
        <Modal class=" flex flex-col justify-center items-center gap-4  sm:gap-8 md:gap-10  h-full ">
            <p class="text-white text-3xl font-semibold"> Login As :</p>
            <div class=" flex flex-col items-end justify-end w-full  px-2 sm:px-10 md:px-20 lg:px-32 ">
                <label @click="modalStore.toggleModal"
                    class="btn btn-error place text-sm md:text-lg btn-sm md:btn-md btn-circle right-[20%] top-[10%] ">✕</label>
            </div>

            <div
                class=" grid grid-cols-2 px-2  items-center bg-transparent sm:gap-8  md:gap-12 lg:gap-16  max-w-lg     gap-4 ">

                <Card @click="toggleModalLogin('clientTheme', 'client')" :title="languageStore.getWord('client')"
                    iconName="person" class=" hover:bg-[#db4024]/100  sm:p-12 md:p-14     p-10 w-full " />
                <Card @click="toggleModalLogin('providerTheme', 'provider')" :title="languageStore.getWord('provider')"
                    iconName="engineering" class=" hover:bg-[#2c5cc5]/90  sm:p-12 md:p-14  p-10 w-full " />
            </div>
        </Modal>


    </ClientLayout>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import NavClient from '../../components/NavClient.vue'
import Footer from '../../components/Footer.vue'
import ClientLayout from '../Layouts/ClientLayout.vue'
import SearchBar from '../../components/SearchBar.vue'
import SearchPage from '../../components/SearchPage.vue'
import Modal from '../../components/Modal.vue'
import LoginModal from '../../components/LoginModal.vue'
import Card from '../../components/Crad.vue'
import Category from '../../components/Category/Category.vue'
import CategoriesList from '../../components/Category/CategoriesList.vue'
import NotificationPage from '../../components/NotificationPage.vue'
import { useCategoriesStore } from '../../store/categoriesStore'
import { useLanguageStore } from '../../store/AppBasic/languageStore'
import { useModalStore } from '../../store/AppBasic/modaleStore'
import { useThemeStore } from '../../store/AppBasic/themeStore.js'
import { useUserStore } from '../../store/userStore.js'
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore'
import { useAuthStore } from '../../store/authStore.js'
import { useRouter } from 'vue-router'
import { computed, watchEffect, ref } from 'vue'





export default {
    name: 'Home',
    components: { ClientLayout, Navbar, NavClient, Modal, CategoriesList, LoginModal, Category, Footer, SearchBar, Card, SearchPage, NotificationPage },
    setup() {
        //initialisation the store
        const languageStore = useLanguageStore()
        const themeStore = useThemeStore()
        const categoriesStore = useCategoriesStore()
        const modalStore = useModalStore()
        const userStore = useUserStore()
        const authStore = useAuthStore()
        const clientDemandeStore = useclientDemandeStore()
        const router = useRouter()

        //props
        const notSelectedError = ref(false)

        const toggleModalLogin = (theme, userType) => {
            modalStore.toggleModalLogin()
            modalStore.toggleModal()
            themeStore.theme = theme
            userStore.user.userType = userType
            userStore.userType = userType
        }


        const selectCategory = (category) => {
            clientDemandeStore.request.categoryId = category.id
            categoriesStore.fetchSubCategories(category)

            //initialisation
            userStore.userType = 'client'
            clientDemandeStore.requestinProgress = true
            router.push({ name: 'services' })
            notSelectedError.value = false
        }

        let selectedCategory = computed(() => {
            return categoriesStore.selectedCategory
        })

        const handleJoinNetwork = () => {
            userStore.$state.userType = 'provider'
            themeStore.theme = 'providerTheme'
            router.push({ name: 'howitworks' })
        }


        return {
            // store
            themeStore,
            modalStore,
            userStore,
            categoriesStore,
            languageStore,
            authStore,
            clientDemandeStore,

            //vars
            selectedCategory,

            //functions
            selectCategory,
            toggleModalLogin,
            handleJoinNetwork

        }

    }
}
</script>

<style>
::-webkit-scrollbar {
    width: 0;
    height: 0;
    border-radius: 20px;
}

::-webkit-scrollbar-thumb {
    background-color: #2c5cc5;
    border-radius: 10px;
}

::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>