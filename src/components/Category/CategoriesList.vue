<template>
    <div
        class="grid grid-cols-2 grid-rows-5 h-full  md:max-h-[600px] sm:grid-cols-4 sm:grid-rows-3   md:grid-cols-4  md:grid-rows-3 lg:grid-cols-5 lg:grid-rows-2  w-full gap-1">
        <Category v-for=" category in categoriesStore.$state.categories  " :key="category.id"
            @click="selectCategory(category)" :categoryName="languageStore.getWord(category.name)"
            :isActive="category === selectedCategory && !clientDemandeStore.$state.requestinProgress " :iconName="category.iconName"
            :class="{ 'bg-primary shadow-2xl  text-white scale-[103%]   ': category === categoriesStore.selectedCategory && !clientDemandeStore.$state.requestinProgress }"
            class=" text-center cursor-pointer rounded-lg  hover:shadow-2xl   border-[1px] border-gray-400    transition-all duration-300 ease-in-out">
        </Category>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Category from './Category.vue';
import { useLanguageStore } from '../../store/AppBasic/languageStore';
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore';
import { useCategoriesStore } from '../../store/categoriesStore';
import { useUserStore } from '../../store/userStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';


export default defineComponent({
    name: 'CategoriesList',
    components: { Category },
    props: {
        usageOfPage: {
            type: String,
            default: ''
        }

    },
    setup(props) {

        //store
        const languageStore = useLanguageStore()
        const categoriesStore = useCategoriesStore()
        const clientDemandeStore = useclientDemandeStore()
        const userStore = useUserStore()
        const router = useRouter()

        const selectCategory = (category) => {
            categoriesStore.selectedSubCategories = []
            categoriesStore.selectedCategory = category
            if (props.usageOfPage == "SelectionProcess") {
                categoriesStore.fetchSubCategories()
                router.push({ name: 'services' })
            }
            console.log(category)

        }


        let selectedCategory = computed(() => {
            return categoriesStore.selectedCategory
        })

        return {
            //Store
            userStore,
            categoriesStore,
            languageStore,
            clientDemandeStore,

            //vars
            selectedCategory,

            //functions
            selectCategory,

        }
    }
})

</script>
