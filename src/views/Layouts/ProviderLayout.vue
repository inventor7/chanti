<template>
    <Navbar theme="clientTheme"   />
    <Navbar3 data-theme="providerTheme" class=" fixed left-0 right-0 bottom-0" />
    <div data-theme="providerTheme" class="main-content flex flex-col justify-center mt-[4.5rem] items-start w-full ">

        <div class="flex flex-col px-2 max-w-md self-center gap-2 overflow-y-scroll mb-20  justify-center items-center w-full h-full ">
            <slot></slot>
        </div>

        <NotificationPage />
    </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import Navbar3 from '../../components/Navbar3.vue';
import NotificationPage from '../../components/NotificationPage.vue';
import { useThemeStore } from '../../store/AppBasic/themeStore';


export default {
    name: 'ProviderLayout',
    components: {
        Navbar,
        Navbar3,
        NotificationPage,
    },
    setup() {
        const themeStore = useThemeStore();
        return {
            themeStore,
        };
    },
};

</script>