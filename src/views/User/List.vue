<template>
  <div>
    <base-header class="pb-8 pt-5">
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12 order-xl-1 pr-0 pl-0">
          <card shadow type="secondary">
            <template>
              <DataTable :value="users" :lazy="true" :paginator="true" :rows="10" ref="dt"
                  :totalRecords="totalRecords" :loading="loading" @page="onPage($event)" @sort="onSort($event)"
              >
                  <template #empty>
                      {{ $i18n.t('user.list.no-users-found') }}
                  </template>
                  <template #loading>
                      {{ $i18n.t('general.loading-data-please-wait') }}
                  </template>
                  <Column field="username" :header="$i18n.t('user.list.dataheader.username')" filtesrMatchMode="contains" ref="username" :sortable="true">
                      <template #body="slotProps">
                          <span class="p-column-title">{{ slotProps.data.username }}</span>
                      </template>
                      <template #filter>
                          <InputText type="text" v-model="filters['username']"  @keydown.enter="onFilter($event)" class="p-column-filter" :placeholder="$i18n.t('user.list.placeholder.search-by-username')" />
                      </template>
                  </Column>
                  <Column field="role" :header="$i18n.t('role')"  ref="role">
                      <template #body="slotProps">
                          <span class="p-column-title">{{ slotProps.data.role.role }}</span>
                      </template>
                  </Column>
                  <Column field="firstName" :header="$i18n.t('user.list.dataheader.first-name')" filterMatchMode="contains" ref="firstName" :sortable="true">
                      <template #body="slotProps">
                          <span class="p-column-title">{{ slotProps.data.firstName }}</span>
                      </template>
                      <template #filter>
                          <InputText type="text" v-model="filters['firstName']" @keydown.enter="onFilter($event)" class="p-column-filter" :placeholder="$i18n.t('user.list.placeholder.search-by-firstname')" />
                      </template>
                  </Column>
                  <Column field="lastName" :header="$i18n.t('user.list.dataheader.last-name')" filtesrMatchMode="contains" ref="lastName" :sortable="true">
                      <template #body="slotProps">
                          <span class="p-column-title">{{ slotProps.data.lastName }}</span>
                      </template>
                      <template #filter>
                          <InputText type="text" v-model="filters['lastName']"  @keydown.enter="onFilter($event)" class="p-column-filter" :placeholder="$i18n.t('user.list.placeholder.search-by-lastname')" />
                      </template>
                  </Column>

                  <Column :exportable="false">
                      <template #body="slotProps">
                          <Button icon="pi pi-fw pi-user-edit" class="p-button p-button-success p-mr-2" @click="edit(slotProps.data)" />
                          <Button icon="pi pi-fw pi-minus-circle" class="p-button p-button-danger p-mr-2" @click="confirmDelete(slotProps.data)" />
                      </template>
                  </Column>
              </DataTable>
              <Dialog :visible.sync="deleteDialog" :style="{ width: '450px' }" :header="$i18n.t('dialog.header.confirm')" :modal="true">
                <div class="confirmation-content">
                  <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                    <span>{{ $i18n.t('user.list.confirm-delete', { name: user.username }) }}</span>
                </div>
                <template #footer>
                  <Button :label="$i18n.t('general.no')" icon="pi pi-times" class="p-button-text" @click="deleteDialog = false"/>
                  <Button :label="$i18n.t('general.yes')" icon="pi pi-check" class="p-button-text" @click="deleteUser" />
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
  import { userService } from '../../_services'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button'
  import Dialog from 'primevue/dialog'

  //import ColumnGroup from 'primevue/columngroup'     //optional for column grouping
  import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
  import 'primevue/resources/primevue.min.css'
  import 'primeicons/primeicons.css'

  export default {
    name: 'user-list',
    components: { DataTable, Column, InputText, Button, Dialog },
    data() {
        return {
            user: {},
            deleteDialog: false,
            loading: false,
            totalRecords: 0,
            users: null,
            filters: {},
            lazyParams: {},
            columns: []
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
        confirmDelete(user) {
            this.user = user;
            this.deleteDialog = true;
        },
        deleteUser() {
          userService.remove(this.user.userId)
            .then(response => {
              this.deleteDialog = false;
              this.user = {};
              if (!response.error) {
                this.$toast.add({severity:'success', summary: this.$i18n.t('toast.summary.success'), detail: this.$i18n.t('user.list.delete.success', { name: this.user.username}), life: 3000});
              } else {
                this.$toast.add({severity:'error', summary: this.$i18n.t('toast.summary.error'), detail: this.$i18n.t('user.list.delete.error', { name: this.user.username}), life: 3000});
              }
              this.onLazyEvent();
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

            userService.list(JSON.stringify(this.lazyParams))
              .then(response => {
                this.users = response.data;
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
        edit(user) {
            this.$router.push({ name: 'userprofile', params: { userId: user.userId } });
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