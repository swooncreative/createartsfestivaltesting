<template>
  <div class="text-center pt-10">
    <button class="group" @click="viewMoreUpcomingEvent">
      <img class="m-auto transition-all duration-100 ease-in" src="../assets/icons/arrow-down.svg" :class="viewMoreStyle.svgColor ? 'arrow' : 'arrow-regular'" />
      <div class="mt-3">
        <span class="text-18 underline font-normal transition-all duration-100 ease-in" :class="viewMoreStyle.text === '' ? 'text-pictonblue group-hover:text-purple' : viewMoreStyle.text">View more events</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    viewMoreStyle: {
      type: Object,
      default: () => {
        return {
          text: '',
          svgColor: false,
        }
      },
    },
  },
  methods: {
    viewMoreUpcomingEvent() {
      this.$emit('viewMore')
    },
  },
}
</script>

<style scoped>
.arrow {
  filter: invert(84%) sepia(21%) saturate(4364%) hue-rotate(150deg) brightness(88%) contrast(90%);
}
.arrow-regular {
  filter: invert(48%) sepia(18%) saturate(1419%) hue-rotate(254deg) brightness(88%) contrast(85%);
}
.group:hover .arrow-regular {
  filter: invert(84%) sepia(21%) saturate(4364%) hue-rotate(150deg) brightness(88%) contrast(90%);
}
.group:hover .arrow {
  filter: invert(48%) sepia(18%) saturate(1419%) hue-rotate(254deg) brightness(88%) contrast(85%);
}
</style>
