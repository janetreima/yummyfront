<template>
  <div class="container-fluid justify-content-center">
    <div class="row">
      <div class="col col-2">
        <Filter @event-emit-recipes-filter-info="handleRecipeFiltering"/>
      </div>
      <div class="col col-10">
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

export default {
  name: 'HomeView',
  components: {AllRecipeCards, Filter, RecipeCard, AddRecipeView},
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

    handleRecipeFiltering(filteredRecipesRequest) {
      console.log("Received filtered recipes request:", filteredRecipesRequest);
      this.filteredRecipesRequest = filteredRecipesRequest
      this.findRecipesByFilter();
    },

    findRecipesByFilter() {
      this.$http.post('recipes/filtered', this.filteredRecipesRequest
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
