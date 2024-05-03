<template>
  <div class="relative mt-5 h-520 1md:h-400 1xl:h-497 w-full">
    <div class="absolute w-full h-full -top-3 px-12 header-img">
      <img class="h-full w-full object-cover object-left-top" :src="picture" />
    </div>
    <div class="relativeh h-full bg-cover">
      <div class="relative h-full z-10 border-8 border-purple px-17">
        <div class="mb-26 flex flex-col justify-end 1md:items-end | 1md:mr-24 1xl:mr-28 | h-full | pb-9 1xl:pb-14">
          <div class="relative">
            <div class="1md:absolute -top-36 -right-10 1xl:-top-56 1xl:right-0 | w-252 1md:w-372 1xl:w-524">
<!--              <img class="w-full" src="../assets/images/logo.svg" alt="" />-->
            </div>
            <div class="1xl:pr-24">
              <p class="text-purple | text-22">{{ data.slider_subheader }}</p>
              <p class="text-18 1xl:text-22 font-black text-purple pb-25">{{ data.slider_header }}</p>
              <div class="pl-2">
                <div class="relative inline-block">
                  <Button-layout :btn="btn" @btnClick="btnClick" />
                  <div class="purple-button absolute w-full h-full top-1.5 right-1.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonLayout from '~/components/ButtonLayout.vue'
export default {
  name: 'Slider',
  props: {
    data: {
      type: Object,
      default: null,
    },
    images: {
      type: Object,
      default: null,
    },
  },
  components: {
    ButtonLayout,
  },
  data() {
    return {
      screenSize: 0,
      btn: {
        name: this.data.slider_button_text,
        buttonStyle: 'bg-purple border-4 border-skyblue text-skyblue text-[18px] 1xl:text-2xl px-40px',
        gradient: 'linear-gradient(to right, #9ccfee, #a95ea4)',
      },
    }
  },
  computed: {
    picture() {
      if (this.screenSize > 1365) {
        return this.images.desktop
      } else if (this.screenSize > 833) {
        return this.images.tablet
      } else {
        return this.images.mobile
      }
    },
  },
  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
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
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
    const header = document.querySelector('.header-img')
    window.removeEventListener('scroll', () => {
      if (window.scrollY > 5 && !header.classList.contains('header-transiton')) {
        header.classList.add('header-transiton')
      } else if (window.scrollY < 6) {
        header.classList.remove('header-transiton')
      }
    })
  },
  methods: {
    checkScreenSize() {
      this.screenSize = document.documentElement.clientWidth
    },
    scrollMeTo(refName) {
      const element = this.$refs[refName]
      const top = element.offsetTop

      window.scrollTo(0, top)
    },
    btnClick() {
      window.location.href = this.getPath(this.data.slider_button_url)
    },
  },
}
</script>

<style scoped>
.purple-button {
  background-image: linear-gradient(to right, #9ccfee, #a95ea4);
}
@media (prefers-reduced-motion: no-preference) {
  .header-img {
    transition: transform 0.3s ease-in, padding 0.3s ease-in;
  }
}
.header-transiton {
  transform: translateY(12px);
  padding: 0;
}
</style>
