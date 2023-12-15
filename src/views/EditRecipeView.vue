<template>
  <div class="container-fluid">
    <div class="text-center">
    </div>
    <div class="row">
      <div class="col col-7">
        <h2>
          Muuda retsepti
        </h2>
        <h5 class="mt-5">
          Retsepti nimi
        </h5>
        <input v-model="recipe.recipeName" type="text" class="form-control w-50"
               aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
        <h5 class="mt-3">
          Käik
        </h5>
        <div>
          <CourseDropdown ref="courseDropdownRef" @select-course-event="changeCourseId"/>
        </div>
        <h5 class="mt-3">
          Valmistamise aeg
        </h5>
        <div class="d-flex align-items-center gap-2">
          <font-awesome-icon :icon="['far', 'clock']" size="xl"/>
          <div class="d-flex gap-2">

            <input v-model="hours" type="number" class="form-control narrow-input"
                   id="inputHours">
            <label for="inputPassword6" class="col-form-label">h</label>


            <input v-model="minutes" type="number" class="form-control narrow-input"
                   id="inputHours">
            <label for="inputPassword6" class="col-form-label">min</label>

          </div>
        </div>
        <div>
          <h5 class="mt-3">
            Valmistamise juhised
          </h5>
          <p class="w-75">
            <textarea v-model="recipe.description" type="text" style="width: 600px; height: 200px;"/>
          </p>
        </div>
        <h5 class="mt-3">
          Pilt
        </h5>
        <ImageInput @event-base-64="setImageToRecipe"/>
        <div class="d-flex gap-2 mt-5 mb-5">
          <button @click="$router.go(-1)" type="button" class="btn btn-outline-dark">Katkesta</button>
          <button @click="editRecipe" type="button" class="btn btn-outline-success">Edasi koostisosi
            muutma
          </button>
        </div>
      </div>
      <div class="col col-5 pb-4">
        <RecipeImage id="img-size-orig" :image-data-base64="recipe.imageData"/>
      </div>
    </div>
  </div>
</template>
<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import AllergenIcon from "@/components/icon/AllergenIcon.vue";
import SuccessAlert from "@/components/alert/SuccessAlert.vue";
import ErrorAlert from "@/components/alert/ErrorAlert.vue";
import CourseDropdown from "@/components/CourseDropdown.vue";
import AllergensChoice from "@/components/AllergensChoiseCheckbox.vue";
import ImageInput from "@/components/image/ImageInput.vue";
import router from "@/router";
import {useRoute} from "vue-router";
import RecipeImage from "@/components/RecipeCardImage.vue";


export default {
  components: {
    RecipeImage,
    ImageInput, AllergensChoice, AllergenIcon, FontAwesomeIcon, SuccessAlert, ErrorAlert, CourseDropdown
  },
  name: 'EditRecipeView',

  data() {
    return {
      recipeId: Number(useRoute().query.recipeId),
      isLoggedIn: false,
      userId: Number(sessionStorage.getItem('userId')),
      recipe: {
        recipeName: '',
        courseId: 0,
        timeMinute: 0,
        description: '',
        imageData: ''
      },
      hours: 0,
      minutes: 0,
    }

  },
  methods: {

    getRecipe() {
      this.$http.get('/recipe', {
        params: {
          recipeId: this.recipeId,
        }
      })
          .then(response => {
            this.recipe = response.data;
            this.$refs.courseDropdownRef.selectedCourseId = this.recipe.courseId;
            this.convertMinutesToHoursAndMinutes()
          })
          .catch(error => {
            this.errorResponse = error.response.data;
          });
    },

    changeCourseId(courseId) {
      this.recipe.courseId = courseId
    },

    convertMinutesToHoursAndMinutes() {
      const inputMinutes = this.recipe.timeMinute
      this.hours = Math.floor(inputMinutes / 60);
      this.minutes = inputMinutes % 60;
    },

    setImageToRecipe(imageDataIn64) {
      this.recipe.imageData = imageDataIn64;
    },

    convertTimeToMinutes() {
      const hoursToMinutes = this.hours * 60;
      this.recipe.timeMinute = hoursToMinutes + this.minutes;
    },

    editRecipe() {
      this.recipe.courseId = this.$refs.courseDropdownRef.selectedCourseId
      this.recipe.timeMinute = (this.hours * 60) + this.minutes

      this.$http.put('/recipe', this.recipe, {
        params: {
          recipeId: this.recipeId,
        }
      }).then(response => {
        this.navigateToAddRecipeIngredients(this.recipeId)
      }).catch(error => {
        console.error('Error editing recipe:', error);
      });
    },

    checkIfLoggedIn() {
      if (this.userId > 0) {
        this.isLoggedIn = true;
      }
    },
    navigateToAddRecipeIngredients(recipeId) {
      router.push({
        name: 'addRecipeIngredientsRoute',
        query: {
          recipeId: recipeId
        },
      });
    },
  },
  mounted() {
    this.checkIfLoggedIn()
    this.getRecipe()
  }
}
</script>
