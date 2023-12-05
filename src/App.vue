<template>
  <LogInModal ref="loginModalRef" @event-login-success="setLogInId"/>
  <LogOutModal ref="logOutModal" @event-execute-logout="commitExit"/>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Yum.me</h1>
      </div>

      <div class="col">

          <nav>
            <template v-if="isLoggedIn">

              <button  type="button" class="btn btn-outline-dark">Minu retseptid</button>

              <button  type="button" class="btn btn-outline-dark">Lisa retsept</button>

              <button @click="openLogOutModal" type="button" class="btn btn-outline-dark">Log Out</button>

            </template>
          </nav>
          <nav>
            <template v-if="!isLoggedIn">

              <button @click="openLoginModal" type="button" class="btn btn-outline-dark">Logi Sisse</button>

              <button type="button" class="btn btn-outline-dark">Registreeri</button>

            </template>

          </nav>



      </div>
    </div>
  </div>

</template>


<script>

import LogInModal from "@/components/modal/components/LoginModal.vue";
import LogOutModal from "@/components/modal/components/LogOutModal.vue";

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
    setLogInId() {
      this.userId = sessionStorage.getItem('userId');
      this.isLoggedIn = this.userId
    },


    openLogOutModal() {
      this.$refs.logOutModal.$refs.modalRef.openModal()
    },
    commitExit() {
      sessionStorage.clear()
      this.setLogInId()
    },
  }
}
</script>