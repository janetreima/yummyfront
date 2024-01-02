<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-6">
      <h5 class="mt-3">
        Koostisosad
      </h5>
      <div>
        <ul class="list-group list-group-flush">
          <li v-for="recipeIngredient in recipeIngredients" :key="recipeIngredient.ingredientId"
              :id="recipeIngredient.ingredientId"
              class="list-group-item">
            <div class="d-flex justify-content-between">
              <div>{{ recipeIngredient.quantity }}
                {{ recipeIngredient.measureUnitName }} {{ recipeIngredient.ingredientName }}
              </div>
              <div>
                <font-awesome-icon @click="deleteRecipeIngredientAndRefreshList(recipeIngredient.ingredientId)"
                                   :icon="['fas', 'xmark']"/>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="input-group">
        <input v-model="ingredientInfo.quantity" type="number" min="0"
               class="form-control narrow-input input-border-black"
               placeholder="Kogus">
        <select v-model="ingredientInfo.measureUnitId" class="form-select narrow-input input-border-black"
                id="ingredientMeasureInfo">
          <option id="option-placeholder" selected disabled>ühik</option>
          <option v-for="measureUnit in measureUnits" :key="measureUnit.id" :value="measureUnit.id">
            {{ measureUnit.name }}
          </option>
        </select>
        <input v-model="ingredientInfo.ingredientName" type="text" class="form-control wider-input input-border-black"
               placeholder="Koostisosa">
        <button @click="addRecipeIngredient" class="btn btn-outline-dark narrow-input" type="button">+ Lisa</button>
      </div>
      <h5 class="mt-5 mb-3">
        Allergeenid
      </h5>
      <AllergensChoiceCheckbox @emit-allergeninfo-event="assignAllergenInfo"/>

      <button @click="addAllergensToRecipe()" type="button" class="btn btn-outline-success mt-4">Salvesta
      </button>

    </div>
    </div>
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
        this.$emit('recipe-saved-event')

      }).catch(error => {
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