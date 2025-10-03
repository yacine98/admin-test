export default {
  async getToken({ commit }, payload) {
    await commit('inittoken', payload)
  },
  async getEmail({ commit }, payload) {
    await commit('initemail', payload)
  }
}