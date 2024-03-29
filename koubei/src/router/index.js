import { createRouter, createWebHistory } from 'vue-router'
import CategoryView from '../views/category-view.vue'
import LoginView from '../views/login-view.vue'
import HomeView from '../views/home-view.vue'
import UniversityView from '../views/university-view.vue'
import UniversityInfoView from '../views/university-info-view.vue'
import MemberView from '../views/member-view.vue'
import DianpingView from '../views/dianping-view.vue'
import ContentView from '../views/content-view.vue'
import FeedbackView from '../views/feedback-view.vue'
import PageView from '../views/page-view.vue'
import AboutusView from '../views/aboutus-view.vue'

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
      path: '/university-info/:id',
      name: 'universityinfo',
      component: UniversityInfoView
    },
    {
      path: '/content/:keycode',
      name: 'contentview',
      component: ContentView
    },
    {
      path: '/member',
      name: 'member',
      component: MemberView
    },
    {
      path: '/dianping',
      name: 'dianping',
      component: DianpingView
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedbackView
    },
    {
      path: '/page',
      name: 'PageView',
      component: PageView
    },
    {
      path: '/aboutus',
      name: 'AboutusView',
      component: AboutusView
    }
  ]
})

export default router
