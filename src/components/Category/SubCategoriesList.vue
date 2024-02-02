<template>
    <div class=" flex flex-row justify-around w-full h-full flex-1 gap-3  items-start ">
        <div class=" flex flex-col  justify-start items-start gap-3 w-full h-full ">
            <div v-if="loading"
                class="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
                <Loading />
            </div>
            <div class="h-full w-full flex flex-col justify-start items-start " v-else>
                <div v-if="errorList.error" class=" h-full w-full flex flex-col justify-center items-center ">
                    <Error class=" text-xl font-semibold whitespace-pre-line " :error="errorList.message" />
                </div>
                <div v-else
                    class="grid grid-cols-2 grid-rows-5 h-full md:max-h-[600px] sm:grid-cols-4 sm:grid-rows-3   md:grid-cols-4  md:grid-rows-3 lg:grid-cols-5 lg:grid-rows-2  w-full gap-1.5">
                    <Category v-for=" subCategory in  categoriesStore.subCategories  " :key="subCategory.id"
                    :categoryId="category.id"
                        :categoryName="languageStore.getWord(subCategory.name)" @click="selectSubCategory(subCategory)"
                        :class="{ 'bg-primary text-white scale-[103%] shadow-2xl  ': selectedSubCategories.includes(subCategory) }"
                        :isActive="selectedSubCategories.includes(subCategory)" iconName="home"
                        class=" text-center  cursor-pointer  rounded-lg  hover:shadow-2xl   border-[1px] border-gray-400   transition-all duration-300 ease-in-out">
                    </Category>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Error from '../../components/Error.vue'
import Loading from '../../components/Loading.vue'
import { useCategoriesStore } from '../../store/categoriesStore';
import { useLanguageStore } from '../../store/AppBasic/languageStore';
import { useUserStore } from '../../store/userStore';
import { computed, ref, onBeforeMount } from 'vue';
import Category from '../../components/Category/Category.vue';

import { defineComponent } from 'vue';


export default defineComponent({
    name: 'SubCategoriesList',
    components: { Category, Error, Loading },
    setup() {
        //store
        const languageStore = useLanguageStore()
        const categoriesStore = useCategoriesStore()
        const userStore = useUserStore()

        //props



        let selectedSubCategories = computed(() => {
            return categoriesStore.selectedSubCategories
        })

        let errorList = computed(() => {
            return {
                error: categoriesStore.error.status,
                message: categoriesStore.error.message
            }

        })

        let loading = computed(() => {
            return categoriesStore.loading
        })



        const selectSubCategory = (subCategory) => {
            categoriesStore.selectSubCategory(subCategory)
        }


        const isActive = (subCategory) => {
            return selectedSubCategories.value.includes(subCategory)
        }



        return {
            languageStore,
            categoriesStore,
            userStore,
            selectedSubCategories,
            errorList,
            loading,

            isActive,
            selectSubCategory

        }
    }
})


</script>
