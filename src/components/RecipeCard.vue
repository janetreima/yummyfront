<template>
  <div class="card border-dark m-3" style="width: 14rem;">
    <RecipeImage :image-data-base64="recipe.imageData"/>
    <div class="card-body">
      <div class="d-flex">
        <h5 class="card-title">
          {{ recipeName }}
        </h5>
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-outline-dark" type="button" @click="goToRecipe">Vaata retsepti</button>
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
    recipeName: String,
    recipeId: 0,
    isLoggedIn: Boolean,
  },
  data() {
    return {
      recipe:
          {
            recipeId: 0,
            authorUserId: 0,
            authorUsername: '',
            imageData: '',
            recipeName: '',
            timeMinute: 0
          },
      text: 'Vaata',
    }
  },

  methods: {
    router() {
      return router
    },

    goToRecipe() {
      router.push({
        name: 'recipeRoute',
        params: {
          recipeId: this.recipeId,
        },
        // query: {
        //   isLoggedIn: this.isLoggedIn,
        // },
      });
  },
}
}
</script>