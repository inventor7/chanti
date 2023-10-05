import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "./assets/base.css";
// condition to change the base url for the api calls depending on the environment before the app is mounted
if (process.env.NODE_ENV === "development") {
    import("./store/authStore").then((module) => {
        module.useAuthStore().baseUrl = "/api";
    });

} else {
    import("./store/authStore").then((module) => {
        module.useAuthStore().baseUrl = "https://chanti-dz-backend.herokuapp.com";
    });
}




 
const app = createApp(App);
app.use(router);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


app.use(pinia);
app.mount("#app");
