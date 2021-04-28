<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
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
                        <form role="form" @submit.prevent="handleSubmit" action="/#/profile">
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
                                <p class="error mt-4 mb-0">{{ resetError }} {{  this.$i18n.t('sidebarNav.client') }}</p>
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
  export default {
    name: 'reset',
    data() {
      return {
          firstname: "",
          lastname: "",
          email: "",
          submitted: false
      }
    },
    computed: {
        resetError () {
            return this.$store.state.authentication.status.resetError;
        },
        resetSent () {
            return this.$store.state.authentication.status.resetSent;
        }
    },
    methods: {
        handleSubmit () {
            this.submitted = true;
            const { firstname,lastname, email } = this;
            const { dispatch } = this.$store;

            if (firstname && lastname && email) {
                dispatch('authentication/reset', { firstname,lastname,email });
            }
        }
    }
  }
</script>
<style>
</style>