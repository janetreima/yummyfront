<template>
  <LogInModal ref="loginModalRef"/>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Yum.me</h1>
      </div>

      <div class="col">
        <nav>
          <router-link to="/">
            <button @click="openLoginModal" type="button" class="btn btn-outline-dark">Logi Sisse</button>
          </router-link>
          <router-link to="/about">
            <button type="button" class="btn btn-outline-dark">Registreeri</button>
          </router-link>

        </nav>
      </div>
    </div>
  </div>

  <router-view/>

</template>


<script>

import LogInModal from "@/components/LoginModal.vue";

export default {
  components: {LogInModal},
  methods: {
    openLoginModal() {
      this.$refs.loginModalRef.$refs.modalRef.openModal()
    },
  }
}
</script>