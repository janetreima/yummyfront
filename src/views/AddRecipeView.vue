<template>
  <div class="container-fluid">
    <div class="text-center">
      <ErrorAlert :error-message="errorMessage"/>
      <SuccessAlert :success-message="successMessage"/>
    </div>
    <div class="row">
      <div class="col col-7">
        <div class="d-flex align-items-center gap-3">
          <h1>
            <div class="input-group input-group-lg">
              <span class="input-group-text" id="inputGroup-sizing-lg">Retsepti nimi</span>
              <input v-model="recipeDetailedDto.recipeName" type="text" class="form-control"
                     aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
            </div>
          </h1>
        </div>
        <div>
          <CourseDropdown @select-course-event="setCourseId"/>
        </div>
        <br>
        <div class="d-flex gap-2">
          <font-awesome-icon :icon="['far', 'clock']" size="lg"/>
          <div class="d-flex gap-1">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">Aeg (minut)</span>
              <input v-model="recipeDetailedDto.timeMinute" type="text" class="form-control"
                     aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
            </div>
          </div>
        </div>
        <div>
          <h5 class="mt-3">
            Valmistamine
          </h5>
          <p class="w-75">
            <input v-model="recipeDetailedDto.description" type="text" style="width: 600px; height: 200px;">
          </p>
        </div>

        <h5 class="mt-3">
          Pilt
        </h5>
        <ImageInput @event-base-64="setImageToRecipe"/>
      </div>
      <div class="col col-5">
        <img src="@/assets/recipethumbnail.png">
      </div>

    </div>
  </div>

  <div>
    <button @click="addRecipeMoveToAddingIngredients" type="button" class="btn btn-outline-success m-3">Edasi koostisosi
      lisama
    </button>
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


export default {
  components: {ImageInput, AllergensChoice, AllergenIcon, FontAwesomeIcon, SuccessAlert, ErrorAlert, CourseDropdown},
  name: 'AddRecipeView',

  data() {
    return {
      successMessage: '',
      errorMessage: '',
      isLoggedIn: false,
      userId: Number(sessionStorage.getItem('userId')),
      recipeDetailedDto: {
        authorUserId: 0,
        authorUsername: '',
        recipeName: '',
        courseId: 0,
        timeMinute: 0,
        ingredientInfos: [
          {
            recipeId: 0,
            ingredientId: 0,
            ingredientName: '',
            measureUnitId: 0,
            measureUnitName: '',
            quantity: 0
          }
        ],
        description: '',
        imageData: '',
        allergenInfos: [
          {
            allergenId: 0,
            allergenName: '',
            isAvailable: true
          }
        ],
        recipeIdInfo:
            {
              recipeId: 0,
            }
      }
    }

  },
  methods: {
    async addRecipeMoveToAddingIngredients() {
      await this.saveRecipe();
      this.navigateToAddRecipeIngredients(this.recipeIdInfo.recipeId)
    }
    ,
    requiredFieldsNotFilled() {
      this.errorMessage = 'Palun taida koik info'
      setTimeout(this.resetErrorMessage, 2000)
    }
    ,
    allRequiredDataFilled() {
      return this.recipeDetailedDto.recipeName > 0 && this.recipeDetailedDto.courseId > 0 && this.recipeDetailedDto.timeMinute > 0 && this.recipeDetailedDto.description.length > 0 && this.recipeDetailedDto.imageData.length > 0
    }
    ,

    setImageToRecipe(imageDataIn64) {
      this.recipeDetailedDto.imageData = imageDataIn64;
    }
    ,
    setCourseId(selectedCourseId) {
      this.recipeDetailedDto.courseId = selectedCourseId;
    }
    ,

    async saveRecipe() {
      const response = await this.$http.post("/recipe", this.recipeDetailedDto, {
        params: {
          userId: this.userId
        }
      }).then(response => {
        this.recipeIdInfo = response.data
        this.successMessage = 'koik OK!!! Retsept' + this.recipeDetailedDto.recipeName + 'lisatud!'
        setTimeout(this.resetSuccessMessage, 2000)
      }).catch(error => {
        this.errorMessage = 'Valesti!'
        setTimeout(this.resetErrorMessage, 2000)
      })
    }
    ,

    resetSuccessMessage() {
      this.successMessage = ''
    }
    ,
    resetErrorMessage() {
      this.errorMessage = '';
    }
    ,
    openLogOutModal() {
      this.$refs.logOutModal.$refs.modalRef.openModal()
    }
    ,
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
    mounted() {
      this.checkIfLoggedIn()
    }
  }
}
</script>
