import { createRouter, createWebHistory } from 'vue-router'
import CategoryView from '../views/category-view.vue'
import LoginView from '../views/login-view.vue'
import HomeView from '../views/home-view.vue'
import UniversityView from '../views/university-view.vue'
import UniversityInfoView from '../views/university-info-view.vue'
import MemberView from '../views/member-view.vue'

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
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/university/:id',
      name: 'university',
      component: UniversityView
    },
    {
      path: '/university/info/:id',
      name: 'universityinfo',
      component: UniversityInfoView
    },
    {
      path: '/member',
      name: 'member',
      component: MemberView
    }
  ]
})

export default router
