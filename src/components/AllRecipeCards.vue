<template>
  <div class="d-flex flex-wrap">
    <RecipeCard ref="recipeCardRef" v-for="recipe in recipes" :key="recipe.recipeId" :recipe="recipe"/>
  </div>
</template>

<script>
import RecipeCard from "@/components/RecipeCard.vue"

export default {
  name: 'AllRecipeCards',
  components: {RecipeCard},
  props: {
    recipes: Array,
  },
  data() {
    return {

    }
  },
}
</script>