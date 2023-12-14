<template>
  <ErrorAlert :error-message="errorMessage"/>
  <div class="d-flex flex-wrap align-items-start align-self-start">
    <RecipeCard ref="recipeCardRef" v-for="recipe in recipes" :key="recipe.recipeId" :recipe="recipe"/>
  </div>
</template>

<script>
import RecipeCard from "@/components/RecipeCard.vue"
import ErrorAlert from "@/components/alert/ErrorAlert.vue";

export default {
  name: 'AllRecipeCards',
  components: {ErrorAlert, RecipeCard},
  props: {
    recipes: Array,
  },
  data() {
    return {
      errorMessage: '',
    }
  },
  methods: {
    // checkForNoRecipesFoundError() {
    //   if (this.recipes === []) {
    //     this.errorMessage = 'Sobivaid retsepte ei leitud. Muuda filtrit ja proovi uuesti :)'
    //   }
    // },



    },
  mounted() {
    // this.checkForNoRecipesFoundError()
  },
}
</script>