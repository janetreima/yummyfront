<template>
  <div v-for="allergen in allergens" :key="allergen.allergenId" class="form-check">
    <input v-model="allergen.isAvailable" class="form-check-input" type="checkbox" :id="'allergenId' + allergen.allergenId">
    <label class="form-check-label" for="flexCheckDefault">
      {{ allergen.allergenName }}
    </label>
  </div>
</template>
<script>
export default {
  name: 'AllergensFilterCheckbox',
  data() {
    return {
      allergens: [
        {
          allergenId: 0,
          allergenName: '',
          isAvailable: false
        }
      ],
    }
},
  methods: {
    getAllAllergens() {
      this.$http.get('/allergens')
          .then(response => {
            this.allergens = response.data;
          })
          .catch(error => {
            this.errorResponse = error.response.data;
          });
    },
  },
  mounted() {
    this.getAllAllergens()
  }
}
</script>