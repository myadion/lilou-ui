import { createRouter, createWebHistory } from 'vue-router'

import Teams from '@/views/Teams.vue'
import History from '@/views/History.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Teams,
      name : 'teams',
    },
    {
      path: '/history',
      component: History,
      name : 'history',
    }
  ]
})

export default router
