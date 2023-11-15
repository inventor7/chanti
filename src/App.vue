<template  >
     <div v-if="languageStore.loading" >
          <Loading />
     </div>
     <div v-else-if="languageStore.errorLang.status" >
          <ErrorPage :error="languageStore.errorLang.message" />
     </div>
     <div v-else>
          <router-view />
     </div>
</template>
  
<script>
import Loading from './components/Loading.vue'
import Error from './components/Error.vue';
import { useLanguageStore } from './store/AppBasic/languageStore';
import { useThemeStore } from './store/AppBasic/themeStore';
import { useUserStore } from './store/userStore';
import { onBeforeMount, onUpdated } from 'vue';
import ErrorPage from './views/ErrorPage.vue';
export default {
     name: 'App',
     components: { Loading, Error, ErrorPage },
     setup() {
          // initialize the store//
          const languageStore = useLanguageStore()
          const themeStore = useThemeStore()
          const userStore = useUserStore()

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
</style>
