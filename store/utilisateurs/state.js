export default () => ({
    listutilisateurs: [],

    headerutilisateurs: [
        { text: 'Prénom(s) et Nom', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Rôles', value: 'roles' },
        { text: 'Statut', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailutilisateur: {},
    paginationUtilisateur: {},
    totalPage: 1,
    perPage: 15,
    currentPage: 1,
    dataSearch: null
})