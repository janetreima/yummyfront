import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from "@/views/ErrorView.vue";
import RecipeView from "@/views/RecipeView.vue";
import AddRecipeView from "@/views/AddRecipeView.vue";

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/error',
    name: 'errorRoute',
    component: ErrorView,
  },
  {
    path: '/recipe/addrecipe',
    name: 'addRecipeRoute',
    component: AddRecipeView,
  },
  {
    path: '/recipe/:recipeId',
    name: 'recipeRoute',
    component: RecipeView,
    props: (route) => ({
      recipeId: parseInt(route.params.recipeId),
      isLoggedIn: route.query.isLoggedIn === 'true'
  }),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


