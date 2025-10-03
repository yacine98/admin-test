export const state = () => ({
  list: []
})

export const mutations = {
  initlist(state, newlist) {
    state.list = newlist
  }
}