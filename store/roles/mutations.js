export default {
    initlist(state, newlist) {
        state.listroles = newlist
    },
    initSelectList(state, newlist) {
        state.selectListRoles = newlist
    },
    initheader(state, newlist) {
        state.headerroles = newlist
    },
    initdetail(state, newrole) {
        state.detailrole = newrole
    },
    removeItem(state, payload) {
        state.listroles = state.listroles.filter(item => item.id != payload)
    }
}