<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>{{ $t('login.signinwith') }}</small>
                        </div>
                        <form role="form" @submit.prevent="handleSubmit" action="/#/profile">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-single-02"
                                        v-model="username">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">{{ $t('login.rememberme') }}</span>
                            </base-checkbox>
                            <div class="text-center mt-4" v-if="loginError">
                                <p class="alert alert-danger">{{ loginError }}</p>
                            </div>
                            <div class="text-center">
                                <button class="my-4 btn btn-primary" :disabled="loggingIn">{{ $t('login.signin') }}</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <router-link to="/reset" class="text-light"><small>{{ $t('login.forgotpassword') }}</small></router-link>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>{{ $t('login.createnew') }}</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
          username: 'slawek',
          password: 'test',
      }
    },
    computed: {
        loggedIn() {
            return this.$store.state.authentication.status.loggedIn;
        },
        loginError () {
            return this.$store.state.authentication.status.loginError;
        },
        loggingIn () {
            return this.$store.state.authentication.status.loggingIn;
        },
    },
    watch: {
        loggedIn: function(newValue) {
            if (newValue == true) {
                this.$router.push('/dashboard');
            }
        }
    },
    created () {
        // reset login status
        this.$store.dispatch('authentication/logout');
        this.$store.dispatch('resetMenu');
    },
    methods: {
        handleSubmit() {
            const { username, password } = this;
            if (username && password) {
                this.$store.dispatch('authentication/login', { username, password });
            }
        }
    }
  }
</script>
<style>
</style>