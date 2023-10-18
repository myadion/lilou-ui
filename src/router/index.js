import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Auth from '@/views/About.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name : 'home',
    },
    {
      path: '/about',
      component: About,
      name : 'about',
    }
  ]
})

export default router
