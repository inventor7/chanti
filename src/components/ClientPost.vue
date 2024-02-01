<template>
    <div class=" flex flex-col justify-center items-center gap-2 w-full p-2 border rounded-lg shadow-md ">

        <div @click="showPost(post.id)"
            class=" post_content flex flex-col sm:flex-row justify-between items-start gap-4 w-full h-full ">
            <img class=" sm:w-1/3 w-2/3 object-cover  self-center " :src="`../assets/${backgImg}`" alt="">
            <div class=" flex flex-col justify-between items-start w-full gap-2 ">
                <div class=" flex flex-row justify-between items-center w-full  ">
                    <div class=" flex flex-col justify-start items-start">
                        <h2 class=" text-base md:text-xl text-black/70 font-semibold ">
                            {{ useLanguageStore().getWord(useCategoriesStore().getCategoryById(post.categoryId)) }}</h2>
                        <h2 class=" text-sm md:text-base text-black/50 font-semibold mb-2 ">
                            {{ '#' + post.id.slice(0, 15) + '...' }}</h2>
                        <div class=" flex flex-row justify-start items-center space-x-2 w-full text-xs ">
                            <p class="text-gray-400 flex items-center "><span class="material-icons text-sm text-gray-400">
                                    location_on
                                </span>{{ useWilayasStore().getWilayaById(post.stateId) }}</p>
                            <p class="text-gray-400">{{ formatTime(post.createdAt) }}</p>
                            <!-- isPubllic -->
                            <span class="material-icons text-xs text-gray-400">
                                {{ post.publish ? 'public' : 'lock' }}
                            </span>
                        </div>
                    </div>

                    <!-- More options -->
                    <button class=" flex flex-col justify-start items-start h-full   ">
                        <span class="material-icons  text-gray-400">
                            more_horiz
                        </span>
                        <span class="opacity-0">.</span>
                    </button>
                </div>

                <!-- Description -->
                <!-- after 250 char makes points -->
                <p class=" text-xs text-gray-400 font-semibold ">{{ post.description.length > 150 ?
                    post.description.slice(0, 150) + '...' : post.description }}</p>

            </div>

            <!-- <div class=" flex flex-row justify-between items-center w-full gap-4 font-semibold ">

                <div class=" flex flex-col justify-center items-center w-full">
                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1_3260)">
                            <path
                                d="M24.9876 31.692C26.7755 31.692 28.4902 30.9818 29.7544 29.7175C31.0186 28.4533 31.7289 26.7386 31.7289 24.9508C31.7289 23.1629 31.0186 21.4482 29.7544 20.184C28.4902 18.9197 26.7755 18.2095 24.9876 18.2095C23.1997 18.2095 21.4851 18.9197 20.2208 20.184C18.9566 21.4482 18.2463 23.1629 18.2463 24.9508C18.2463 26.7386 18.9566 28.4533 20.2208 29.7175C21.4851 30.9818 23.1997 31.692 24.9876 31.692ZM25.6694 20.4168L28.5586 23.3059C28.7394 23.4867 28.841 23.732 28.841 23.9877C28.841 24.2435 28.7394 24.4887 28.5586 24.6695C28.3777 24.8504 28.1325 24.952 27.8767 24.952C27.621 24.952 27.3757 24.8504 27.1949 24.6695L25.9506 23.4234V28.8029C25.9506 29.0583 25.8492 29.3033 25.6686 29.4839C25.488 29.6645 25.243 29.7659 24.9876 29.7659C24.7322 29.7659 24.4872 29.6645 24.3066 29.4839C24.126 29.3033 24.0246 29.0583 24.0246 28.8029V23.4234L22.7803 24.6695C22.5995 24.8504 22.3542 24.952 22.0985 24.952C21.8428 24.952 21.5975 24.8504 21.4167 24.6695C21.2358 24.4887 21.1342 24.2435 21.1342 23.9877C21.1342 23.732 21.2358 23.4867 21.4167 23.3059L24.3058 20.4168C24.3952 20.3271 24.5015 20.2559 24.6185 20.2074C24.7355 20.1588 24.8609 20.1338 24.9876 20.1338C25.1143 20.1338 25.2397 20.1588 25.3567 20.2074C25.4737 20.2559 25.58 20.3271 25.6694 20.4168ZM22.0985 10.5052C22.0985 12.0377 21.4897 13.5074 20.4061 14.591C19.3225 15.6746 17.8528 16.2834 16.3203 16.2834C14.7878 16.2834 13.3181 15.6746 12.2345 14.591C11.1508 13.5074 10.5421 12.0377 10.5421 10.5052C10.5421 8.97272 11.1508 7.503 12.2345 6.41938C13.3181 5.33575 14.7878 4.72697 16.3203 4.72697C17.8528 4.72697 19.3225 5.33575 20.4061 6.41938C21.4897 7.503 22.0985 8.97272 22.0985 10.5052Z"
                                fill="#FF731D" />
                            <path
                                d="M4.76385 25.9138C4.76385 27.8399 6.68993 27.8399 6.68993 27.8399H16.8134C16.4859 26.9119 16.3192 25.9348 16.3203 24.9507C16.319 23.712 16.5839 22.4874 17.097 21.36C17.61 20.2325 18.3593 19.2283 19.2942 18.4156C18.3947 18.2827 17.4066 18.2095 16.3203 18.2095C6.68993 18.2095 4.76385 23.9877 4.76385 25.9138Z"
                                fill="#FF731D" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_3260">
                                <rect width="30.8172" height="30.8172" fill="white"
                                    transform="translate(0.911682 0.874832)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p class=" text-gray-500 text-xs ">7 requested</p>
                </div>

                <div class="  flex flex-col justify-center items-center w-full ">

                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1_3253)">
                            <path
                                d="M24.741 18.2095C26.5289 18.2095 28.2435 18.9197 29.5078 20.184C30.772 21.4482 31.4822 23.1629 31.4822 24.9508C31.4822 26.7386 30.772 28.4533 29.5078 29.7175C28.2435 30.9818 26.5289 31.692 24.741 31.692C22.9531 31.692 21.2384 30.9818 19.9742 29.7175C18.7099 28.4533 17.9997 26.7386 17.9997 24.9508C17.9997 23.1629 18.7099 21.4482 19.9742 20.184C21.2384 18.9197 22.9531 18.2095 24.741 18.2095ZM25.4228 29.4847L28.3119 26.5956C28.4927 26.4148 28.5943 26.1695 28.5943 25.9138C28.5943 25.6581 28.4927 25.4128 28.3119 25.232C28.1311 25.0511 27.8858 24.9495 27.6301 24.9495C27.3743 24.9495 27.1291 25.0511 26.9482 25.232L25.704 26.4781V21.0986C25.704 20.8432 25.6025 20.5982 25.4219 20.4176C25.2413 20.237 24.9964 20.1356 24.741 20.1356C24.4855 20.1356 24.2406 20.237 24.06 20.4176C23.8794 20.5982 23.7779 20.8432 23.7779 21.0986V26.4781L22.5337 25.232C22.3528 25.0511 22.1076 24.9495 21.8518 24.9495C21.5961 24.9495 21.3509 25.0511 21.17 25.232C20.9892 25.4128 20.8876 25.6581 20.8876 25.9138C20.8876 26.1695 20.9892 26.4148 21.17 26.5956L24.0591 29.4847C24.1486 29.5744 24.2549 29.6456 24.3719 29.6941C24.4889 29.7427 24.6143 29.7677 24.741 29.7677C24.8676 29.7677 24.9931 29.7427 25.1101 29.6941C25.2271 29.6456 25.3333 29.5744 25.4228 29.4847ZM21.8518 10.5052C21.8518 12.0377 21.2431 13.5074 20.1594 14.591C19.0758 15.6746 17.6061 16.2834 16.0736 16.2834C14.5412 16.2834 13.0714 15.6746 11.9878 14.591C10.9042 13.5074 10.2954 12.0377 10.2954 10.5052C10.2954 8.97272 10.9042 7.503 11.9878 6.41938C13.0714 5.33575 14.5412 4.72697 16.0736 4.72697C17.6061 4.72697 19.0758 5.33575 20.1594 6.41938C21.2431 7.503 21.8518 8.97272 21.8518 10.5052ZM13.5055 14.9994C13.5055 13.7153 18.0751 13.9515 18.7975 13.2291C19.5199 12.5067 19.9258 11.5269 19.9258 10.5052C19.9258 9.48354 20.8819 11.2276 20.1594 10.5052C19.437 9.78278 21.1811 13.0955 20.1594 13.0955C19.1378 13.0955 19.5199 12.5067 18.7975 13.2291C18.0751 13.9515 18.5533 13.5694 18.5533 14.591C18.5533 15.6127 12.7831 14.277 13.5055 14.9994C12.4839 14.9994 12.2215 13.7153 13.5055 14.9994Z"
                                fill="#6F6F6F" />
                            <path
                                d="M14.9968 28.4827C16.0885 19.7278 18.2146 20.7302 15.7877 20.7784L14.0039 26.5489L18.6416 18.8513C18.6435 18.3774 5.16994 24.6498 6.47582 23.3439C7.73162 22.0881 2.39062 25.9146 6.7994 25.9146C7.30018 25.9146 14.5037 22.2658 15.7877 20.7784C16.223 20.1216 12.2213 29.1237 18.6416 18.8513C17.7421 18.7184 15.59 18.8523 14.5037 18.8523C4.87333 18.8523 2.94725 24.6305 2.94725 26.5566C2.94725 28.4827 4.87333 28.4827 4.87333 28.4827H14.9968Z"
                                fill="#6F6F6F" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_3253">
                                <rect width="30.8172" height="30.8172" fill="white"
                                    transform="translate(0.665039 0.874832)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p class=" text-gray-500 text-xs ">3 interested</p>
                </div>
            </div> -->
        </div>

        <div class=" post_action flex items-center justify-end w-full h-full py-1 gap-2 ">
            <button class=" btn btn-primary btn-sm gap-2 text-white rounded-lg text-xs w-full sm:w-fit   ">
                Next step
                <span class="material-icons text-sm text-end ">
                    arrow_forward_ios
                </span>
            </button>
        </div>

    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useLanguageStore } from '../store/AppBasic/languageStore';
