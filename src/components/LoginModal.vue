<template>
  <Modal ref="modalRef" button-name="Logi sisse">
    <template #header>
      <ErrorAlert :error-message="errorMessage"/>
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
      <button @click="login" type="button" class="btn btn-outline-dark">Logi sisse</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";

export default {
  name: 'LoginModal',
  components: {ErrorAlert, Modal},
  data() {
    return {
      username: '',
      password: '',
      loginResponse: {
        userId: 0,
        roleName: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0,
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
          this.loginResponse = response.data
          sessionStorage.setItem('userId', this.loginResponse.userId)
          sessionStorage.setItem('roleName', this.loginResponse.roleName)
        }).catch(error => {
              this.errorResponse = error.response.data
              const httpsStatusCode = error.response.status
              if (this.errorResponse.errorCode === 111 && httpsStatusCode === 403) {
                this.errorMessage = this.errorResponse.message
                setTimeout(this.errorResponse.message, 4000)
              }
            }
        )
      }
    },

    allRequiredFieldsAreFilled() {
      return this.username.length > 0 && this.password.length > 0;
    },


  },
}
</script>

