<template>
  <div v-if="btn.name" class="relative inline-block">
    <button
      class="border-3 | relative z-10 | px-4 py-2 | transition-all duration-100 ease-in"
      :class="[
        btn.buttonStyle,
        btn.buttonStyle.includes('bg-purple') && btn.buttonStyle.includes('border-skyblue') && 'hover:text-purple hover:border-purple hover:bg-skyblue',
        btn.buttonStyle.includes('bg-skyblue') && ' hover:text-skyblue hover:border-skyblue hover:bg-purple',
        btn.buttonStyle.includes('bg-pictonblue') && ' hover:text-pictonblue hover:border-pictonblue hover:bg-white',
        btn.buttonStyle.includes('bg-purple') && btn.buttonStyle.includes('border-white') && 'hover:text-purple hover:border-purple hover:bg-white',
      ]"
      @click="btnClick"
    >
      {{ btn.name }}
    </button>
    <div class="absolute w-full h-full top-1.5 right-1.5" :style="{ background: btn.gradient }"></div>
  </div>
</template>

<script>
export default {
  props: {
    btn: {
      type: Object,
      default: null,
    },
  },
  methods: {
    btnClick() {
      this.$emit('btnClick')
    },
  },
}
</script>

<style></style>
