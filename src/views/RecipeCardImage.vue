<template>
  <img v-if="imageDataBase64 === '' || imageDataBase64 === null" src="@/assets/recipethumbnail.png" class="card-img-top">
  <img v-else :src="imageDataBase64" class="card-img-top">
</template>
<script>
export default {
  name: 'RecipeImage',
  props: {
    imageDataBase64: String,
  }
}
</script>

