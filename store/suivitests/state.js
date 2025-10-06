export default () => ({
    listtests: [],
    headertests : [
        { text: "IEN", value: "ien" },
        { text: "Prénom", value: "prenom" },
        { text: "Nom", value: "nom" },
        { text: "Date de naissance", value: "date_naissance" },
        { text: "Lieu de naissance", value: "lieu_naissance" },
        { text: "Classe", value: "classe" },
        { text: "Inscrit", value: "payed" },
        { text: "Actions", value: "actions", sortable: false }, // Ajout d'une colonne pour actions
    ],
    headertests2 : [
        { text: "IEN", value: "ien" },
        { text: "Prénom", value: "prenom" },
        { text: "Nom", value: "nom" },
        { text: "Date de naissance", value: "date_naissance" },
        { text: "Lieu de naissance", value: "lieu_naissance" },
        { text: "Classe", value: "classe" },
        { text: "Inscrit", value: "payed" },
        { text: "Actions", value: "actions", sortable: false }, // Ajout d'une colonne pour actions
    ],    
    detailtest: {},
    paginationtest: {},
    totalPage: 1,
    perPage: 15,
    currentPage: 1,
    dataSearch: null
})
