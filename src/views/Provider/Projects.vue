<template>
    <ProviderLayout >
        <!-- loading and error handling -->
        <div v-if="loading" class=" flex flex-col justify-center items-center w-full h-full ">
            <Loading />
        </div>

        <div v-else
            class=" flex flex-row w-full justify-between items-center gap-1 rounded-3xl border border-gray-300 my-2 p-1 font-semibold ">
            <div @click="filterProjects('notStarted')" class=" w-full text-center p-2 rounded-3xl "
                :class="{ 'bg-primary  text-white': Tab === 'notStarted', 'text-black': Tab !== 'notStarted' }">
                Not started
            </div>

            <div @click="filterProjects('inProgress')" class="  w-full text-center p-2 rounded-3xl "
                :class="{ 'bg-primary  text-white': Tab === 'inProgress', 'text-black': Tab !== 'inProgress' }">
                In progress
            </div>

            <div @click="filterProjects('done')" class="  w-full text-center p-2 rounded-3xl "
                :class="{ 'bg-primary  text-white': Tab === 'done', 'text-black': Tab !== 'done' }">
                Done
            </div>
        </div>

        <div v-if="localProjects.length <= 0" class=" flex flex-col justify-center items-center h-[50vh] ">
           <img class="w-full" src="../../assets/no-data.svg" alt="">
           <h2 class=" font-semibold mt-2 " >No Project under this tab</h2>
        </div>
        <Project v-for="project in localProjects " :project="project" :key="project.id" />
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

    })
})

watch(projectsStore.$state.projects , () => {
    if(projectsStore.$state.projects.notificationClientRequests) {
    localProjects = [
        ...projectsStore.$state.projects.notificationClientRequests.map(project => ({ ...project, type: 'clientRequest' })),
        ...projectsStore.$state.projects.notificationProviderInteresteds.map(project => ({ ...project, type: 'providerInterest' }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}
})


//computed

let notStartedProjects = computed(() => {
    return localProjects = [
        ...projectsStore.$state.projects.notificationClientRequests.map(project => ({ ...project, type: 'clientRequest' })),
        ...projectsStore.$state.projects.notificationProviderInteresteds.map(project => ({ ...project, type: 'providerInterest' }))
    ].filter(project => project.status == 'pending').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

let inProgressProjects = computed(() => {
    return localProjects = [
        ...projectsStore.$state.projects.notificationClientRequests.map(project => ({ ...project, type: 'clientRequest' })),
        ...projectsStore.$state.projects.notificationProviderInteresteds.map(project => ({ ...project, type: 'providerInterest' }))
    ].filter(project => project.status == 'accept').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

let doneProjects = computed(() => {
    return localProjects = [
        ...projectsStore.$state.projects.notificationClientRequests.map(project => ({ ...project, type: 'clientRequest' })),
        ...projectsStore.$state.projects.notificationProviderInteresteds.map(project => ({ ...project, type: 'providerInterest' }))
    ].filter(project => project.status == 'done').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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