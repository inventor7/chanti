import { useRoute } from "vue-router";
import { useUserStore } from "../store/userStore";

export const requireRole = (to, from, next) => {
  const userRole = useUserStore().$state.userType;
  const requiredRole = to.meta.role;

  //redirect to providerHome if user is provider and the route is home ( client route )
  if (userRole === "provider" && to.name === "home") {
    next({ name: "providerHome" });
  }

  if (requiredRole && requiredRole !== userRole) {
    next({ name: "unauthorised" });
  }

  next();
};
