<template>
  <div class="container-fluid justify-content-center">
    <div class="row">
      <div class="col col-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="">
          <label class="form-check-label" for="flexCheckDefault">
            Supp
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="">
          <label class="form-check-label" for="flexCheckChecked">
            Praad
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="">
          <label class="form-check-label" for="flexCheckChecked">
            Magustoit
          </label>
        </div>
      </div>
      <div class="col col-10">
        <h1>heheh</h1>
        <div class="d-flex flex-wrap">
          <RecipeCard/>
          <RecipeCard/>
          <RecipeCard/>
          <RecipeCard/>
          <RecipeCard/>
          <RecipeCard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import RecipeCard from "@/views/RecipeCard.vue";

export default defineComponent({
  components: {RecipeCard}
})
</script>
