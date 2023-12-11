<template>
  <LogInModal ref="loginModalRef" @event-login-success="handleLogin"/>
  <LogOutModal ref="logOutModal" @event-execute-logout="handleLogout"/>

  <div class="d-flex justify-content-between ms-5 me-5 mt-4 mb-5">
    <div class="">
      <router-link to="/" class="site-heading">
        <h1>yum.my</h1>
      </router-link>
    </div>
    <div>
      <nav>
        <template v-if="isLoggedIn">
          <button @click="$router.go(-1)" type="button" class="btn btn-outline-dark me-2">Tagasi</button>
          <button @click="$router.push('/myrecipes')" type="button" class="btn btn-outline-dark me-2">Minu retseptid</button>
          <button @click="goToAddRecipe" type="button" class="btn btn-outline-dark me-2">Lisa retsept</button>
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
    <router-view/>
  </div>
</template>

<script>
import LogInModal from "@/components/modal/custom/LoginModal.vue";
import LogOutModal from "@/components/modal/custom/LogOutModal.vue";
import router from "@/router";

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
      this.userId = parseInt(sessionStorage.getItem('userId'));
      if (this.userId > 0) {
        this.isLoggedIn = true;
      }
    },

    openLogOutModal() {
      this.$refs.logOutModal.$refs.modalRef.openModal()
    },

    handleLogout() {
      sessionStorage.clear();
      const userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
      router.push('/')
    },

    goToAddRecipe() {
      router.push({
        name: 'addRecipeRoute'
      });
    },
  }
}
</script>