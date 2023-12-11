<template>
  <div class="card border-dark m-3" style="width: 14rem;">
    <RecipeImage :image-data-base64="recipe.imageData"/>
    <div class="card-body">
      <div class="d-flex">
        <h5 class="card-title">
          {{ recipe.recipeName }}
        </h5>
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-outline-dark" type="button" @click="navigateToRecipe(recipe.recipeId)">Vaata retsepti</button>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeImage from "@/components/RecipeCardImage.vue";
import router from "@/router";

export default {
  name: 'RecipeCard',
  components: {RecipeImage},
  props: {
    recipe: {}
  },
  methods: {
    router() {
      return router
    },

    navigateToRecipe(recipeId) {
      router.push({
        name: 'recipeRoute',
        query:{
          recipeId: recipeId
        },
      });
  },
}
}
</script>