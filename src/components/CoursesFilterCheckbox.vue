<template>
  <div v-for="course in courses" :key="course.courseId" class="form-check">
    <input v-model="course.isAvailable" class="form-check-input" type="checkbox" :id="'courseId' + course.courseId">
    <label class="form-check-label" for="flexCheckDefault">
      {{ course.courseName }}
    </label>
  </div>
</template>
<script>
export default {
  name: 'CoursesFilterCheckbox',
  data() {
    return {
      courses: [
        {
          courseId: 0,
          courseName: '',
          isAvailable: false
        }
      ]
    }
  },
  methods: {
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
    this.getAllCourses()
  }
}
</script>