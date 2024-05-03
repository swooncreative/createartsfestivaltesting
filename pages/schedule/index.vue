<template>
  <div class="">
    <Header :picture="picture">{{ schedule.title.rendered }}</Header>
    <div class="-mx-3.5 1md:mx-auto mt-20 1md:mt-24 1xl:mt-86 1xl:mx-20">
      <div class="flex">
        <div v-for="(item, i) in schedulerDate" :key="i" class="w-1/2 | border-b-5 border-t-5 border-purple | text-center | cursor-pointer py-1" :class="[activeSchedule === i && 'bg-purple', i === 0 && 'border-l-5', i === 1 && 'border-r-5']" @click="showSchedule(i)">
          <div class="inline-block text-left pr-5 pl-3 1md:px-0">
            <h3 class="text-lg font-display uppercase font-black" :class="activeSchedule === i ? 'text-white' : 'text-purple'">
              {{ $dayjs(item).utc().format('dddd, MMMM D') }}
            </h3>
            <p class="text-pictonblue font-bold font-display uppercase">Workshops / Events</p>
          </div>
        </div>
      </div>
      <div v-for="(event, i) in filterEvents(activeSchedule)" :key="i">
        <div class="flex | py-3 1xl:py-2 border-b-5 border-r-5 border-l-5 border-purple">
          <div class="flex-grow | ml-3 1md:ml-5 1xl:ml-100 mr-3">
            <p class="font-display font-bold uppercase | mb-1.5">{{ event.name.text }}</p>
            <div class="flex">
              <img src="../../assets/images/clock-purple.svg" alt="" class="mr-4" />
              <p>
                <span v-for="(item, k) in event.start" :key="k" class="text-lg text-purple font-medium">{{ $dayjs(item.utc).format('h:mma') }} {{ k !== event.start.length - 1 ? '| ' : '' }}</span>
              </p>
            </div>
          </div>
          <a
            :href="adjustEventUrl(event.url, event.series_id)"
            target="_blank"
            class="group hover:bg-white | transition-all duration-100 ease-in | border-4 border-purple text-purple | w-28 1md:w-72 1xl:w-80 | mr-2 | flex-shrink-0 | bg-purple | 1md:text-left | flex flex-col 1md:flex-row items-center justify-center 1md:justify-between | py-5 1md:px-4 1xl:px-8"
          >
            <div class="flex justify-center 1md:justify-start | mr-2">
              <img src="../../assets/images/price-tag2.svg" alt="price-tag" class="w-5 1md:w-8 1xl:w-10 mr-2 1xl:mr-4 | transition-all duration-100 ease-in | price-tag" />
              <p class="text-white text-lg 1md:text-23 font-black | 1md:mr-4 1xl:mr-8 | group-hover:text-purple | transition-all duration-100 ease-in |">${{ event.ticket_availability.minimum_ticket_price.major_value }}</p>
            </div>
            <p class="text-white underline | group-hover:text-purple | transition-all duration-100 ease-in">Read More</p>
          </a>
        </div>
      </div>
    </div>
    <div class="initial-event-card-1">
      <h2 class="text-45 text-purple font-bold font-display uppercase | mt-32">
        {{ $dayjs(schedulerDate[activeSchedule]).utc().format('dddd, MMMM D') }}
      </h2>
      <div id="events" class="-mx-2 1md:mx-0 | 1md:grid grid-cols-2 gap-x-4 items-stretch">
        <EventCard v-for="(event, idx) in filterEvents(activeSchedule)" :key="idx" :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
export default {
  components: { Header },
  async asyncData(ctx) {
    try {
      const day = ctx.route?.query?.day || 'saturday'
      const schedule = await ctx.app.$getSchedule.index()
      return {
        day,
        schedule,
      }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      day: '',
      activeSchedule: 0,
      eventDisplayNumber: [{ number: 4 }, { number: 4 }],
      moreEvents: [true, true],
      moreSchedule: [true, true],
      displayEvents: [],
      viewMoreStyle: {
        text: 'text-purple group-hover:text-pictonblue',
        svgColor: true,
      },
      schedulerDate: [],
    }
  },
  async fetch() {
    let events = this.$store.getters['events/events'];

    if (!events.length) {
      try {
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

    this.schedulerDate = this.findDates(events)
    this.displayEvents = this.combineEvents(events)
  },
  computed: {
    picture() {
      return {
        mobile: this.schedule.acf.mobile_banner_image.url,
        tablet: this.schedule.acf.tablet_banner_image.url,
        desktop: this.schedule.acf.desktop_banner_image.url,
      }
    },
  },
  watch: {
    $route (to, from){
      this.day = this.$route?.query?.day || 'saturday';
      this.activeSchedule = this.day === 'saturday' ? 0 : 1
    }
  },
  created() {
    this.activeSchedule = this.day === 'saturday' || this.day === '' ? 0 : 1;
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const eventCard = document.querySelectorAll('.initial-event-card-1')
      const eventCard2 = document.querySelectorAll('.initial-event-card-2')
      this.addParallax()
      if (this.isInViewport(eventCard[0])) {
        eventCard.forEach((el) => {
          el.classList.add('event-card-transition')
        })
      }
      if (this.isInViewport(eventCard2[0])) {
        eventCard2.forEach((el) => {
          el.classList.add('event-card-transition')
        })
      }
    })
  },
  beforeDestroy() {
    const eventCard = document.querySelectorAll('.initial-event-card-1')
    const eventCard2 = document.querySelectorAll('.initial-event-card-2')
    window.removeEventListener('scroll', () => {
      this.addParallax()
      if (this.isInViewport(eventCard[0])) {
        eventCard.forEach((el) => {
          el.classList.add('event-card-transition')
        })
      }
      if (this.isInViewport(eventCard2[0])) {
        eventCard2.forEach((el) => {
          el.classList.add('event-card-transition')
        })
      }
    })
  },
  methods: {
    showSchedule(i) {
      this.day = i === 0 ? 'saturday' : 'sunday'
      this.activeSchedule = i
      this.$router.push(`/schedule?day=${this.day}`)
    },
    findDates(events) {
      const uniqueDates = new Set();

      for (const event of events) {
        // parse the utc date string using Day.js
        const date = this.$dayjs(event.start.utc);

        // format the date as YYYY-MM-DD
        const formattedDate = date.format('YYYY-MM-DD');

        // add the formatted date to the Set
        uniqueDates.add(formattedDate);
      }

      // convert the Set to an array and return it
      return Array.from(uniqueDates).reverse();
    },
    filterEvents(i) {
      const events = [];
      for (const event of this.displayEvents) {
        const eventDate = this.$dayjs(event.start[0].utc).format('YYYY-MM-DD')
        if(eventDate === this.schedulerDate[i]) {
          events.push(event)
        }
      }
      return events
    }
  },
}
</script>

<style scoped>
.price-tag {
  filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(308deg) brightness(127%) contrast(112%);
}
.group:hover .price-tag {
  filter: invert(48%) sepia(18%) saturate(1419%) hue-rotate(254deg) brightness(88%) contrast(85%);
}

.event-card {
  opacity: 0;
  transform: translateY(50px);
  z-index: 10;
  position: relative;
}
.initial-event-card-1,
.initial-event-card-2 {
  opacity: 0;
  transform: translateY(50px);
}
.schedule-item {
  opacity: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .initial-event-card-1,
  .initial-event-card-2,
  .view-more-schedule,
  .view-more-event,
  .event-card {
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  }
  .schedule-item {
    transition: opacity 0.2s ease-in;
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
.schedule-item-transition {
  opacity: 1;
}
</style>
