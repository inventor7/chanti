<template>
    <SignupLayout prevLink="field" :pageNumber="pNumber" :isError="notSelectedError"
        errorText="Please select at least one service" nextBtnText="Next" @handle="handleClick" pageTitle=" Choose Services"
        pageDesc=" select the multiple services that you can provide for your clients ">
        <div class=" flex overflow-y-scroll flex-row justify-around w-full h-full  flex-1 gap-3  items-start ">
            <div class=" flex flex-col  justify-start items-center mb-20  md:mb-0 gap-3 w-full h-full ">
                <SubCategoriesList />
            </div>
        </div>
    </SignupLayout>
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import SubCategoriesList from '../../components/Category/SubCategoriesList.vue';
import { useCategoriesStore } from '../../store/categoriesStore';
import { useLanguageStore } from '../../store/languageStore';
import { useUserStore } from '../../store/userStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
    name: 'SignupPage3',
    components: { SignupLayout, SubCategoriesList },
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

        const handleClick = () => {
            if (categoriesStore.selectedSubCategories.length > 0 && categoriesStore.selectedSubCategories != null) {
                userStore.user.subCategories = categoriesStore.selectedSubCategories
                router.replace({ name: 'location' })
            } else {
                notSelectedError.value = true
            }
        }

        const checkSubcategories = () => {
            if (Object.keys(categoriesStore.selectedCategory).length == 0) {
                router.replace({ name: 'field' })
            }
        }






        return {
            //props
            pNumber,
            buttonDisabled,
            notSelectedError,


            //methods
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