<template>
  <div class="card border-dark rounded-0 m-3" style="width: 14rem;">
    <RecipeCardImage :image-data-base64="recipe.imageData"/>
    <div class="card-body">
      <div class="d-flex flex-column">
        <h5 class="card-title">
          {{ recipe.recipeName }}
        </h5>
        <h6 id="time-s">
          autor: {{recipe.authorUsername}}
        </h6>
        <div class="d-flex gap-2 align-content-center">
          <font-awesome-icon :icon="['far', 'clock']" size="sm"/>
          <div class="d-flex gap-1">
            <h6 id="time-s" v-if="hours > 0">
              {{ hours }} h
            </h6>
            <h6 id="time-s" v-if="minutes > 0">
              {{ minutes }} min
            </h6>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-sm btn-outline-dark" type="button" @click="navigateToRecipe(recipe.recipeId)">Vaata ></button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import RecipeCardImage from "@/components/RecipeCardImage.vue";


export default {
  name: 'RecipeCard',
  components: {RecipeCardImage},
  props: {
    recipe: {}
  },
  data() {
    return {
      hours: 0,
      minutes: 0
    }
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
    convertMinutesToHoursAndMinutes() {
      const inputMinutes = this.recipe.timeMinute
      this.hours = Math.floor(inputMinutes / 60);
      this.minutes = inputMinutes % 60;
    },
},
  mounted() {
    this.convertMinutesToHoursAndMinutes()
  },
}
</script>