export default {
    getList({ commit }) {
        this.$mrvciApi.$get('roles')
            .then(async (response) => {
                await commit('initlist', response)
                await commit('initSelectList', response)
            }).catch((error) => {

            }).finally(() => {

            });
    },
    async getDetail({ commit }, payload) {
        await commit('initdetail', payload)
    },
    async deleteRole({ commit, dispatch }, payload) {
        await commit('removeItem', payload)
    }
}