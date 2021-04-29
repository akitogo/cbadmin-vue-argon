<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground" short-title="Argon" title="Argon">
      <template slot="links">
        <sidebar-item v-for="(link,idx) in $data.items" :link="link" :key="idx"/>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <Toast position="top-right" />
      <overlay ref="overlay"></overlay>
      <dashboard-navbar @evtOverlayAddItem="overlayAddItem" @evtOverlayRemoveItem="overlayRemoveItem"></dashboard-navbar>
      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view @evtOverlayAddItem="overlayAddItem" @evtOverlayRemoveItem="overlayRemoveItem"></router-view>
        </fade-transition>
        <!--<content-footer v-if="!$route.meta.hideFooter"></content-footer>-->
      </div>
    </div>
  </div>
</template>
<script>
  import { menuService } from '../_services'
  import { FadeTransition } from 'vue2-transitions'
  import DashboardNavbar from './DashboardNavbar.vue'
  import Toast from 'primevue/toast'
  import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
  import 'primevue/resources/primevue.min.css'
  import 'primeicons/primeicons.css'

  export default {
    components: {
      DashboardNavbar,
      FadeTransition,
      Toast,
    },
    data() {
      return {
        items: [ ] // will be filled by remote call
        ,sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    computed: {
      loggedIn() {
            return this.$store.state.authentication.status.loggedIn;
      },
    },
    watch: {
      loggedIn: function(newValue, oldValue) {
          if (!newValue) {
              this.$router.push('/login');
          }
      }
    },
    mounted() {
      if (!this.loggedIn) {
        this.$router.push('/login');
      }

      // Try to load the menu from the store, load and save otherwise.
      if (this.$store.state.menu.length) {
        this.items = this.expandMenu(this.$store.state.menu);
      } else {
        menuService.getMenu()
         .then(response => {
           if (response.data) {
             this.$store.dispatch('setMenu', response.data.menu.items);
             this.items = this.expandMenu(this.$store.state.menu);
           }
        });
      }
    },
    methods: {
      expandMenu(menuItems) {
        // If the current route path is in any child element, expand all parents.
        this.haveChildrenRoute(menuItems, this.$router.currentRoute.path);
        return menuItems;
      },
      haveChildrenRoute(items, route) {
        var foundChildren = false;
        items.forEach(element => {
          if (element.to && element.to == route) {
            foundChildren = true;
          }
          if (element.items && element.items.length) {
            if (this.haveChildrenRoute(element.items, route)) {
              element.expanded = true;
            }
          }
        });
        return foundChildren;
      },
      overlayAddItem() {
        this.$refs.overlay.addItem();
      },
      overlayRemoveItem() {
        this.$refs.overlay.removeItem();
      },
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>