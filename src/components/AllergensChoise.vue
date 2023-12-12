
<template>
  <div v-for="allergen in allergens" :key="allergen.allergenId"  class="form-check">
    <input class="form-check-input" type="checkbox" value="">
    <label class="form-check-label" for="flexCheckDefault">
      {{ allergen.allergenName }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'AllergensChoice',
  data() {
    return {
      allergens: [
        {
          allergenId: 0,
          allergenName: '',
          isAvailable: true,
        }
      ],
    }
  },

  methods: {
    getAllAllergens() {
      this.$http.get('/recipe/allergens')
          .then(response =>{
            this.allergens = response.data;
          })

    },

  },
  mounted() {
    this.getAllAllergens()
  }
}
</script>