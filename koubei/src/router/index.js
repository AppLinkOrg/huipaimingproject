import { createRouter, createWebHistory } from 'vue-router'
import CategoryView from '../views/category-view.vue'
import LoginView from '../views/login-view.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
