<template>
  <div class="sidebar">
    <div
      v-if="isPanelOpen"
      class="sidebar-backdrop"
      @click="closeSidebarPanel"
    ></div>
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel shadow-2xl bg-cover bg-center" :style="{'background-image': 'url(' + require('../assets/images/nav-background-ipad.png') + ')'}">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { store, mutations } from '~/store'
export default {
  computed: {
    isPanelOpen() {
      return store.isNavOpen
    },
  },
  methods: {
    closeSidebarPanel: mutations.toggleNav,
  },
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  transition: all 150ms ease-in 0s;
}
.sidebar-backdrop {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}
.sidebar-panel {
  overflow-y: auto;
  background-color: white;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 1.5rem 35px 2rem 35px;
  width: 100%;
}
</style>
