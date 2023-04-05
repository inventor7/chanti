<template>
    <SignupLayout prevLink="selection-location"   :pageNumber="pNumber" 
        :isError="notSelectedError" errorText="Please select a service" nextBtnText="Next" @handle="handleClick"
        pageTitle=" Choose Services" pageDesc=" select the multiple services that you can provide for your clients ">

        <div class=" flex flex-row justify-around w-full h-full flex-1 gap-3  items-start ">
            <div class=" flex flex-col  justify-start items-start gap-3 w-full h-full ">
               this is the page 3
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
    name: 'SelectionPage3',
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




      






        return {
            //props
            pNumber,
            buttonDisabled,
            notSelectedError,

            //store
            categoriesStore,
            languageStore,
            userStore,
            router
        }
    },

}

</script>