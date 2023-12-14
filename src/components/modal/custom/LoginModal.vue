<template>
  <Modal ref="modalRef" button-name="Logi sisse">
    <template #header>
      Logi Sisse
    </template>
    <template #body>
      <div>
        <ErrorAlert :error-message="errorMessage"/>
      </div>
      <div class="mt-4 mb-4">
        <div class="input-group mb-3">
          <span class="input-group-text">Kasutajanimi</span>
          <input v-model="username" type="text" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Parool</span>
          <input v-model="password" type="password" class="form-control">
        </div>
      </div>

    </template>
    <template #footer>
      <button @keyup.enter="login" @click="login" type="submit" class="btn btn-outline-dark">Logi sisse</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import ErrorAlert from "@/components/alert/ErrorAlert.vue";

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
        sessionStorage.setItem(('userId'), this.loginResponse.userId)
        sessionStorage.setItem('roleName', this.loginResponse.roleName)
        this.$refs.modalRef.closeModal()
        this.$emit('event-login-success')
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


