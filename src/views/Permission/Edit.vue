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
                    <base-input
                      :label="this.$i18n.t('name')"
                      :placeholder="this.$i18n.t('name')"
                      input-classes="form-control-alternative"
                      v-model="permission.permission" />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      :label="this.$i18n.t('description')"
                      :placeholder="this.$i18n.t('description')"
                      input-classes="form-control-alternative"
                      v-model="permission.description" />
                  </div>
                </div>
                <h6 class="heading-small text-muted mb-4">{{this.$i18n.t('permissionGroups')}}</h6>
                <div class="row">
                  <div v-for="permissionGroup of permissionGroups" :key="permissionGroup.permissionGroupId" class="p-field-checkbox col-xl-3 col-lg-4 col-md-6">
                    <Checkbox :id="permissionGroup.permissionGroupId" name="permissionGroup" :value="permissionGroup.permissionGroupId" v-model="permission.permissionGroups" />
                    <label :for="permissionGroup.permissionGroupId">{{ permissionGroup.name }}</label>
                  </div>
                </div>
                <br>
                <h6 class="heading-small text-muted mb-4">{{this.$i18n.t('roles')}}</h6>
                <div class="row">
                  <div v-for="role of roles" :key="role.roleId" class="p-field-checkbox col-xl-3 col-lg-4 col-md-6">
                    <Checkbox :id="role.roleId" name="role" :value="role.roleId" v-model="permission.roles" />
                    <label :for="role.roleId">{{ role.role }}</label>
                  </div>
                </div>
                <div class="pt-2">
                  <base-button type="primary" :disabled="!canSave" @click.prevent="save">{{ this.$i18n.t('save') }}</base-button>
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
  import { permissiongroupService, roleService, permissionService } from '../../_services'
  import Checkbox from 'primevue/checkbox'
  import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
  import 'primevue/resources/primevue.min.css'
  import 'primeicons/primeicons.css'

  export default {
    name: 'role-edit',
    components: { Checkbox },
    data() {
      return {
        saving: false,
        groupsLoaded: false,
        rolesLoaded: false,
        permissionLoaded: false,
        permissionGroups: [],
        roles: [],
        permission: {
          permission: null,
          description: null,
          permissionGroups: null,
          roles: null,
          permissionId: null
        }
      }
    },
    computed: {
      canSave: function() {
        return this.groupsLoaded && this.permissionLoaded && this.rolesLoaded && !this.saving;
      }
    },
    mounted() {
      var permissionId = (this.$route.params.permissionId === undefined) ? 0 : this.$route.params.permissionId;

      // get all Permission Groups
      permissiongroupService.list()
        .then(response => {
          this.permissionGroups = response.data;
          this.groupsLoaded = true;
        });

      // get all Roles
      roleService.list()
        .then(response => {
          this.roles = response.data;
          this.rolesLoaded = true;
        });

      // load permission
      if (permissionId != 0) {
        permissionService.get(permissionId)
          .then(response => {
            this.permission = response.data;
            this.mapPermissionGroups();
            this.mapRoles();
            this.permissionLoaded = true;
          });
      } else {
        this.permissionLoaded = true;
      }
    },
    methods: {
      save() {
        //this.saving = true;
        permissionService.save(this.permission)
          .then(response => {
            if (!response.error) {
              this.$toast.add({severity:'success', summary: 'Successful', detail: 'The permission was saved', life: 3000});
            }
            // if new entry was generated, reload add data
            if (this.permission.permissionId == 0) {
              this.$router.push({ name: 'permissionedit', params: { permissionId: response.data.permissionId } });
            }
            this.permission = response.data;
            this.mapPermissionGroups();
            this.mapRoles();
            this.saving = false;
          });
      },
      mapPermissionGroups() {
        if (this.permission.permissionGroups) {
          this.permission.permissionGroups = this.permission.permissionGroups.map(s => {return s.permissionGroupId});
        }
      },
      mapRoles() {
        if (this.permission.roles) {
          this.permission.roles = this.permission.roles.map(s => {return s.roleId});
        }
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