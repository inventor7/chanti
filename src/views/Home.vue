<template>
    <Navbar data-theme="mytheme" :showLogin="true" />
    <div class="main-content flex flex-col justify-center items-start w-full mt-[5rem] ">
        <div class="grid place-items-center rounded-2xl w-full h-full px-2   ">

            <div class=" relative flex flex-col justify-between w-full h-[35vh] sm:h-[50vh] md:h-[70vh] rounded-2xl    ">
                <!-- add an overlay image -->
                <img src="../assets/OIG.jpg"
                    class="w-full absolute top-0 left-0 -z-20  h-full object-cover sm:object-cotain rounded-2xl " />

                <!-- add a gradient -->
                <div class="absolute top-0 left-0 -z-10 w-full h-full  bg-black opacity-40 rounded-2xl "></div>

                <div class="px-2 flex-1  sm:px-4 w-full h-fit  flex flex-row justify-start items-center py-0  ">
                    <div class="w-flex max-w-5xl  flex-col py-4 md:gap-6 justify-between items-start ">
                        <h1 v-if="userStore.$state.isloggedin == false || authStore.$state.isloggedin == false"
                            class="  text-2xl  sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl   text-white whitespace-normal mb-5 font-bold">
                            {{ languageStore.getWord('title') }}
                            <span class="underline underline-offset-4 text-primary">
                                {{ languageStore.getWord('endTitle') }}
                            </span>
                        </h1>
                        <h1 v-else
                            class="  text-3xl  sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl   text-white whitespace-normal mb-5 font-bold">
                            Welcome Back
                            <span class="underline underline-offset-4 text-primary">
                                {{ userStore.$state.userAuth.lastName.toUpperCase() }}
                            </span>
                        </h1>

                        <SearchBar componentLocation="home" class=" w-full  shadow-black shadow-lg" />
                    </div>
                </div>

                <div
                    class="md:hidden flex flex-row justify-between bg-primary/70 rounded-b-xl px-2 md:p-1.5 items-center w-full h-fit ">
                    <span class="text-white text-sm md:text-xl  font-semibold ">
                        are you a pro ?
                    </span>
                    <div @click="handleJoinNetwork"
                        class="flex  flex-row justify-between  items-center w-fit cursor-pointer ">
                        <span class="text-white underline-offset-1 text-sm md:text-xl  font-semibold ">
                            join our network
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
            <h2 class=" text-xl md:text-4xl font-bold ">Browse categories</h2>
            <div
                class="grid grid-cols-2 grid-rows-5 h-full md:max-h-[600px] sm:grid-cols-4 sm:grid-rows-3   md:grid-cols-4  md:grid-rows-3 lg:grid-cols-5 lg:grid-rows-2  w-full gap-1">
                <Category v-for=" category in categoriesStore.$state.categories  " :key="category.id"
                    @click="selectCategory(category)" :categoryName="languageStore.getWord(category.name)"
                    :isActive="category === selectedCategory && categoriesStore.getIsActiveDecoration"
                    :iconName="category.iconName"
                    :class="{ 'bg-primary shadow-2xl  text-white scale-[103%]   ': category === categoriesStore.selectedCategory && categoriesStore.getIsActiveDecoration }"
                    class=" text-center cursor-pointer rounded-lg  hover:shadow-2xl   border-[1px] border-gray-400    transition-all duration-300 ease-in-out">
                </Category>
            </div>
        </div>

        <Howitworks />
        <SearchPage />
        <LoginModal />
        <Modal class=" flex flex-col justify-center items-center gap-4  sm:gap-8 md:gap-10  h-full ">
            <div class=" flex flex-col items-end justify-end w-full  px-2 sm:px-10 md:px-20 lg:px-32 ">
                <label @click="modalStore.toggleModal"
                    class="btn btn-error place text-sm md:text-lg btn-sm md:btn-md btn-circle right-[20%] top-[10%] ">✕</label>
            </div>

            <div
                class=" grid grid-cols-2 px-2     items-center bg-transparent sm:gap-8  md:gap-12 lg:gap-16  max-w-lg     gap-4 ">
                <Card @click="toggleModalLogin('clientTheme', 'client')" :title="languageStore.getWord('client')"
                    iconName="person" class=" hover:bg-[#db4024]/90  sm:p-12 md:p-14     p-10 w-full " />
                <Card @click="toggleModalLogin('providerTheme', 'provider')" :title="languageStore.getWord('provider')"
                    iconName="engineering" class=" hover:bg-[#2c5cc5]/90  sm:p-12 md:p-14  p-10 w-full " />
            </div>
        </Modal>


    </div>
    <Footer class="mt-[1000px]" />
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import SearchBar from '../components/SearchBar.vue'
import Howitworks from '../components/Howitworks.vue'
import SearchPage from '../components/SearchPage.vue'
import Modal from '../components/Modal.vue'
import LoginModal from '../components/LoginModal.vue'
import Card from '../components/Crad.vue' 
import Category from '../components/Category/Category.vue'
import CategoriesList from '../components/Category/CategoriesList.vue'
import { useCategoriesStore } from '../store/categoriesStore'
import { useLanguageStore } from '../store/languageStore'
import { useModalStore } from '../store/modaleStore'
import { useThemeStore } from '../store/themeStore.js'
import { useUserStore } from '../store/userStore.js'
import { useclientDemandeStore } from '../store/clientDemandeStore.js'
import { useAuthStore } from '../store/authStore.js'
import { useRouter } from 'vue-router'
import { computed, watchEffect , ref } from 'vue'





export default {
    name: 'Home',
    components: { Navbar, Modal, CategoriesList, LoginModal, Category , Footer, SearchBar, Card, Howitworks, SearchPage },
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
        const notSelectedError= ref(false)

        const toggleModalLogin = (theme, userType) => {
            modalStore.toggleModalLogin()
            modalStore.toggleModal()
            themeStore.theme = theme
            userStore.user.userType = userType
        }


        const selectCategory = (category) => {
            clientDemandeStore.request.categoryId = category.id
            categoriesStore.fetchSubCategories(category)
            router.replace({name:'services'})
            notSelectedError.value = false
        }

        let selectedCategory = computed(() => {
            return categoriesStore.selectedCategory
        })

        const handleJoinNetwork = () => {
            userStore.user.userType = 'provider'
            themeStore.theme = 'providerTheme'
            router.replace({ name: 'howitworks' })
        }


        return {
            // store
            themeStore,
            modalStore,
            userStore,
            categoriesStore,
            languageStore,
            authStore,

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
}</style>