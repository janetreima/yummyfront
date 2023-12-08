<template>
  <img v-if="allergenId === 1" class="img-fluid" src="@/assets/icons/icon-gluten-free.svg" alt="gluteenivaba">
  <img v-if="allergenId === 2" class="img-fluid w-25" src="@/assets/icons/icon-lactose-free.svg" alt="laktoosivaba">
  <img v-if="allergenId === 3" class="img-fluid w-25" src="@/assets/icons/icon-sugar-free.svg" alt="suhkruvaba">
</template>

<script>
export default {
  name: 'AllergenIcon',
  props: {
    allergenId: Number,
    contentName: String,
  }
}
</script>