import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from '../store/userStore.js';

import { requireAuth } from "./authMiddlware.js";
import { requireRole } from "./roleMiddlware.js";

import Home from "../views/Client/Home.vue";

import SignupPage1 from "../views/Signup/SignupPage1.vue";
import SignupPage2 from "../views/Signup/SignupPage2.vue";
import SignupPage3 from "../views/Signup/SignupPage3.vue";
import SignupPage4 from "../views/Signup/SignupPage4.vue";
import SignupPage5 from "../views/Signup/SignupPage5.vue";
import SignupPage6 from "../views/Signup/SignupPage6.vue";

import SelectionPage1 from "../views/SelectionProcess/SelectionPage1.vue";
import SelectionPage2 from "../views/SelectionProcess/SelectionPage2.vue";
import SelectionPage3 from "../views/SelectionProcess/SelectionPage3.vue";
import SelectionPage4 from "../views/SelectionProcess/SelectionPage4.vue";
import SelectionPage5 from "../views/SelectionProcess/SelectionPage5.vue";
import SelectionPage6 from "../views/SelectionProcess/SelectionPage6.vue";
import SelectionPage7 from "../views/SelectionProcess/SelectionPage7.vue";
// import SelectionPage8 from '../views/SelectionProcess/SelectionPage8.vue'

import ErrorPage from "../views/ErrorPage.vue";
import UnauthorisedPage from "../views/UnauthorisedPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),



  routes: [
    {
      path: "/settings",
      name: "providerSettings",
      meta: { auth: true },
      component: () => import("../views/Provider/Settings.vue"),
    },
    {
      path: "/setting",
      name: "clientSettings",
      meta: { auth: true },
      component: () => import("../views/Client/Settings.vue"),
    },
  ////////////Signup Pages////////////
  {
    path: "/signup/howitworks",
    name: "howitworks",
    component: SignupPage1,
    meta: { auth: false },
  },
  {
    path: "/signup/field",
    name: "field",
    component: SignupPage2,
    meta: { auth: false },
  },
  {
    path: "/signup/profession",
    name: "profession",
    component: SignupPage3,
    meta: { auth: false },
  },
  {
    path: "/signup/location",
    name: "location",
    component: SignupPage4,
    meta: { auth: false },
  },
  {
    path: "/signup/idendity",
    name: "idendity",
    component: SignupPage5,
    meta: { auth: false },
  },
  {
    path: "/signup/registrations",
    name: "registrations",
    component: SignupPage6,
    meta: { auth: false },
  },

  // ///////////SelectionProcess Pages/////////////
  {
    path: "/selection/services",
    name: "services",
    component: SelectionPage1,
    meta: { role: "client", mixed: 1 },
  },
  {
    path: "/selection/location",
    name: "selection-location",
    component: SelectionPage2,
    meta: { role: "client", mixed: 1 },
  },
  {
    path: "/selection/emergency",
    name: "emergency",
    component: SelectionPage3,
    meta: { role: "client", mixed: 1 },
  },
  {
    path: "/selection/images",
    name: "images",
    component: SelectionPage4,
    meta: { role: "client", mixed: 1 },
  },
  {
    path: "/selection/desc",
    name: "desc",
    component: SelectionPage5,
    meta: { role: "client", mixed: 1 },
  },
  {
    path: "/selection/login",
    name: "loginSelection",
    component: SelectionPage6,
    meta: { role: "client", auth: false },
  },
  {
    path: "/selection/results",
    name: "results",
    component: SelectionPage7,
    meta: { role: "client", auth: true },
  },

  // ///////////////client Pages///////////////
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/profile",
    name: "clientProfile",
    component: () => import("../views/Client/Profile.vue"),
  },
  {
    path: "/Posts",
    name: "clientPosts",
    component: () => import("../views/Client/Posts.vue"),
    meta: { auth: true, role: "client" },
  },

  // ///////////////provider Pages///////////////

  {
    path: "/profile/:name",
    name: "profile",
    component: () => import("../views/Provider/Profile.vue"),
    meta: { auth: true },
  },

  {
    path: "/profile/edit/:id",
    name: "editProfile",
    component: () => import("../views/Provider/EditProfile.vue"),
    meta: { auth: true, role: "provider" },
  },

  //navigation
  {
    path: "/home",
    name: "providerHome",
    //lazy loading
    component: () => import("../views/Provider/Home.vue"),
    meta: { auth: true, role: "provider" },
  },

  {
    path: "/Pro/projects",
    name: "providerProjects",
    component: () => import("../views/Provider/Projects.vue"),
    meta: { auth: true, role: "provider" },
  },

  {
    path: "/Post/create",
    name: "createPost",
    component: () => import("../views/Provider/PostCreation.vue"),
    meta: { auth: true, role: "provider" },
  },

  {
    path: "/settings/verifyidendity",
    name: "verifyidendity",
    component: () => import("../views/Provider/VerifyIdendity.vue"),
    meta: { auth: true, role: "provider" },
  },
  //error page
  {
    path: "/:catchALL(.*)",
    redirect: "/error",
  },
  {
    path: "/error",
    name: "error",
    component: ErrorPage,
  },
  // unauthorised page
  {
    path: "/unauthorised",
    name: "unauthorised",
    component: UnauthorisedPage,
  },
  ],
});

router.beforeEach(requireAuth);
router.beforeEach(requireRole);

export default router;
