import { useUserStore } from "../store/userStore";

export const requireRole = (to, from, next) => {
    const userRole = useUserStore().$state.userType 
    const requiredRole = to.meta.role
    if (to.meta.role && userRole !== requiredRole ) {
      next({ name: 'unauthorised' });
    } else {
      next();
    }
  }

