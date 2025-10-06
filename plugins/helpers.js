import layout from '@/static/data/layout'
import layoutadmin from '@/static/data/layoutadmin'
export default function ({ store, redirect }, inject) {

    const getToken = () => {
        return localStorage.getItem('mrvciToken')
    }

    const getUser = () => {
        const fakeUser = {
            firstname: "Yacine",
            lastname: "Dia",
            id: "123456",
            email: "yacine.dia@example.com",
            token: "abc123xyz789"
        };

        // Stocker l'utilisateur fictif dans le localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(fakeUser));

        return JSON.parse(localStorage.getItem('loggedInUser'));
    }

    const isLogged = () => {
        return JSON.parse(localStorage.getItem('isAuthenticated'))
    }

    const getUserRoles = () => {
        return getUser()?.roles
    }

    const getUserPermissions = () => {
        let permissions = []
        getUserRoles()?.map((role) => { permissions = [...permissions, ...role.permissions] })
        let allPermissions = removeDuplicates(permissions)
        return allPermissions
    }
    //Cette fonction permet de créer le menu à partir des permissions de l'utilisateur connecté
    const getUserMenu = (array) => {
        let layoutPrincipal = layout.menuItems
        let menu = []
        layoutPrincipal?.map((item) => {
            // if (hasPermission(item.name))
            menu = [...menu, item]
        })
        return menu
    }
    //Cette fonction permet de créer le menu à partir des permissions de l'utilisateur connecté
    const getParametreMenu = (array) => {
        let layoutPrincipal = layoutadmin.menuItems
        let menu = []
        layoutPrincipal?.map((item) => {
            // if (hasPermission(item.name))
            menu = [...menu, item]
        })

        return menu
    }
    const getLibelleByKey = (key) => {
        const libelles = {

            'date_debut': 'Date de début',
            'true': 'Oui',
            'false': 'Non',

        };

        return libelles[key] || key;
    };

    // const hasPermission = (permission_name) => {
    //     let permissions = getUserPermissions()
    //     let checkpermission = permissions?.filter(item => item.name === permission_name).length;
    //     if (checkpermission == 1)
    //         return true
    //     else
    //         return false
    // }

    // const hasRole = (role_name) => {
    //     let roles = getUserRoles()
    //     let checkRole = roles?.filter(item => item.name === role_name)?.length;
    //     if (checkRole == 1)
    //         return true
    //     else
    //         return false
    // }

    const removeDuplicates = (array) => {
        let uniq = {};
        return array.filter(obj => !uniq[obj.id] && (uniq[obj.id] = true))
    }

    const getColore = (status) => {
        switch (status) {
            case true: return 'green'
                break;
            case 'actif': return 'green'
                break;
            case 'livre': return 'green'
                break;
            case 'innactif': return 'orange'
                break;
            case 'suspendu': return 'red'
                break;
            case false: return 'red'
                break;
            case 'encours': return 'yellow'
                break;
            case 'brouillon': return 'blue'
                break;
            case 'INIT': return 'green'
                break;
            case 'necessaire': return 'blue'
                break;
            case 'recu': return 'green'
                break;
            case 'delivre': return 'green'
                break;
            case 'desactive': return 'red'
                break;
            case 'rejete': return 'red'
                break;
            default: return ''
        }
    }
    const getNameBySlug = (slug) => {
        switch (slug) {
            case 'brouillon': return 'Brouillon'
                break;
            case 'US Dollar': return 'US Dollar ($)'
                break;
            case 'Euro': return 'Euro (€)'
                break;
            default: return slug
        }
    }
    const loggout = async () => {
        await localStorage.removeItem('mrvciToken')
        await localStorage.removeItem('loggedInUser')
        await localStorage.removeItem('layout')
        await localStorage.removeItem('isAuthenticated')
    }


    inject('getUser', getUser)
    inject('getUserPermissions', getUserPermissions)
    inject('getUserRoles', getUserRoles)
    // inject('hasRole', hasRole)
    // inject('hasPermission', hasPermission)
    inject('getToken', getToken)
    inject('isLogged', isLogged)
    inject('loggout', loggout)
    inject('removeDuplicates', removeDuplicates)
    inject('getColore', getColore)
    inject('getNameBySlug', getNameBySlug)
    inject('getUserMenu', getUserMenu)
    inject('getParametreMenu', getParametreMenu)
    inject('getLibelleByKey', getLibelleByKey)
}