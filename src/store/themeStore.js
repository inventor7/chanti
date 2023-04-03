import { defineStore } from "pinia";
export const useThemeStore = defineStore("themeStore", {
  id: "theme",
  state: () => ({
    theme : localStorage.getItem("theme"),
  }),

  actions: {
  },
    
  persist: {
    enabled: true,
    strategies: [
      { key: "theme",
        storage: localStorage,
         paths: ["theme"]
      },
    ]
  },
});
