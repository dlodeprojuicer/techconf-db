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
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/venues',
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Venues.vue')
      }
    ]
  },
  {
    path: '/create-venue/',
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/CreateVenue.vue')
      }
    ]
  },
  {
    path: '/profile',
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Profile.vue')
      }
    ]
  },
  {
    path: '/create-event/',
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/CreateEvent.vue')
      }
    ]
  },
  {
    path: '/speakers',
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Speakers.vue')
      }
    ]
  },
  {
    path: '/login',
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Login.vue')
      }
    ]
  },
  {
    path: '/register',
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Register.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
