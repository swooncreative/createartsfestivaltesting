<template>
  <div class="">
    <Header :picture="picture">{{ support.title.rendered }}</Header>
    <div class="1xl:px-36">
      <div class="mt-115 1md:mt-100 1xl:text-center | relative">
        <h2 id="donate" class="text-28 1xl:text-45 text-purple font-display uppercase">{{ support.acf.ss1_header }}</h2>
        <p class="text-lg mt-30">{{ support.acf.ss1_content }}</p>
        <ButtonLayout :btn="btn" class="mt-30" @btnClick="btnClick1" />
        <img src="../../assets/icons/dot-blue-purple.svg" alt="dot" class="dot w-220 1md:w-280 1xl:w-90 | absolute -right-20 bottom-5 1md:-right-28 1md:bottom-0 1xl:-right-10 1xl:bottom-20 -z-10" />
      </div>
      <h3 class="text-25 font-display uppercase 1xl:text-center | mt-100">{{ support.acf.ss2_header }}</h3>
      <div class="flex flex-wrap justify-between | mt-8 1xl:mt-60">
        <div v-for="(item, i) in support.acf.ss2_logos" :key="i" class="w-170 h-170 flex justify-center items-center">
          <a :href="item.ss2_website_url" target="_blank">
            <img :src="item.ss2_logo.url" :alt="item.ss2_logo.title" class="object-contain" />
          </a>
        </div>
      </div>
<!--      <div class="1xl:text-center">-->
<!--        <h2 id="our-partners" class="text-28 1xl:text-45 text-purple font-display uppercase | mt-120 1md:mt-100 1xl:mt-120">{{ support.acf.ss3_header }}</h2>-->
<!--        <p class="text-lg text-purple font-light | mt-35">{{ support.acf.ss3_content }}</p>-->
<!--        <div class="flex flex-wrap items-center justify-between | mt-8 1md:mt-14 | 1xl:px-10">-->
<!--          <div v-for="(item, i) in footer.acf.fp_partners_logos" :key="i" class="w-84% w-40 m-5">-->
<!--            <a :href="item.partner_url" target="_blank">-->
<!--              <img :src="item.fp_partner_logo.url" :alt="item.fp_partner_logo.title" class="object-contain h-full" />-->
<!--            </a>-->
<!--          </div>-->
<!--        </div>-->
<!--        <ButtonLayout :btn="btn2" class="mt-60" @btnClick="btnClick2" />-->
<!--      </div>-->
      <div class="1xl:text-center">
        <div class="items-center">
          <h2 id="our-partners" class="text-22 1xl:text-45 text-purple font-display uppercase | mt-120 1md:mt-100 1xl:mt-120">{{ support.acf.ss3_header }}</h2>
          <p class="text-lg text-purple font-light | mt-35">{{ support.acf.ss3_content }}</p>
          <ButtonLayout :btn="btn2" class="mt-30" @btnClick="btnClick2" />
          <div v-for="(item, index) in footer.acf.fp_partners_logos" :key="index" class="">
            <h6 class="text-22 1xl:text-35 text-purple font-display | mr-8 mt-20 mb-5 | uppercase">{{ item.partner_group.partners_title }} partners</h6>
            <ul class="flex flex-wrap items-center justify-start sm:justify-start md:justify-start lg:justify-center | mt-7 1xl:mt-0">
              <li v-for="(item, i) in item.partner_group.partners" :key="i" class="mb-4 mr-2 sm:mr-5 md:mr-10 lg:mr-10 w-28 h-28 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-36 lg:h-36">
                <a :href="item.partner_url" target="_blank" class="m-0 w-28 h-28 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-36 lg:h-36">
                  <img :src="item.fp_partner_logo.url" :alt="item.fp_partner_logo.alt" class="m-0 w-full h-full object-contain" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h2 id="volunteer" class="mt-120 | 1xl:text-center text-28 1xl:text-45 text-purple font-display uppercase">{{ support.acf.ss4_header }}</h2>
      <div class="mt-37 1xl:mt-65">
        <div class="1xl:flex">
          <div>
            <div class="volunteer-img hover:h-362 1xl:h-530 1xl:w-500 w-300 h-530 | relative | flex-shrink-0 | 1xl:mr-8">
              <div class="h-full w-full p-2.5">
                <div class="h-full w-full | border-5 border-skyblue | relative z-10"></div>
              </div>
              <img :src="support.acf.ss4_image.url" :alt="support.acf.ss4_image.title" class="ss4_img | w-full h-full | object-cover | absolute top-0 left-0" />
            </div>
          </div>
          <div>
            <p class="text-lg text-purple mt-8 1xl:mt-0">{{ support.acf.ss4_content }}</p>
            <div class="flex-shrink font-light">
          <div v-for="(item, i) in support.acf.ss4_blocks" :key="i" class="mt-8 1md:mt-10">
            <h4 class="font-display uppercase text-base">{{ item.ss4_block_header }}</h4>
            <pre class="mt-2 pl-6 1xl:pl-3 font-sans w-full leading-8 text-base font-light" v-html="item.ss4_block_content"></pre>
          </div>

          <div class="mt-30 content" v-html="support.acf.ss4_end_content"></div>
          <ButtonLayout :btn="btn3" class="mt-60 1md:mt-30" @btnClick="btnClick3" />
        </div>

          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import ButtonLayout from '~/components/ButtonLayout.vue'
