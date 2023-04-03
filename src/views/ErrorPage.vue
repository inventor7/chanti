<template>
    <Navbar />
    <div class=" main-content  mt-16 flex flex-col justify-center items-center gap-4 ">
        <img class=" sm:w-1/3 " src="../assets/404.svg" alt="">
        <router-link :to="{ name: 'home' }">
            <p class="link link-hover link-primary text-lg "> Go to Home Page </p>
        </router-link>
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue';

export default {
    name: "Error",
    components: { Navbar }
}
</script>
