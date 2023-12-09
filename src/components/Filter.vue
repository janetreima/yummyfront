<template>
  <h4>
    Filtreeri
  </h4>
  <h6>
    Käik
  </h6>
  <div v-for="course in courses" :key="course.id"  class="form-check">
    <input class="form-check-input" type="checkbox" value="">
    <label class="form-check-label" for="flexCheckDefault">
      {{ course.name }}
    </label>
  </div>
  <h6>
    Allergeenid
  </h6>
  <div class="mt-3">
    <div v-for="allergen in allergens" :key="allergen.allergenId"  class="form-check">
      <input class="form-check-input" type="checkbox" value="">
      <label class="form-check-label" for="flexCheckDefault">
        {{ allergen.allergenName }}
      </label>
    </div>
  </div>
  <div class="mt-3">
    <button type="button" class="btn btn-outline-dark">Filtreeri</button>
  </div>
</template>

<script>
export default {
  name: 'Filter',
  data() {
    return {
      allergens: [
        {
          allergenId: 0,
          allergenName: '',
          isAvailable: false
        }
      ],
      courses: [
        {
          id: 0,
          name: '',
        }
      ]
    }
  },
  methods: {
    getAllAllergens() {
      this.$http.get('/recipe/allergens')
          .then(response => {
            this.allergens = response.data;
          })
          .catch(error => {
            this.errorResponse = error.response.data;
          });
    },
    getAllCourses() {
      this.$http.get('/recipe/courses')
          .then(response => {
            this.courses = response.data;
          })
          .catch(error => {
            this.errorResponse = error.response.data;
          });
    },
  },
  mounted() {
    this.getAllAllergens()
    this.getAllCourses()
  }
}
</script>