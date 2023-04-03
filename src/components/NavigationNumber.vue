<template>
    <p :class="{ '  btn-ghost no-outline focus:outline-none   ': pageNumber > num, 'btn-ghost btn-outline  hover:bg-white ': pageNumber < num }"
        class=" cursor-default text-center btn btn-accent   btn-circle btn-xs sm:btn-sm  no-animation  ">
        <span v-if=" num < pageNumber " class="material-icons bg-green-600 text-[10px] sm:text-sm rounded-3xl px-[3.7px] py-1  sm:py-1.5 sm:px-[9px] text-white  ">
            done
        </span>
       <span v-else> {{ num }} </span> 
    </p>
</template>

<script >
export default {
    name: 'NavigationNumber',
    props: {
        pageNumber: {
            type: Number
        },
        num: {
            type: Number
        }
    }
}
</script>

