<template>
    <li class="nav-item">
        <router-link
                v-if="!hasSubitems"
                :to="link.to"
                @click.native="linkClick"
                class="nav-link"
                :target="link.target"
                :href="link.path"
        >
            <template>
                <i :class="link.icon"></i>
                <span class="nav-link-text">{{ link.label }}</span>
            </template>
        </router-link>

        <!-- in case we have other sub items -->
        <a
          v-if="hasSubitems"
          class="sidebar-menu-item nav-link"
          style="cursor: pointer;"
          :class="{ active: isActive }"
          :aria-expanded="!collapsed"
          data-toggle="collapse"
          @click.prevent="collapseMenu"
        >            
            <template>
                <i :class="link.icon"></i>
                <span class="nav-link-text">{{ link.label }}</span>
            </template>
        </a>
        <ul class="nav nav-sm flex-column">
          <collapse-transition>
            <div
              v-show="!collapsed"
              class="collapse show"
            >
              <sidebar-item v-for="(link,idx) in link.items" :link="link" :key="idx"/>
            </div>
          </collapse-transition>

        </ul>
    </li>
</template>
<script>
  import { CollapseTransition } from 'vue2-transitions';

  export default {
    name: 'sidebar-item',
    components: {
      CollapseTransition
    },    
    props: {
      link: {
        type: Object,
        default: () => {
          return {
            label: '',
            to: '',
            items: []
          };
        },
        description:
          'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info'
      }
    },
    inject: {
      autoClose: {
        default: true
      }
    },
    data() {
      return {
        items: [],
        collapsed: true
      };
    },
    computed: {
      hasSubitems() {
        if(typeof(this.link.items) === 'undefined' || this.link.items === null){
          return false;
        }
        return this.link.items.length > 0;
      },
      isActive() {
        if (this.$route && this.$route.path) {
          let matchingRoute = this.items.find(c =>
            this.$route.path.startsWith(c.link.path)
          );
          if (matchingRoute !== undefined) {
            return true;
          }
        }
        return false;
      }
    },
    methods: {
      linkClick() {
        if (
          this.autoClose &&
          this.$sidebar &&
          this.$sidebar.showSidebar === true
        ) {
          this.$sidebar.displaySidebar(false);
        }
      }
      ,
      collapseMenu() {
        this.collapsed = !this.collapsed;
      },      
    }
  };
</script>
