import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToDo from '@/components/ToDo.vue'
// import HelloWorld from '@/components/HelloWorld'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path : '/todos',
    name:'todo',
    component : ToDo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
