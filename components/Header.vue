<template>
  <div class="-mx-3.5 1md:mx-0 mt-5 | relative | 1md:w-full" :class="headerSize !== null ? headerSize : 'h-400 1md:h-285 1xl:h-385'">
    <div class="absolute w-full h-full top-0 header-img"><div class="px-12 h-full w-full top-0 bg-cover bg-left-top" :style="{ 'background-image': `url(${headerPicture})` }"></div></div>
    <div class="relative h-full w-full z-10 pt-3">
      <div class="h-full w-full border-8 border-purple px-17 bg-cover | flex flex-col 1xl:justify-center">
        <h1 class="text-50 font-display text-purple font-black uppercase | mt-auto 1xl:mt-0"><slot></slot></h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    picture: {
      type: Object,
      default: null,
    },
    headerSize: {
      type: String,
      default: null,
    },
  },
  computed: {
    screenSize() {
      return this.$store.getters['screen-size/screenSize']
    },
    headerPicture() {
      if (this.screenSize > 1365) {
        return this.picture.desktop
      } else if (this.screenSize > 833) {
        return this.picture.tablet
      } else {
        return this.picture.mobile
      }
    },
  },
  mounted() {
    const header = document.querySelector('.header-img')
    window.addEventListener('scroll', () => {
      if (window.scrollY > 5 && !header.classList.contains('header-transiton')) {
        header.classList.add('header-transiton')
      } else if (window.scrollY < 6) {
        header.classList.remove('header-transiton')
      }
    })
  },
  beforeDestroy() {
    const header = document.querySelector('.header-img')
    window.removeEventListener('scroll', () => {
      if (window.scrollY > 5 && !header.classList.contains('header-transiton')) {
        header.classList.add('header-transiton')
      } else if (window.scrollY < 6) {
        header.classList.remove('header-transiton')
      }
    })
  },
}
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .header-img {
    transition: padding 0.3s ease-in;
  }
}
.header-transiton {
  padding-top: 12px;
}
</style>
