import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: HomeView,
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/news',
         name: 'news',
         component: () => import('../views/NewsPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/contacts',
         name: 'contacts',
         component: () => import('../views/ContactsPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/register',
         name: 'register',
         component: () => import('../views/LoginPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/:pathMatch(.*)*',
         name: 'notFound',
         component: () => import('../components/error/ErrorComp.vue'),
         meta: {
            requireAuth: false,
         },
      },
   ],
})

//router.beforeEach(async (to) => {})

export default router
