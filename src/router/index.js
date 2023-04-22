import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import SignupPage1 from '../views/Signup/SignupPage1.vue'
import SignupPage2 from '../views/Signup/SignupPage2.vue'
import SignupPage3 from '../views/Signup/SignupPage3.vue'
import SignupPage4 from '../views/Signup/SignupPage4.vue'
import SignupPage5 from '../views/Signup/SignupPage5.vue'
import SignupPage6 from '../views/Signup/SignupPage6.vue'

import SelectionPage1 from '../views/SelectionProcess/SelectionPage1.vue'
import SelectionPage2 from '../views/SelectionProcess/SelectionPage2.vue'
import SelectionPage3 from '../views/SelectionProcess/SelectionPage3.vue'
import SelectionPage4 from '../views/SelectionProcess/SelectionPage4.vue'
import SelectionPage5 from '../views/SelectionProcess/SelectionPage5.vue'
import SelectionPage6 from '../views/SelectionProcess/SelectionPage6.vue'
import SelectionPage7 from '../views/SelectionProcess/SelectionPage7.vue'
// import SelectionPage8 from '../views/SelectionProcess/SelectionPage8.vue'

import ErrorPage from '../views/ErrorPage.vue'






const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    ////////////Signup Pages////////////
    {
      path: '/signup/howitworks',
      name: 'howitworks',
      component: SignupPage1
    },
    {
      path: '/signup/field',
      name: 'field',
      component: SignupPage2
    },
    {
      path: '/signup/profession',
      name: 'profession',
      component: SignupPage3
    },
    {
      path: '/signup/location',
      name: 'location',
      component: SignupPage4
    },
    {
      path: '/signup/idendity',
      name: 'idendity',
      component: SignupPage5
    },
    {
      path: '/signup/registrations',
      name: 'registrations',
      component: SignupPage6
    },


    // ///////////SelectionProcess Pages/////////////
    {
      path: '/selection/services',
      name: 'services',
      component: SelectionPage1
    },
    {
      path: '/selection/location',
      name: 'selection-location',
      component: SelectionPage2
    },
    {
      path: '/selection/emergency',
      name: 'emergency',
      component: SelectionPage3
    },
    {
      path: '/selection/images',
      name: 'images',
      component: SelectionPage4
    },
    {
      path: '/selection/desc',
      name: 'desc',
      component: SelectionPage5
    },
    {
      path: '/selection/login',
      name: 'loginSelection',
      component: SelectionPage6
    },
    {
      path: '/selection/results',
      name: 'results',
      component: SelectionPage7
    },


    // ///////////////provider Pages///////////////

    {
      path: '/profile/:name',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },

    {
      path:'/profile/edit/:id',
      name:'editProfile',
      component:()=>import('../views/Provider/EditProfile.vue')
    },

    //navigation
    {
      path: '/home',
      name: 'providerHome',
      //lazy loading
      component: () => import('../views/Provider/Home.vue')
    },

    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Provider/Projects.vue')
    },

    {
      path: '/Post/create',
      name: 'createPost',
      component: () => import('../views/Provider/PostCreation.vue')
    },



    


    
    //error page
    {
      path: '/:catchALL(.*)',
      name: 'error',
      component: ErrorPage
    },
    
 
   
  ]
})

export default router
