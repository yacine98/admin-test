export default function ({ $axios, store ,redirect}, inject) {
    const token = localStorage.getItem('mrvciToken')

    const mrvciApi = $axios.create({
            baseURL: process.env.baseUrl,
            headers : {
                common: {
                Accept: 'application/json'/* ,
                Authorization: 'Bearer ' + token */
                }
            }
        }
    )
    const maarchApi = $axios.create({
          baseURL: process.env.baseUrlMaarch,
          headers : {
              common: {
             /*  Accept: 'application/json', */
              Authorization: 'Basic ' + Buffer.from('wsbayecheikh:12345678').toString('base64') ,

              }
          }
      }
    )

    mrvciApi.onRequest(config => {
        //Ajoute le token avant chaque request
        const token = localStorage.getItem('mrvciToken')
        config.headers.common['Authorization'] = `Bearer ${token}`;
        config.headers.common['Content-Type'] = 'application/json';
    })


    mrvciApi.onResponse((response) => {
      
    })

    mrvciApi.onError((error) => {
        let code = parseInt(error.response && error.response.status)

        let message = error.response.data.message

        //Deconnecte l'utilisateur si le token n'est plus valide
        if (code === 401) {
            localStorage.removeItem('mrvciToken')
            localStorage.removeItem('loggedInUser')
            localStorage.removeItem('layout')
            localStorage.removeItem('isAuthenticated')
            this.$toast.show('Votre session a expiré. Veuillez vous reconnecter!').goAway(4000)
            this.$router.push('/login');
        }
    })

    /** Api for file submit ************************************************/

    const mrvciFileApi = $axios.create({
        baseURL: process.env.baseUrl,
        headers : {
            common: {
            Accept: 'application/json'/* ,
            Authorization: 'Bearer ' + token */
            }
        }
    }
    )

    mrvciFileApi.onRequest(config => {
        //Ajoute le token avant chaque request
        const token = localStorage.getItem('mrvciToken')
        config.headers.common['Authorization'] = `Bearer ${token}`;
        config.headers.common['Content-Type'] = 'multipart/form-data';
        /* config.headers.common['Content-Type'] = `multipart/form-data`;  */
    })

    mrvciFileApi.onResponse((response) => {
    })

    mrvciFileApi.onError(error => {
        /* const code = parseInt(error.response && error.response.status)
        if (code === 400) {
        redirect('/400')
        } */
    })

    /** Api for Export ************************************************/

    const mrvciExportApi = $axios.create({
        baseURL: process.env.baseUrl,
        headers : {
            common: {
            Accept: 'application/json'/* ,
            Authorization: 'Bearer ' + token */
            }
        }
    }
    )

    mrvciFileApi.onRequest(config => {
        //Ajoute le token avant chaque request
        const token = localStorage.getItem('mrvciToken')
        config.headers.common['Authorization'] = `Bearer ${token}`;
        config.headers.common['Content-Type'] = 'multipart/form-data';
        config.headers.common['Response-Type'] = 'arraybuffer';
        /* config.headers.common['Content-Type'] = `multipart/form-data`;  */
    })

    mrvciFileApi.onResponse((response) => {
    })

    mrvciFileApi.onError(error => {
        /* const code = parseInt(error.response && error.response.status)
        if (code === 400) {
        redirect('/400')
        } */
    })

    inject('mrvciApi', mrvciApi)
    inject('mrvciFileApi', mrvciFileApi)
    inject('mrvciExportApi', mrvciFileApi)
    inject('maarchApi', maarchApi)

}

