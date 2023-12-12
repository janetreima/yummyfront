
<template>
  <div>
    <select v-model="selectedCourseId" @change="emitCourseId">
    <option selected disabled value="0">Koik</option>
    <option v-for="course in courses" :key="course.courseId" :value="course.courseId" >{{course.courseName}}</option>
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
        courseId: 0,
        courseName: String,
        isAvailable: true,
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
