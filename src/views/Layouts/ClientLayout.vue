<template>
    <Navbar />
    <NavClient v-if="authStore.$state.isAuthenticated" class=" fixed left-0 right-0 bottom-0" />
    <div data-theme="clientTheme" class="main-content flex flex-col justify-center mt-[4.5rem] items-start w-full ">

        <div class="flex flex-col  self-center gap-2 overflow-y-scroll mb-20  justify-center items-center w-full h-full ">
            <slot></slot>
        </div>

        <NotificationPage />
    </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import NavClient from '../../components/NavClient.vue';
import NotificationPage from '../../components/NotificationPage.vue';
import { useAuthStore } from '../../store/authStore.js';
import { useThemeStore } from '../../store/AppBasic/themeStore';


export default {
    name: 'ClientLayout',
    components: {
        Navbar,
        NavClient,
        NotificationPage,
    },
    setup() {
        const themeStore = useThemeStore();
        const authStore = useAuthStore();
        return {
            themeStore,
            authStore,
        };
    },
};

</script>