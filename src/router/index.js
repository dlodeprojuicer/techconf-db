import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../components/Tabs.vue'

const routes = [
  // {
  //   path: '/',
  //   component: () => import('@/views/Home.vue')
  // },
  // {
  //   path: '/profile',
  //   component: () => import('@/views/Profile.vue')
  // },
  // {
  //   path: '/list',
  //   component: () => import('@/views/List.vue')
  // },
  {
    path: '/',
    redirect: '/tabs'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
