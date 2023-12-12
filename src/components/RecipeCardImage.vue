<template>
    <img v-if="imageDataBase64 === '' || imageDataBase64 === null" src="@/assets/recipethumbnail.png" class="card-img-top" alt="image">
    <img v-else :src="imageDataBase64" class="card-img-top" alt="image">
</template>
<script>
export default {
  name: 'RecipeImage',
  props: {
    imageDataBase64: String,
  },
  methods: {}
}
</script>

