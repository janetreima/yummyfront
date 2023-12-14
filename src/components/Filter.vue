<template>
  <div>
    <h4>
      Filtreeri
    </h4>
    <h6 class="mt-3">
      Käik
    </h6>
    <div class="mt-2">
      <CoursesFilterCheckbox ref="coursesFilterCheckboxRef"/>
    </div>
    <h6 class="mt-3">
      Allergeenid
    </h6>
    <div class="mt-2">
      <AllergensFilterCheckbox ref="allergenFilterCheckboxRef"/>
    </div>
    <div class="mt-3">
      <button @click="emitFilterInfo" type="submit" class="btn btn-sm btn-outline-dark">Filtreeri</button>
    </div>
  </div>
</template>

<script>
import CoursesFilterCheckbox from "@/components/CoursesFilterCheckbox.vue";
import AllergensFilterCheckbox from "@/components/AllergensFilterCheckbox.vue";

export default {
  name: 'Filter',
  components: {AllergensFilterCheckbox, CoursesFilterCheckbox},
  data() {
    return {
      filteredRecipesRequest:
          {
            allergenInfos: [
              {
                allergenId: 0,
                allergenName: '',
                isAvailable: false
              }
            ],
            courseInfos: [
              {
                courseId: 0,
                courseName: '',
                isAvailable: false
              }
            ]
          },
    }
  },
  methods: {
    emitFilterInfo() {
      this.filteredRecipesRequest.allergenInfos = this.$refs.allergenFilterCheckboxRef.allergens;
      this.filteredRecipesRequest.courseInfos = this.$refs.coursesFilterCheckboxRef.courses;
      this.$emit('event-recipes-filter-info', this.filteredRecipesRequest)

    },
  },
  mounted() {
  }
}
</script>