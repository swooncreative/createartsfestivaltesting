export const state = () => ({
  screenSize: 0,
})

export const getters = {
  screenSize(state) {
    return state.screenSize
  },
}

export const mutations = {
  screenSize(state, size) {
    state.screenSize = size
  },
}

export const actions = {
  screenSize({ commit }, size) {
    commit('screenSize', size)
  },
}
