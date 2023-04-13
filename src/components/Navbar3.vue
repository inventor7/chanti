<template>
    <div dir="ltr" class="navbar border-t-2 px-4   fd  py-0 bg-base-100  z-10 " ref="navbar">

        <div class="navbar-start ">
            <span class="material-icons-outlined text-primary text-4xl ">
                other_houses
            </span>
        </div>

        <div class="navbar-center ">
            <span class="material-icons text-primary text-4xl ">
                storefront
            </span>
        </div>

        <div class="navbar-end ">
            <span class="material-icons text-primary text-4xl ">
                menu
            </span>
        </div>

    </div>
</template>

<script>
import { useThemeStore } from '../store/themeStore';
import DropDownLang from './DropDownLang.vue';
export default {
    name: 'NavBar3',
    components: {
        DropDownLang,
    },
    setup() {
        const themeStore = useThemeStore();
        return {
            themeStore,
        };
    },

}

</script>