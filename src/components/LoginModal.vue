<template>
  <Modal ref="modalRef" button-name="Logi sisse">
    <template #header>
      Logi Sisse
      <div class="col col">
        <ErrorAlert :error-message="errorMessage"/>
      </div>
    </template>
    <template #body>
      <div class="input-group mb-3">
        <span class="input-group-text">Kasutajanimi</span>
        <input v-model="username" type="text" class="form-control">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">Parool</span>
        <input v-model="password" type="text" class="form-control">
      </div>
    </template>
    <template #footer>
      <button @keyup.enter="login" @click="login" type="submit" class="btn btn-outline-dark">Logi sisse</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";

export default {
  name: 'LogInModal',
  components: {ErrorAlert, Modal},
  data() {
    return {
      errorMessage: '',
      username: '',
      password: '',
      loginResponse: {
        userId: 0,
        roleName: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {

    login() {
      if (this.allRequiredFieldsAreField()) {
        this.sendLoginRequest();
      } else this.handleErrorAlert();
    },

    handleErrorAlert() {
      this.errorMessage = 'Palun täida kõik väljad :)'
      setTimeout(this.resetErrorAlert, 2000)
    },

    resetErrorAlert() {
      return this.errorMessage = '';
    },

    allRequiredFieldsAreField() {
      return this.password.length > 0 && this.username.length > 0;
    },

    sendLoginRequest() {
      this.$http.get("/login", {
        params: {
          username: this.username,
          password: this.password
        }
      }).then(response => {
        this.loginResponse = response.data
        sessionStorage.setItem('userId', this.loginResponse.userId)
        sessionStorage.setItem('password', this.loginResponse.password)
        this.$refs.modalRef.closeModal()
      }).catch(error => {
        this.errorResponse = error.response.data
        const httpStatusCode = error.response.status
        if (httpStatusCode === 403 && this.errorResponse.errorCode === 111) {
          this.errorMessage = this.errorResponse.message
          setTimeout(this.resetErrorAlert, 2000)

        }
      })
    }
  }
}

</script>


