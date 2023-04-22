<template>
    <div v-if=" rating === 0 || rating===null " class="flex flex-col justify-center items-center border-2 rounded-2xl p-2 mt-4 gap-2  w-full h-full">
        <!-- <h2 class="font-bold font-sans text-3xl ">Custumor Service</h2> -->
        <h2 class="font-extrabold font-sans text-7xl ">{{ rating }}</h2>
        <Rating :isIndicatorActive="false" :size="32" :rating="rating" />
        <div class="h-full w-full font-semibold flex flex-col justify-center items-center gap-2 ">
            <span>1<progress class="progress ml-2 progress-info w-56" value="0" max="100"></progress></span>
            <span>2<progress class="progress ml-2 progress-info w-56" value="10" max="100"></progress>
            </span>
            <span>3<progress class="progress ml-2 progress-info w-56" value="40" max="100"></progress>
            </span>
            <span>4<progress class="progress ml-2 progress-info w-56" value="70" max="100"></progress>
            </span>
            <span>5<progress class="progress ml-2 progress-info w-56" value="100" max="100"></progress>
            </span>
        </div>
    </div>
    <div class="w-full h-[50vh] flex flex-col justify-center items-center" v-else >
        <h2 class="text-2xl font-bold"  >No Rating Avaible </h2>
    </div>
</template>

<script>
import Rating from "./Rating.vue";
export default {
    name: "Tab2",
    components: {
        Rating,
    },
    props: {
        rating: {
            type: Number,
        },
    },
    setup() {
        return {};
    },
};

</script>
