<template>
  <LoginModal ref="loginModalRef"/>
  <div class="container text-center">
    <div class="row">
      <div class="col">
      </div>
      <div class="col">
        <nav>
          <button @click="openLoginModal" type="button" class="btn btn-outline-dark">Logi sisse</button>
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


    ,
  }
}

</script>