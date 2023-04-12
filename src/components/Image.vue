<template>
    <div>
      <div v-for="image in images" :key="image.id">
        <img :src="getImageUrl(image)" alt="image">
      </div>
    </div>
  </template>
  
  <script>
  import { useProviderStore } from '../store/providerStore';
  import { ref, watchEffect } from 'vue';
  
  export default {
    setup() {
        const providerStore = useProviderStore();
      const images = ref([]);
  
      // function to get the image URL from the image data buffer
      function getImageUrl(image) {
        const blob = new Blob([new Uint8Array(image.data)], { type: 'image/jpeg' });
        return URL.createObjectURL(blob);
      }
  
      // update the images variable with the data from the server response
      function updateImages(responseData) {
        images.value = responseData.result.portfolioPostsWithImages[0].images;
      }
  
     watchEffect(() => {
        updateImages(providerStore.$state.images);
      });

      
      return {
        images,
        getImageUrl,
      };
    },
  };
  </script>
  