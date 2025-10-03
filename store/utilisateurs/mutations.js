export default {
    initlist(state, newlist) {
        state.listutilisateurs = newlist
    },
    initheader(state, newlist) {
        state.headerutilisateurs = newlist
    },
    initdetail(state, newutilisateur) {
        state.detailutilisateur = newutilisateur
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
        state.listutilisateurs = state.listutilisateurs.filter(item => item.id != payload)
    }
}