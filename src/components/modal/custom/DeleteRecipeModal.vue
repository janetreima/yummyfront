<template>
  <Modal ref="modalRef">
    <template #header>
      Kustuta retsept
    </template>
    <template #body>
      Kas oled kindel?
    </template>
    <template #footer>
      <button @click="cancelDeleteRecipe" type="button" class="btn btn-outline-dark me-2">Katkesta</button>
      <button @click="executeDeleteRecipe" type="button" class="btn btn-outline-dark me-2">Kustuta</button>
    </template>
  </Modal>
</template>

<script>

import {defineComponent} from "vue";
import Modal from "@/components/modal/Modal.vue";

export default defineComponent({
  name: 'DeleteRecipeModal',
  components: {Modal},
  methods: {
    cancelDeleteRecipe() {
      this.$refs.modalRef.closeModal()
    },

    executeDeleteRecipe() {
      this.$emit('delete-recipe-event')
    },
  }

})
</script>