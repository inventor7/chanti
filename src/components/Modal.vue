<template>
  <div dir="ltr" ref="loginModal " @click.self="toggleModal" :class="{ 'modal-open': modalVis }"  class="modal bg-gray-700/80 backdrop-blur-sm  " >
      <slot></slot>
  </div>
</template>

<script >
import { computed } from 'vue'
import { useModalStore } from '../store/AppBasic/modaleStore.js'

export default {

  name: 'Modal',

  setup() {
    //initialise the modal store
    const modalStore = useModalStore()
   

    const modalVis = computed(() => {
      return modalStore.modalVisible
    })

    const toggleModal = () => {
      modalStore.toggleModal()
    }


    return { modalVis ,toggleModal }


  }
}
</script>

<!-- the way of implementation of this modal is on sigin button on the navbar -->
