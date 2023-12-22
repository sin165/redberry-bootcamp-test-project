import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/Add.vue'
import BlogDetails from '../views/BlogDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
  },
  {
    path: '/blogs/:id',
    name: 'BlogDetails',
    component: BlogDetails,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
