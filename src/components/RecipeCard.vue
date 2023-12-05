<template>
  <div class="card border-dark m-3" style="width: 14rem;">
    <RecipeImage :image-data-base64="recipe.imageData"/>
    <div class="card-body">
      <div class="d-flex">
        <h5 class="card-title">Retsepti nimi</h5>
      </div>
      <div class="d-flex justify-content-end">
        <a href="#" class="btn btn-outline-dark">Loe edasi</a>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeImage from "@/components/RecipeCardImage.vue";

export default {
  name: 'RecipeCard',
  components: {RecipeImage},
  data() {
    return {
      recipe: [
        {
          recipeId: 0,
          userId: 0,
          courseId: 0,
          courseName: '',
          imageId: 0,
          imageData: '',
          recipeName: '',
          time: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          },
          description: '',
          status: ''
        }
      ]
    }
  }
}
</script>