import { useAuthStore  } from '../store/authStore.js'
import { useModalStore } from '../store/AppBasic/modaleStore.js'
export const requireAuth = (to, from, next) => {
  const isAuthenticated = useAuthStore().isAuthenticated && useAuthStore().$state.token
  if (to.meta.auth && !isAuthenticated) {
    next({ name: "home" });
    useModalStore().modalVisible = true;
  } else if (to.meta.auth === false && isAuthenticated ) {
    next({ name: "unauthorised" });
  } else {
    next();
  }
};


