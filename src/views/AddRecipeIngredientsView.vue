<template>
  <div class="container-fluid">
    <div>
      <ul class="list-group list-group-flush w-50">
        <li v-for="recipeIngredient in recipeIngredients" :key="recipeIngredient.ingredientId"
            :id="recipeIngredient.ingredientId"
            class="list-group-item">
          <div class="d-flex justify-content-between">
            <div>{{ recipeIngredient.quantity }}
              {{ recipeIngredient.measureUnitName }} {{ recipeIngredient.ingredientName }}
            </div>
            <div>
              <font-awesome-icon @click="deleteRecipeIngredientAndRefreshList(recipeIngredient.ingredientId)" :icon="['fas', 'xmark']"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <h5 class="mt-3">
      Lisa koostisosad
    </h5>
    <div class="input-group w-50">
      <input v-model="ingredientInfo.ingredientName" type="text" class="form-control wider-input input-border-black"
             placeholder="Koostisosa">
      <input v-model="ingredientInfo.quantity" type="number" class="form-control narrow-input input-border-black"
             placeholder="Kogus">
      <select v-model="ingredientInfo.measureUnitId" class="form-select narrow-input input-border-black"
              id="inputGroupSelect04">
        <option selected disabled>ühik</option>
        <option v-for="measureUnit in measureUnits" :key="measureUnit.id" :value="measureUnit.id">
          {{ measureUnit.name }}
        </option>
      </select>
      <button @click="addRecipeIngredient" class="btn btn-outline-dark narrow-input" type="button">+ Lisa</button>
    </div>
    <AllergensChoiceCheckbox @emit-allergeninfo-event="assignAllergenInfo"/>
    <button @click="addAllergensToRecipe()" type="button" class="btn btn-outline-success m-3">Valmis
    </button>
  </div>
</template>

<script>
import AllergenIcon from "@/components/icon/AllergenIcon.vue";
import {useRoute} from "vue-router";
import router from "@/router";
import AllergensChoiceCheckbox from "@/components/AllergensChoiseCheckbox.vue";


export default {
  name: 'AddRecipeIngredientsView',
  components: {AllergensChoiceCheckbox, AllergenIcon},
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      recipeId: Number(useRoute().query.recipeId),
      isLoggedIn: false,
      ingredientInfo:
          {
            ingredientName: '',
            measureUnitId: 0,
            quantity: 0
          },
      recipeIngredients:
          [
            {
              recipeId: 0,
              ingredientId: 0,
              ingredientName: '',
              measureUnitId: 0,
              measureUnitName: '',
              quantity: 0
            }
          ],
      measureUnits: [
        {
          id: 0,
          name: '',
        }
      ],
      allergenInfo: [
        {
          allergenId: 0,
          allergenName: '',
          isAvailable: false,
        }
      ]

    }
  },
  methods: {

    addRecipeIngredient() {
      this.$http.post('/recipe/ingredient', this.ingredientInfo, {
        params: {
          recipeId: this.recipeId,
        }
      })
          .then(response => {
            this.getRecipeIngredients()
            this.resetIngredientInsertFields();
          })
          .catch(error => {
            this.errorResponse = error.response.data;
          })
    },

    resetIngredientInsertFields: function () {
      this.ingredientInfo.ingredientName = ''
      this.ingredientInfo.quantity = 0
      this.ingredientInfo.measureUnitId = 0
    },

    getRecipeIngredients() {
      this.$http.get('/recipe/ingredients', {
        params: {
          recipeId: this.recipeId,
        }
      })
          .then(response => {
            this.recipeIngredients = response.data;
          })
          .catch(error => {
            this.errorResponse = error.response.data;
          })
    },

    getAllMeasureUnits() {
      this.$http.get('/recipe/measureunits')
          .then(response => {
            this.measureUnits = response.data;
          })
          .catch(error => {
            this.errorResponse = error.response.data;
          })
    },
    assignAllergenInfo(allergenInfo) {
      this.allergenInfo = allergenInfo;
    },

    addAllergensToRecipe() {
      this.$http.post('/recipe/allergens', this.allergenInfo, {
        params: {
          recipeId: this.recipeId,
        }
      }).then(response => {
        this.navigateToAddedRecipe(this.recipeId)
        this.$emit ('recipe-saved-event')

      }).catch(error=> {
        this.errorMessage = 'Midagi valesti!'
        setTimeout(this.resetErrorMessage, 2000)
      })
    },

    navigateToAddedRecipe(recipeId) {
      router.push({
        name: 'recipeRoute',
        query: {
          recipeId: recipeId
        },
      })
    },

    async deleteRecipeIngredientAndRefreshList(ingredientId) {
      await this.deleteRecipeIngredient(ingredientId)
      this.getRecipeIngredients()
    },

    async deleteRecipeIngredient(ingredientId) {
      await this.$http.delete('/recipe/ingredient', {
        params: {
          ingredientId: ingredientId,
        }
      })
    },

    checkIfLoggedIn() {
      if (this.userId > 0) {
        this.isLoggedIn = true;
      }
    },
  },
  mounted() {
    this.checkIfLoggedIn()
    this.getAllMeasureUnits()
    this.getRecipeIngredients()
  }
}
</script>