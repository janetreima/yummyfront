import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from "@/views/ErrorView.vue";
import RecipeView from "@/views/RecipeView.vue";
import AddRecipeView from "@/views/AddRecipeView.vue";
import UserRecipesView from "@/views/UserRecipesView.vue";
import AddRecipeIngredientsView from "@/views/AddRecipeIngredientsView.vue";
import EditRecipeView from "@/views/EditRecipeView.vue";

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
        path: '/recipe/add',
        name: 'addRecipeRoute',
        component: AddRecipeView,
    },
    {
        path: '/recipe/edit',
        name: 'editRecipeRoute',
        component: EditRecipeView,
    },
    {
        path: '/recipe/addrecipe/ingredients',
        name: 'addRecipeIngredientsRoute',
        component: AddRecipeIngredientsView,
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
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router


