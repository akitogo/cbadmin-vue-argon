<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div v-if="token" class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center" v-if="activationSuccess">
            <p class="alert alert-success">{{ activationSuccess }}</p>
          </div>
          <div class="text-center text-muted mb-4">
            <small>Checking account activation token...</small>
          </div>
          <div class="text-center" v-if="activationError">
            <p class="alert alert-danger mt-4 mb-0">{{ activationError }}</p>
          </div>
        </div>
      </div>
      <div v-if="!token" class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center" v-if="registrationSuccess">
            <p class="alert alert-success">{{ registrationSuccess }}</p>
          </div>
          <form role="form" @submit.prevent="handleSubmit">
            <base-input class="input-group-alternative mb-3"
                  placeholder="Firstname"
                  v-bind:valid=errors.firstname.valid
                  :error="errors.firstname.error"
                  addon-left-icon="ni ni-hat-3"
                  v-model="userModel.firstname">
            </base-input>
            <base-input class="input-group-alternative mb-3"
                  placeholder="Lastname"
                  :valid="errors.lastname.valid"
                  :error="errors.lastname.error"
                  addon-left-icon="ni ni-hat-3"
                  v-model="userModel.lastname">
            </base-input>
            <base-input class="input-group-alternative mb-3"
                  placeholder="Email"
                  :valid="errors.email.valid"
                  :error="errors.email.error"
                  addon-left-icon="ni ni-email-83"
                  v-model="userModel.email">
            </base-input>
            <base-input class="input-group-alternative"
                  placeholder="Password"
                  :valid="errors.password.valid"
                  :error="errors.password.error"
                  type="password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="userModel.password">
            </base-input>
            <password v-model="userModel.password" :strength-meter-only="true"/>
            <div class="row my-4">
              <div class="col-12">
                <base-checkbox class="custom-control-alternative">
                  <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                </base-checkbox>
              </div>
            </div>
            <div class="text-center">
                <button class="my-4 btn btn-primary" :disabled="registrationRunning">Create Account</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/reset" class="text-light">
            <small>Forgot Password</small>
          </router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/login" class="text-light">
            <small>Login into your account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { userService } from '../../_services';
  import Password from 'vue-password-strength-meter'

  export default {
    name: 'register',
    components: { Password },
    data() {
      return {
        token: this.$route.query.token,
        registrationRunning: false,
        activationSuccess: "",
        activationError: "",
        registrationSuccess: "",
        userModel: {
          firstname: 'test1',
          lastname: 'test2',
          email: 'sm+' + Date.now() + '@akitogo.com',
          password: 'test'
        },
        errors: {
          firstname:  {valid: undefined, error: '' },
          lastname:   {valid: undefined, error: '' },
          email:      {valid: undefined, error: '' },
          password:   {valid: undefined, error: '' }
        }
      }
    },
    mounted() {
      // If there is a token, try to activate the new account.
      if (this.token != undefined) {
        userService.checkAccountActivationToken(this.token)
          .then(response => {
            if (response.error) {
              this.activationError = response.messages.join('. ');
            } else {
              userService.activateAccount(this.token)
                .then(response => {
                  if (response.error) {
                    this.activationError = response.messages.join('. ');
                  } else {
                    this.activationSuccess = response.messages.join('. ');
                  }
                })
            }
          });
      }
    },
    methods: {
      resetErrors() {
        Object.keys(this.errors).forEach(function(key){
          this.errors[key] = { valid: undefined, error: '' };
        }, this);
      },
      handleSubmit () {
        this.registrationSuccess = "";
        this.registrationRunning = true;
        userService.register(this.userModel)
          .then(response => {
            this.resetErrors();
            if (response.error) {
              this.errors = { ...this.errors, ...response.data }
              this.registrationRunning = false;
            } else {
              this.registrationSuccess = response.data;
            }
          });
      }
    }
  }
</script>
<style>
</style>