<template>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <p>Are you sure you want to refresh the page?</p>
        <button @click="confirmRefresh">Yes</button>
        <button @click="cancelRefresh">No</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'RefreshConfirmationModal',
    setup() {
      const showModal = ref(false);
  
      const confirmRefresh = () => {
        showModal.value = false;
        window.location.reload();
      };
  
      const cancelRefresh = () => {
        showModal.value = false;
      };
  
      // Listen for beforeunload event to show the confirmation modal
      window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        showModal.value = true;
        event.returnValue = '';
      });
  
      return { showModal, confirmRefresh, cancelRefresh };
    },
  };
  </script>
  
  <style>
  /* Add your modal styles here */
  </style>
  