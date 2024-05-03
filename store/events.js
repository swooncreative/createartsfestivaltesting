export const state = () => ({
  events: [],
})

export const getters = {
  events(state) {
    return state.events
  },
}

export const mutations = {
  events(state, events) {
    state.events = events
  },
}

export const actions = {
  updateEvents({ commit }, events) {
    commit('events', events)
  },
}
