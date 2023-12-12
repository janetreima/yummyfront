<template>
  <div class="container-fluid">
    <ul class="list-group list-group-horizontal">
      <ul class="list-group list-group-flush w-50">
        <li class="list-group-item">{{ ingredientInfo.quantity }}
          {{ ingredientInfo.measureUnitName }} {{ ingredientInfo.ingredientName }}
        </li>
      </ul>
    </ul>
    <h5 class="mt-3">
      Lisa koostisosad
    </h5>
    <div class="input-group w-50">
      <input type="text" class="form-control wider-input" aria-label="Text input">
      <select class="form-select narrow-input" id="inputGroupSelect04" aria-label="Example select with button addon">
        <option selected disabled>ühik</option>
        <option value="1">kg</option>
        <option value="2">g</option>
        <option value="3">l</option>
        <option value="3">ml</option>
      </select>
      <button class="btn btn-outline-secondary narrow-input" type="button">Lisa</button>
    </div>
  </div>
</template>

<script>
import AllergenIcon from "@/components/icon/AllergenIcon.vue";

export default {
  name: 'AddRecipeIngredientsView',
  components: {AllergenIcon},
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
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
    }
  },
methods: {

  getRecipeIngredients(recipeId) {
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

  checkIfLoggedIn()
  {
    if (this.userId > 0) {
      this.isLoggedIn = true;
    }
  }
,
}
,
mounted()
{
  this.checkIfLoggedIn()
}
}
</script>