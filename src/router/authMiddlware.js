import { useAuthStore } from "../store/authStore.js";
import { useModalStore } from "../store/AppBasic/modaleStore.js";
import { useUserStore } from "../store/userStore";


export const requireAuth = (to, from, next) => {
  const isAuthenticated =
    useAuthStore().isAuthenticated && useAuthStore().$state.token;
  const userRole = useUserStore().$state.userType;

  if (to.meta.auth && !isAuthenticated) {
    if (userRole === "provider") next({ name: "providerHome" });
    if (userRole === "client") next({ name: "home" });
    useModalStore().modalVisible = true;

  } else if (to.meta.auth === false && isAuthenticated) {
    if (userRole === "provider") next({ name: "providerHome" });
    if (userRole === "client") next({ name: "home" });

  } else {
    next();
  }
};
