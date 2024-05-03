<template>
  <nav class="bg-white | py-5 lg:px-32 px-5 z-50 w-full fixed">
    <div class="flex justify-between items-center">
      <div class="w-1/3">
        <nuxt-link to="/">
          <img :src="navBarData.navbar_logo.url" width="180" alt="Create Arts Festival Logo" />
        </nuxt-link>
      </div>
      <div class="w-1/3 hidden lg:inline-block">
        <ul class="flex justify-between gap-4">
          <li v-for="(item, i) in menuData" :key="item.id" class="relative group flex-shrink-0" @mouseenter="openLink(i)" @mouseleave="closeLink(i)">
            <component
              v-bind="linkProps(item.url)"
              :is="'nuxt-link'"
              v-if="item.url !== ''"
              class="text-15 text-purple | relative z-20"
            >
              <p class="relative z-50">
                {{ item.post_title }}
              </p>
            </component>
            <div class="absolute z-10 bottom-0 | h-2 w-full | group-hover:bg-skyblue transition-all duration-100 ease-in"></div>
            <div v-if="expand === i && item.child_items" class="absolute left-1/2 pt-4 | | transform -translate-x-1/2">
              <ul class="bg-purple px-10 py-4 | w-40">
                <li v-for="(childLink, childItemIndex) in item.child_items" :key="childItemIndex" class="my-2">
                  <component
                    v-bind="linkProps(childLink.url)"
                    :is="'nuxt-link'"
                    v-if="childLink.url !== ''"
                    class="text-15 text-white hover:text-pictonblue | transition-all duration-100 ease-in | relative z-20"
                  >
                    {{ childLink.post_title }}
                  </component>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="w-1/3 text-right hidden lg:inline-block">
        <div>
          <Button-layout :btn="btn2" @btnClick="btnClick" />
        </div>
      </div>
      <div class="lg:hidden inline-block pr-3 cursor-pointer" @click.prevent="toggle">
        <img src="../assets/icons/burger.svg" alt="Menu Button" />
      </div>
    </div>
    <Sidebar>
      <MobileMenuItems :nav-bar-data="navBarData" :menu-data="menuData" :social-media-data="socialMediaData" />
    </Sidebar>
  </nav>
</template>

<script>
import { store, mutations } from '~/store/index.js'
export default {
  props: {
    navBarData: {
      type: Object,
      default: null,
    },
    menuData: {
      type: Array,
      default: null,
    },
    socialMediaData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      menuCTA: {
        first: {
          text: '',
          url: '',
        },
        second: {
          text: '',
          url: '',
        },
      },
      expand: '',
      sidebar: false,
      btn2: {
        name: this.navBarData.navbar_button_text,
        buttonStyle: 'bg-pictonblue border-4 border-white text-white text-18 1md:text-base',
        gradient: 'linear-gradient(to right, #fea751, #3bb7cb)',
      },
    }
  },
  computed: {
    isBurgerActive() {
      return store.isNavOpen
    },
  },
  methods: {
    btnClick() {
      window.open(this.navBarData.navbar_button_url, '_blank')
    },
    toggle() {
      mutations.toggleNav()
    },
    openLink(i) {
      this.expand = i
    },
    closeLink() {
      this.expand = ''
    },
  },
}
</script>
