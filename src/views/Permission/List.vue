<template>
  <div>
    <base-header class="pb-8 pt-5">
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12 order-xl-1 pr-0 pl-0">
          <card shadow type="secondary">
            <template>
              <Toolbar class="p-mb-4">
                <template #left>
                  <Button :label="$i18n.t('general.new')" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
                </template>
              </Toolbar>
              <DataTable :value="permissions" :lazy="true" :paginator="true" :rows="10" ref="dt"
                :totalRecords="totalRecords" :loading="loading" @page="onPage($event)" @sort="onSort($event)"
              >
                <template #empty>
                  {{ $i18n.t('permission.list.no-rules-found') }}
                </template>
                <template #loading>
                  {{ $i18n.t('general.loading-data-please-wait') }}
                </template>
                <Column field="permission" :header="$i18n.t('general.permission')" filtesrMatchMode="contains" ref="permission">
                  <template #body="slotProps">
                    <span class="p-column-title">{{ slotProps.data.permission }}</span>
                  </template>
                  <template #filter>
                    <InputText type="text" v-model="filters['permission']"  @keydown.enter="onFilter($event)" class="p-column-filter" :placeholder="$i18n.t('permission.list.placeholder.search-by-permission')" />
                  </template>
                </Column>
                <Column field="description" :header="$i18n.t('general.description')" >
                  <template #body="slotProps">
                    <span class="p-column-title">{{ slotProps.data.description }}</span>
                  </template>
                </Column>
                <Column field="numberOfGroups" :header="$i18n.t('permission.list.dataheader.number-of-groups')" ref="numberOfGroups">
                  <template #body="slotProps">
                    <span class="p-column-title">{{ slotProps.data.numberOfGroups }}</span>
                  </template>
                </Column>
                <Column field="numberOfRoles" :header="$i18n.t('permission.list.dataheader.number-of-roles')" ref="numberOfRoles">
                  <template #body="slotProps">
                    <span class="p-column-title">{{ slotProps.data.numberOfRoles }}</span>
                  </template>
                </Column>
                <Column :exportable="false">
                  <template #body="slotProps">
                    <Button icon="pi pi-fw pi-pencil" class="p-button p-button-success p-mr-2" @click="edit(slotProps.data)" />
                    <Button icon="pi pi-fw pi-minus-circle" class="p-button p-button-danger p-mr-2" @click="confirmDelete(slotProps.data)" />
                  </template>
                </Column>
              </DataTable>
              <Dialog :visible.sync="deletePermissionDialog" :style="{width: '450px'}" :header="$i18n.t('dialog.header.confirm')" :modal="true">
                <div class="confirmation-content">
                  <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                    <span v-if="permission">{{ $i18n.t('permission.list.confirm.delete', { name: permission.permission }) }}</span>
                </div>
                <template #footer>
                  <Button :label="$i18n.t('general.no')" icon="pi pi-times" class="p-button-text" @click="deletePermissionDialog = false"/>
                  <Button :label="$i18n.t('general.yes')" icon="pi pi-check" class="p-button-text" @click="deletePermission" />
                </template>
              </Dialog>
              <Dialog :visible.sync="unassignRolesDialog" :style="{width: '450px'}" :header="$i18n.t('dialog.header.confirm')" :modal="true">
                <div class="confirmation-content">
                  <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                    <span v-if="permission">{{ $i18n.t('permission.list.confirm.unassign', { name: permission.permission }) }}</span>
                </div>
                <template #footer>
                  <Button :label="$i18n.t('permission.list.dialog.unassign.button.no')" icon="pi pi-times" class="p-button-text" @click="unassignRolesDialog = false"/>
                  <Button :label="$i18n.t('permission.list.dialog.unassign.button.edit')" icon="pi pi-pencil" class="p-button-text" @click="edit(permission)" />
                  <Button :label="$i18n.t('permission.list.dialog.unassign.button.yes')" icon="pi pi-check" class="p-button-text" @click="deletePermission" />
                </template>
              </Dialog>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { permissionService } from '../../_services'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button'
  import Toolbar from 'primevue/toolbar'
  import Dialog from 'primevue/dialog'

  //import ColumnGroup from 'primevue/columngroup'     //optional for column grouping
  import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
  import 'primevue/resources/primevue.min.css'
  import 'primeicons/primeicons.css'

  export default {
    name: 'permission-list',
    components: { DataTable, Column, InputText, Button, Toolbar, Dialog },
    data() {
      return {
        permission: {},
        submitted: false,
        permissionDialog: false,
        deletePermissionDialog: false,
        unassignRolesDialog: false,
        loading: false,
        totalRecords: 0,
        permissions: null,
        filters: {},
        lazyParams: {},
        columns: [
          { field: 'permission', header: "" },
        ]
      }
    },
    datasource: null,
    mounted() {
      this.lazyParams = {
        first: 0,
        rows: this.$refs.dt.rows,
        sortField: null,
        sortOrder: null,
        filters: this.filters
    };
      this.onLazyEvent();
    },
    methods: {
      confirmDelete(permission) {
        this.permission = permission;
        if (permission.numberOfRoles > 0 || permission.numberOfGroups > 0) {
          this.unassignRolesDialog = true;
        } else {
          this.deletePermissionDialog = true;
        }
      },
      deletePermission() {
        var permissionName = this.permission.permission;
        permissionService.removePermission(this.permission.permissionId)
          .then(response => {
            this.deletePermissionDialog = false;
            this.unassignRolesDialog = false;
            this.permission = {};
            if (!response.error) {
              this.$toast.add({severity:'success', summary: this.$i18n.t('toast.summary.success'), detail: this.$i18n.t('permission.list.delete.success', { name: permissionName}), life: 3000});
            } else {
              this.$toast.add({severity:'error', summary: this.$i18n.t('toast.summary.error'), detail: this.$i18n.t('permission.list.delete.error', { name: permissionName}), life: 3000});
            }
            this.onLazyEvent();
          });
      },
      hideDialog() {
        this.permissionDialog = false;
        this.submitted = false;
      },
      edit(permission) {
        this.$router.push({ name: 'permissionedit', params: { permissionId: permission.permissionId } });
      },
      openNew() {
        this.$router.push({ name: 'permissionedit', params: { permissionId: 0 } });
      },
      onLazyEvent() {
        let filters = {};
        for (let i=0; i < this.columns.length; i++) {
          let obj = {};
          obj["matchMode"] = this.$refs[this.columns[i].field].filterMatchMode || "startsWith";
          obj["value"] = this.filters[this.columns[i].field] || null;
          filters[this.columns[i].field] = obj;
        }

        this.lazyParams.filters = filters;
        this.loading = true;

        permissionService.list(JSON.stringify(this.lazyParams))
          .then(response => {
            this.permissions = response.data;
            this.totalRecords = response.pagination.totalRecords;
            this.loading = false;
        });
      },
      onPage(event) {
        this.lazyParams = event;
        this.onLazyEvent();
      },
      onSort(event) {
        this.lazyParams = event;
        this.onLazyEvent();
      },
      onFilter() {
        this.lazyParams.first = 0;
        this.onLazyEvent();
      },
    }
  }
</script>
<style>
button {
  margin-right: 10px !important;
}
.p-dialog i.pi {
  margin-right: 10px;
}
</style>