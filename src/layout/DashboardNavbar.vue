<template>
    <base-nav class="navbar-top" id="navbar-main" :show-toggle-button="false" expand>
      <div class="mr-3 d-none d-md-flex ml-lg-auto">
      </div>
      <ul class="navbar-nav align-items-center d-none d-md-flex user-menu ml-auto">
        <li class="nav-item dropdown">
          <base-dropdown class="nav-link pr-0">
            <div class="media align-items-center" slot="title">
              <span class="avatar avatar-sm rounded-circle">
                <i class="ni ni-single-02"></i>
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm  font-weight-bold">{{ userFirstLastNames }}</span>
              </div>
            </div>
            <template>
              <router-link to="/user/profile" class="dropdown-item" active-class="" exact-active-class="">
                <i class="ni ni-single-02"></i>
                <span>My profile</span>
              </router-link>
              <div class="dropdown-divider"></div>
              <router-link to="/login" class="dropdown-item">
                <i class="ni ni-user-run"></i>
                <span>Logout</span>
              </router-link>
            </template>
          </base-dropdown>
        </li>
      </ul>
    </base-nav>
</template>
<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    emits: ['evtOverlayAddItem', 'evtOverlayRemoveItem'],
    computed: {
      userFirstLastNames() {
        return this.$store.state.user.firstName + ' ' + this.$store.state.user.lastName;
      }
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    }
  };
</script>
<style>
li.dropdown.nav-link {
  cursor: pointer;
}
.nav-link .avatar i.ni {
  top: 0px;
  margin-left: 1px;
  font-size: 1.4rem;
}
</style>