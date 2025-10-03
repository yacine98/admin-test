export default {
    initlist(state, newlist) {
        state.listpermissions = newlist
    },
    initheader(state, newlist) {
        state.headerpermissions = newlist
    },
    initdetail(state, newpermission) {
        state.detailpermission = newpermission
    },
    removeItem(state, payload) {
        state.listpermissions = state.listpermissions.filter(item => item.id != payload)
    }
}