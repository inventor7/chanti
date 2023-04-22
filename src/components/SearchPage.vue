<template>
    <transition name="slide">
        <div v-if="searchStore.searchPageVisibility" class="bg-white overflow-y-scroll min-h-screen  z-50 inset-0 fixed">
            <div dir="ltr" class="bg-white fixed h-fit w-full">
                <div
                    class="flex  bg-white flex-row justify-startitems-center  w-full px-2 py-2 sm:py-3 sm:px-3  gap-2 shadow-lg  ">
                    <span @click="handleExitArrow"
                        class="material-icons cursor-pointer text-start  text-primary text-2xl  sm:text-3xl ">
                        keyboard_backspace
                    </span>

                    <span class="  flex-1 text-center font-bold text-xl sm:text-2xl md:text-3xl text-primary ">
                        {{ languageStore.getWord('how_we_can_serve_you') }}
                    </span>
                    <span @click="searchStore.searchPageVisibility = false"
                        class="material-icons text-transparent text-2xl md:text-4xl ">
                        keyboard_backspace
                    </span>
                </div>
                <div class=" px-1 sm:px-2">
                    <SearchBar componentLocation="searchPage" class=" mt-4 w-full shadow-xl gap-2 " />
                </div>
            </div>
            <div class=" flex px-4 flex-col gap-8 mt-20 ">

                <div v-if="searchStore.loading" class="   w-full h-full bg-opacity-50 flex justify-center items-center ">
                    <loading />
                </div>
                <div v-else class="h-full mt-16 md:mt-24 ">
                    <!-- show errors if somthing wrong happend -->
                    <div v-if="searchStore.errorSearch.status">
                        <h1 class="text-2xl  text-center text-red-500   ">
                            {{ searchStore.errorSearch.message }}
                        </h1>
                    </div>
                    <!-- show the results if there is no errors -->
                    <div v-else class="h-full ">
                        <!-- show the results if there is results from the response -->
                        <div v-if="searchStore.searchResults.length > 0">
                            <div @click="handleSearchRedirect(result)" v-for="result in searchStore.searchResults"
                                :key="result.id" class="flex flex-col justify-start items-center gap-0   w-full  ">
                                <div
                                    class=" rounded-md  w-full text-center py-2 border-none gap-4  btn btn-secondary btn-outline justify-between   ">
                                    <span class="material-icons  ">
                                        search
                                    </span>
                                    <span class="flex-1 text-start">
                                        {{ languageStore.getWord(result.name) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- show no results if there is no results from the response -->
                        <div v-if="searchStore.searchResults.length == 0 && searchStore.isClicked"
                            class="flex flex-col justify-center  items-center h-full w-full ">
                            <h1 class="text-xl absolute top-1/2  font-semibold">
                                No such service found
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { useSearchStore } from '../store/searchStore'
import { useLanguageStore } from '../store/AppBasic/languageStore'
import { useCategoriesStore } from '../store/categoriesStore'
import SearchBar from '../components/SearchBar.vue'
import loading from '../components/Loading.vue'
import { useclientDemandeStore } from '../store/Client/clientDemandeStore'
import { useRouter } from 'vue-router'
export default {
    name: "SearchPage",
    components: { SearchBar, loading },
    setup() {
        //initialisation the store
        const searchStore = useSearchStore()
        const languageStore = useLanguageStore()
        const categoriesStore = useCategoriesStore()
        const router = useRouter()

        //handle the exit arrow
        const handleExitArrow = () => {
            searchStore.searchPageVisibility = false
            searchStore.searchResults = []
            searchStore.searchInput = ''
        }


        //handle the search redirect
        const handleSearchRedirect = (result) => {
            searchStore.searchPageVisibility = false
            searchStore.searchResults = []
            searchStore.searchInput = ''
            //check if the result object has an categoryId property if it does then redirect to the category page
            if (result.categoryId) {
                router.push({
                    name: "selection-location",
                });
                useclientDemandeStore().request.categoryId = result.categoryId;
                useclientDemandeStore().request.subCategoryId = result.id;
            } else {
                // if it doesn't then redirect to the product page
                categoriesStore.fetchSubCategories(result) //fetching the subcategories before redirecting
                router.push({
                    name: "services",
                });
                useclientDemandeStore().request.categoryId = result.id;
            }
        }


        return {
            //store
            searchStore,
            languageStore,
            handleExitArrow,
            handleSearchRedirect
        }
    }
}
</script>

<style scoped >
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>