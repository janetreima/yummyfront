<template>
  <div class="d-flex flex-wrap">
    <RecipeCard v-for="recipe in recipes" :key="recipe.recipeId" :recipe-name="recipe.recipeName" ref="recipeCardRef"/>
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
          userId: 0,
          courseId: 0,
          courseName: '',
          imageId: 0,
          imageData: '',
          recipeName: '',
          time: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          },
          description: '',
          status: ''
        }
      ],
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
    getAllRecipes: function () {
      this.$http.get('/recipe'
      ).then(response => {
        this.recipes = response.data
      }).catch(error => {
        this.errorResponse = error.response.data;
      })
    }
  },
  mounted() {
    this.getAllRecipes()
  }
}
</script>