<template>
  <Modal ref="modalRef" button-name="Logi sisse">
    <template #header>
      Logi sisse
    </template>
    <template #body>
      <div class="input-group mb-3">
        <span class="input-group-text">kasutajanimi</span>
        <input v-model="username" type="text" class="form-control">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">parool</span>
        <input v-model="password" type="text" class="form-control">
      </div>
    </template>
    <template #footer>
      <button type="button" class="btn btn-outline-dark">Logi sisse</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: 'LoginModal',
  components: {Modal},
  methods: {

  },

}

</script>

