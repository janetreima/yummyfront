<template>
  <LogInModal ref="loginModalRef"/>
  <RegistrationModal ref="registrationModalRef"/>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Yum.me</h1>
      </div>

      <div class="col">
        <nav>
            <button @click="openLoginModal" type="button" class="btn btn-outline-dark">Logi Sisse</button>
            <button @click="openRegistrationModal" type="button" class="btn btn-outline-dark">Registreeri</button>

        </nav>
      </div>
    </div>
  </div>

  <router-view/>

</template>


<script>

import LogInModal from "@/components/LoginModal.vue";
import RegistrationModal from "@/components/RegistrationModal.vue";

export default {
  components: {RegistrationModal, LogInModal},
  methods: {
    openLoginModal() {
      this.$refs.loginModalRef.$refs.modalRef.openModal()
    },
    openRegistrationModal() {
      this.$refs.registrationModalRef.$refs.modalRef.openModal()
    },
  }
}
</script>