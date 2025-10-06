export default function ({ store, redirect }, inject) {

    const getToken = () => {
        return localStorage.getItem('auth.essToken')
    }

    const getUser = () => {
        return JSON.parse(localStorage.getItem('auth.loggedInUser'));
    }

    const isLogged = () => {
        return JSON.parse(localStorage.getItem('auth.isAuthenticated'))
    }

    const getUserRoles = () => {
        return getUser().roles
    }

    const getUserPermissions = () => {
        let permissions = []
        getUserRoles().map((role) => { permissions = [...permissions, ...role.permissions] })
        let allPermissions = this.$removeDuplicates(permissions)
        return allPermissions
    }

    // const hasPermission = (permission_name) => {
    //     let permissions = getUserPermissions()
    //     let checkpermission = permissions.filter(item => item.name === permission_name).length;
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
            case 'delivre': return 'green'
                break;
            case 'desactive': return 'red'
                break;
            case 'rejete': return 'red'
                break;
            default: return ''
        }
    }

    const loggout = async () => {
        await localStorage.removeItem('auth.essToken')
        await localStorage.removeItem('auth.loggedInUser')
        await localStorage.removeItem('auth.layout')
        await localStorage.removeItem('auth.isAuthenticated')
    }


    inject('getUserPermissions', getUserPermissions)
    inject('getUserRoles', getUserRoles)
    // inject('hasRole', hasRole)
    // inject('hasPermission', hasPermission)
    inject('getToken', getToken)
    inject('isLogged', isLogged)
    inject('loggout', loggout)
    inject('removeDuplicates', removeDuplicates)
    inject('getColore', getColore)
}