
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
                <input v-model="recipeDetailedDto.recipeName" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
              </div>
            </h1>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Käik
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Supp</a></li>
              <li><a class="dropdown-item" href="#">Praad</a></li>
              <li><a class="dropdown-item" href="#">Dessert</a></li>
            </ul>
          </div>
          <br>
          <div class="d-flex gap-2">
            <font-awesome-icon :icon="['far', 'clock']" size="lg"/>
            <div class="d-flex gap-1">
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Aeg</span>
                  <input v-model="recipeDetailedDto.timeMinute" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                </div>
            </div>
          </div>
          <div>
            <h5 class="mt-3">
              Koostisosad
            </h5>
            <ul class="list-group list-group-flush w-50">

              <div>
                <button type="button" class="btn btn-link">Lisa rida</button>
              </div>
            </ul>
            <h5 class="mt-3">
              Valmistamine
            </h5>
            <p class="w-75">
              <input v-model="recipeDetailedDto.description" type="text" style="width: 600px; height: 200px;">
            </p>
          </div>


          <h5 class="mt-3">
            Allergens
          </h5>
          <div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="Gluteeinivaba">
                Gluteeinivaba
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Lactoosivaba
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Suhkruvaba
              </label>
            </div>
          </div>
        </div>
        <div class="col col-5">
             <img src="@/assets/recipethumbnail.png">
        </div>
      </div>
    </div>


    <div>
      <button @click="addRecipe" type="button" class="btn btn-outline-success m-3">Salvesta</button>
    </div>
  </template>
  <script>
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import AllergenIcon from "@/components/icon/AllergenIcon.vue";
    import SuccessAlert from "@/components/alert/SuccessAlert.vue";
    import ErrorAlert from "@/components/alert/ErrorAlert.vue";



    export default {
      components: {AllergenIcon, FontAwesomeIcon, SuccessAlert, ErrorAlert},
      name: 'AddRecipeView',

      data() {
        return {
          successMessage: '',
          errorMessage: '',
          isLoggedIn: false,

          userId: 0,
          recipeDetailedDto: {
            recipeName: '',
            courseId: 0,
            timeMinute: 0,
            description: '',
            imageData: '',
            allergenInfos: [
              {
                allergenId: 0,
                allergenName: '',
                isAvailable: true
              }
            ]
          }

      }


      },
      methods: {
        addRecipe() {
          this.userId = sessionStorage.getItem('userId')
          this.successMessage = 'Hello! all is good!!!'
          setTimeout(this.resetSuccessMessage, 2000)

        },
        resetSuccessMessage() {
          this.successMessage = ''
        },


        openLogOutModal() {
          this.$refs.logOutModal.$refs.modalRef.openModal()
        },
        handlePage() {
          const userId = sessionStorage.getItem('userId')
          if(userId > 0){
            this.isLoggedIn = true;
            this.userId = userId
          }

        },

      },

      mounted() {
        this.handlePage()
      }


    }
  </script>
