<template>
    <a class="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition "
        href="#">
        <div class="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">
            <img class=" w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
                src="wall.svg" alt="Image Description">

            <!-- verified post -->
            <span class="material-icons absolute top-0 right-0  text-3xl z-10 text-secondary">
                verified
            </span>

        </div>
        <div class="p-2 md:p-5">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-800">Proeject 1</h3>
                    <div class="flex flex-row gap-1">
                        <span class="material-icons text-primary text-lg">
                            star
                        </span>
                        <span class="text-gray-800">4.5</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-between items-center mt-2">
                <div class="flex flex-row gap-1">
                    <span class="material-icons text-primary text-lg">
                        location_on
                    </span>
                    <span class="text-gray-800">Location</span>
                </div>
                <div class="flex flex-row gap-1">
                    <span class="material-icons text-primary text-lg">
                        schedule
                    </span>
                    <span class="text-gray-800">Date</span>
                </div>
            </div>

        </div>
    </a>

    <a class="flex flex-col mt-4 group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition "
        href="#">
        <div class="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">
            <img class=" w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
                src="wall.svg" alt="Image Description">

            <!-- verified post -->
            <span class="material-icons absolute top-0 right-0  text-3xl z-10 text-secondary">
                verified
            </span>

        </div>
        <div class="p-2 md:p-5">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-800">Proeject 1</h3>
                    <div class="flex flex-row gap-1">
                        <span class="material-icons text-primary text-lg">
                            star
                        </span>
                        <span class="text-gray-800">3.85</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-between items-center mt-2">
                <div class="flex flex-row gap-1">
                    <span class="material-icons text-primary text-lg">
                        location_on
                    </span>
                    <span class="text-gray-800">Location</span>
                </div>
                <div class="flex flex-row gap-1">
                    <span class="material-icons text-primary text-lg">
                        schedule
                    </span>
                    <span class="text-gray-800">Date</span>
                </div>
            </div>

        </div>
    </a>
</template>

<script>
export default {
    name: "Tab1",
    props: {
        rating: {
            type: Number,
            default: 0
        }
    },
    setup() {
        return {};
    },
}

</script>
