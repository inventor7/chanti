import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
import { useAuthStore } from "./store/authStore";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "./assets/base.css";
// condition to change the base url for the api calls depending on the environment before the app is mounted
// Set the base URL for API calls depending on the environment
if (process.env.NODE_ENV === "development") {
    useAuthStore().baseUrl = "/api";
  } else {
    useAuthStore().baseUrl = "https://chanti-dz-backend.herokuapp.com";
  }
  


 
const app = createApp(App);
app.use(router);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


app.use(pinia);
app.mount("#app");
