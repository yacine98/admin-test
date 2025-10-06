export default {
    async getList({ commit }, payload) {
        await commit('initlist', payload)
    },
    async getDetail({ commit }, payload) {
        await commit('initdetail', payload)
    },
    async deletetest({ commit, dispatch, state }, payload) {
        await commit('removeItem', payload)
    },
    async getTotalPage({ commit }, payload) {
        await commit('inittotalpage', payload)
    },
    async getPerPage({ commit }, payload) {
        await commit('initperpage', payload)
    },
    async getCurrentPage({ commit }, payload) {
        await commit('initcurrentpage', payload)
    },
    async getDataSearch({ commit }, payload) {
        await commit('initdatasearch', payload)
    },
}