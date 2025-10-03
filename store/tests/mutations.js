export default {
    initlist(state, newlist) {
        state.listtests = newlist
    },
    initheader(state, newlist) {
        state.headertests = newlist
    },
    initheader2(state, newlist) {
        state.headertests2 = newlist
    },
    initdetail(state, newtest) {
        state.detailtest = newtest
    },
    inittotalpage(state, newtotalpage) {
        state.totalPage = newtotalpage
    },
    initperpage(state, newtperpage) {
        state.perPage = newtperpage
    },
    initcurrentpage(state, newtperpage) {
        state.currentPage = newtperpage
    },
    initdatasearch(state, newdatasearch) {
        state.dataSearch = newdatasearch
    },
    removeItem(state, payload) {
        state.listtests = state.listtests.filter(item => item.id != payload)
    }
}