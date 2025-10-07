export default {
  getList({ commit }) {
    // this.$mrvciApi.$get('/donneetests')
    //   .then(async (response) => {
    //     await commit('initlist', response.data)
    //   }).catch((error) => {
    //     this.$toast.error(error?.response?.data?.message).goAway(3000)
    //   }).finally(() => {

    //   });
        commit('initlist',  [
        { prenom: 'Mouhamed', nom: 'Ba', date_naissance:'12/09/2007', lieu_naissance:'Mbour', classe: '2LOB', ien:'496DRQHR' },
        { prenom: 'Seynabou', nom: 'Ba', date_naissance:'03/12/2008', lieu_naissance:'Dakar', classe: '2SOA', ien: '879HVRRP'}
      ])
    
  },
  async getDetail({ commit }, payload) {

    await commit('initdetail', payload)
  },
  async deletedonneetest({ commit }, payload) {
    await commit('removeItem', payload)

  }
}