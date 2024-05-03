<template>
  <div>
    <Header :picture="picture">{{ contact.title.rendered }}</Header>
    <div class="mt-70 1md:mt-100 1xl:mr-70 | 1md:flex">
      <p class="flex-1 | text-purple text-22 1xl:pr-108">{{ contact.acf.gitf_text }}</p>
      <ul class="flex-1 | mt-8 1md:mt-0">
        <li v-for="(item, i) in contactInfo" :key="i" class="group flex mb-6" @click="sendEmail(i)">
          <img :src="require(`../../assets/images/${item.img}.svg`)" :alt="item.img" class="h-6 w-6 | mr-2.5" />
          <p :class="i === 2 && 'underline cursor-pointer group-hover:text-purple | transition-all duration-100 ease-in '">{{ item.content }}</p>
        </li>
      </ul>
    </div>
    <div class="mt-100 -mx-3.5 1md:mx-0 | relative | text-right | h-390 1md:h-300 1xl:h-350 1md:w-full">
      <div class="gmap_canvas h-full w-full overflow-hidden">
        <iframe class="h-full w-full" id="gmap_canvas" :src="`https://maps.google.com/maps?q=${contactInfo[0].content}&t=&z=13&ie=UTF8&iwloc=&output=embed`" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.whatismyip-address.com/divi-discount/"></a
        ><br /><a href="https://www.embedgooglemap.net">google iframe</a>
      </div>
    </div>
    <h2 class="text-28 font-display text-purple uppercase | mt-120 1xl:mx-120">Or Leave a message here!</h2>
    <div class="blue-purple-background | relative | -mx-3.5 1md:mx-0 1xl:mx-120 | px-4 pt-5 pb-60 1md:pb-8 | mt-6">
      <div class="1md:flex">
        <div v-for="(item, i) in form.userInfo" :key="i" class="flex-1" :class="i === 0 ? '1md:pr-2.5' : 'mt-5 1md:mt-0 1md:pl-2.5'">
          <input v-model="item.value" :type="item.type" :placeholder="item.placeholder" class="border-5 border-purple | text-purple font-light | placeholder-purple w-full pl-4 py-2" />
          <p v-if="item.err">{{ item.errMsg }}</p>
        </div>
      </div>
      <textarea v-model="form.textarea.value" :placeholder="form.textarea.placeholder" rows="10" class="resize-none | w-full | border-5 border-purple | mt-5 1md:mt-7 | text-purple font-light | placeholder-purple | px-4 py-2"></textarea>
      <p v-if="form.textarea.err">{{ form.textarea.errMsg }}</p>
      <ButtonLayout :btn="btn" class="mt-8 1md:mt-6 ml-2" @btnClick="submit" />
    </div>
    <transition name="slide-fade">
      <p v-if="formSubmitted" class="mt-5">Message has been sent. We will get back to you shortly!</p>
    </transition>
  </div>
</template>

<script>
import ButtonLayout from '~/components/ButtonLayout.vue'
import Header from '~/components/Header.vue'
export default {
  components: {
    Header,
    ButtonLayout,
  },
  async asyncData(ctx) {
    try {
      const contact = await ctx.app.$getContact.index()
      const footer = await ctx.app.$getFooter.index()
      return {
        contact,
        footer,
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
      formSubmitted: false,
      btn: {
        name: 'Submit',
        buttonStyle: 'bg-purple border-4 border-skyblue text-skyblue text-18 px-7',
        gradient: 'linear-gradient(to right, #9ccfee, #a95ea4)',
      },
      form: {
        userInfo: [
          {
            placeholder: 'Your name',
            value: '',
            err: false,
            errMsg: 'Please enter your name.',
            type: 'text',
          },
          {
            placeholder: 'Email address',
            value: '',
            err: false,
            errMsg: 'Please enter correct email address.',
            type: 'email',
          },
        ],
        textarea: {
          placeholder: 'Leave a message here…',
          value: '',
          err: false,
          errMsg: 'Please enter message.',
        },
      },
    }
  },
  computed: {
    picture() {
      return {
        mobile: this.contact.acf.mobile_banner_image.url,
        tablet: this.contact.acf.tablet_banner_image.url,
        desktop: this.contact.acf.desktop_banner_image.url,
      }
    },
    contactInfo() {
      return [
        {
          img: 'location-purple',
          content: this.footer.acf.fci_address,
        },
        {
          img: 'phone',
          content: this.footer.acf.fci_phone_number,
        },
        {
          img: 'email',
          content: this.footer.acf.fci_email,
        },
      ]
    },
  },
  methods: {
    sendEmail(i) {
      if (i === 2) {
        location.href = `mailto:${this.contactInfo[i].content}`
      }
    },
    async submit() {
      if (this.checkForm()) {
        const emailBody = {
          'your-name': this.form.userInfo[0].value,
          'your-email': this.form.userInfo[1].value,
          'your-message': this.form.textarea.value,
        }

        const form = new FormData()

        for (const field in emailBody) {
          form.append(field, emailBody[field])
        }

        await fetch('https://admin.createartsfestival.ca/wp-json/contact-form-7/v1/contact-forms/415/feedback', {
          method: 'POST',
          body: form,
        }).then((res) =>
          res.json().then((res) => {
            if (res.status === 'mail_sent') {
              this.formSubmitted = true
            }
            setTimeout(() => {
              this.formSubmitted = false
            }, 5000)
          })
        )
      }
    },
    emailValid(val) {
      const reg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      if (!val || !reg.test(val)) {
        return true
      } else {
        return false
      }
    },
    checkForm() {
      if (!this.form.userInfo[0].value) {
        this.form.userInfo[0].err = true
      } else {
        this.form.userInfo[0].err = false
      }
      if (this.emailValid(this.form.userInfo[1].value)) {
        this.form.userInfo[1].err = true
      } else {
        this.form.userInfo[1].err = false
      }
      if (!this.form.textarea.value) {
        this.form.textarea.err = true
      } else {
        this.form.textarea.err = false
      }

      if (!this.form.userInfo[0].value || this.emailValid(this.form.userInfo[1].value) || !this.form.textarea.value) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style scoped>
.blue-purple-background {
  background-image: linear-gradient(to bottom, #9ccfee, #904d94);
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
