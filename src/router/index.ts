import { createRouter, createWebHistory } from 'vue-router'
import FirstTriangle1 from '../views/1-triangle/FirstTriangle1.vue'
import Points from '../views/2-points/Points.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'triangle',
      component: FirstTriangle1
    },
    {
      path: '/points',
      name: 'points',
      component: Points
    }
  ]
})

export default router
