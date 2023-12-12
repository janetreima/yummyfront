import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from "@/views/ErrorView.vue";
import RecipeView from "@/views/RecipeView.vue";
import AddRecipeView from "@/views/AddRecipeView.vue";
import UserRecipesView from "@/views/UserRecipesView.vue";

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
        path: '/recipe',
        name: 'recipeRoute',
        component: RecipeView
    },
    {
        path: '/myrecipes',
        name: 'userRecipesRoute',
        component: UserRecipesView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router


