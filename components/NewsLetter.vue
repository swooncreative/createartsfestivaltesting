<template>
  <div class="-mx-3.5 1md:mx-0 border-10 border-skyblue | mt-136 | px-3 1md:px-6 pt-5 pb-9">
    <h2 class="text-34 font-black text-purple uppercase font-display leading-tight 1md:leading-none">{{ data.nwf_header }}</h2>
    <div id="mc_embed_signup" class="1xl:flex | mt-4 1xl:mt-40px">
      <p class="text-lg">{{ data.nwf_content }}</p>
      <form id="mc-embedded-subscribe-form" action="https://culturecrawl.us1.list-manage.com/subscribe/post?u=62a2e8c8e947b6b00793d8a0d&amp;id=17fbd2df16" method="post" name="mc-embedded-subscribe-form" class="validate flex-shrink-0 1xl:w-61%" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll" class="mt-4 1xl:mt-0 1xl:ml-5">
          <div class="1md:flex">
            <label for="mce-EMAIL"></label>
            <input id="mce-EMAIL" name="EMAIL" :placeholder="data.nwf_email_placeholder" type="text" class="w-full border-3 1xl:border-r-0 border-purple | w-full | px-3 py-2 1md:py-0 | text-lg font-light text-purple | placeholder-purple | mb-5 1md:mb-0" />
            <div class="relative inline-block 1md:block | 1md:mb-1.5">
              <input
                id="mc-embedded-subscribe"
                type="submit"
                :value="data.nwf_button_text"
                name="subscribe"
                class="border-3 | relative z-10 | px-4 py-2 | transition-all duration-100 ease-in text-lg text-white bg-pictonblue border-purple linear-gradient(62deg, rgba(169,94,164,1) 5%, rgba(172,214,242,1) 71%) hover:text-skyblue hover:border-skyblue hover:bg-purple"
                @click="submit"
              />
              <div class="absolute w-full h-full top-1.5 right-1.5" :style="{ background: btn.gradient }"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      btn: {
        name: this.data.nwf_button_text,
        buttonStyle: 'text-lg text-white bg-pictonblue border-purple',
        gradient: 'linear-gradient(62deg, rgba(169,94,164,1) 5%, rgba(172,214,242,1) 71%)',
      },
    }
  },
  methods: {
    subscribe() {},
    submit() {},
  },
}
</script>

<style></style>
