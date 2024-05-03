<template>
  <div class="mt-64 h-638 1md:h-600 1xl:h-435 | bg-center bg-cover relative 1md:text-center">
    <img src="../assets/images/err.svg" alt="" class="w-250 1md:w-350 1xl:w-400 | mx-auto" />
    <p class="text-lg | mt-8 1xl:mt-10 | mx-10 1md:mx-0">Oops! we can’t seem to find the page you’re looking for</p>
    <ButtonLayout :btn="btn" class="mt-8 mx-10 1md:mx-0" @btnClick="goHome" />
    <img src="../assets/images/dot-yellow.svg" alt="" class="dot -z-10 absolute -left-40 1xl:-left-20 1xl:bottom-0" />
    <img src="../assets/images/dot-orange.svg" alt="" class="dot -z-10 absolute -top-20 1xl:top-0 1xl:left-20" />
    <img src="../assets/images/dot-pink.svg" alt="" class="dot -z-10 absolute right-10 bottom-40 1xl:bottom-32 1xl:right-40" />
    <img src="../assets/images/dot-blue.svg" alt="" class="dot -z-10 absolute bottom-0 -right-10 1xl:bottom-10 1xl:right-10" />
    <img src="../assets/images/dot-green.svg" alt="" class="dot -z-10 absolute -right-28 top-10 1xl:-right-16 1xl:top-0" />
  </div>
</template>

<script>
import ButtonLayout from '~/components/ButtonLayout.vue'
export default {
  components: {
    ButtonLayout,
  },
  data() {
    return {
      btn: {
        name: 'Go to homepage',
        buttonStyle: 'bg-purple border-4 border-skyblue text-skyblue text-[18px] px-40px',
        gradient: 'linear-gradient(to right, #9ccfee, #a95ea4)',
      },
    }
  },
  computed: {
    screenSize() {
      return this.$store.getters['screen-size/screenSize']
    },
  },
  mounted() {
    window.addEventListener('scroll', this.addParallax)
    window.addEventListener('scroll', this.addParallaxToPurpleDot)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.addParallax)
    window.removeEventListener('scroll', this.addParallaxToPurpleDot)
  },
  methods: {
    goHome() {
      this.$router.push(`/`)
    },
  },
}
</script>
<style></style>
