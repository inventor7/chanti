<template>
    <div class="  flex flex-col justify-center items-center ">
        <h2 class=" text-xl whitespace-nowrap lg:text-3xl text-center pt-8  font-bold lg:pt-8 ">{{ languageStore.getWord('howItWorks')   }} ?</h2>
        <div
            class="flex flex-col my-3 bg-orange-300/20 justify-between items-center  md:grid-cols-3 gap-1 py-3 w-full lg:w-full  md:p-8 rounded-xl   ">
            <div class=" flex rounded-xl py-4 px-2   gap-2 flex-row justify-between items-center w-full  ">
                <div>
                    <h2 class=" text-xl font-semibold  text-gray-800  ">{{ languageStore.getWord('Choose')  }}</h2>
                    <p class="  font-semibold text-xs ">
                       {{ languageStore.getWord('chooseServices') }}
                    </p>
                </div>

                <img class=" w-48 md:w-fit" src="../assets/etape1.svg" alt="">
            </div>


            <div class=" flex px-2 rounded-xl py-4 gap-2 flex-row justify-between items-center w-full  ">
                <img class=" w-48 md:w-fit " src="../assets/etape2.svg" alt="">
                <div>
                    <h2 class=" text-xl font-semibold text-gray-800 "> {{ languageStore.getWord('Select')  }} </h2>
                    <p class="  font-semibold text-xs ">
                        {{ languageStore.getWord('SelectQuote') }}
                    </p>
                </div>

            </div>


            <div class=" flex px-2  rounded-xl py-4 gap-2 flex-row justify-between items-center w-full  ">
                <div>
                    <h2 class=" text-xl font-semibold text-gray-800 "> {{ languageStore.getWord('Demande')  }} </h2>
                    <p class="  font-semibold text-xs ">
                        {{ languageStore.getWord('DemandeQuote') }}
                    </p>
                </div>

                <img class=" w-48 md:w-fit " src="../assets/etape3.svg" alt="">
            </div>

            <div class=" flex px-2  rounded-xl py-4 gap-2 flex-row justify-center items-center w-full  ">
                <img class=" w-60 md:w-fit " src="../assets/done.svg" alt="">
            </div>
            <div class=" flex px-2  rounded-xl py-4 gap-2 flex-row justify-center items-center w-full  ">
                <img class="  " src="../assets/chat.svg" alt="">
            </div>

        </div>
    </div>
</template>

<script>
import { useLanguageStore } from '../store/languageStore';

export default {
    name: 'Howitworks',
    setup() {

        //initialisation the store
        const languageStore = useLanguageStore()
        
        return { languageStore }
    }
}

</script>