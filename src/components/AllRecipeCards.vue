<template>
  <div class="d-flex flex-wrap">
    <RecipeCard ref="recipeCardRef" v-for="recipe in recipes" :key="recipe.recipeId" :recipe-name="recipe.recipeName" :recipe-id="recipe.recipeId"/>
  </div>
</template>

<script>
import RecipeCard from "@/components/RecipeCard.vue"

export default {
  name: 'AllRecipeCards',
  components: {RecipeCard},
  data() {
    return {
      recipes: [
        {
          recipeId: 0,
          authorUserId: 0,
          authorUsername: '',
          imageData: '',
          recipeName: '',
          timeMinute: 0
        }
      ],
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
    getAllRecipes() {
      this.$http.get('/recipes'
      ).then(response => {
        this.recipes = response.data
      }).catch(error => {
        this.errorResponse = error.response.data;
      })
    },
  },
  mounted() {
    this.getAllRecipes()
  }
}
</script>