
<template>
  <Modal ref="modalRef" close-button-name="Ei">
    <template #header>
      <h1> Aitah!!!</h1>
    </template>
    <template #body>
      <h3>Recept lisatud.</h3>
    </template>
    <template #footer>
      <button @click="closeMod" class="btn btn-outline-dark" type="submit">Ok</button>

    </template>
  </Modal>
</template>

<script>
export  default {
  name: 'ThankYouModal',
  components: {Modal},
  methods: {
    closeMod() {
      this.$refs.modalRef.closeModal()
    }
  }


}



import Modal from "@/components/modal/Modal.vue";
</script>
