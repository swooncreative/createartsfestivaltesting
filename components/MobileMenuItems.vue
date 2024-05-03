<template>
  <div>
    <div class="flex">
      <div class="text-ablack font-serif text-2xl text-left">
        <nuxt-link to="/" @click.native="toggle">
          <img :src="navBarData.navbar_logo.url" alt="Create Arts Festival" width="180" />
        </nuxt-link>
      </div>
      <div class="w-3/4 flex justify-end">
        <button @click.prevent="toggle">
          <img src="../assets/icons/close.svg" width="20" />
        </button>
      </div>
    </div>
    <div class="mx-6">
      <div v-for="(item, i) in menuData" :key="item.id" class="mt-10 mb-3">
        <div class="flex items-center | relative">
          <nuxt-link :to="getPath(item.url)" class="font-display uppercase text-28 text-purple inline-block relative group" @click.native="toggle">
            <p>{{ item.post_title }}</p>
            <div class="absolute bottom-1 -z-10 | h-2.5 w-full | group-hover:bg-skyblue transition-all duration-100 ease-in"></div>
          </nuxt-link>
          <div v-if="item.child_items" class="ml-5 arrow-down | transition-all duration-100 ease-in | cursor-pointer transform" :class="[listIsOpened(i + 1) && 'rotate-180']" @click="openExpand(i + 1)"></div>
        </div>

        <ul v-if="item.child_items" class="nestmenu" :class="item.child_items && listIsOpened(i + 1) && 'nestmenu-open'">
          <li v-for="(childLink, childLinkIndex) in item.child_items" :key="childLinkIndex" class="font-light text-3xs | transition-all duration-100 ease-in | mb-3 | cursor-pointer" :class="[childLinkIndex === 0 && 'pt-5', childLinkIndex === item.child_items.length - 1 && 'pb-3']">
            <nuxt-link :to="getPath(childLink.url)" class="font-display uppercase text-25 text-purple inline-block relative group hover:opacity-75" @click.native="toggle">
              <p>{{ childLink.post_title }}</p>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="my-20">
        <Button-layout :btn="btn2" @btnClick="btnClick" />
      </div>
      <div>
        <ul class="flex 1md:justify-start">
          <li v-for="(item, i) in socialMedia" :key="i" class="mx-4 1md:ml-0 1md:mr-8 mt-9">
            <a :href="item.link" target="_blank"><img class="w-5 snsicon transition-all duration-100 ease-in" :src="require(`../assets/images/${item.img}.svg`)" alt="" /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mutations } from '~/store'
export default {
  name: 'MobileMenuItems',
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
      expand: [],
      btn2: {
        name: this.navBarData.navbar_button_text,
        buttonStyle: 'bg-pictonblue border-4 border-white text-white text-18 1md:text-base',
        gradient: 'linear-gradient(to right, #fea751, #3bb7cb)',
      },
    }
  },
  computed: {
    socialMedia() {
      const socialMedia = [
        { img: 'facebook', link: this.socialMediaData.flds_facebook_url },
        { img: 'twitter', link: this.socialMediaData.flds_twitter_url },
        { img: 'instagram', link: this.socialMediaData.flds_instagram_url },
      ]
      socialMedia.forEach(function (item, index, object) {
        if (item.link === '') {
          object.splice(index, 1)
        }
      })
      return socialMedia
    },
  },
  methods: {
    toggle() {
      mutations.toggleNav()
    },
    btnClick() {
      window.open(this.navBarData.navbar_button_url, '_blank')
    },
    listIsOpened(i) {
      const isOpened = this.expand.find((el) => {
        if (el === i) {
          return true
        } else {
          return false
        }
      })
      return isOpened
    },
    openExpand(i) {
      const isOpened = this.expand.find((el, index) => {
        if (el === i) {
          this.expand.splice(index, 1)
          return true
        } else {
          return false
        }
      })
      if (!isOpened) {
        this.expand.push(i)
      }
    },
  },
}
</script>

<style scoped>
.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #33c1d7;
}
.snsicon {
  filter: invert(48%) sepia(18%) saturate(1419%) hue-rotate(254deg) brightness(88%) contrast(85%);
}
.snsicon:hover {
  filter: invert(84%) sepia(11%) saturate(991%) hue-rotate(173deg) brightness(99%) contrast(91%);
}

.nestmenu {
  display: block;
  position: relative;
  overflow: hidden;
  transition: 300ms max-height cubic-bezier(0, 1, 0, 1), 0.3s opacity ease-in;
  max-height: 0rem;
  opacity: 0;
  padding: 0 0.75rem;
  margin: 0;
  z-index: -1;
}
.nestmenu-open {
  position: relative;
  max-height: 130rem;
  opacity: 1;
  overflow: visible;
  transition: 500ms max-height ease-in-out, 600ms opacity ease-in, 0.2s margin ease-in, 0.2s padding ease-in;
  z-index: 10;
}
</style>