import { useCategoriesStore } from '../store/categoriesStore';
import { useWilayasStore } from '../store/wilayasStore';
import { useclientDemandeStore } from '../store/Client/clientDemandeStore';
import { useTimeDifference } from '../composables/timeDifference';

import { computed } from 'vue'

// store
const clientDemandeStore = useclientDemandeStore()


//computed 
let backgImg = computed(() => {
    switch (props.post.categoryId) {
        case 10:
            return 'moving.svg'

        case 9:
            return 'maintenance.svg'

        case 8:
            return 'painting.svg'

        case 7:
            return 'gardening.svg'

        case 6:
            return 'plumber.svg'

        case 5:
            return 'electrecian.svg'

        case 4:
            return 'cleaning.svg'

        case 3:
            return 'design.svg'

        case 2:
            return 'remodeling.svg'

        case 1:
            return 'maintenance.svg'

    }
})


//composables 
const { timeDifference } = useTimeDifference()

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})


//methods
const formatTime = (date) => timeDifference(date)

const showPost = (clientPostId) => {

    clientDemandeStore.$state.selectedPost = clientDemandeStore.getClientPostById(clientPostId)
    clientDemandeStore.getClientPostProviders(clientPostId).then((res) => {
    })
    clientDemandeStore.getClientPostImages(clientPostId).then((res) => {
    })
    clientDemandeStore.clientPostPageVisibility = true;

}

</script>
