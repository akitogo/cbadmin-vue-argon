<template>
  <div>
    <base-header class="pb-8 pt-5">
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12 order-xl-1 pr-0 pl-0">
          <card shadow type="secondary">
            <template>
              <form>
                <h6 class="heading-small text-muted mb-4">User information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-4">
                      <base-input
                        alternative=""
                        label="Username"
                        placeholder="Username"
                        input-classes="form-control-alternative"
                        v-model="userModel.username"
                        autocomplete="username"
                        :valid="errors.username.valid"
                        :error="errors.username.error" />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative=""
                        label="Email address"
                        placeholder="email@example.com"
                        input-classes="form-control-alternative"
                        v-model="userModel.email"
                        :valid="errors.email.valid"
                        :error="errors.email.error" />
                    </div>
                    <div class="col-lg-4">
                      <div class="form-group has-label">
                        <label class="form-control-label"> {{ this.$i18n.t('language') }} </label>
                        <Dropdown v-model="userModel.language" :options="languages" optionLabel="name" :placeholder="$i18n.t('user.edit.select-a-language')" class="form-control form-control-alternative" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="First name"
                        placeholder="First name"
                        input-classes="form-control-alternative"
                        v-model="userModel.firstName"
                        autocomplete="given-name"
                        :valid="errors.firstName.valid"
                        :error="errors.firstName.error" />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Last name"
                        placeholder="Last name"
                        input-classes="form-control-alternative"
                        v-model="userModel.lastName"
                        autocomplete="family-name"
                        :valid="errors.lastName.valid"
                        :error="errors.lastName.error" />
                    </div>
                  </div>
                </div>
                <h6 class="heading-small text-muted mb-4">Password change</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-4">
                      <base-input type="password"
                        alternative=""
                        label="Old password"
                        input-classes="form-control-alternative"
                        v-model="userModel.oldpass"
                        autocomplete="current-password"
                        :valid="errors.oldpass.valid"
                        :error="errors.oldpass.error" />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        type="password"
                        alternative=""
                        label="New password"
                        input-classes="form-control-alternative"
                        v-model="userModel.newpass"
                        autocomplete="new-password"
                        :valid="errors.newpass.valid"
                        :error="errors.newpass.error" />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        type="password"
                        alternative=""
                        label="Repeat new password"
                        input-classes="form-control-alternative"
                        v-model="userModel.newpass2"
                        autocomplete="new-password"
                        :valid="errors.newpass2.valid"
                        :error="errors.newpass2.error" />
                    </div>
                    <div class="col-lg-12 pt-4">
                      <base-button type="primary" @click.prevent="saveUser">Save user profile</base-button>
                    </div>
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { userService, languageService } from '../_services';
  import Dropdown from 'primevue/dropdown'

  import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
  import 'primevue/resources/primevue.min.css'
  import 'primeicons/primeicons.css'

  export default {
    name: 'user-profile',
    components: { Dropdown },
    data() {
      return {
        errors: {
          firstName: { valid: undefined, error: '' },
          lastName:  { valid: undefined, error: '' },
          username:  { valid: undefined, error: '' },
          email:     { valid: undefined, error: '' },
          oldpass:   { valid: undefined, error: '' },
          newpass:   { valid: undefined, error: '' },
          newpass2:  { valid: undefined, error: '' }
        }
        , userModel :{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          oldpass: '',
          newpass: '',
          newpass2: ''
        }
        , languages :[]
      }
    },
    emits: ['evtOverlayAddItem', 'evtOverlayRemoveItem'],
    mounted() {
      this.$emit('evtOverlayAddItem');
      languageService.list()
        .then(response => {
          this.languages = response.data;
          this.languages = this.languages.map(s => { return { code: s.languageId, name: s.name } });
      });
      userService.getUser()
        .then(response => {
          this.userModel = response.data;
          if (this.userModel.language) {
            this.userModel.language = { name: this.userModel.language.name, code: this.userModel.language.languageId };
          }
          this.$emit('evtOverlayRemoveItem');
        });
    },
    methods: {
      saveUser() {
        this.$emit('evtOverlayAddItem');
        if (this.userModel.language.code) {
          this.userModel.language.languageId = this.userModel.language.code;
        }
        userService.save(this.userModel)
          .then(response => {
            this.resetErrors();
            if (response.error) {
              this.errors = { ...this.errors, ...response.data}
            } else {
              this.$toast.add({severity:'success', summary: 'User profile', detail: 'User details have been saved succssfully.', life: 5000 });
            }
            this.$emit('evtOverlayRemoveItem');
          });
      },
      resetErrors() {
        Object.keys(this.errors).forEach(function(key){
          this.errors[key] = { valid: undefined, error: ''};
        }, this);
      },
    }
  }
</script>
<style>
.p-dropdown-label {
  font-size: 0.875rem;
  padding: 0;
}
.p-dropdown-item {
  font-size: 0.875rem;
}
</style>