<template>
    <div dir="ltr" class="navbar border-t-2 px-4   fd  py-0 bg-base-100  z-50 " ref="navbar">

        <div class="navbar-start ">
            <router-link :to="{ name: 'providerHome' }" class="navbar-item">
                <span class="text-primary text-4xl "
                :class="getIcon('providerHome')"
                >
                    other_houses
                </span>
            </router-link>
        </div>

        <div class="navbar-center ">
             <router-link :to="{ name: 'createPost' }" class="navbar-item">
                <span class="text-primary text-4xl "
                :class="getIcon('createPost')"
                >
                add_box
                </span>
            </router-link>
        </div>

        <div class="navbar-end ">
           <router-link :to="{ name: 'projects' }" class="navbar-item">
                <span class="text-primary text-4xl "
                :class="getIcon('projects')"
                >
                    task
                </span>
            </router-link>
        </div>

    </div>
</template>

<script>
import { useThemeStore } from '../store/themeStore';
import { useRoute } from 'vue-router';  // for route name

export default {
    name: 'NavBar3',
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