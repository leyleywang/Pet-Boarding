import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Family from '../views/Family.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/family',
    name: 'Family',
    component: Family,
    meta: { title: '寄养家庭' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { title: '我的' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || '首页'} - Pet Boarding`
  next()
})

export default router
