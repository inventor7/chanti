<template>
    <SignupLayout prevLink="images" :pageNumber="5" :isError="notSelectedError" :errorText="errorText" nextBtnText="Next"
        @handle="handleClick" pageTitle="Write a Description" pageDesc=" Write a description of your request "
        componentLocation="selectionProcess">

        <div class=" flex flex-row justify-center w-full h-full flex-1 gap-3  items-center  ">
            <div class=" flex flex-col  justify-center items-center gap-3  w-full h-full ">
                <transition name="fade">
                    <!-- type in an area text -->
                    <div class="h-4/6 w-full flex flex-col justify-center items-start sm:items-center gap-2 ">
                        <span class=" font-semibold  text-xl ">Enter your project's description</span>
                        <textarea v-model="descText" rows="4" cols="50" maxlength="100"
                            class=" w-full sm:w-2/3 font-semibold  h-full rounded-2xl border-2 border-gray-300 p-4">
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
import { useAuthStore } from '../../store/authStore';
import { computed, ref, watch, reactive, watchEffect } from 'vue';
import Category from '../../components/Category/Category.vue';

export default {
    name: 'SelectionPage5',
    components: { SignupLayout, Category, Error, Loading },
    setup() {
        //props
        const notSelectedError = ref(false)


        // clientDemandeStore
        const router = useRouter()
        const userStore = useUserStore()
        const clientDemandeStore = useclientDemandeStore()
        const authStore = useAuthStore()

        //vars
        const errorText = ref('')
        const descText = ref('')

        const handleClick = () => {
            clientDemandeStore.request.description = descText.value
            if (authStore.$state.isAuthenticated) {
                // set client id to the request
                clientDemandeStore.request.clientId = authStore.$state.userAuth.id
                // send request to server
                const formData = new FormData();
                formData.append("clientId", clientDemandeStore.request.clientId);
                formData.append("categoryId", clientDemandeStore.request.categoryId);
                formData.append("subcategoryId", clientDemandeStore.request.subCategoryId);
                formData.append("stateId", clientDemandeStore.request.stateId);
                formData.append("cityId", clientDemandeStore.request.cityId);
                formData.append("urgency", clientDemandeStore.request.urgency);
                formData.append("description", clientDemandeStore.request.description);
                for (let i = 0; i < clientDemandeStore.request.images.length; i++) {
                    formData.append("images", clientDemandeStore.request.images[i]);
                }
                for (let pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }
                clientDemandeStore.postClientDemande(formData)
                router.replace({ name: 'results' })

            } else { //if user is not logged in
                router.replace({ name: 'loginSelection' })
            }

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