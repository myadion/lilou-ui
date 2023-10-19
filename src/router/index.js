import { createRouter, createWebHistory } from 'vue-router'

import Teams from '@/views/Teams.vue'
import History from '@/views/History.vue'
import Chat from '@/views/Chat.vue'
import Contacts from '@/views/Contacts.vue'
import Meeting from '@/views/Meeting.vue'
import Settings from '@/views/Settings.vue'
import Voicemail from '@/views/Voicemail.vue'
import Wallboard from '@/views/Wallboard.vue'
import Account from '@/views/Account.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Teams,
      name : 'teams',
    },
    {
      path: '/account',
      component: Account,
      name : 'account',
    },
    {
      path: '/chat',
      component: Chat,
      name : 'chat',
    },
    {
      path: '/history',
      component: History,
      name : 'history',
    },
    {
      path: '/contacts',
      component: Contacts,
      name : 'contacts',
    },
    {
      path: '/meeting',
      component: Meeting,
      name : 'meeting',
    },
    {
      path: '/settings',
      component: Settings,
      name : 'settings',
    },
    {
      path: '/voicemail',
      component: Voicemail,
      name : 'voicemail',
    },
    {
      path: '/wallboard',
      component: Wallboard,
      name : 'wallboard',
    }
  ]
})

export default router
