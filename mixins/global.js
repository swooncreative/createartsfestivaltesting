export default {
  methods: {
    getPath(url) {
      let anchorLink = ''
      let query = ''
      if (url.includes('#')) {
        anchorLink = '#' + url.split('#')[1]
      }
      if (url.includes('?')) {
        query = '?' + url.split('?')[1]
      }
      return url.includes('createartsfestival.swooncreative.ca') ? `${new URL(url).pathname}${anchorLink}${query}` : url
    },
    addParallax() {
      const scrolled = window.scrollY
      const rate = scrolled * -0.2
      const dots = document.querySelectorAll('.dot')
      dots.forEach((el) => {
        el.style.transform = `translate3d(0px, ${rate}px, 0px)`
      })
    },
    isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return (window.innerHeight || document.documentElement.clientHeight) - rect.top > 100
    },
    combineEvents(eventsArray) {
      // Create an empty object to store unique events
      const uniqueEvents = {};

      // Loop over eventsArray
      for (const event of eventsArray) {
        // Get the name of current event
        const eventName = event.name.text;

        // If the event name exists in uniqueEvents, it is a duplicate event
        if (Object.hasOwn(uniqueEvents, eventName)) {
          // Add the start date of duplicate event to the start date array of the first occurrence of this event
          uniqueEvents[eventName].start.push(event.start);
        } else {
          // Create a new object based on the current event, with start as an array containing the current start date
          uniqueEvents[eventName] = {...event, start: [event.start]};
        }
      }

      // Return the updated eventsArray with no duplicate events and with all start dates for each event
      return Object.values(uniqueEvents);
    },
    adjustEventUrl(url, seriesId) {
      if (seriesId) {
        const splitUrl = url.split("-")
        splitUrl.pop()
        return `${splitUrl.join("-")}-${seriesId}`
      } else {
       return url
      }
    },
    linkProps(url) {
      if (!url.includes('createartsfestival.swooncreative.ca')) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
        }
      } else {
        return {
          is: 'nuxt-link',
          to: this.getPath(url),
        }
      }
    },
  },
}
