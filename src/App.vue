<template>
  <LogInModal ref="loginModalRef" @event-login-success="handleLogin"/>
  <LogOutModal ref="logOutModal" @event-execute-logout="handleLogout"/>

  <div class="d-flex justify-content-between ms-5 me-5 mt-4 mb-5">
    <div class="">
      <h1>yum.my</h1>
    </div>
    <div>
      <nav>
        <template v-if="isLoggedIn">
          <button type="button" class="btn btn-outline-dark me-2">Minu retseptid</button>
          <button type="button" class="btn btn-outline-dark me-2">Lisa retsept</button>
          <button @click="openLogOutModal" type="button" class="btn btn-outline-dark">Log Out</button>
        </template>
        <template v-else>
          <button @click="openLoginModal" type="button" class="btn btn-outline-dark me-2">Logi Sisse</button>
          <button type="button" class="btn btn-outline-dark">Registreeri</button>
        </template>
      </nav>
    </div>
  </div>
  <div id="app" class="ms-5 me-5">
    <router-view :is-logged-in="isLoggedIn"/>
  </div>
</template>

<script>
import LogInModal from "@/components/modal/custom/LoginModal.vue";
import LogOutModal from "@/components/modal/custom/LogOutModal.vue";

export default {
  components: {LogInModal, LogOutModal},
  data() {
    return {
      isLoggedIn: false,
      userId: 0
    }
  },
  methods: {
    openLoginModal() {
      this.$refs.loginModalRef.$refs.modalRef.openModal()
    },

    handleLogin() {
      this.userId = sessionStorage.getItem('userId');
      this.isLoggedIn = this.userId
    },

    openLogOutModal() {
      this.$refs.logOutModal.$refs.modalRef.openModal()
    },

    handleLogout() {
      sessionStorage.clear()
      this.handleLogin()
    },
  }
}
</script>