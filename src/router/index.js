import { createRouter, createWebHistory } from 'vue-router'
import AvatarBuilder from '../components/AvatarBuilder.vue'
import MemeOverlay from '../components/MemeOverlay.vue'

const routes = [
  { path: '/', name: 'AvatarBuilder', component: AvatarBuilder },
  { path: '/memeoverlay', name: 'MemeOverlay', component: MemeOverlay }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
