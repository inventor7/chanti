<!-- src/components/ProgressBar.vue -->
<template>
    <div></div>
</template>

<script setup>
import { onMounted } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


onMounted(() => {
    NProgress.configure({ showSpinner: false });
})

const start = () => {
    NProgress.start()
}

const done = () => {
    NProgress.done()
}

</script>
