<template>
     <!-- <div v-if="languageStore.loading" >
          <Loading />
     </div>
     <div v-else-if="languageStore.errorLang.status" >
          <ErrorPage :error="languageStore.errorLang.message" />
     </div> -->
     <ProgressBar />

     <div>
          <router-view />
     </div>
</template>

<script>
import Loading from './components/Loading.vue'
import { useLanguageStore } from './store/AppBasic/languageStore';
import { useThemeStore } from './store/AppBasic/themeStore';
import { onBeforeMount } from 'vue';
import ErrorPage from './views/ErrorPage.vue';
import ProgressBar from './components/ProgressBar.vue'
export default {
     name: 'App',
     components: { Loading, ErrorPage },
     setup() {
          // initialize the store//
          const languageStore = useLanguageStore()
          const themeStore = useThemeStore()

          //parse the local storage to get the language and theme//
          onBeforeMount(() => {
               languageStore.getLang()
               themeStore.theme = themeStore.$state.theme || 'clientTheme'
          })
          return { languageStore }
     }
}

</script>

<style>
html,
body {
     overflow-x: hidden;
}

#nprogress .bar {
    @apply bg-primary;
}

#nprogress .spinner {
     display: none;
}



#nprogress .peg {
     @apply bg-primary;
}
</style>
