<template>
    <div>

        <SignupLayout prevLink="howitworks" :pageNumber="userStore.user.userType === 'provider' ? 2 : 0"
            :isError="notSelectedError" errorText="Please select a Category" @handle="handleClick"
            :pageTitle="languageStore.getWord('Choose')" :pageDesc="languageStore.getWord('chooseField')">

            <div class=" flex flex-row overflow-y-scroll  justify-around w-full h-full   gap-3  items-start ">
                <div class=" flex flex-col  justify-start items-center  md:mb-0 gap-3 w-full h-full ">
                    <CategoriesList />
                    
                </div>
            </div>
        </SignupLayout>
    </div>
</template>

<script >
import Category from '../../components/Category/Category.vue'
import CategoriesList from '../../components/Category/CategoriesList.vue';
import SignupLayout from '../Layouts/SignupLayout.vue';
import { useCategoriesStore } from '../../store/categoriesStore';
import { useUserStore } from '../../store/userStore'
import { useLanguageStore } from '../../store/AppBasic/languageStore';
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'SignupPage2',
    components: { SignupLayout, Category, CategoriesList },
    setup() {
        const buttonDisabled = ref(true)
        const notSelectedError = ref(false)

        // initialize the store//
        const categoriesStore = useCategoriesStore()
        const userStore = useUserStore()
        const languageStore = useLanguageStore()
        const router = useRouter()


        const handleClick = () => {
            if (Object.keys(categoriesStore.selectedCategory).length !== 0) {
                // if category is selected
                userStore.user.category = categoriesStore.selectedCategory
                categoriesStore.fetchSubCategories(categoriesStore.selectedCategory)
                if (categoriesStore.subCategories.length < 0) {
                    // pass error to the next page
                    categoriesStore.error.message = ' Something went wrong , please back and try again '
                    categoriesStore.error.status = true
                } else {
                    categoriesStore.error.message = ''
                    categoriesStore.error.status = false
                }
                router.push({ name: 'profession' })
            } else {
                // show error if no category is selected
                notSelectedError.value = true
            }


        }


        return {
            // props
            buttonDisabled,
            notSelectedError,

            // vars


            // methods
            handleClick,

            // store
            categoriesStore,
            languageStore,
            userStore
        }
    }

}

</script>

