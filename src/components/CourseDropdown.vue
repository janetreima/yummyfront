
<template>
  <div>
    <select v-model="selectedCourseId" @change="emitCourseId">
    <option selected disabled value="0">Koik</option>
    <option v-for="course in courses" :key="course.id" :value="course.id" >{{course.name}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CourseDropdown',
  data() {
    return {
      selectedCourseId: 0,
      courses: [{
        id: 0,
        name: String,
      }],
    }
  },
  methods: {
    getCourseId() {
      this.$http.get("/recipe/courses")
          .then(response => {
            this.courses = response.data
          })
    },
    emitCourseId() {
      this.$emit('select-course-event', this.selectedCourseId)
    },
  },
  mounted() {
    this.getCourseId()
  }
}
</script>
