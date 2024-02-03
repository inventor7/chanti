<template>
    <div>
        <SignupLayout prevLink="home" :pageNumber="1" @handle="handleClick" :backBtnVisibility="true"
            :pageTitle="languageStore.getWord('howItWorks')" :pageDesc="languageStore.getWord('signup_desc_1')">

            <div class="slide-next flex flex-col justify-center items-center h-full ">
                <img class=" max-w-xs " src="../../assets/steps.svg" alt="steps">
            </div>

        </SignupLayout>
    </div>
</template>

<script >
import SignupLayout from '../Layouts/SignupLayout.vue';
import { useUserStore } from '../../store/userStore';
import { useLanguageStore } from '../../store/AppBasic/languageStore';
import { useRouter } from 'vue-router';

export default {
    name: 'SignupPage1',
    components: { SignupLayout },
    setup() {
        //stores
        const userStore = useUserStore()
        const languageStore = useLanguageStore()
        const router = useRouter()

        const handleClick = (clicked) => {
            if (clicked) {
                if (userStore.$state.userType === "provider") {
                    router.push({ name: 'field' })
                }
                else if (userStore.$state.userType === "client") {
                    router.push({ name: 'location' })
                }
            }
        }

        return { handleClick, languageStore, userStore }
    }
}

</script>


<style></style>