<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <!--
                <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3">
                        <small>Sign up with</small>
                    </div>
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
                        <small>Or sign up with credentials</small>
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
                        <password v-model="password" :strength-meter-only="true"/>

<!--
                        <div class="text-muted font-italic">
                            <small>password strength: <span class="text-success font-weight-700">strong</span></small>
                        </div>
-->
                        <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative">
                                    <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                                </base-checkbox>
                            </div>
                        </div>
                        <div class="text-center">
                                <button class="my-4 btn btn-primary">Create Account</button>
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
            errors: {
                firstname:  {valid: undefined, error: '' },
                lastname:   {valid: undefined, error: '' },
                email:      {valid: undefined, error: '' },
                password:   {valid: undefined, error: '' }
            },
            userModel: {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            }
        }
        },
        methods: {
            resetErrors() {
                Object.keys(this.errors).forEach(function(key){
                    this.errors[key] = { valid: undefined, error: ''};
                }, this);
            },
            handleSubmit () {
                userService.register(this.userModel)
                    .then(response => {
                        this.resetErrors();
                        if (response.error) {
                            this.errors = { ...this.errors, ...response.data}
                        }
                    });
            }
        }
    }
</script>
<style>
</style>
