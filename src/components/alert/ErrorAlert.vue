<template>
  <div v-if="0 < errorMessage.length" class="alert alert-light text-center" text-center role="alert">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: {
    errorMessage: String
  }
}
</script>



