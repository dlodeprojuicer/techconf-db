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

  // add /privacy-policy route for google calendar api
  // add /terms-of-service route for google calendar api
  {
    path: '/',
    name: "conferences",
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Home.vue'),
        meta: {
          requiresAuth: false,
        }
      },
    ]
  },
  {
    path: '/venues',
    name: "venues",
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Venues.vue'),
        meta: {
          requiresAuth: false,
        }
      },
    ]
  },
  {
    path: '/create-venue/',
    name: "create-venue",
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/CreateVenue.vue'),
        meta: {
          requiresAuth: true,
        }
      }
    ]
  },
  {
    path: '/profile',
    name: "profile",
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Profile.vue'),
        meta: {
          requiresAuth: true,
        }
      }
    ]
  },
  {
    path: '/create-event/',
    name: "create-event",
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/CreateEvent.vue'),
        meta: {
          requiresAuth: true,
        }
      }
    ]
  },
  {
    path: '/speakers',
    name: "speakers",
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Speakers.vue'),
        meta: {
          requiresAuth: false,
        }
      }
    ]
  },
  {
    path: '/login',
    name: "login",
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Login.vue'),
        meta: {
          requiresAuth: false,
        }
      }
    ]
  },
  {
    path: '/register',
    name: "register",
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Register.vue'),
        meta: {
          requiresAuth: false,
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
