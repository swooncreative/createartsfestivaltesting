<template>
  <div class="1xl:pb-108 relative">
    <img src="../assets/images/dot-green.svg" class="-z-10 | w-8 h-8 absolute | right-0 top-1280 1md:top-1100 1md:-right-10 dot" alt="dot" />
    <img src="../assets/images/dot-green.svg" class="-z-10 | w-8 h-8 absolute | right-4 -bottom-10 1xl:-bottom-64 1xl:-left-6 1xl:right-0 dot" alt="dot" />
    <img src="../assets/images/dot-green.svg" class="z-20 | w-7 h-7 absolute -left-4 bottom-1000 1md:bottom-1300 1md:right-0 1md:left-auto 1xl:-right-10 dot" alt="dot" />
    <img src="../assets/images/dot-green.svg" class="-z-10 | w-7 h-7 absolute 1md:top-450 1xl:top-560 dot" alt="dot" />
    <img src="../assets/images/dot-green.svg" class="-z-10 | w-7 h-7 absolute 1md:bottom-80 1md:-left-10 1xl:bottom-630 1xl:left-80 dot" alt="dot" />
    <img src="../assets/images/dot-green.svg" class="-z-10 | w-7 h-7 absolute 1md:-bottom-96 1md:-right-10 1xl:left-0 1xl:right-auto dot" alt="dot" />
    <img src="../assets/images/dot-orange.svg" class="-z-10 | w-6 h-6 absolute | right-0 top-520 1xl:top-580 dot" alt="dot" />
    <img src="../assets/images/dot-orange.svg" class="z-20 | w-6 h-6 absolute | -right-3 bottom-1150 1md:bottom-1350 1md:left-0 1md:right-0 1xl:-left-10 dot" alt="dot" />
    <img src="../assets/images/dot-orange.svg" class="-z-10 | w-6 h-6 absolute 1md:-right-8 1md:bottom-80 1xl:-bottom-44 dot" alt="dot" />
    <img src="../assets/images/dot-orange.svg" class="-z-10 | w-6 h-6 absolute 1md:-left-16 1md:-bottom-36 1xl:hidden dot" alt="dot" />
    <img src="../assets/images/dot-yellow.svg" class="-z-10 | w-6 h-6 absolute | left-0 top-880 1xl:-left-10 dot" alt="dot" />
    <Slider :data="homePageData.acf.slider_group[0]" :images="homePageData.acf.hp_banner" />
    <div class="1md:flex 1md:mt-100">
      <div class="my-20 1md:mt-0 mx-auto 1md:mx-12 1xl:mx-12 | w-242 1md:w-141 1xl:w-202 | flex-shrink-0">
        <img src="../assets/images/create.gif" class="mx-auto" alt="Arts Create Festival Logo" />
      </div>
      <div class="mb-10 w-full flex-grow">
        <p class="text-22 text-purple mb-8">{{ homePageData.acf.hps1_header }}</p>
        <div class="custom-text text-18 font-light" v-html="homePageData.acf.hps1_content">
        </div>
        <Button-layout class="mt-40px 1md:mt-8 1xl:mt-40px" :btn="btn" @btnClick="readMore" />
      </div>
    </div>
    <MessageSection :data="homePageData.acf" />
    <FeaturedEvent :event="featuredEvent" />
    <div id="events" class="1md:grid grid-cols-2 gap-x-6 items-stretch | -mx-2 1md:mx-0 1xl:mt-12">
      <EventCard v-for="(item, index) in displayUpComingEvent" :key="index" :class="index < 2 ? 'initial-event-card' : 'event-card'" :event="item" />
    </div>
    <div v-if="moreUpcomingEvent && upcomingEvent.length > 2" class="mt-8 1md:mt-40px">
      <View-more-btn ref="viewMore" class="view-more" :view-more-style="viewMoreStyle" @viewMore="viewMoreUpcomingEvent" />
    </div>
    <div class="mt-119 1md:mt-134 1md:ml-5 1xl:ml-8">
      <h3 class="text-purple font-display font-black text-45 uppercase">{{ homePageData.acf.hps2_header }}</h3>
    </div>
    <div class="blue-purple-background | -mx-3.5 1md:mx-0 1xl:px-8 | pb-60 1xl:pb-8 1xl:pt-3 | relative">
      <img src="../assets/icons/dot-blue-purple.svg" class="dot-purple | w-8 h-8 1md:w-9 1md:h-9 | absolute | right-20 top-3 1md:top-9" alt="dot" />
      <div class="mx-3.5 1xl:w-590 relative z-10">
        <h4 class="1md:px-5 pt-6 pb-4 | uppercase text-22 1md:text-34 font-display font-extrabold text-purple">{{ homePageData.acf.hps2_subheader }}</h4>
        <div class="custom-text text-white text-18 | 1md:px-5" v-html="homePageData.acf.hps2_content">
        </div>
        <div class="pl-2 py-40px">
          <Button-layout :btn="btn2" @btnClick="btnClick" />
        </div>
      </div>
      <div class="1xl:absolute right-10 -top-20 support-img">
        <div class="h-388 1md:h-400 w-full 1xl:w-590 1xl:h-590 | relative | flex-shrink-0">
          <div class="py-5 1xl:p-5 absolute h-full w-full 1md:w-103% 1xl:w-full | 1md:-left-1.4% 1xl:left-0">
            <div class="relative h-full w-full">
              <img class="h-full w-full object-center object-cover" :src="homePageData.acf.hps2_image.url" />
              <img src="../assets/images/logo.svg" class="absolute w-252 1xl:w-390 bottom-2 left-5 1md:bottom-5 1md:left-7 1xl:-bottom-2 1xl:-left-2" alt="Arts Create Festival Logo" />
            </div>
          </div>
          <div class="h-full border-5 border-pictonblue | mx-2 1md:mx-0 | relative z-10"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '~/components/Slider'
