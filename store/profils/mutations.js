export default {
    initlist(state, newlist) {
        state.listprofils = newlist
    },
    initSelectList(state, newlist) {
        state.selectListprofils = newlist
    },
    initheader(state, newlist) {
        state.headerprofils = newlist
    },
    initdetail(state, newprofil) {
        state.detailprofil = newprofil
    }
}