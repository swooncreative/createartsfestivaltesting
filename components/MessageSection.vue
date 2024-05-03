<template>
  <div class="xl:flex inline-block justify-center items-center xl:mx-12 mt-20">
    <div class="relative h-342 flex-shrink-0 xl:w-1/4 lg:w-1/3 md:w-1/2 w-8/12 sm:h-342 md:h-460 lg:h-435 md:mx-0 lg:mx-0">
      <div class="relative">
        <img :src="data.hpms_image.url" class="w-full h-full object-contain object-center" />
        <div
          class="absolute top-4 left-3 h-full w-full border-8 border-pictonblue px-17 bg-cover | flex flex-col 1xl:justify-center"
        ></div>
      </div>
    </div>
    <div class="xl:ml-20 xl:mt-0 md:mt-32 mt-100 flex-shrink">
      <h3 class="text-28 text-pictonblue font-display font-black uppercase mb-4">{{ data.hpms_header }}</h3>
      <div v-if="data.hpms_content" class="custom-text text-18" v-html="data.hpms_content"></div>
      <Button-layout v-if="data.hpms_button_text" class="mt-40px 1md:mt-8 1xl:mt-40px mr-10" :btn="btn3" @btnClick="openPDF()" />
      <Button-layout v-if="data.hpms_extra_action" class="mt-40px 1md:mt-8 1xl:mt-40px" :btn="btn4" @btnClick="openViewer()" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageSection",
  props: {
    data: {
      type: Object,
      default: null,
    }
  },
  computed: {
    btn3() {
      return {
        name: this.data.hpms_button_text,
        buttonStyle: 'bg-pictonblue border-4 border-white text-white text-18 1md:text-base px-6 1md:px-5 1xl:px-7',
        gradient: 'linear-gradient(to right, #fea751, #3bb7cb)',
      }
    },
    btn4() {
      return {
        name: this.data.hpms_extra_action.button_text,
        buttonStyle: 'bg-pictonblue border-4 border-white text-white text-18 1md:text-base px-6 1md:px-5 1xl:px-7',
        gradient: 'linear-gradient(to right, #fea751, #3bb7cb)',
      }
    },
  },
  methods: {
    openPDF() {
      window.open(this.data.hpms_file.url)
    },
    openViewer() {
      window.open(this.data.hpms_extra_action.button_link)
    },
  }
}
</script>

<style scoped>

</style>
