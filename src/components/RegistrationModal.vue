<template>
  <Modal ref="modalRef" button-name="Registreeri">
    <template #header>
      Registreeri
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
      <div class="input-group mb-3">
        <span class="input-group-text">email</span>
        <input v-model="email" type="text" class="form-control">
      </div>
    </template>
    <template #footer>
      <button @click="registerNewUser" type="submit" class="btn btn-outline-dark">Registreeri</button>
    </template>
  </Modal>
</template>


<script>

import Modal from "@/components/Modal.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";

export default {
  name: 'RegistrationModal',
  components: {ErrorAlert, Modal},
  data() {
    return {
      errorMessage: '',
      username: '',
      password: '',
      email: '',
      registrationResponse: {
        userId: 0,
        roleName: '',
        email: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }

    }
  },
  methods: {

    registerNewUser() {
      console.log('registerNewUser')

      if (this.allRequiredFieldsAreField()) {
        console.log(' registerNewUser - IF')

        this.sendRegistrationRequest();
        console.log(' registerNewUser - sendRegistrationRequest')


      } else{
      this.handleErrorAlert();
      console.log(' registerNewUser - else')
      }

    },
    handleErrorAlert() {
      this.errorMessage = 'Palun taita koik asjad :)'
      setTimeout(this.resetErrorAlert, 3000)
    },
    resetErrorAlert() {
      return this.errorMessage = '';
    },
    allRequiredFieldsAreField() {
      return this.password.length > 0 && this.username.length > 0 && this.email.length > 0;
    },
    sendRegistrationRequest() {
      this.$http.post("/registration", {
        params: {
          username: this.username,
          password: this.password,
          email: this.email
        }
      }).then(response => {
        this.registrationResponse = response.data
        sessionStorage.setItem('userId', this.registrationResponse.userId)
        sessionStorage.setItem('email', this.registrationResponse.email)

        this.$refs.modalRef.closeModal()

      }).catch(error => {
        this.errorResponse = error.response.data
        const httpRegStatusCode = error.response.status
        if (httpRegStatusCode === 403 && this.errorResponse.errorCode === 1) {
          this.errorMessage = this.errorResponse.message
          setTimeout(this.resetErrorAlert, 3000)
        }
      })
    }

  }
}

</script>


