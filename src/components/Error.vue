<template>
    <div :data-theme="themeStore.theme"
        class="text-sm text-error w-fit whitespace-nowrap rounded-full mt-2  antialiased flex flex-row gap-1.5 justify-start items-center">
        <span class="text-md pr-2 ">{{ error }}</span>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useThemeStore } from '../store/themeStore.js'
export default {
    name: 'ErrorCategory',
    props: {
        error: {
            type: String,
            default: ''
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
