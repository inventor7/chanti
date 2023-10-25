<template>
    <div dir="ltr"
        class=" flex flex-row  md:w-fit md:top-0 md:z-[51] md:px-4 md:py-2 md:gap-5 md:h-fit md:ml-12 md:border-none md:rounded-2xl justify-around items-center navb  py-1  border-t-2    fd bg-base-100  z-50 "
        ref="navbar">

        <div @click="handleClickedRoute('providerHome')" class=" ">
            <router-link :to="{ name: 'providerHome' }"
                class="navbar-item flex flex-col  w-full self-center text-center items-center ">
                <span class="text-primary text-3xl md:text-4xl  " :class="getIcon('providerHome')">
                    other_houses
                </span>
                <span class="text-primary text-xs md:hidden font-semibold ">Home</span>
            </router-link>
        </div>

        <div @click="handleClickedRoute('createPost')" class="">
            <router-link :to="{ name: 'createPost' }" class="navbar-item flex flex-col items-center ">
                <span class="text-primary text-4xl " :class="getIcon('createPost')">
                    add_box
                </span>
                <span class="text-primary text-xs md:hidden font-semibold ">Add Post</span>
            </router-link>
        </div>

        <div @click="handleClickedRoute('providerProjects')" class="">
            <router-link :to="{ name: 'providerProjects' }" class="navbar-item flex flex-col items-center ">
                <span class="text-primary text-4xl " :class="getIcon('providerProjects')">
                    task
                </span>
                <span class="text-primary text-xs md:hidden font-semibold ">Projects</span>
            </router-link>
        </div>

    </div>
</template>

<script>
import { useThemeStore } from '../store/AppBasic/themeStore';
import { usePortfolioStore } from '../store/Provider/portfolioStore';
import { useAuthStore } from '../store/authStore'
import { useRoute } from 'vue-router';  // for route name

export default {
    name: 'NavProvider',
    setup() {
        const themeStore = useThemeStore();
        const portfolioStore = usePortfolioStore();
        const authStore = useAuthStore();
        const route = useRoute();

        //return material_icons or material_icons_outlined based on route name so if the route name matched the parameter it will return material_icons else it will return material_icons_outlined
        const getIcon = (name) => {
            if (route.name == name) {
                return 'material-icons';
            } else {
                return 'material-icons-outlined';
            }
        };

        const handleClickedRoute = (name) => {
            if (name == 'createPost') {
                portfolioStore.getProviderInfo(authStore.$state.userAuth.id).then((res) => {

                })
                portfolioStore.getProviderPosts(authStore.$state.userAuth.id).then((res) => {

                })
            }
        };

        return {
            themeStore,
            getIcon,
            handleClickedRoute,
        };
    },

}

</script>