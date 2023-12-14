<template>
  <input v-model="course.isAvailable" class="form-check-input" type="checkbox" :id="'courseId' + course.courseId">
</template>

<script>
export default {
  name: 'TagCheckbox',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>