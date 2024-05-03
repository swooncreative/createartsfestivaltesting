<template>
  <div class="overflow-x-hidden">
    <NavBar :nav-bar-data="navBarData.acf" :menu-data="menuData.items" :social-media-data="footerData.acf" />
    <div class="mx-3.5 1md:px-36px 1xl:px-0 1xl:max-w-1270 1xl:mx-auto mt-32">
      <Path-header v-if="$route.path !== '/' && $route.matched.length > 0" />
      <Nuxt />
      <div v-if="$route.matched.length > 0" class="my-24">
        <News-letter :data="newsletterData.acf" />
      </div>
      <Instagram v-if="false" />
    </div>
    <Footer :footer-data="footerData.acf" :menu-data="menuData.items" />
  </div>
</template>

<script>
import Vue from 'vue'
import global from '@/mixins/global'
import NavBar from '~/components/NavBar'
import Footer from '~/components/Footer.vue'
import Instagram from '~/components/Instagram.vue'
import NewsLetter from '~/components/NewsLetter.vue'
import PathHeader from '~/components/PathHeader.vue'
Vue.mixin(global)
export default {
  components: {
    NavBar,
    Footer,
    NewsLetter,
    Instagram,
    PathHeader,
  },
  data() {
    return {
      footerData: '',
      menuData: '',
      navBarData: '',
      newsletterData: '',
    }
  },
  async fetch() {
    this.footerData = await fetch('https://admincreateartsfestival.swooncreative.ca/wp-json/wp/v2/global_elements/46').then((res) => res.json())
    this.menuData = await fetch('https://admincreateartsfestival.swooncreative.ca/wp-json/menus/v1/menus/2').then((res) => res.json())
    this.navBarData = await fetch('https://admincreateartsfestival.swooncreative.ca/wp-json/wp/v2/global_elements/486').then((res) => res.json())
    this.newsletterData = await fetch('https://admincreateartsfestival.swooncreative.ca/wp-json/wp/v2/global_elements/35').then((res) => res.json())
  },
  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },
  methods: {
    checkScreenSize() {
      const screenSize = document.documentElement.clientWidth
      this.$store.dispatch('screen-size/screenSize', screenSize)
    },
  },
}
</script>

<style scoped></style>
