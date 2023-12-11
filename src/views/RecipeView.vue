<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-7">
        <div class="d-flex align-items-center gap-3">
          <h1>
            {{ recipe.recipeName }}
          </h1>
          <ul class="list-group list-group-horizontal">
            <div v-for="allergenInfo in recipe.allergenInfos">
              <li class="list-group-item border-0">
                {{ allergenInfo.allergenName }}
              </li>
            </div>
          </ul>
        </div>
        <div class="d-flex gap-2">
          <font-awesome-icon :icon="['far', 'clock']" size="lg"/>
          <div class="d-flex gap-1">
            <h6 v-if="hours > 0">
              {{ hours }} h
            </h6>
            <h6 v-if="minutes > 0">
              {{ minutes }} min
            </h6>
          </div>
        </div>
        <h5 class="mt-3">
          Koostisosad
        </h5>
        <ul class="list-group list-group-flush w-50">
          <li v-for="ingredientInfo in recipe.ingredientInfos" class="list-group-item">{{ ingredientInfo.quantity }}
            {{ ingredientInfo.measureUnitName }} {{ ingredientInfo.ingredientName }}
          </li>
        </ul>
        <h5 class="mt-3">
          Valmistamine
        </h5>
        <p class="w-75">
          {{ recipe.description }}
        </p>
      </div>
      <div class="col col-5">
        <img src="@/assets/recipethumbnail.png">
        <div v-if="isLoggedIn" class="d-flex justify-content-end">
          <button type="button" class="btn btn-outline-dark me-2">Muuda</button>
          <button type="button" class="btn btn-outline-dark me-2">Kustuta</button>
        </div>
        <div v-else>
          <button @click="$router.go(-1)" type="button" class="btn btn-outline-dark me-2">Tagasi</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import AllergenIcon from "@/components/icon/AllergenIcon.vue";

export default {
  name: 'RecipeView',
  components: {AllergenIcon, FontAwesomeIcon},
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
        imageData: '',
        ingredientInfos: [
          {
            recipeId: 0,
            ingredientId: 0,
            ingredientName: '',
            measureUnitId: 0,
            measureUnitName: '',
            quantity: 0,
          }
        ]
      },
      minutes: 0,
      hours: 0,
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
      const inputMinutes = this.recipe.timeMinute
      this.hours = Math.floor(inputMinutes / 60);
      this.minutes = inputMinutes % 60;
    },
  },

  mounted() {
    this.getRecipe();
  }
}
</script>
