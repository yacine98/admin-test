export default {
    initlist(state, newlist) {
        state.listdonneetests = newlist
    },
    initheader(state, newlist) {
        state.headerdonneetests = newlist
    },
    initdetail(state, newdonneetest) {
        state.detaildonneetest = newdonneetest
    },
    removeItem(state, payload) {
        state.listdonneetests = state.listdonneetests.filter(item => item.id != payload)
    }
}