<template  >
    <div   class=" flex  justify-center  items-center w-full px-[1px] py-[1px]  border-2  bg-base-100 rounded-full"
    :class="{ 'flex-row': !languageStore.getRtl ,'flex-row-reverse' : languageStore.getRtl }"
    >
        <input :dir="languageStore.getRtl ? 'rtl' : 'ltr'"
        
        type="text" :placeholder="languageStore.getWord('searchPlaceHolder')"
       
        class="flex-1 w-full input input-sm sm:input-md 2xl:input-lg 2xl:text-2xl  text-sm sm:text-xl   font-semibold pl-4  xl:pl-8   rounded-full focus:outline-none outline-none "
            v-model="searchInput" @keyup.enter="handleSearchClick" @focus="handleFocusSearchBar" ref="searchInputRef" />

        <button @click="handleSearchClick"
            class=" btn btn-primary whitespace-nowrap btn-sm h-10  sm:btn-md 2xl:btn-lg  rounded-full text-white ">
            <span class=" sm:hidden text-2xl sm:text-3xl  material-icons">
                search
            </span>
            <span class=" hidden py-3 sm:block   "> {{ languageStore.getWord('searchButton') }} </span>
        </button>
    </div>
</template>

<script >
import { watch, ref, onMounted, watchEffect } from 'vue'
import { useSearchStore } from '../store/searchStore'
import { useLanguageStore } from '../store/AppBasic/languageStore'

export default {
    name: 'SearchBar',
    props: {
        componentLocation: {
            type: String,
            default: 'home'
        }
    },

    setup(props) {
        //initialisation the store
        const searchStore = useSearchStore()
        const languageStore = useLanguageStore()

        // vars
        const searchInput = ref('')
        const searchInputRef = ref(null)

        watch(searchInput, (newInput) => {
            searchStore.searchInput = newInput
        })


        const handleSearchClick = () => {
            searchStore.searchPageVisibility = true
            searchStore.isClicked = true
            searchStore.fetchSearchResults()
        }

        onMounted(() => {
            // focus the search input when the search page is visible
            if (props.componentLocation == 'searchPage') {
                searchInputRef.value.focus()
            }
            searchInput.value = searchStore.searchInput
        })

        const handleFocusSearchBar = () => {
            //make the search page visible when it's a mobile device
            if (window.innerWidth < 768) {
                searchInputRef.value.focus()
                searchStore.searchPageVisibility = true
            }
        }

        //showing results when the user write for a 1.5 second
        watch(searchInput, (newInput, oldValue) => {
            if (props.componentLocation == 'searchPage') {
                if (newInput.length > 0) {
                    searchStore.searchPageVisibility = true
                    searchStore.isClicked = false
                    setTimeout(() => {
                        searchStore.fetchSearchResults()
                    }, 1500)
                }
            }
        })




        return {
            searchInput,
            searchStore,
            handleSearchClick,
            handleFocusSearchBar,
            languageStore,
            searchInputRef
        }
    }
}
</script>