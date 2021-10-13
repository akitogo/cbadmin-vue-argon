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
                <h6 class="heading-small text-muted mb-4">{{ this.$i18n.t('userInformation') }}</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-1">
                      <div class="form-group has-label">
                        <label class="form-control-label"> {{ this.$i18n.t('isActive') }} </label>
                        <div>   
                          <InputSwitch v-model="userModel.isActive" />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-5">
                      <base-input alternative="" :label="$i18n.t('user.list.dataheader.username')" :placeholder="$i18n.t('user.list.dataheader.username')" input-classes="form-control-alternative" v-model="userModel.username" autocomplete="username" :valid="errors.username.valid" :error="errors.username.error" />
                    </div>
                    <div class="col-lg-3">
                      <div class="form-group has-label">
                        <label class="form-control-label"> {{ this.$i18n.t('role') }} </label>
                        <Dropdown v-model="userModel.role" :options="roles" optionLabel="role" :placeholder="$i18n.t('user.edit.select-a-role')" class="form-control form-control-alternative" />
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="form-group has-label">
                        <label class="form-control-label"> {{ this.$i18n.t('language') }} </label>
                        <Dropdown v-model="userModel.language" :options="languages" optionLabel="name" :placeholder="$i18n.t('user.edit.select-a-language')" class="form-control form-control-alternative" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input alternative="" :label="$i18n.t('user.edit.email-address')" placeholder="email@example.com" input-classes="form-control-alternative" v-model="userModel.email" :valid="errors.email.valid" :error="errors.email.error" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input alternative="" :label="$i18n.t('user.edit.first-name')" :placeholder="$i18n.t('user.edit.first-name')" input-classes="form-control-alternative" v-model="userModel.firstName" autocomplete="given-name" :valid="errors.firstName.valid" :error="errors.firstName.error" />
                    </div>
                    <div class="col-lg-6">
                      <base-input alternative="" :label="$i18n.t('user.edit.last-name')" :placeholder="$i18n.t('user.edit.last-name')" input-classes="form-control-alternative" v-model="userModel.lastName" autocomplete="family-name" :valid="errors.lastName.valid" :error="errors.lastName.error" />
                    </div>
                  </div>
                </div>
                <div v-if="showChangePassword">
                  <h6 class="heading-small text-muted mb-4">{{ this.$i18n.t('changePassword') }}</h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-4">
                        <base-input type="password" alternative="" :label="$i18n.t('user.edit.old-password')" input-classes="form-control-alternative" v-model="userModel.oldpass" autocomplete="current-password" :valid="errors.oldpass.valid" :error="errors.oldpass.error" />
                      </div>
                      <div class="col-lg-4">
                        <base-input type="password" alternative="" :label="$i18n.t('user.edit.old-password')" input-classes="form-control-alternative" v-model="userModel.newpass" autocomplete="new-password" :valid="errors.newpass.valid" :error="errors.newpass.error" />
                      </div>
                      <div class="col-lg-4">
                        <base-input type="password" alternative="" :label="$i18n.t('user.edit.repeat-password')" input-classes="form-control-alternative" v-model="userModel.newpass2" autocomplete="new-password" :valid="errors.newpass2.valid" :error="errors.newpass2.error" />
                      </div>
                    </div>
                  </div>
                </div>
                <h6 class="heading-small text-muted mb-4">{{ this.$i18n.t('permissionGroups') }}</h6>
                  <div class="row">
                <div class="col-6">
                    <MultiSelect v-model="userModel.permissionGroups" :options="permissionGroups" optionLabel="name" :placeholder="$i18n.t('user.edit.select-permission-groups')" display="chip"/>
                  </div>
                </div>
                <div>
                  <div class="row">
                    <div class="col-lg-12 pt-4">
                      <base-button type="primary" @click.prevent="saveUser">{{ this.$i18n.t('save') }}</base-button>
                      <base-button outline type="primary" @click.prevent="resetPassword">{{ this.$i18n.t('resetPassword') }}</base-button>
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
  import { userService, roleService, languageService, permissiongroupService } from '../../_services';
  import Dropdown from 'primevue/dropdown'
  import InputSwitch from 'primevue/inputswitch'
  import MultiSelect from 'primevue/multiselect'

  import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
  import 'primevue/resources/primevue.min.css'
  import 'primeicons/primeicons.css'

  export default {
    name: 'user-edit',
    components: { Dropdown, InputSwitch, MultiSelect },
    data() {
      return {
        messages: [],
        showChangePassword: false,
        errors: {
          firstName: { valid: undefined, error: '' },
          lastName:  { valid: undefined, error: '' },
          username:  { valid: undefined, error: '' },
          email:     { valid: undefined, error: '' },
          oldpass:   { valid: undefined, error: '' },
          newpass:   { valid: undefined, error: '' },
          newpass2:  { valid: undefined, error: '' }
        },
        userModel :{
          userId: 0,
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          permissionGroups: [
          ],
          oldpass: '',
          newpass: '',
          newpass2: ''
        },
        roles :[
        ],
        languages :[
        ],
        permissionGroups :[
        ]
      }
    },
    emits: ['evtOverlayAddItem', 'evtOverlayRemoveItem'],
    mounted() {
      this.$emit('evtOverlayAddItem');
      // permission group data structure has to match userModel.permissionGroups
      permissiongroupService.list()
        .then(response => {
          this.permissionGroups = response.data;
      }); 

      roleService.list()
        .then(response => {
          this.roles = response.data;
          this.roles = this.roles.map(s => { return { code: s.roleId, role: s.role } });
      });
      languageService.list()
        .then(response => {
          this.languages = response.data;
          this.languages = this.languages.map(s => { return { code: s.languageId, name: s.name } });
      });
      userService.getUser(this.$route.params.userId)
        .then(response => {
          this.userModel = response.data;
          if (this.userModel.role) {
            this.userModel.role = { role: this.userModel.role.role, code: this.userModel.role.roleId };
          }
          if (this.userModel.language) {
            this.userModel.language = { name: this.userModel.language.name, code: this.userModel.language.languageId };
          }
          //console.log(this.userModel.language);
          if (this.userModel.userId == this.$store.state.user.userId) {
            this.showChangePassword = true;
          }
          this.$emit('evtOverlayRemoveItem');
        });
    },
    methods: {
      saveUser() {
        this.$emit('evtOverlayAddItem');
        if (this.userModel.role.code) {
          this.userModel.role.roleId = this.userModel.role.code;
        }
        if (this.userModel.language.code) {
          this.userModel.language.languageId = this.userModel.language.code;
        }
        var userModelToSave = { ...this.userModel };
        userModelToSave.permissionGroups = userModelToSave.permissionGroups.map(pg => { return pg.permissionGroupId });
        userService.save(userModelToSave)
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
      resetPassword() {
        userService.reset(this.userModel.firstName, this.userModel.lastName, this.userModel.email)
          .then(response => {
            this.$toast.add({severity:'success', summary: 'Password reset', detail: 'User password reset has been initiated.', life: 5000 });
          })
          .catch(error => {
            this.$toast.add({severity:'error', summary: 'Password reset', detail: 'Could not initiate password reset.', life: 5000 });
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