import EventCard from '~/components/EventCard'
import ButtonLayout from '~/components/ButtonLayout.vue'
import ViewMoreBtn from '~/components/ViewMoreBtn.vue'
import FeaturedEvent from '~/components/FeaturedEvent.vue'

export default {
  components: {
    Slider,
    EventCard,
    ButtonLayout,
    ViewMoreBtn,
    FeaturedEvent
  },
  async asyncData(ctx) {
    try {
      const homePageData = await ctx.app.$getHomePage.index()
      return {
        homePageData,
      }
    } catch (err) {
      console.log(err)
      // ctx.error({
      //   statuscode: 404,
      //   message: '',
      // })
    }
  },
  async fetch() {
    let events = this.$store.getters['events/events'];
    let featuredEvent
    const featuredEventId = this.homePageData.acf.eventbrite_event_id
    if (!events.length) {
      try {
        featuredEvent = await this.$axios.get(`https://www.eventbriteapi.com/v3/events/${featuredEventId}?expand=venue,ticket_availability`, {
          headers: {
            'Authorization': `Bearer E7FDKAIHD2ZPXKIK5R37`
          }
        })
        events = await this.$axios.get('https://www.eventbriteapi.com/v3/organizations/174137383265/events?expand=venue,ticket_availability&organizer_filter=33966304351&order_by=name_asc&time_filter=current_future&page_size=100', {
          headers: {
            'Authorization': `Bearer E7FDKAIHD2ZPXKIK5R37`
          }
        })
        events = events.data.events
        await this.$store.dispatch('events/updateEvents', events)
      } catch (err) {
        console.log(err)
      }
    }

    this.featuredEvent = featuredEvent.data
    this.upcomingEvent = this.combineEvents(events);
    this.displayUpComingEvent = this.upcomingEvent.slice(0, 2);
  },
  data() {
    return {
      viewMoreStyle: {
        text: 'text-purple group-hover:text-pictonblue',
        svgColor: true,
      },
      homePageData: '',
      displayUpComingEvent: [],
      upcomingEvent: [],
      numberOfUpcomingEvent: 4,
      moreUpcomingEvent: true,
      featuredEvent: {}
    }
  },

  computed: {
    btn() {
      return {
        name: this.homePageData.acf.hps1_button_text,
        buttonStyle: 'bg-purple border-4 border-white text-white text-18 px-8',
        gradient: 'linear-gradient(to right, #fea751, #904d94)',
      }
    },
    btn2() {
      return {
        name: this.homePageData.acf.hps2_button_text,
        buttonStyle: 'bg-purple border-4 border-skyblue text-skyblue text-18 px-7',
        gradient: 'linear-gradient(40deg, rgba(172,214,242,1) 5%, rgba(169,94,164,1) 71%)',
      }
    },
    btn3() {
      return {
        name: this.homePageData.acf.hpms_button_text,
        buttonStyle: 'bg-pictonblue border-4 border-white text-white text-18 1md:text-base px-6 1md:px-5 1xl:px-7',
        gradient: 'linear-gradient(to right, #fea751, #3bb7cb)',
      }
    },
    btn4() {
      return {
        name: this.homePageData.acf.hpms_extra_action.button_text,
        buttonStyle: 'bg-pictonblue border-4 border-white text-white text-18 1md:text-base px-6 1md:px-5 1xl:px-7',
        gradient: 'linear-gradient(to right, #fea751, #3bb7cb)',
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const eventCard = document.querySelectorAll('.initial-event-card')
      const supportImg = document.querySelector('.support-img')
      this.addParallaxToPurpleDot()
      this.addParallax()
      if (this.isInViewport(eventCard[0])) {
        eventCard.forEach((el) => {
          el.classList.add('event-card-transition')
        })
      }
      if (this.isInViewport(supportImg)) {
        supportImg.classList.add('support-img-transition')
      }
    })
  },
  beforeDestroy() {
    const eventCard = document.querySelectorAll('.initial-event-card')
    const supportImg = document.querySelector('.support-img')
    window.removeEventListener('scroll', () => {
      this.addParallaxToPurpleDot()
      this.addParallax()
      if (this.isInViewport(eventCard[0])) {
        eventCard.forEach((el) => {
          // el.classList.add('event-card-transition')
        })
      }
      if (this.isInViewport(supportImg)) {
        supportImg.classList.add('support-img-transition')
      }
    })
  },
  methods: {
    addParallaxToPurpleDot() {
      const scrolled = window.scrollY
      const rate = scrolled * -0.03
      const dots = document.querySelectorAll('.dot-purple')
      dots.forEach((el) => {
        el.style.transform = `translate3d(0px, ${rate}px, 0px)`
      })
    },
    readMore() {
      const url = this.homePageData.acf.hps1_button_url
      if (url.includes('createartsfestival.ca')) {
        this.$router.push(this.getPath(url))
      } else {
        window.open(url, '_blank').focus();
      }
    },
    viewMoreUpcomingEvent() {
      const scrollPosition = window.pageYOffset
      const btn = document.querySelector('.view-more')
      const addAnimation = new Promise((resolve, reject) => {
        btn.classList.add('view-more-animation')
        if (this.displayUpComingEvent.length === this.upcomingEvent.length || this.displayUpComingEvent.length > this.upcomingEvent.length) {
          this.moreUpcomingEvent = false
        }
        setTimeout(() => {
          resolve()
        }, 300)
      })
      addAnimation
        .then(() => {
          if (this.displayUpComingEvent.length < this.numberOfUpcomingEvent) {
            this.displayUpComingEvent = this.upcomingEvent.slice(0, this.numberOfUpcomingEvent)
            this.numberOfUpcomingEvent += 2
          }
          const body = document.querySelector('body')
          body.style.top = `-${scrollPosition}px`
          return new Promise((resolve) => setTimeout(resolve, 300))
        })
        .then(() => {
          const cards = document.querySelectorAll('.event-card')
          cards.forEach((el) => {
            if (!el.classList.contains('event-card-transition')) {
              el.classList.add('event-card-transition')
            }
          })
        })
        .then(() => {
          btn.classList.remove('view-more-animation')
        })
    },
    btnClick() {
      if (this.homePageData.acf.hps2_button_url.includes('createartsfestival.ca')) {
        this.$router.push(this.getPath(this.homePageData.acf.hps2_button_url))
      } else {
        console.log('hello')
        window.open(this.homePageData.acf.hps2_button_url, '_blank').focus();
      }
    }
  },
}
</script>

<style scoped>
.blue-purple-background {
  background-image: linear-gradient(to bottom, #9ccfee, #904d94);
}
.purple-button {
  background-image: linear-gradient(to right, #9ccfee, #a95ea4);
}

.event-card {
  opacity: 0;
  transform: translateY(50px);
  z-index: 10;
  position: relative;
}
.initial-event-card {
  opacity: 0;
  transform: translateY(50px);
}
.support-img {
  opacity: 0;
  transform: translateX(10%);
}

@media (prefers-reduced-motion: no-preference) {
  .special-message,
  .initial-event-card,
  .view-more,
  .support-img {
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  }
  .event-card {
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  }
}
.event-card-transition {
  opacity: 1;
  transform: translateY(0px);
}
.view-more-animation {
  opacity: 0;
  transform: translateY(20px);
}
.support-img-transition {
  opacity: 1;
  transform: translateX(0%);
}
</style>
