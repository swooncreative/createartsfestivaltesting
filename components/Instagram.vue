<template>
  <div class="mt-[116px] mb-[105px]">
    <div class="1md:flex items-center">
      <h2 class="text-34 font-black text-purple uppercase font-display">follow us</h2>
      <p class="text-lg font-light 1md:ml-3 text-purple">@createartsfestival</p>
    </div>
    <div class="square-container grid gap-y-[10px] 1md:gap-y-0 gap-x-[10px] | mt-5 1xl:mt-35">
      <div v-for="(item, i) in NumberOfContents" :key="i" class="square relative box-border">
        <div class="content | overflow-hidden | absolute top-0 left-0 | h-full w-full">
          <img src="../assets/images/banner-mb.jpg" class="object-cover" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      screenSize: 0,
    }
  },
  computed: {
    NumberOfContents() {
      if (this.screenSize > 1365) {
        return 6
      } else if (this.screenSize > 833) {
        return 4
      } else {
        return 6
      }
    },
  },
  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },
  methods: {
    checkScreenSize() {
      this.screenSize = document.documentElement.clientWidth
    },
  },
}
</script>

<style scoped>
.square-container {
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
}
@media screen and (min-width: 834px) {
  .square-container {
    grid-template-columns: repeat(auto-fill, minmax(22%, 1fr));
  }
}
@media screen and (min-width: 1366px) {
  .square-container {
    grid-template-columns: repeat(auto-fill, minmax(14%, 1fr));
  }
}

.square {
  position: relative;
}

.square::before {
  content: '';
  display: block;
  padding-top: 100%;
}
</style>
