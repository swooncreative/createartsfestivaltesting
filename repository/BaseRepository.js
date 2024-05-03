const url = 'https://admin.createartsfestival.ca/wp-json'
export default ($axios) => (resource) => ({
  index() {
    return $axios.$get(`${url}${resource}`)
  },
  show(slug) {
    return $axios.$get(`${url}${resource}?slug=${slug}`)
  },
  date(slug) {
    return $axios.$get(`${url}${resource}?date=${slug}`)
  },
})
