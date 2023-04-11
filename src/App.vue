<template  >
   
               <router-view />
</template>

<script>
import Loading from './components/Loading.vue'
import Error from './components/Error.vue';
import { useLanguageStore } from './store/languageStore';
import { useThemeStore } from './store/themeStore';
import { useUserStore } from './store/userStore';
import { onBeforeMount , onUpdated } from 'vue';
export default {
     name: 'App',
     components: { Loading, Error },
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
html, body {
   overflow-x: hidden;
  }
</style>
