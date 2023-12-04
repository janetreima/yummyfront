<template>
  <Modal ref="modalRef" button-name="Logi sisse">
    <template #header>
      Logi sisse
    </template>


    <template #body>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">kasutajanimi</span>
        <input v-model="username" type="text" class="form-control">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">parool</span>
        <input v-model="password" type="text" class="form-control">
      </div>
    </template>


    <template #footer>
      <button @click="login" type="button" class="btn btn-dark">Logi sisse</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {

  name: 'LoginModal',
  components: {Modal},
  data() {
    return {
      username: '',
      password: '',
      loginResponse: {
        userId: '',
        roleName: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0
      },
      errorMessage: '',
    }
  },
  methods: {
    login() {
      if (this.allRequiredFieldsAreFilled()) {
        this.$http.get("/login", {
              params: {
                username: this.username,
                password: this.password
              },
            }).then(response => {
          this.loginResponse = response.data;
          sessionStorage.setItem('userId', this.loginResponse.userId)
          sessionStorage.setItem('roleName', this.loginResponse.roleName)
        }).catch(error => {
          alert("catch alert")
          // this.handleUnsuccessfulLogin(error)
        })
      }
    },

    allRequiredFieldsAreFilled: function () {
      return this.username.length > 0 && this.password.length > 0;
    },
  }
}
</script>

