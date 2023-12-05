import { createRouter, createWebHistory } from 'vue-router'
import ErrorView from "@/views/ErrorView.vue";


const routes = [


  {
    path: '/error',
    name: 'errorRoute',
    component: ErrorView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
