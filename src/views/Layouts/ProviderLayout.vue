<template>
    <Navbar />
    <NavProvider data-theme="providerTheme" class=" fixed left-0 right-0 bottom-0" />
    <div data-theme="providerTheme"
        class="main-content bg-gray-100/30 flex flex-col h-full justify-center pt-2 mt-[4rem] items-start w-full ">

        <div
            class="flex flex-col px-2 self-center gap-2 overflow-y-scroll mb-20  justify-center items-center w-full h-full ">
            <slot></slot>
        </div>

        <NotificationPage />
    </div>
    <ClientPostDetailsPage locationComponent="provider" data-theme="providerTheme" />
</template>

<script setup >
import Navbar from '../../components/Navbar.vue';
import ClientPostDetailsPage from '../../components/ClientPostDetailsPage.vue';
import NavProvider from '../../components/NavProvider.vue';
import NotificationPage from '../../components/NotificationPage.vue';
import { useThemeStore } from '../../store/AppBasic/themeStore';

const themeStore = useThemeStore();

</script>