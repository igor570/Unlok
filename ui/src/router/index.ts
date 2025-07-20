import { createRouter, createWebHistory } from 'vue-router'
import { Home, Auth, Download, History, Profile, Upload, Complete } from '@/views'
import Ui from '@/views/ui.vue'

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
      path: '/download/:id',
      name: 'download',
      component: Download,
      props: true,
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
      path: '/upload',
      name: 'upload',
      component: Upload,
    },
    {
      path: '/complete',
      name: 'complete',
      component: Complete,
    },
    {
      path: '/ui',
      name: 'ui',
      component: Ui,
    },
  ],
})

export default router
