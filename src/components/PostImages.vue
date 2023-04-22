<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center px-2 py-3 bg-black bg-opacity-50">
        <button class="absolute top-1 right-1 z-20  btn btn-secondary bg-secondary/40 btn-circle " @click="$emit('close')">
                <sapn class="material-icons text-2xl text-white  ">close</sapn>
            </button>
        <div class="relative w-full h-full max-w-3xl">
            
            <div class="relative h-full pb-[60%] lg:pb-[80%]">

                <!-- <div class=" absolute top-3 md:text-lg self-center bg-gray-100/20 px-3 py-1 rounded-2xl text-white z-50 p-4">
                    {{ post.details }}
                </div> -->
                <img class="absolute top-0 left-0 object-contain w-full h-full rounded-t-xl hover:scale-105 transition-transform duration-500"
                    :src="getBase64Image(post.images[currentImageIndex].data)" :alt="post.images[currentImageIndex].type">

            </div>
            <div class="absolute left-0 right-0 px-1  text-white flex items-center justify-between top-1/2 transform -translate-y-1/2">
                <button :class="currentImageIndex === 0 ? 'opacity-0' : 'opacity-100'"
                    class=" text-xl bg-gray-300/20  btn btn-ghost btn-circle "
                    @click="previousImage">
                   <span class="material-icons">arrow_back_ios</span>
                </button>
                <button v-if="currentImageIndex < post.images.length - 1"
                    class="s text-xl bg-gray-300/20  btn btn-ghost btn-circle"
                    @click="nextImage">
                    <span class="material-icons">arrow_forward_ios</span>
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue'

export default {
    props: {
        post: Object,
    },
    setup(props, { emit }) {
        const currentImageIndex = ref(0)

        function previousImage() {
            if (currentImageIndex.value > 0) {
                currentImageIndex.value -= 1
            }
        }

        function nextImage() {
            if (currentImageIndex.value < props.post.images.length - 1) {
                currentImageIndex.value += 1
            }
        }

        function getBase64Image(imgData) {
            const base64 = btoa(
                new Uint8Array(imgData).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            );
            return `data:image/jpeg;base64,${base64}`;
        }

        return {
            currentImageIndex,
            previousImage,
            nextImage,
            getBase64Image
        }
    },
}
</script>
  