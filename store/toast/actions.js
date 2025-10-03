export default {
    async getMessage({commit},payload){
        await commit('initmessage', payload)        
    }
}