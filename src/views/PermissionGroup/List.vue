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
              <DataTable :value="permissiongroups" :lazy="true" :paginator="true" :rows="10" ref="dt"
                  :totalRecords="totalRecords" :loading="loading" @page="onPage($event)" @sort="onSort($event)"
              >
                  <template #empty>
                      {{ $i18n.t('permissiongroup.list.no-groups-found') }}
                  </template>
                  <template #loading>
                      {{ $i18n.t('general.loading-data-please-wait') }}
                  </template>
                  <Column field="name" :header="$i18n.t('name')" filtesrMatchMode="contains" ref="name">
                      <template #body="slotProps">
                          <span class="p-column-title">{{ slotProps.data.name }}</span>
                      </template>
                      <template #filter>
                          <InputText type="text" v-model="filters['name']"  @keydown.enter="onFilter($event)" class="p-column-filter" :placeholder="$i18n.t('permissiongroup.list.placeholder.search-by-name')" />
                      </template>
                  </Column>
                  <Column field="description" :header="$i18n.t('description')" >
                      <template #body="slotProps">
                          <span class="p-column-title">{{ slotProps.data.description }}</span>
                      </template>
                  </Column>
                  <Column field="numberOfPermissions" :header="$i18n.t('dataheader.number-of-permissions')" ref="numberOfPermissions">
                      <template #body="slotProps">
                          <span class="p-column-title">{{ slotProps.data.numberOfPermissions }}</span>
                      </template>
                  </Column>
                  <Column field="numberOfUsers" :header="$i18n.t('dataheader.number-of-users')" ref="numberOfUsers">
                      <template #body="slotProps">
                          <span class="p-column-title">{{ slotProps.data.numberOfUsers }}</span>
                      </template>
                  </Column>
                  <Column :exportable="false">
                      <template #body="slotProps">
                          <Button icon="pi pi-fw pi-pencil" class="p-button p-button-success p-mr-2" @click="edit(slotProps.data)" />
                          <Button icon="pi pi-fw pi-minus-circle" class="p-button p-button-danger p-mr-2" @click="confirmDeletePermissionGroup(slotProps.data)" />
                      </template>
                  </Column>
              </DataTable>
              <Dialog :visible.sync="deletePermissionGroupDialog" :style="{width: '450px'}" :header="$i18n.t('dialog.header.confirm')" :modal="true">
                <div class="confirmation-content">
                  <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                    <span v-if="permissionGroup">{{ $i18n.t('permissiongroup.list.confirm.delete', { name: permissionGroup.name }) }}</span>
                </div>
                <template #footer>
                  <Button :label="$i18n.t('general.no')" icon="pi pi-times" class="p-button-text" @click="deletePermissionGroupDialog = false"/>
                  <Button :label="$i18n.t('general.yes')" icon="pi pi-check" class="p-button-text" @click="deletePermissionGroup" />
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
  import { permissiongroupService } from '../../_services'
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
    name: 'permissiongroup-list',
    components: { DataTable, Column, InputText, Button, Toolbar, Dialog },
    data() {
        return {
            loading: false,
            totalRecords: 0,
            permissionGroup: {},
            permissiongroups: null,
            deletePermissionGroupDialog: false,
            filters: {},
            lazyParams: {},
            columns: [
              { field: 'name', header: "" },
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
        confirmDeletePermissionGroup(permissionGroup) {
            this.permissionGroup = permissionGroup;
            this.deletePermissionGroupDialog = true;
        },
        deletePermissionGroup() {
            var removedPermissionGroupName = this.permissionGroup.name;
            permissiongroupService.remove(this.permissionGroup.permissionGroupId)
                .then(response => {
                    if (!response.error) {
                        this.deletePermissionGroupDialog = false;
                        this.permissionGroup = {};
                        this.$toast.add({severity:'success', summary: 'Successful', detail: 'The ' + removedPermissionGroupName + ' permission group was removed.', life: 3000});
                        this.onLazyEvent();
                    }
                });
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

            permissiongroupService.list(JSON.stringify(this.lazyParams))
              .then(response => {
                this.permissiongroups = response.data;
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
        edit(pg) {
            this.$router.push({ name: 'permissiongroupedit', params: { permissionGroupId: pg.permissionGroupId } });
        },
        openNew() {
            this.$router.push({ name: 'permissiongroupedit', params: { permissionGroupId: 0 } });
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