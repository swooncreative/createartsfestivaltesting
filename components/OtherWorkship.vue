<template>
  <div class="mb-10">
    <div @click="goToDetailPage" class="cursor-pointer">
      <h5 class="hidden 1md:block uppercase font-black text-lg text-purple font-display">{{ upcomingEvent.title }}</h5>
      <div class="flex 1md:block">
        <div class="relative mt-3 | w-88 h-88 1md:h-100 1md:w-48 | flex-shrink-0 | mr-4 1md:mr-0">
          <div class="absolute top-2 right-6 | w-full h-full">
            <img class="object-cover object-center | w-full h-full" :src="upcomingEvent.event_image" />
          </div>
          <div class="relative z-10 border-6 border-pictonblue bg-cover w-full h-full"></div>
        </div>
        <div>
          <h5 class="1md:hidden uppercase font-black text-lg text-purple font-display | mt-2 mb-6">{{ upcomingEvent.title }}</h5>
          <ul class="text-lg font-medium mt-4 1md:mt-7">
            <li v-for="(item, i) in eventInfo" :key="i" class="flex items-start mb-5 1xl:mb-2">
              <img :src="require(`../assets/images/${item.img}.svg`)" class="w-22 | mr-2 1md:mr-4" alt="location" />
              <div>
                <p v-html="item.desc" :class="item.class"></p>
                <p v-if="i === 0" class="text-purple address">
                  (<a :href="`https://maps.google.com/?q=${item.address}`" class="underline | transition-all duration-100 ease-in | hover:text-pictonblue" target="_blank">{{ item.address }}</a
                  >)
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="border-2 border-purple mt-2 1md:mt-8" />
  </div>
</template>

<script>
export default {
  props: {
    upcomingEvent: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      eventInfo: [
        {
          img: 'location-purple',
          desc: this.upcomingEvent.event_address_text,
          class: '',
          address: this.upcomingEvent.event_address,
        },
        {
          img: 'clock-skyblue',
          desc: this.getHours(),
          class: 'text-pictonblue',
        },
      ],
    }
  },
  methods: {
    goToDetailPage(event) {
      if (event.target.nodeName !== 'A') {
        this.$router.push(`/schedule/${this.upcomingEvent.slug}`)
      }
    },
    getHours() {
      if (this.upcomingEvent.event_hours.length > 0) {
        let i = ''
        this.upcomingEvent.event_hours.forEach((e, index) => {
          i = i + e.event_hour
          if (index !== this.upcomingEvent.event_hours.length - 1) {
            i = i + ' | '
          }
        })
        return `${this.upcomingEvent.event_date} <br> ${i}`
      }
    },
  },
}
</script>

<style></style>
