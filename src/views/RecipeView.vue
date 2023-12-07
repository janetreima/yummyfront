<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-7">
        <div class="d-flex align-items-center gap-3">
          <h1>
            {{ recipe.recipeName }}
          </h1>
        </div>
        <div class="d-flex gap-2">
          <font-awesome-icon :icon="['far', 'clock']" size="lg"/>
          <h6>
            {{ recipeTimeInHoursAndMinutes }}
          </h6>
        </div>
        <ul class="list-group list-group-horizontal">
          <li v-for="allergenInfo in recipe.allergenInfos" class="list-group-item border-0">{{
              allergenInfo.allergenName
            }}
          </li>
        </ul>
        <h5 class="mt-3">
          Koostisosad
        </h5>
        <ul class="list-group list-group-flush w-50">
          <li class="list-group-item">1 kg koostisosa</li>
          <li class="list-group-item">1 kg koostisosa</li>
          <li class="list-group-item">1 kg koostisosa</li>
          <li class="list-group-item">1 kg koostisosa</li>
        </ul>
        <h5 class="mt-3">
          Valmistamine
        </h5>
        <p class="w-75">
          {{ recipe.description }}
        </p>
      </div>
      <div class="col-5">
        <img src="@/assets/recipethumbnail.png">
        <div v-if="isLoggedIn" class="d-flex justify-content-end">
          <button type="button" class="btn btn-outline-dark me-2">Muuda</button>
          <button type="button" class="btn btn-outline-dark me-2">Kustuta</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: 'RecipeView',
  components: {FontAwesomeIcon},
  props: {
    recipeId: Number,
    recipeName: String,
    isLoggedIn: Boolean,
  },
  data() {
    return {
      recipe: {
        recipeName: '',
        courseId: 0,
        allergenInfos: [
          {
            allergenId: 0,
            allergenName: '',
          }
        ],
        timeMinute: 0,
        description: '',
        imageData: ''
      },
      recipeTimeInHoursAndMinutes: String,
      userId: 0,
    }
  },
  methods: {
    getRecipe(recipeId) {
      this.$http.get('/recipe', {
        params: {
          recipeId: this.recipeId
        }
      })
          .then(response => {
            this.recipe = response.data;
            this.convertMinutesToHoursAndMinutes();
          })
          .catch(error => {
            this.errorResponse = error.response.data;
          });
    },

    convertMinutesToHoursAndMinutes() {
      const minutes = this.recipe.timeMinute
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      this.recipeTimeInHoursAndMinutes = `${hours} h ${remainingMinutes} min`;
    },
  },

  mounted() {
    this.getRecipe();
  }
}
</script>
