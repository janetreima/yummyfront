<template>
  <div class="container-fluid justify-content-center">
    <div class="row">
      <div class="col col-2">
        <Filter/>
      </div>
      <div class="col col-10">
        <AllRecipeCards/>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import RecipeCard from "@/components/RecipeCard.vue";
import Filter from "@/components/Filter.vue";
import AllRecipeCards from "@/components/AllRecipeCards.vue";

export default defineComponent({
  components: {AllRecipeCards, Filter, RecipeCard}
})
</script>
