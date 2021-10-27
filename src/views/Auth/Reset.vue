<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div v-if="token" class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Please enter a new password.</small>
          </div>
          <form role="form" @submit.prevent="handleSaveNewPassword">
            <div class="text-center" v-if="newPasswordSuccess">
              <p class="alert alert-success">{{ newPasswordSuccess }}</p>
            </div>
            <base-input class="input-group-alternative mb-3"
              type="password"
              placeholder="New password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="newPassword">
            </base-input>
            <base-input class="input-group-alternative mb-3"
              type="password"
              placeholder="Repeat new password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="repeatNewPassword">
            </base-input>
            <div class="text-center" v-if="newPasswordError">
              <p class="alert alert-danger mt-4 mb-0">{{ newPasswordError }}</p>
            </div>
            <div class="text-center">
              <button class="my-4 btn btn-primary" :disabled="!enableSaveNewPassword">Save new password</button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="!token" class="card bg-secondary shadow border-0">
        <!--
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
          <div class="btn-wrapper text-center">
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
              <span class="btn-inner--text">Github</span>
            </a>
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div>
        -->
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Please provide the following information to receive a password reset email.</small>
          </div>
          <form role="form" @submit.prevent="handleSubmit">
            <div class="text-center" v-if="resetSuccess">
              <p class="alert alert-success">{{ resetSuccess }}</p>
            </div>
            <base-input class="input-group-alternative mb-3"
              placeholder="Firstname"
              addon-left-icon="ni ni-single-02"
              v-model="firstname">
            </base-input>
            <base-input class="input-group-alternative mb-3"
              placeholder="Lastname"
              addon-left-icon="ni ni-single-02"
              v-model="lastname">
            </base-input>
            <base-input class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="email">
            </base-input>
            <div class="text-center" v-if="resetError">
              <p class="alert alert-danger mt-4 mb-0">{{ resetError }}</p>
            </div>
            <div class="text-center">
              <button class="my-4 btn btn-primary" :disabled="resetSent">Receive Password Reset</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/login" class="text-light"><small>Login</small></router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { userService } from '../../_services';

  export default {
    name: 'reset',
    data() {
      return {
        token: this.$route.query.token
        , firstname: ""
        , lastname: ""
        , email: ""
        , newPassword: ""
        , repeatNewPassword: ""
        , newPasswordSuccess: ''
        , newPasswordError: ''
        , enableSaveNewPassword: true
      }
    },
    computed: {
      resetSuccess () {
        return this.$store.state.authentication.status.resetSuccess;
      },
      resetError () {
        return this.$store.state.authentication.status.resetError;
      },
      resetSent () {
        return this.$store.state.authentication.status.resetSent;
      }
    },
    mounted() {
      if (this.token != undefined) {
        // check if token is valid; show error message on error; otherwise do nothing, let the user enter a new password;
        userService.checkPasswordResetToken(this.token)
          .then(response => {
            if (response.error) {
              this.newPasswordError = response.messages.join('. ');
              this.enableSaveNewPassword = false;
            }
          });
      }
    },
    methods: {
      handleSubmit () {
        const { firstname, lastname, email } = this;
        const { dispatch } = this.$store;
        dispatch('authentication/reset', { firstname,lastname,email });
      },
      handleSaveNewPassword() {
        // try to save new password; show error on error; show success mesage on success;
        this.newPasswordError = "";
        if (this.newPassword.localeCompare(this.repeatNewPassword)) {
          this.newPasswordError = "Passwords are not identical!";
          return;
        }

        userService.setNewPassword(this.token, this.newPassword, this.repeatNewPassword)
          .then(response => {
            if (response.error) {
              this.newPasswordError = response.messages.join('. ');
            } else {
              this.newPasswordSuccess = response.messages.join('. ');
            }
          });
      }
    }
  }
</script>
<style>
</style>