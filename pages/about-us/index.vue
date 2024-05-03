<template>
  <div class="">
    <Header :picture="picture">{{ aboutUs.title.rendered }}</Header>
    <div class="1md:flex | mt-100 1md:mt-120">
      <div class="w-132 1md:w-190 1xl:w-242 | mx-auto 1md:mx-8 1xl:mx-102 | flex-shrink-0">
        <img :src="aboutUs.acf.as1_image.url" :alt="aboutUs.acf.as1_image.title" class="w-full" />
      </div>

      <div class="relative mt-60 1md:mt-0">
        <p class="text-22 text-purple">
          {{ aboutUs.acf.as1_header }}
        </p>
        <div class="custom-text text-lg font-light | mt-60 1xl:mt-10" v-html="aboutUs.acf.as1_content">
        </div>
        <Button-layout class="mt-60" :btn="btn" @btnClick="constactUs" />
        <img src="../../assets/icons/dot-orange-green.svg" alt="dot" class="-z-10 dot absolute bottom-8 left-28" />
      </div>
    </div>

    <div class="mt-228 1md:mt-119 1xl:mt-228">
      <h3 class="text-purple font-display font-black text-50 1xl:text-45 uppercase | 1xl:ml-460">{{ aboutUs.acf.as2_header }}</h3>
    </div>
    <div class="mt-8 blue-purple-background | -mx-3.5 1md:mx-0 | pt-5 pb-60 1xl:pb-40px | relative">
      <div class="1xl:absolute left-10 -top-8 festival-img">
        <div class="h-388 w-full 1xl:w-400 1xl:h-460 | relative | flex-shrink-0">
          <div class="py-5 absolute h-full w-full 1md:w-103% | 1md:-left-1.4%">
            <img class="h-full w-full object-center object-cover" :src="aboutUs.acf.as2_image.url" :alt="aboutUs.acf.as2_image.title" />
          </div>
          <div class="h-full border-5 border-skyblue | mx-2 1md:mx-0 | relative z-10"></div>
        </div>
      </div>
      <div class="1md:px-3 1xl:px-7 mx-3.5 1xl:w-780 1xl:ml-auto mt-9 1md:mt-11">
        <div class="custom-text text-white text-18" v-html="aboutUs.acf.as2_content">
        </div>
        <div class="pl-2 py-10 mt-12 1xl:mt-8">
          <ButtonLayout :btn="btn2" @btnClick="checkSchedule" />
        </div>
      </div>
    </div>

    <div class="mt-228 1md:mt-119 1xl:mt-228">
      <h3 class="text-purple font-display font-black text-50 1xl:text-45 uppercase">{{ aboutUs.acf.as3_header }}</h3>
    </div>
    <div class="1md:flex mt-32 1xl:mt-32">
      <div class="w-344 1xl:w-309 | flex-shrink-0 | 1md:mt-100 | 1md:mr-10 1xl:mx-172 mb-109 1md:mb-0">
        <img class="w-full" :src="aboutUs.acf.as3_image.url" :alt="aboutUs.acf.as3_image.title" />
      </div>
      <div class="relative">
        <div class="custom-text text-lg | relative z-10" v-html="aboutUs.acf.as3_content">
        </div>
        <div class="pl-2 py-10 | mt-60">
          <ButtonLayout :btn="btn3" @btnClick="checkSchedule" />
        </div>
        <img src="../../assets/icons/dot-blue-purple.svg" alt="" class="-z-10 dot absolute -right-40 -top-20 1md:-top-10 1xl:-top-40" />
      </div>
    </div>
    <div class="1xl:flex | mt-120 1md:mt-150 1xl:mt-120">
      <div class="1xl:w-1/2 relative">
        <h3 class="text-45 text-purple font-display uppercase">{{ aboutUs.acf.as4_header }}</h3>
        <div class="mt-70 1xl:mt-40 | relative z-10" v-html="aboutUs.acf.as4_content">
        </div>
        <img src="../../assets/icons/dot-blue-purple.svg" alt="" class="-z-10 dot absolute -left-32 -bottom-20 1xl:bottom-10 | w-250 1md:w-160 1xl:w-220" />
      </div>
      <div class="mt-120 1md:mt-170 1xl:mt-0 | 1xl:w-1/2">
        <h4 class="text-25 font-display uppercase">other programs</h4>
        <div class="grid grid-cols-2 gap-5 | mt-30">
          <div v-for="(item, i) in aboutUs.acf.as4_other_programs" :key="i" class="h-full flex flex-col">
            <img :src="item.as4_program_image.url" :alt="item.as4_program_image.title" />
            <p class="text-lg | mb-8 1md:mb-4">{{ item.as4_program_title }}</p>
            <a class="text-lg font-medium underline text-purple | mt-auto | transition-all duration-100 ease-in hover:text-pictonblue" :href="item.as4_program_button_url" target="_blank">{{ item.as4_program_button_text }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import ButtonLayout from '~/components/ButtonLayout.vue'

export default {
  components: { Header, ButtonLayout },
  async asyncData(ctx) {
    try {
      const aboutUs = await ctx.app.$getAboutUs.index()

      return {
        aboutUs,
      }
    } catch (err) {
      console.log(err)
      // ctx.error({
      //   statuscode: 404,
      //   message: '',
      // })
    }
  },
  data() {
    return {
      // headerSize: 'h-510 1md:h-380 1xl:h-497',
    }
  },
  computed: {
    picture() {
      return {
        mobile: this.aboutUs.acf.mobile_banner_image.url,
        tablet: this.aboutUs.acf.tablet_banner_image.url,
        desktop: this.aboutUs.acf.desktop_banner_image.url,
      }
    },
    btn() {
      return {
        name: this.aboutUs.acf.as1_button_text,
        buttonStyle: 'bg-purple border-4 border-white text-white text-18 px-8',
        gradient: 'linear-gradient(to right, #fea751, #904d94)',
      }
    },
    btn2() {
      return {
        name: this.aboutUs.acf.as2_button_text,
        buttonStyle: 'bg-purple border-4 border-white text-white text-18 px-5',
        gradient: 'linear-gradient(to right, #fea751, #904d94)',
      }
    },
    btn3() {
      return {
        name: this.aboutUs.acf.as3_button_text,
        buttonStyle: 'bg-purple border-4 border-white text-white text-18',
        gradient: 'linear-gradient(to right, #fea751, #904d94)',
      }
    },
  },
  mounted() {
    const festivalImg = document.querySelector('.festival-img')
    window.addEventListener('scroll', () => {
      this.addParallax()
      if (this.isInViewport(festivalImg)) {
        festivalImg.classList.add('festival-img-transition')
      }
    })
  },
  beforeDestroy() {
    const festivalImg = document.querySelector('.festival-img')
    window.removeEventListener('scroll', () => {
      this.addParallax()
      if (this.isInViewport(festivalImg)) {
        festivalImg.classList.add('festival-img-transition')
      }
    })
  },
  methods: {
    constactUs() {
      this.$router.push(this.getPath(this.aboutUs.acf.as1_button_url))
    },
    checkSchedule() {
      this.$router.push(this.getPath(this.aboutUs.acf.as2_button_url))
    },
  },
}
</script>

<style scoped>
.blue-purple-background {
  background-image: linear-gradient(to bottom, #9ccfee, #904d94);
}
.festival-img {
  opacity: 0;
  transform: translateX(-10%);
}

@media (prefers-reduced-motion: no-preference) {
  .festival-img {
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  }
}
.festival-img-transition {
  opacity: 1;
  transform: translateX(0%);
}
</style>
