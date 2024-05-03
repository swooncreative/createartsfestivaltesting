<template>
  <div class="relative mt-5 w-full h-360 1md:h-300 1xl:h-523">
    <div class="pointer-events-none | relative z-10 border-8 border-purple bg-cover w-full h-full">
      <div class="inline-block">
        <div class="bg-purple | flex | pr-3 1md:pr-8 pt-0 pb-3.5">
          <img class="w-33 | mr-7 pt-2" src="../assets/images/price-tag.svg" />
          <p class="text-white text-35 font-black">{{ price }}</p>
        </div>
      </div>ef
    </div>
    <div class="absolute -top-2 1md:-top-4 | w-full h-full px-12 pb-4 header-img">
      <VueSlickCarousel v-bind="settings" ref="carousel" class="card-slider w-full h-full overflow-hidden">
        <div v-if="image">
          <div
            class="bg-contain slide bg-pictonblue" style="background-size: 100% auto; background-position: center top"
            :style="{
              'background-image': `url(${image})`,
            }"
          ></div>
          <!-- <img class="px-12 pb-4 object-cover object-center | w-full h-full" src="../assets/images/mb-banner.jpg" /> -->
        </div>

        <template #customPaging="">
          <div class="custom-dot">
            <div></div>
          </div>
        </template>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: {
    VueSlickCarousel,
  },
  props: {
    price: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      settings: {
        arrows: false,
        dots: true,
      },
    }
  },
  computed: {
    picture() {
      return require('../assets/images/banner-mb.jpg')
    },
  },

  mounted() {
    if (document.querySelector('.slick-dots')) {
      const dot = document.querySelector('.slick-dots')
      dot.style.textAlign = 'right'
      dot.style.paddingLeft = '10%'
      dot.querySelectorAll('li').forEach((el) => {
        el.style.margin = '5px'
      })
      window.addEventListener('resize', () => {
        const dot = document.querySelector('.slick-dots')
        dot.style.textAlign = 'right'
        dot.style.paddingLeft = '10%'
        dot.querySelectorAll('li').forEach((el) => {
          el.style.margin = '5px'
        })
      })
    }
    // const header = document.querySelector('.header-img')
    // window.addEventListener('scroll', () => {
    //   if (window.scrollY > 5 && !header.classList.contains('header-transiton')) {
    //     header.classList.add('header-transiton')
    //   } else if (window.scrollY < 6) {
    //     header.classList.remove('header-transiton')
    //   }
    // })
  },
  beforeDestroy() {
    if (document.querySelector('.slick-dots')) {
      const dot = document.querySelector('.slick-dots')
      dot.style.textAlign = 'right'
      dot.style.paddingLeft = '10%'
      dot.querySelectorAll('li').forEach((el) => {
        el.style.margin = '5px'
      })
      window.addEventListener('resize', () => {
        const dot = document.querySelector('.slick-dots')
        dot.style.textAlign = 'right'
        dot.style.paddingLeft = '10%'
        dot.querySelectorAll('li').forEach((el) => {
          el.style.margin = '5px'
        })
      })
    }
    // const header = document.querySelector('.header-img')
    // window.removeEventListener('scroll', () => {
    //   if (window.scrollY > 5 && !header.classList.contains('header-transiton')) {
    //     header.classList.add('header-transiton')
    //   } else if (window.scrollY < 6) {
    //     header.classList.remove('header-transiton')
    //   }
    // })
  },
}
</script>

<style scoped>
.slide {
  min-height: 100vh;
}
.custom-dot {
  margin-top: 1rem;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  position: absolute;
  bottom: 2rem;
  transform: translateX(-20%);
  background-color: #acd6f2;
}
.slick-active .custom-dot {
  background-color: #a95ea4;
}
/* @media (prefers-reduced-motion: no-preference) {
  .header-img {
    transition: transform 0.3s ease-in, padding 0.3s ease-in;
  }
}
.header-transiton {
  transform: translateY(8px);
  padding: 0;
}
@media screen and (min-width: 834px) {
  .header-transiton {
    transform: translateY(16px);
    padding: 0;
  }
} */
</style>
