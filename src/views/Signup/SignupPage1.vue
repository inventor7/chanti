<template>
    <div>
        <SignupLayout prevLink="home"  :pageNumber="1"
            @handle="handleClick" :backBtnVisibility="true" :pageTitle="languageStore.getWord('howItWorks')"
            :pageDesc="  languageStore.getWord('descSP1')  ">
           
            <div class="  slide-next  grid grid-cols-3 w-full h-full py-2 gap-x-6  ">
                <div class=" flex flex-col justify-center gap-4 items-center px-3 py-4 rounded-xl bg-slate-200/50  ">
                    <img class="" src="../../assets/etape1.svg" alt="">
                    <p>{{ languageStore.getWord('SelectQuote') }}</p>
                </div>
                <div class=" flex flex-col justify-center gap-4 items-center px-3 py-4 rounded-xl bg-slate-200/50  ">
                    <img class="" src="../../assets/etape2.svg" alt="">
                    <p>{{ languageStore.getWord('chooseField') }}</p>
                </div>
                <div class=" flex flex-col justify-center gap-4 items-center px-3 py-4 rounded-xl bg-slate-200/50  ">
                    <img class="" src="../../assets/etape3.svg" alt="">
                    <p>{{ languageStore.getWord('DemandeQuote') }}</p>
                </div>
            </div>
        
        </SignupLayout>
    </div>
</template>

<script >
import SignupLayout from '../Layouts/SignupLayout.vue';
import { useUserStore } from '../../store/userStore';
import { useLanguageStore } from '../../store/languageStore';
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
                if (userStore.user.userType === "provider") {
                    router.replace({ name:'field'})
                }
                else if( userStore.user.userType === "client"  )  {
                    router.replace({ name:'location'})
                }
            }
        }

        return {handleClick , languageStore ,userStore }
    }
}

</script>


<style>

</style>