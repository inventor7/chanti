import { defineStore } from "pinia";

export const useModalStore = defineStore('modalStore', {
  id: "modal",
  state: () => ({
    modalVisible: false,
    modalVisibleLogin: false,
  }),
  actions: {
    toggleModal() {
      this.modalVisible = !this.modalVisible;
    },
    toggleModalLogin() {
      this.modalVisibleLogin = !this.modalVisibleLogin;
    },
  }
});
