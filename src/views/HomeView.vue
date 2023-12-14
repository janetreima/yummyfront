<template>
  <div class="container-fluid justify-content-center">
    <div class="row">
      <div class="col col-2">
        <Filter @event-recipes-filter-info="handleRecipeFiltering"/>
      </div>
      <div class="col col-10">
        <ErrorAlert :error-message="errorMessage"/>
        <!--        <div v-if="!filteredRecipesExist">-->
        <!--        <h1>Sobivaid retsepte ei leitud, muuda filtrit ja proovi uuesti :)</h1>-->
        <!--        </div>-->
        <AllRecipeCards ref="allRecipeCardsRef" :recipes="recipes" :key="recipes"/>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import RecipeCard from "@/components/RecipeCard.vue";
import Filter from "@/components/Filter.vue";
import AllRecipeCards from "@/components/AllRecipeCards.vue";
import AddRecipeView from "@/views/AddRecipeView.vue";
import ErrorAlert from "@/components/alert/ErrorAlert.vue";

export default {
  name: 'HomeView',
  components: {ErrorAlert, AllRecipeCards, Filter, RecipeCard, AddRecipeView},
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
      filteredRecipesRequest:
          {
            allergenInfos: [
              {
                allergenId: 0,
                allergenName: '',
                isAvailable: false
              }
            ],
            courseInfos: [
              {
                courseId: 0,
                courseName: '',
                isAvailable: false
              }
            ]
          },
      errorResponse: {
        message: '',
        errorCode: 0
      },
      userId: 0,
      isLoggedIn: Boolean,
      filteredRecipesExist: true,
      errorMessage: '',
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

    async handleRecipeFiltering(filteredRecipesRequest) {
      this.filteredRecipesRequest = filteredRecipesRequest
      await this.findRecipesByFilter();
      this.checkFilteredRecipesExist()
    },

    async findRecipesByFilter() {
      await this.$http.post('recipes/filtered', this.filteredRecipesRequest
      ).then(response => {
        this.recipes = response.data
      }).catch(error => {
        this.errorResponse = error.response.data;
      })
    },

    checkFilteredRecipesExist() {
      if (this.recipes.length === 0) {
        // this.filteredRecipesExist = false;
        this.handleErrorAlert()
      } else {
        // this.filteredRecipesExist = true;
        this.resetErrorAlert()
      }
    },

    handleErrorAlert() {
      this.errorMessage = 'Sobivaid retsepte ei leitud, muuda filtrit ja proovi uuesti :)'
    },

    resetErrorAlert() {
      return this.errorMessage = '';
    },
  },
  mounted() {
    this.getAllRecipes()

  }
}
</script>
