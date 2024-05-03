<template>
  <div class="max-w-screen-1xl | mx-auto | pt-0 mb-[44px] 1md:py-12.5 1md:text-right 1md:mb-10">
    <p class="my-5 1md:my-0 | uppercase text-15">
      <nuxt-link to="/" tag="a" class="hover:text-purple transition-all duration-100 ease-in">CREATE! ARTS FESTIVAL</nuxt-link
      ><span v-for="(item, i) in path" :key="i">
        |
        <nuxt-link
          v-if="i !== path.length - 1"
          :to="
            '/' +
            path
              .slice(0, i + 1)
              .toString()
              .replace(',', '/')
              .replace(' ', '-')
          "
          class="hover:text-purple transition-all duration-100 ease-in"
          >{{ item }}
        </nuxt-link>
        <span v-else class="text-purple">{{ item }}</span>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    path() {
      const path = this.$route.path.replace('/', '').split('-').join(' ')
      if (path.includes('/')) {
        return path.split('/')
      } else {
        return [path]
      }
    },
  },
}
</script>

<style></style>
