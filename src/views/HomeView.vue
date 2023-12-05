<template>
  <div class="container-fluid justify-content-center">
    <div class="row">
      <div class="col col-2">
        <Filter/>
      </div>
      <div class="col col-10">
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
import RecipeCard from "@/components/RecipeCard.vue";
import Filter from "@/components/Filter.vue";

export default defineComponent({
  components: {Filter, RecipeCard}
})
</script>
