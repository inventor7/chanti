<template>
    <ProviderLayout>

        <!-- Filters -->
        <div
            class=" flex flex-row justify-between items-center w-full h-full gap-1 rounded-3xl border border-gray-300 my-2 p-1 text-sm font-semibold max-w-2xl ">

            <div @click="filterProjects('notStarted')"
                class=" cursor-pointer w-full text-center p-2 rounded-3xl transition-all duration-300 ease-in-out "
                :class="{ 'bg-primary  text-white': Tab === 'notStarted', 'text-black': Tab !== 'notStarted' }">
                Not started
            </div>

            <div @click="filterProjects('inProgress')"
                class=" cursor-pointer  w-full text-center p-2 rounded-3xl transition-all duration-300 ease-in-out "
                :class="{ 'bg-primary  text-white': Tab === 'inProgress', 'text-black': Tab !== 'inProgress' }">
                In progress
            </div>

            <div @click="filterProjects('done')"
                class=" cursor-pointer  w-full text-center p-2 rounded-3xl transition-all duration-300 ease-in-out "
                :class="{ 'bg-primary  text-white': Tab === 'done', 'text-black': Tab !== 'done' }">
                Done
            </div>
        </div>



        <!-- loading -->
        <div v-if="loading" class=" flex flex-col justify-center items-center w-full h-full ">
            <Loading />
        </div>

        <div v-else class=" flex flex-col justify-between items-center gap-4 lg:gap-6 w-full h-full max-w-2xl ">
            <!-- if projects empty -->
            <div v-if="localProjects.length <= 0" class=" flex flex-col justify-center items-center w-full  max-w-md ">
                <img class="w-full" src="../../assets/no_projects.svg" alt="no projects">
                <h2 class=" font-semibold mt-2 ">No Project under this tab</h2>
            </div>

            <!-- else -->
            <Project v-for="project in localProjects " :project="project.clientPost" :key="project.id" />

        </div>

    </ProviderLayout>
</template>

<script setup >
//layout
import ProviderLayout from '../Layouts/ProviderLayout.vue';
import { useProjectsStore } from '../../store/Provider/projectsStore';
import { useAuthStore } from '../../store/authStore';
import { reactive, ref, defineAsyncComponent, onMounted, watch, computed } from 'vue';


// components
const Project = defineAsyncComponent(() => import('../../components/Project.vue'));
const Loading = defineAsyncComponent(() => import('../../components/Loading.vue'));

//stores
const projectsStore = useProjectsStore();
const authStore = useAuthStore();

//variables
const { projects, loading } = reactive(useProjectsStore());
let localProjects = ref([]);
let Tab = ref('notStarted');


//hooks
onMounted(() => {
    projectsStore.getProviderProjects(authStore.$state.userAuth.id).then((res) => {
        localProjects.value = notStartedProjects.value
    })
})


watch(projectsStore.$state.projects, () => {
    if (projectsStore.$state.projects.notificationClientRequests) {
        localProjects = [
            ...projectsStore.$state.projects.notificationClientRequests ,
            ...projectsStore.$state.projects.notificationProviderInteresteds
        ].sort((a, b) => new Date(b.clientPost.createdAt) - new Date(a.clientPost.createdAt))
    }
})


//computed

let notStartedProjects = computed(() => {
    return localProjects = [
        ...projectsStore.$state.projects.notificationClientRequests,
        ...projectsStore.$state.projects.notificationProviderInteresteds
    ].filter(item => item.clientPost.status == 'pending').sort((a, b) => new Date(b.clientPost.createdAt) - new Date(a.clientPost.createdAt))
})

let inProgressProjects = computed(() => {
    return localProjects = [
        ...projectsStore.$state.projects.notificationClientRequests,
        ...projectsStore.$state.projects.notificationProviderInteresteds
    ].filter(item => item.clientPost.status == 'accept' || item.clientPost.status == 'accepted').sort((a, b) => new Date(b.clientPost.createdAt) - new Date(a.clientPost.createdAt))
})

let doneProjects = computed(() => {
    return localProjects = [
        ...projectsStore.$state.projects.notificationClientRequests,
        ...projectsStore.$state.projects.notificationProviderInteresteds
    ].filter(item => item.clientPost.status == 'done').sort((a, b) => new Date(b.clientPost.createdAt) - new Date(a.clientPost.createdAt))
})

//methods
const filterProjects = (filter) => {
    switch (filter) {
        case 'notStarted':
            localProjects = notStartedProjects
            Tab.value = 'notStarted'
            break;

        case 'inProgress':
            localProjects = inProgressProjects
            Tab.value = 'inProgress'
            break;

        case 'done':
            localProjects = doneProjects
            Tab.value = 'done'
            break;

        default:
            break;
    }
}


</script>


