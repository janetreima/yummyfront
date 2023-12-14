<template>
  <div class="container-fluid">
    <div>
      <SuccessAlert :success-message="successMessage"/>
      <ErrorAlert :error-message="errorMessage"/>
    </div>
    <div>
      <ul class="list-group list-group-flush w-50">
        <li v-for="recipeIngredient in recipeIngredients" :key="recipeIngredient.ingredientId"
            class="list-group-item">{{ recipeIngredient.quantity }}
          {{ recipeIngredient.measureUnitName }} {{ recipeIngredient.ingredientName }}
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
    <br>
    <AllergensChoice @emit-allergeninfo-event="assignAllergenInfo"/>
    <button @click="addAllergensToRecipe()" type="button" class="btn btn-outline-success m-3">Valmis
    </button>
  </div>

</template>

<script>
import AllergenIcon from "@/components/icon/AllergenIcon.vue";
import {useRoute} from "vue-router";
import router from "@/router";
import AllergensChoice from "@/components/AllergensChoiseCheckbox.vue";
import ErrorAlert from "@/components/alert/ErrorAlert.vue";
import SuccessAlert from "@/components/alert/SuccessAlert.vue";
import async from "async";
import successAlert from "@/components/alert/SuccessAlert.vue";

export default {
  name: 'AddRecipeIngredientsView',
  components: {SuccessAlert, ErrorAlert, AllergensChoice, AllergenIcon},
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      recipeId: Number(useRoute().query.recipeId),
      isLoggedIn: false,
      errorMessage: '',
      successMessage: '',
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

    addRecipeIngredient() {
      this.$http.post('/recipe/ingredient', this.ingredientInfo, {
        params: {
          recipeId: this.recipeId,
        }
      })
          .then(response => {
            this.getRecipeIngredients()
          })
          .catch(error => {
            this.errorResponse = error.response.data;
          })
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



     navigateToAddedRecipe(recipeId) {
      router.push({
        name: 'recipeRoute',
        query: {
          recipeId: recipeId
        },
      })
    },

    checkIfLoggedIn() {
      if (this.userId > 0) {
        this.isLoggedIn = true;
      }
    },


    resetErrorMessage() {
      this.errorMessage = '';
    },
    resetSuccessMessage() {
      this.errorMessage = '';
    }
  },
  mounted() {
    this.checkIfLoggedIn()
    this.getAllMeasureUnits()
    this.getRecipeIngredients()
  }
}
</script>