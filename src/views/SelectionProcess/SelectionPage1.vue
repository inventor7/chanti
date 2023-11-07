<template>
    <SignupLayout prevLink="home" :backBtnVisibility="true" :pageNumber="1" :isError="notSelectedError"
        errorText="Please select a service" nextBtnText="Next" @handle="handleClick" :pageTitle="languageStore.getWord('chooseServices')"
        :pageDesc="languageStore.getWord('descSP3')"
        componentLocation="selectionProcess">


        <div class=" flex flex-row justify-around w-full h-full flex-1 gap-3  items-start ">
            <div class=" flex flex-col  justify-start items-start gap-3 w-full h-full ">
                <div v-if="loading"
                    class="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
                    <Loading />
                </div>
                <div class="h-full w-full flex flex-col justify-start items-center " v-else>
                    <div v-if="errorList.error" class=" h-full w-full flex flex-col justify-center items-center ">
                        <Error class=" text-xl font-semibold whitespace-pre-line " :error="errorList.message" />
                    </div>
                    <div v-else
                        class="grid grid-cols-2 grid-rows-5 h-full md:max-h-[600px] sm:grid-cols-4 sm:grid-rows-3   md:grid-cols-4  md:grid-rows-3 lg:grid-cols-5 lg:grid-rows-2  w-full gap-3">
                        <Category v-for=" subCategory in  categoriesStore.subCategories  " :key="subCategory.id"
                            :categoryName="languageStore.getWord(subCategory.name)"
                            @click="selectSubCategoryRequest(subCategory)"
                            :class="{ 'bg-primary text-white scale-[103%] shadow-2xl  ': subCategory.id === clientDemandeStore.request.subCategoryId }"
                            :isActive="subCategory.id === clientDemandeStore.request.subCategoryId" iconName="home"
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
import { useLanguageStore } from '../../store/AppBasic/languageStore';
import { useUserStore } from '../../store/userStore';
import { useclientDemandeStore } from '../../store/Client/clientDemandeStore'
import { useRouter } from 'vue-router';
import { computed, ref, onBeforeMount } from 'vue';
import Category from '../../components/Category/Category.vue';

export default {
    name: 'SelectionPage1',
    components: { SignupLayout, Category, Error, Loading },
    setup() {

        //props
        const notSelectedError = ref(false)


        // store
        const categoriesStore = useCategoriesStore()
        const languageStore = useLanguageStore()
        const userStore = useUserStore()
        const router = useRouter()
        const clientDemandeStore = useclientDemandeStore()

        let errorList = computed(() => {
            return {
                error: clientDemandeStore.errorClientDemande.status,
                message: clientDemandeStore.errorClientDemande.message
            }

        })

        let loading = computed(() => {
            return categoriesStore.loading
        })



        const selectSubCategoryRequest = (subCategory) => {
            clientDemandeStore.request.subCategoryId = subCategory.id
            notSelectedError.value = false
        }

        const handleClick = () => {
            if (clientDemandeStore.request.subCategoryId != null) {
                router.push({ name: 'selection-location' })
            } else {
                notSelectedError.value = true
            }
        }

        const checkSubcategory = () => {
            if (clientDemandeStore.request.categoryId == null) {
                router.push({ name: 'home' })
            }
        }



        return {
            //props
            notSelectedError,

            //vars
            loading,
            errorList,

            //methods
            selectSubCategoryRequest,
            handleClick,
            checkSubcategory,

            //store
            categoriesStore,
            languageStore,
            clientDemandeStore,
        }
    },

    beforeRouteEnter(to, from, next) {
        // Call the checkSubcategories function before the route enters
        next(vm => vm.checkSubcategory())
    }


}

</script>