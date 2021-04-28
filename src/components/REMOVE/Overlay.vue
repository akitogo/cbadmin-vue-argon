<template>
  <transition name="fade">
    <div id="overlay" v-show="showing"><span>Loading...</span></div>
  </transition>
</template>
<script>
export default {
  name: "overlay",
  data() {
    return {
      showing: false,
      itemsPending: 0
    };
  },
  props: {
    type: {
      type: String,
      description: "Overlay"
    }
  },
  methods: {
    addItem() {
      this.itemsPending +=1 ;
      this.showing = true;
    },
    removeItem() {
      this.itemsPending -= 1;
      if (this.itemsPending == 0) {
        this.showing = false;
      }
    }
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
#overlay {
  position: fixed; /* Sit on top of the page content */
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 99; /* Specify a stack order in case you're using a different order for other elements */
  /*cursor: pointer;*/
}
#overlay span {
  font-size: 2rem;
  padding: 10px 30px;
  background: #eee;
  color: black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>