<template>
  <DeleteRecipeModal @delete-recipe-event="deleteRecipe" ref="deleteRecipeModal"/>
  <div class="container-fluid">
    <div class="row mt-3 mb-3 p-0">
      <div class="col col-7">
        <div class="d-flex align-items-center gap-3">
          <h1>
            {{ recipe.recipeName }}
          </h1>
          <ul class="list-group list-group-horizontal">
            <div v-for="allergenInfo in recipe.allergenInfos">
              <li class="list-group-item border-0">
                <div class="d-flex align-items-center gap-2">
                  <AllergenIcon :allergen-id="allergenInfo.allergenId"/>
                  {{ allergenInfo.allergenName }}
                </div>
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
      <div class="col col-5 p-0">
        <div class="d-flex flex-column">
          <RecipeImage :image-data-base64="recipe.imageData"/>
        </div>
      </div>
    </div>
    <div class="row p-0 mb-5">
      <div class="d-flex justify-content-end">
      <button @click="$router.push('/')" type="button" class="btn btn-outline-dark me-2">Tagasi avalehele</button>
      <div v-if="isLoggedIn && userId === recipe.authorUserId" class="d-flex justify-content-end">
        <button @click="openEditRecipeView(recipeId)" type="button" class="btn btn-outline-dark me-2">Muuda</button>
        <button @click="openDeleteRecipeModal" type="button" class="btn btn-outline-dark me-2">Kustuta</button>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import AllergenIcon from "@/components/icon/AllergenIcon.vue";
import {useRoute} from "vue-router";
import LogOutModal from "@/components/modal/custom/LogOutModal.vue";
import DeleteRecipeModal from "@/components/modal/custom/DeleteRecipeModal.vue";
import router from "@/router";
import RecipeImage from "@/components/RecipeImage.vue";

export default {
  name: 'RecipeView',
  components: {RecipeImage, DeleteRecipeModal, LogOutModal, AllergenIcon, FontAwesomeIcon},
  data() {
    return {
      recipeId: Number(useRoute().query.recipeId),
      recipe: {
        authorUserId: 0,
        authorUsername: '',
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
      userId: Number(sessionStorage.getItem('userId')),
      isLoggedIn: false,
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
            this.convertMinutesToHoursAndMinutes();
          })
          .catch(error => {
            this.errorResponse = error.response.data;
          });
    },
    openDeleteRecipeModal() {
      this.$refs.deleteRecipeModal.$refs.modalRef.openModal()
    },

    deleteRecipe: function () {
      this.$http.delete('/recipe', {
        params: {
          recipeId: this.recipeId,
        }
      }).then(
          this.redirectToHomeView
      )
    },

    redirectToHomeView: function () {
      router.push({
        name: 'homeRoute'
      })
    },

    openEditRecipeView(recipeId) {
      router.push({
        name: 'editRecipeRoute',
        query: {
          recipeId: recipeId
        },
      });
    },

    convertMinutesToHoursAndMinutes() {
      const inputMinutes = this.recipe.timeMinute
      this.hours = Math.floor(inputMinutes / 60);
      this.minutes = inputMinutes % 60;
    },
    checkIfLoggedIn() {
      if (this.userId > 0) {
        this.isLoggedIn = true;
      }
    },
  },

  mounted() {
    this.getRecipe();
    this.checkIfLoggedIn()
  }
}
</script>
