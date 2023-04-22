import { defineStore } from "pinia";
import { useThemeStore } from "./themeStore";
export const useModalStore = defineStore('modalStore', {
  id: "modal",
  state: () => ({
    modalVisible: false,
    modalVisibleLogin: false,
  }),
  actions: {
    toggleModal() {
      this.modalVisible = !this.modalVisible;
      useThemeStore().theme = "clientTheme";
    },
    toggleModalLogin() {
      this.modalVisibleLogin = !this.modalVisibleLogin;
    },
  }
});
