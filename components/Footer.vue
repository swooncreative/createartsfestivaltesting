<template>
  <footer>
    <div v-if="false" class="bg-purple">
      <p class="font-light text-white px-3.5 1md:px-36px 1xl:px-0 | 1xl:max-w-1238 1xl:mx-auto py-2">
        <span class="font-bold">The CREATE! Arts Festival</span> is made possible by the generous support of the Vancouver Foundation, BC Gaming and the BC Arts Council Pivot Initiative, Opus Art Supplies and DeSerres
      </p>
    </div>
    <div class="px-3.5 1md:px-36px 1xl:px-0 | 1xl:max-w-1238 1xl:mx-auto mt-22">
      <div class="items-center">
        <h6 class="text-2xl text-purple font-display font-extrabold uppercase mb-8">Our Partners</h6>
        <div v-for="(item, index) in partnersData" :key="index" class="block  sm:block md:flex lg:flex items-center mb-8">
          <h6 class="text-lg text-purple normal-case mr-16 w-auto sm:auto sm:whitespace-nowrap sm:mr-8 md:auto md:whitespace-nowrap md:mr-8 lg:w-40">{{ item.partner_group.partners_title }} partners</h6>
          <ul class="flex flex-wrap items-center | mt-7 1xl:mt-0">
            <li v-for="(item, i) in item.partner_group.partners" :key="i" class="mb-4 mr-4 sm:mr-5 md:mr-10 lg:mr-10 w-24 h-24 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-32 lg:h-32">
              <a :href="item.partner_url" target="_blank" class="m-0 w-24 h-24 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-32 lg:h-32">
                <img :src="item.fp_partner_logo.url" :alt="item.fp_partner_logo.alt" class="m-0 w-full h-full object-contain" :class="index === 0 ? '' : ''" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="1md:grid grid-cols-3 gap-7 1xl:gap-5 pt-8">
        <div>
          <div class="1xl:flex">
            <div class="1xl:w-28 1xl:h-141 flex-shrink-0 1xl:mr-7">
              <a :href="footerData.fci_image_link" target="_blank">
                <img class="mx-auto w-28 1xl:w-full object-contain" :src="footerData.fci_image.url" width="120" alt="" />
              </a>
            </div>
            <div class="mt-10 mx-12 1md:mx-0">
              <ul>
                <li v-for="(item, i) in accessInfo" :key="i" class="flex mt-2 group" @click="sendEmail(i)">
                  <img class="w-15 mr-2" :src="require(`../assets/images/${item.img}.svg`)" :alt="item.img" />
                  <p class="text-15 font-medium" :class="i === 2 && 'group-hover:text-purple | transition-all duration-100 ease-in | cursor-pointer | underline'">{{ item.info }}</p>
                </li>
              </ul>
            </div>
          </div>
          <p class="font-light text-13 text-purple | mt-8 1xl:mt-14">
            {{ footerData.fa_content }}
          </p>
        </div>
        <ul class="1md:pl-5 | text-center 1md:text-left | font-display font-bold uppercase | grid 1xl:grid-rows-2 1xl:grid-cols-2 1xl:grid-flow-col | mt-14 1md:mt-0 1xl:mt-12 pb-40px 1md:pb-0 1md:h-64 1xl:pb-40">
          <li v-for="item in menuData" :key="item.id" class="mb-7 1md:mb-0 text-purple">
            <div class="inline-block relative group">
              <nuxt-link :to="getPath(item.url)" class="border-b-2 border-transparent">{{ item.post_title }}</nuxt-link>
              <div class="absolute bottom-1 -z-10 | h-1.5 w-full | group-hover:bg-skyblue transition-all duration-100 ease-in"></div>
            </div>
          </li>
        </ul>
        <div class="1md:pl-10 1xl:pl-20 | text-center 1md:text-left | 1xl:mt-10">
          <nuxt-link to="/">
            <img class="w-173 mx-auto 1md:mx-0" :src="footerData.flds_website_logo.url" alt="" />
          </nuxt-link>
          <Button-layout class="mt-60" :btn="btn" @btnClick="btnClick" />
          <ul class="flex justify-center 1md:justify-start">
            <li v-for="(item, i) in socialMedia" :key="i" class="mx-4 1md:ml-0 1md:mr-8 mt-9">
              <a :href="item.link" target="_blank"><img class="w-5 transition-all duration-100 ease-in snsicon" :src="require(`../assets/images/${item.img}.svg`)" alt="" /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-purple mt-7 1md:mt-101">
      <div class="px-16 1md:px-36px 1xl:px-0 | 1xl:max-w-1238 1xl:mx-auto | text-13 | 1xl:flex justify-between | text-center text-white 1xl:text-left | py-2">
        <p class="">Copyright © 2021 Create! Art Festival. All rights reserved. Website Design and Developed by <a href="https://swooncreative.ca">SWOON CREATIVE MEDIA</a></p>
        <ul v-if="false" class="flex justify-center 1xl:justify-start | mt-2 1xl:mt-0 | underline">
          <li v-for="(item, i) in bottomLink" :key="i" class="ml-10">
            <nuxt-link :to="item.link">{{ item.name }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import ButtonLayout from '~/components/ButtonLayout.vue'
export default {
  components: {
    ButtonLayout,
  },
  props: {
    footerData: {
      type: Object,
      default: null,
    },
    menuData: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      btn: {
        name: this.footerData.flds_donate_button_text,
        buttonStyle: 'bg-purple border-4 border-skyblue text-skyblue text-18 px-40px',
        gradient: 'linear-gradient(to right, #9ccfee, #a95ea4)',
      },
      accessInfo: [
        {
          info: this.footerData.fci_address,
          img: 'location-purple',
        },
        {
          info: this.footerData.fci_phone_number,
          img: 'phone',
        },
        {
          info: this.footerData.fci_email,
          img: 'email',
        },
      ],
      bottomLink: [
        {
          name: 'Privacy Policy',
          link: '#',
        },
        {
          name: 'Terms of Use',
          link: '#',
        },
      ],
      partners: [
        'opus',
        'vf',
        'arts-council',
        // { img: 'opus', style: 'w-90 h-[90px]' },
        // { img: 'deSerres', style: 'w-90 h-[90px]' },
        // { img: 'vf', style: 'w-90 h-6' },
        // { img: 'arts-council', style: 'w-293 h-[49px]' },
      ],
    }
  },
  computed: {
    socialMedia() {
      const socialMedia = [
        { img: 'facebook', link: this.footerData.flds_facebook_url },
        { img: 'twitter', link: this.footerData.flds_twitter_url },
        { img: 'instagram', link: this.footerData.flds_instagram_url },
      ]
      socialMedia.forEach(function (item, index, object) {
        if (item.link === '') {
          object.splice(index, 1)
        }
      })
      return socialMedia
    },
    partnersData () {
      return this.footerData.fp_partners_logos.slice(0, 2)
    }
  },
  methods: {
    btnClick() {
      window.open(this.footerData.flds_donate_button_url, '_blank')
    },
    sendEmail(i) {
      if (i === 2) {
        location.href = `mailto:${this.accessInfo[i].info}`
      }
    },
  },
}
</script>

<style scoped>
.snsicon {
  filter: invert(48%) sepia(18%) saturate(1419%) hue-rotate(254deg) brightness(88%) contrast(85%);
}
.snsicon:hover {
  filter: invert(84%) sepia(11%) saturate(991%) hue-rotate(173deg) brightness(99%) contrast(91%);
}
</style>
