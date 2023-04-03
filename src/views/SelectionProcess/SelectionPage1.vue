<template>
    <SignupLayout prevLink="home" :backBtnVisibility="true"  :pageNumber="pNumber" 
        :isError="notSelectedError" errorText="Please select a service" nextBtnText="Next" @handle="handleClick"
        pageTitle=" Choose Services" pageDesc=" select the multiple services that you can provide for your clients ">

        <div class=" flex flex-row justify-around w-full h-full flex-1 gap-3  items-start ">
            <div class=" flex flex-col  justify-start items-start gap-3 w-full h-full ">
                <div v-if="loading"
                    class="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
                    <Loading />
                 </div>
                  <div class="h-full w-full flex flex-col justify-center items-center " v-else>
                    <div v-if="errorList.error" class=" h-full w-full flex flex-col justify-center items-center ">
                        <Error class=" text-xl font-semibold whitespace-pre-line " :error="errorList.message" />
                    </div>
                    <div v-else
                        class="grid grid-cols-2 grid-rows-5 h-full md:max-h-[600px] sm:grid-cols-4 sm:grid-rows-3   md:grid-cols-4  md:grid-rows-3 lg:grid-cols-5 lg:grid-rows-2  w-full gap-3">
                        <Category v-for=" subCategory in  categoriesStore.subCategories  " :key="subCategory.id"
                            :categoryName="languageStore.getWord(subCategory.name)" @click="selectSubCategoryRequest(subCategory)"
                            :class="{ 'bg-primary text-white scale-[103%] shadow-2xl  ': selectedSubCategories.includes(subCategory) }"
                            :isActive="selectedSubCategories.includes(subCategory)" iconName="home"
                            class=" text-center  cursor-pointer   rounded-lg  hover:shadow-2xl   border-[1px] border-gray-400   transition-all duration-300 ease-in-out">
                        </Category>
                    </div>
                </div>
            </div>
        </div>

    </SignupLayout>
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import Error from '../../components/Error.vue'
import Loading from '../../components/Loading.vue'
import { useCategoriesStore } from '../../store/categoriesStore';
import { useLanguageStore } from '../../store/languageStore';
import { useUserStore } from '../../store/userStore';
import { useRouter } from 'vue-router';
import { computed, ref, onBeforeMount } from 'vue';
import Category from '../../components/Category/Category.vue';

export default {
    name: 'SignupPage3',
    components: { SignupLayout, Category, Error, Loading },
    setup() {

        //props
        const pNumber = 3
        const buttonDisabled = ref(true)
        const notSelectedError = ref(false)


        // store
        const categoriesStore = useCategoriesStore()
        const languageStore = useLanguageStore()
        const userStore = useUserStore()
        const router = useRouter()




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



        const selectSubCategoryRequest  = (subCategory) => {
            categoriesStore.selectSubCategory(subCategory)
            notSelectedError.value = false
        }

        const handleClick = () => {
            if (categoriesStore.selectedSubCategories.length > 0 && categoriesStore.selectedSubCategories != null) {
                userStore.user.subCategories = selectedSubCategories.value
                router.replace({ name: 'selection-location' })
            } else {
                notSelectedError.value = true
            }
        }

        const checkSubcategories = () => {
            if (Object.keys(categoriesStore.getSelectedCategory).length == 0) {
                router.replace({ name: 'field' })
            }
        }






        return {
            //props
            pNumber,
            buttonDisabled,
            notSelectedError,

            //vars
            selectedSubCategories,
            loading,
            errorList,

            //methods
            selectSubCategoryRequest,
            handleClick,
            checkSubcategories,

            //store
            categoriesStore,
            languageStore
        }
    },

    beforeRouteEnter(to, from, next) {
        // Call the checkSubcategories function before the route enters
        next(vm => vm.checkSubcategories())
    }
}

</script>