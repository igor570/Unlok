import { createRouter, createWebHistory } from 'vue-router'
import { Home, Auth, Download, History, Profile, Unlock, Upload, Complete } from '@/views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/download',
      name: 'download',
      component: Download,
    },
    {
      path: '/history',
      name: 'history',
      component: History,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/unlock',
      name: 'unlock',
      component: Unlock,
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
    },
    {
      path: '/complete',
      name: 'complete',
      component: Complete,
    },
  ],
})

export default router
