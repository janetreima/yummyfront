
<template>
    <Modal ref="modalRef" close-button-name="Ei">
      <template #header>
        Logi välja
      </template>
      <template #body>
        Kas oled kindel?
      </template>
      <template #footer>
        <button @click="executeLogout" class="btn btn-outline-dark" type="submit">Jah</button>
        <button @click="closeLogoutModal" class="btn btn-outline-dark" type="submit">Ei soovi</button>
      </template>
    </Modal>
</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: 'LogOutModal',
  components: {Modal},
  methods: {
    executeLogout() {
      this.$emit('event-execute-logout')
      this.$refs.modalRef.closeModal()
    },
    closeLogoutModal() {
      this.$refs.modalRef.closeModal()
    },


  }
}

</script>
