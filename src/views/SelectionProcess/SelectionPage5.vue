<template>
    <SignupLayout prevLink="emergency" :pageNumber="3" :isError="notSelectedError" :errorText="errorText" nextBtnText="Next"
        @handle="handleClick" pageTitle="Write a Description" pageDesc=" Write a description of your request ">

        <div class=" flex flex-row justify-around w-full h-full flex-1 gap-3  items-start ">
            <div class=" flex flex-col  justify-center items-center gap-3 w-full h-full ">
                <transition name="fade">
                    <!-- type in an area text -->
                    <div class="h-4/6 w-full flex flex-col justify-center items-start gap-2 " >
                        <span class=" font-semibold text-xl " >Enter your project's description</span>
                        <textarea v-model="descText"  rows="4" cols="50" maxlength="100" class="w-full font-semibold  h-full rounded-2xl border-2 border-gray-300 p-4">
                        </textarea>

                    </div>


                </transition>

            </div>
        </div>

    </SignupLayout>
</template>

<script>
import SignupLayout from '../Layouts/SignupLayout.vue';
import Error from '../../components/Error.vue'
import Loading from '../../components/Loading.vue'
import { useUserStore } from '../../store/userStore';
import { useclientDemandeStore } from '../../store/clientDemandeStore';
import { useRouter } from 'vue-router';
import { computed, ref, watch, reactive, watchEffect } from 'vue';
import Category from '../../components/Category/Category.vue';

export default {
    name: 'SelectionPage4',
    components: { SignupLayout, Category, Error, Loading },
    setup() {
        //props
        const notSelectedError = ref(false)


        // clientDemandeStore
        const router = useRouter()
        const userStore = useUserStore()
        const clientDemandeStore = useclientDemandeStore()
        const errorText = ref('')
        const descText = ref('')

        const handleClick = () => {
            clientDemandeStore.request.description = descText.value
            router.replace({ name: 'home' })
        }



        return {
            //props
            notSelectedError,
            errorText,
            descText,

            //clientDemandeStore
            router,

            //methods
            handleClick,
        }
    },

}

</script>

<style></style>