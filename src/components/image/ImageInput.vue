<template>
  <div>
    <input type="file" @change="getImage" accept="image/x-png,image/jpeg,image/gif">
  </div>
</template>

<script>
export  default {
  name:'ImageInput',
  data() {
    return{
      imageDataIn64:'',
    }
  },
  methods: {
    getImage(event) {
      const selectImage = event.target.files[0];
      this.oBase64(selectImage);
    },
    oBase64: function (fileData) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDataIn64 = reader.result;
        this.$emit('event-base-64', this.imageDataIn64);
      };
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileData);
    },
  }
}
</script>