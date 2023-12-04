<template>
<LoginModal ref="loginModalRef"/>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        Column
      </div>
      <div class="col">
        <nav>
          <button @click="openLoginModal" type="button" class="btn btn-dark">Logi sisse</button>

          <router-link  to="/">Home</router-link>
          |
          <router-link to="/about">About</router-link>
        </nav>
      </div>
    </div>
  </div>


  <router-view/>
</template>

<script>

import LoginModal from "@/components/LoginModal.vue";

    export default {
      components: {LoginModal},
      methods: {
        openLoginModal() {
          this.$refs.loginModalRef.$refs.modalRef.openModal()
        }
      }

    }




</script>