import Header from '~/components/Header.vue'
export default {
  components: {
    Header,
    ButtonLayout,
  },
  async asyncData(ctx) {
    try {
      const support = await ctx.app.$getSupport.index()
      const upcomingEvents = await ctx.app.$getUpcomingEvents.index()
      const footer = await ctx.app.$getFooter.index()
      return {
        support,
        upcomingEvents,
        footer,
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
      answerOpen: '',
    }
  },
  computed: {
    picture() {
      return {
        mobile: this.support.acf.mobile_banner_image.url,
        tablet: this.support.acf.tablet_banner_image.url,
        desktop: this.support.acf.desktop_banner_image.url,
      }
    },
    btn() {
      return {
        name: this.support.acf.ss1_button_text,
        buttonStyle: 'bg-purple border-4 border-skyblue text-skyblue text-18 px-40px',
        gradient: 'linear-gradient(to right, #9ccfee, #a95ea4)',
      }
    },
    btn2() {
      return {
        name: this.support.acf.ss3_button_text,
        buttonStyle: 'bg-purple border-4 border-skyblue text-skyblue text-18 px-8',
        gradient: 'linear-gradient(to right, #9ccfee, #a95ea4)',
      }
    },
    btn3() {
      return {
        name: this.support.acf.ss4_button_text,
        buttonStyle: 'bg-purple border-4 border-white text-white text-18 px-40px',
        gradient: 'linear-gradient(to right, #fea751, #904d94)',
      }
    },
  },
  mounted() {
    const volunteerImg = document.querySelector('.volunteer-img')
    window.addEventListener('scroll', () => {
      this.addParallax()
      if (this.isInViewport(volunteerImg)) {
        volunteerImg.classList.add('volunteer-img-transition')
      }
    })
  },
  beforeDestroy() {
    const volunteerImg = document.querySelector('.volunteer-img')
    window.removeEventListener('scroll', () => {
      this.addParallax()
      if (this.isInViewport(volunteerImg)) {
        volunteerImg.classList.add('volunteer-img-transition')
      }
    })
  },
  methods: {
    btnClick1() {
      window.open(this.support.acf.ss1_button_url, '_blank')
    },
    btnClick2() {
      window.open('mailto:info@eastsideartssociety.ca', '_self')
    },
    btnClick3() {
      window.open(this.support.acf.ss4_button_url, '_blank')
    },
  },
}
</script>

<style scoped>
div.content >>> p {
  margin-bottom: 20px;
}

div.content >>> ul {
  margin-left: 40px;
  margin-bottom: 20px;
  list-style-type: disc;
}

div.content >>> a {
  color: rgba(144, 77, 148, 1);
  text-decoration: underline;
}

.ss4_img {
  object-position: center center;
}
@media screen and (min-width: 834px) and (max-width: 1365px) {
  .ss4_img {
    object-position: center 30%;
  }
}
pre {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
.volunteer-img {
  opacity: 0;
  transform: translateX(-10%);
}

@media (prefers-reduced-motion: no-preference) {
  .volunteer-img {
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  }
}
.volunteer-img-transition {
  opacity: 1;
  transform: translateX(0%);
}
</style>
