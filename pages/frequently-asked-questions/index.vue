<template>
  <div class="1md:flex">
    <div class="flex-grow">
      <Header :picture="picture">{{ faq.title.rendered }}</Header>
      <MessageSection :data="homePageData.acf" />
      <ul class="mt-60 1md:mt-75 | cursor-pointer">
        <li v-for="(item, i) in faq.acf.faq" :key="i" class="mb-30" @click="openAnswer(i + 1)">
          <div class="flex items-center">
            <p class="text-22 text-purple font-display | mr-2.5">
              {{ item.faq_question }}
            </p>
            <div class="arrow-down transform transition-all duration-150 ease-in" :class="answerIsOpened(i + 1) && 'rotate-180 arrow-down-rotate'"></div>
          </div>
          <div class="accordion" :class="answerIsOpened(i + 1) && 'expand'">
            <transition name="fade">
              <ul v-show="answerIsOpened(i + 1)" class="answer-list pt-30">
                <li v-for="(answer, x) in item.faq_answers" :key="x" class="relative | text-lg | mb-5 pl-5">
                  {{ answer.faq_answer }}
                </li>
              </ul>
            </transition>
          </div>
        </li>
      </ul>
    </div>

    <!---------- side bar ------------->
    <div class="1md:w-202 1xl:w-72 flex-shrink-0 | 1md:ml-60 | mt-100 1md:mt-0">
      <h4 class="uppercase font-black text-purple text-22 font-display | mb-26">OTHER WORKSHOPS</h4>
      <Other-workship v-for="upcomingEvent in filteredUpcomingEvents" :key="upcomingEvent.title" :upcoming-event="upcomingEvent" />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import OtherWorkship from '~/components/OtherWorkship.vue'
export default {
  components: {
    Header,
    OtherWorkship,
  },
  async asyncData(ctx) {
    try {
      const homePageData = await ctx.app.$getHomePage.index()
      const faq = await ctx.app.$getFaq.index()
      const schedule = await ctx.app.$getSchedule.index()
      const scheduleEvent = []
      for (const el of schedule.acf.scheduler) {
        const res = await ctx.app.$getScheduleByDate.date(el.scheduler_filter_date)
        scheduleEvent.push(...res)
      }
      const eventsHasPicture = scheduleEvent.filter((el) => {
        return typeof el.event_image === 'string'
      })

      return {
        homePageData,
        faq,
        upcomingEvents: eventsHasPicture,
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
      answerOpen: [],
    }
  },

  computed: {
    picture() {
      return {
        mobile: this.faq.acf.mobile_banner_image.url,
        tablet: this.faq.acf.tablet_banner_image.url,
        desktop: this.faq.acf.desktop_banner_image.url,
      }
    },
    filteredUpcomingEvents() {
      const items = this.upcomingEvents.filter((e) => typeof e.event_image === 'string')
      return items.slice(0, 3)
    },
  },
  methods: {
    openAnswer(l) {
      const isOpened = this.answerOpen.find((el, i) => {
        if (el === l) {
          this.answerOpen.splice(i, 1)
          return true
        } else {
          return false
        }
      })
      if (!isOpened) {
        this.answerOpen.push(l)
      }
    },
    answerIsOpened(i) {
      const isOpened = this.answerOpen.find((el) => {
        if (el === i) {
          return true
        } else {
          return false
        }
      })
      return isOpened
    },
  },
}
</script>

<style scoped>
.arrow-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid #a95ea4;
}
.arrow-down-rotate {
  border-top: 10px solid #33c1d7;
}
li:hover .arrow-down {
  border-top: 10px solid #33c1d7;
}

.answer-list li::before {
  content: '';
  display: inline-block;
  z-index: -1;
  position: absolute;
  left: 0px;
  top: 10px;
  width: 7px;
  height: 7px;
  -moz-border-radius: 7.5px;
  -webkit-border-radius: 7.5px;
  border-radius: 7.5px;
  background-color: #acd6f2;
}

.expand {
  max-height: 200rem !important;
  opacity: 1 !important;
}
.accordion {
  max-height: 0;
  opacity: 0;
  transition: all 700ms;
  -webkit-transition: all 700ms;
  pointer-events: none;
}
.fade-enter-active {
  -webkit-transition: opacity 700ms;
  -webkit-transition-delay: 100ms;
}
.fade-leave-active {
  -webkit-transition: opacity 670ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
