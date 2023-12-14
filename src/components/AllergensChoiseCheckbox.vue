
<template>
  <div v-for="allergen in allergens" :key="allergen.allergenId"   class="form-check">
    <input v-model="allergen.isAvailable" @change="passAllergenInfo" class="form-check-input" type="checkbox" :id="'checkbox' + allergen.allergenId" >
    <label class="form-check-label" :for=" 'checkbox' + allergen.allergenId">
      {{ allergen.allergenName }}
    </label>
  </div>
</template>

<script>
import checkBox from "@/components/CheckBox.vue";

export default {
  name: 'AllergensChoiceCheckbox',
  data() {
    return {
      allergens: [
        {
          allergenId: 0,
          allergenName: '',
          isAvailable: false,
        }
      ]
    }
  },

  methods: {
    getAllAllergens() {
      this.$http.get('/recipe/allergens')
          .then(response =>{
            this.allergens = response.data;
          })
    },
    passAllergenInfo() {
      this.$emit ('emit-allergeninfo-event', this.allergens)
    },

    saveAllergensToRecipe() {
      this.$http.post('recipe/allergens')
    },

  },
  mounted() {
    this.getAllAllergens()
  }
}
</script>