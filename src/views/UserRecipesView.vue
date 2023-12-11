<template>
  <div class="container-fluid justify-content-center">
    <AllRecipeCards ref="allRecipeCardsRef" :recipes="recipes" :key="recipes"/>
  </div>
</template>

<script>
import AllRecipeCards from "@/components/AllRecipeCards.vue";
import router from "@/router";

export default {
  name: 'UserRecipesView',
  components: {AllRecipeCards},
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
      },
      userId: Number(sessionStorage.getItem('userId')),
      isLoggedIn: false,
    }
  },
  methods: {
    getUserRecipes() {
      this.$http.get('/recipes/myrecipes', {
        params: {
          userId: this.userId,
        }}
      ).then(response => {
        this.recipes = response.data
      }).catch(error => {
        this.errorResponse = error.response.data;
      })
    },
    checkIfLoggedIn() {
      if (this.userId > 0) {
        this.isLoggedIn = true;
      } else {
        router.push('/error');
      }
    },
  },
  mounted() {
    this.getUserRecipes();
    this.checkIfLoggedIn();
  }
}
</script>
