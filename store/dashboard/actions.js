export default {
  async getDashboardData({ commit }, payload) {
    await commit('initdashboardData', payload)
  }
}