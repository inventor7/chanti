<template>
    <div dir="ltr" class="navbar gap-10  border-t-2 px-4   fd  py-0 bg-base-100  z-50 " ref="navbar">

        <div class="navbar-start  ">
            <router-link :to="{ name: 'home' }" class="navbar-item flex flex-col  w-full self-center text-center items-center ">
                <span class="text-primary text-4xl "
                :class="getIcon('home')"
                >
                    other_houses
                </span>
                <span class="text-primary text-xs font-semibold " >Home</span>
            </router-link>
        </div>

        <div class="navbar-end ">
           <router-link :to="{ name: 'clientProjects' }" class="navbar-item flex flex-col w-full items-center ">
                <span class="text-primary text-4xl "
                :class="getIcon('clientProjects')"
                >
                    task
                </span>
               <span class="text-primary text-xs font-semibold " >Projects</span>
            </router-link>
        </div>
      
    </div>
</template>

<script>
import { useThemeStore } from '../store/AppBasic/themeStore';
import { useRoute } from 'vue-router';  // for route name

export default {
    name: 'NavClient',
    setup() {
        const themeStore = useThemeStore();
        const route = useRoute();

        //return material_icons or material_icons_outlined based on route name so if the route name matched the parameter it will return material_icons else it will return material_icons_outlined
        const getIcon = (name) => {
            if (route.name == name) {
                return 'material-icons';
            } else {
                return 'material-icons-outlined';
            }
        };

        return {
            themeStore,
            getIcon,
        };
    },

}

</script>