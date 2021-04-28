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
                <div class="row">
                  <div class="col-lg-6">
                    <stats-card>
                        <!-- Card body -->
                        <div class="row">
                            <div class="col">
                                <h5 class="card-title text-uppercase text-muted mb-0">{{ this.$i18n.t('dataheader.number-of-users') }}</h5>
                                <span class="h2 font-weight-bold mb-0">{{ role.numberOfUsers }}</span>
                            </div>
                            <!--
                            <div class="col-auto">
                                <div class="icon icon-shape bg-red text-white rounded-circle shadow">
                                    <i class="ni ni-active-40"></i>
                                </div>
                            </div>
                            -->
                        </div>
                    </stats-card>
                  </div> 
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      :label="this.$i18n.t('role')"
                      :placeholder="this.$i18n.t('role')"
                      input-classes="form-control-alternative"
                      v-model="role.role" />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      :label="this.$i18n.t('description')"
                      :placeholder="this.$i18n.t('description')"
                      input-classes="form-control-alternative"
                      v-model="role.description" />
                  </div>
                </div>
                <h6 class="heading-small text-muted mb-4">{{this.$i18n.t('permissions')}}</h6>         
                <div class="row">
                  <div v-for="permission of permissions" :key="permission.permissionId" class="p-field-checkbox col-xl-3">
                    <Checkbox :id="permission.permissionId" name="permission" :value="permission.permissionId" v-model="role.permissions" />
                    <label :for="permission.permissionId">{{ permission.permission }}</label>
                  </div>
                </div>
                <div class="pt-2">
                  <base-button type="primary" :disabled="!canSave" @click.prevent="saveRole">{{ this.$i18n.t('save') }}</base-button>
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
  import { roleService, permissionService } from '../../_services'
  import Checkbox from 'primevue/checkbox'
  import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
  import 'primevue/resources/primevue.min.css'
  import 'primeicons/primeicons.css'

  export default {
    name: 'role-edit',
    components: { Checkbox },
    data() {
      return {
        canSave: false,
        permissions: [],
        role: {
          role: null,
          roleId: null,
          description: null
          }
          ,
      }
    },
    mounted() {
      roleService.getRole(this.$route.params.roleId)
        .then(response => {
          this.role = response.data;
          // map response.data.permissions to simple ids
          this.role.permissions = this.role.permissions.map(s => {return s.permissionId});
          permissionService.list()
            .then(response => {
              this.permissions = response.data;
              this.canSave = true;
            });
        });
    },
    methods: {
      saveRole() {
        this.canSave = false;
        roleService.saveRole(this.role)
          .then(response => {
            this.canSave = true;
            if (!response.error) {
              this.$toast.add({severity:'success', summary: 'Successful', detail: 'The user role ' + this.role.role + ' was saved', life: 3000});
            }
            if (this.role.roleId == 0) {
              this.$router.push({ name: 'roleedit', params: { roleId: response.data.roleId } });
            }
            this.role = response.data;
            this.role.permissions = this.role.permissions.map(s => {return s.permissionId});
          });
      }
    }
  }
</script>
<style>
.p-field-checkbox {
  /*
  display: inline;
  margin-right: 0.5rem;
  float: left;
  */
  margin-bottom: 0.5rem;
}
.p-field-checkbox label {
  margin-left: 0.5rem;
  margin-bottom: initial;
}
</style>