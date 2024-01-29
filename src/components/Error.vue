<template>
    <div :data-theme="themeStore.theme"
        class="  h-full text-error w-fit whitespace-nowrap rounded-full mt-2  antialiased flex flex-row gap-1.5 justify-start items-center">
       
        <span  class=" text-end pr-2 ">{{ error }}</span>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useThemeStore } from '../store/AppBasic/themeStore.js'
export default {
    name: 'ErrorMessage',
    props: {
        error: {
            type: String,
            default: ''
        },
        size :{
            type: String,
            default: 'xs'
        }
    },
    setup(props) {
        const themeStore = useThemeStore()
        return {
            error: computed(() => props.error),

            themeStore
        }
    }

}
</script>
