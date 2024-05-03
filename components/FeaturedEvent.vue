<template>
  <div class="flex flex-col items-stretch">
    <div class="mt-20 h-full | flex flex-col">
      <div class="relative mt-2.5 flex-grow">
        <div class="absolute w-full h-full -top-4"></div>
        <div class="relative flex 1md:flex-row flex-col z-10 border-5 border-pictonblue bg-cover h-full p-2">
          <div class="w-full">
            <div class="absolute -left-1.5 -top-1.5">
              <div class="relative bg-purple pt-1 pb-2 px-10 z-10">
                <div class="flex px-4 py-2">
                  <div class="pr-3.5 pt-1">
                    <img src="../assets/icons/time.svg" width="22" />
                  </div>
                  <span class="text-18 text-white">
                  {{ $dayjs(event.start.utc).format('MMMM D, YYYY') }}
                  <br />
                  <span class="mr-1">{{ $dayjs(event.start.utc).format('h:mma') }} - {{ $dayjs(event.end.utc).format('h:mma') }}</span>
                </span>
                </div>
              </div>
              <div class="purple-blue-background absolute w-full h-full top-2.5 left-2.5"></div>
            </div>

            <div class="h-full flex flex-col">
              <div v-if="event.logo" class="flex-grow h-342 1xl:h-307 bg-center bg-cover" :style="{ 'background-image': `url(${event.logo.original.url})` }"></div>

              <div v-if="event.ticket_availability" class="relative bg-pictonblue py-1.5">
                <div class="absolute -top-6 | w-93 h-93 rounded-full circle-gradient | text-center | flex flex-col justify-center">
                  <img src="../assets/images/price-tag.svg" alt="" class="mx-auto" />
                  <p class="text-22 text-white font-black">${{ event.ticket_availability.minimum_ticket_price.major_value }}</p>
                </div>
                <p class="pl-97 text-16 text-white">per workshop / per person</p>
              </div>
            </div>
          </div>
          <div class="w-full p-25 bg-purple">
            <div class="1md:ml-0">
              <h2 class="mb-5 uppercase text-skyblue">{{ event.name.text }}</h2>
            </div>
            <div class="mb-26">
              <div class="">
                <p class="text-white text-18 content-ellipsis">{{ event.summary }}</p>
                <div class="flex pt-5">
                  <div class="w-5 flex-shrink-0 1md:pt-1">
                    <img src="../assets/icons/location.png" class="w-full object-contain" />
                  </div>
                  <p v-if="event.venue" class="text-18 pl-4 text-white">
                    {{ event.venue.name }} <a :href="`https://maps.google.com/?q=${event.venue.address.address_1}`" class="underline | transition-all duration-100 ease-in | text-skyblue | hover:text-pictonblue" target="_blank">({{ event.venue.address.address_1 }})</a>
                  </p>
                </div>
                <div class="flex 1xl:px-12 pb-12 mt-11 1md:mt-8 1xl:mt-11">
                  <Button-layout :btn="btn2" @btnClick="buyTicket" />
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
export default {
  name: 'FeaturedEvent',
  components: {  },
  props: {
    event: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      btn: {
        name: 'Read More',
        buttonStyle: 'bg-purple border-4 border-white text-white text-18 1md:text-base px-6 1md:px-5 1xl:px-7',
        gradient: 'linear-gradient(to right, #fea751, #904d94)',
      },
      btn2: {
        name: 'Info/Buy Tickets',
        buttonStyle: 'bg-pictonblue border-4 border-white text-white text-18 1md:text-base px-6 1md:px-5 1xl:px-7',
        gradient: 'linear-gradient(to right, #fea751, #3bb7cb)',
      },
    }
  },
  methods: {
    readmore() {
      this.$router.push(`/schedule/${this.$slugify(this.event.name.text)}`)
    },
    buyTicket() {
      const url = this.adjustEventUrl(this.event.url, this.event.series_id)
      window.open(url, '_blank')
    },
  },
}
</script>

<style scoped>
.purple-blue-background {
  background-image: linear-gradient(to right, #9ccfee, #904d94);
}
.purple-button-orange {
  background-image: linear-gradient(to right, #fea751, #904d94);
}
.orange-blue-button {
  background-image: linear-gradient(to right, #fea751, #3bb7cb);
}
.circle-gradient {
  background: rgb(254, 167, 81);
  background: linear-gradient(180deg, rgba(254, 167, 81, 1) 5%, rgba(144, 77, 148, 1) 71%);
}
.content-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 7rem;
}
</style>
