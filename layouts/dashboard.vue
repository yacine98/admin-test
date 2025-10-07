<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="#fff" class="custom-nav" width="350">
      <v-sheet color="#fff" class="pa-2" style="height:80px;">
        <nuxt-link class="customTopNav flex text-sm-left" to="/">
          <img src="@/static/logo-plateforme.png" height="60" alt="PLATEFORME DE GESTION DES INSCRIPTIONS">
        </nuxt-link>
      </v-sheet>
      <v-divider></v-divider>
      <template>
        <v-list class="pa-2">
          <div class="d-flex justify-space-between">
            <div v-for="(item, index) in layout" :key="index">
              <!-- Si l'élément a des sous-menus, afficher un v-menu -->
              <v-menu v-if="item.children && item.children.length" offset-y open-on-hover>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn fab medium v-bind="attrs" v-on="on" outlined color="secondary" class="custom-border-btn"
                    elevation="8" @click="$router.push(item.href)">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(child, i) in item.children" :key="i" @click="$router.push(child.href)">
                    <v-list-item-icon>
                      <v-icon>{{ child.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ child.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-tooltip top v-else>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn fab medium :color="item.focus ? 'primary' : ''" @click="$router.push(item.href)" v-bind="attrs"
                    v-on="on">
                    <v-icon :color="item.focus ? '#fff' : 'secondary'">{{ item.icon }}</v-icon>
                  </v-btn>

                </template>
                <span>{{ item.title }}</span> <!-- Tooltip en haut -->
              </v-tooltip>

            </div>
          </div>
        </v-list>
      </template>

      <v-divider></v-divider>
      <template>
      
          
       
           <v-row justify="left" class="mt-0">
  <v-col cols="12" md="12">
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(bannette, j) in bannettesData"
          :key="j"
          @click="selectBannette(bannette)"
          link
          active-class="highlighted"
          :class="bannette.href === $route.fullPath ? 'highlighted' : ''"
        >
          <v-list-item-icon class="mr-3">
            <v-icon color="primary">{{ bannette.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ bannette.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-col>
</v-row>
           

   
      </template>
    </v-navigation-drawer>

    <v-app-bar elevation="0" app color="primary" class="custom-header" height="80">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="#fff"></v-app-bar-nav-icon>

      <v-toolbar-title class="custom-top-title pl-12">PLATEFORME DE GESTION DES INSCRIPTIONS</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu class="hidden-sm-and-down" offset-y origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab small v-bind="attrs" v-on="on" outlined color="#fff" class="custom-border-btn">
            <v-icon>mdi-account-outline</v-icon>
          </v-btn>
          <!-- <span class="text-white text-uppercase mr-2">{{ loggedInUser && loggedInUser.name }}</span> -->
        </template>
        <template>
          <div class="pop-user">
            <div class="pop-user-top">
              <v-card class="d-flex align-center flex-column mb-3" flat tile>
                <v-avatar size="60px">
                  <img src="@/static/avatar/default-user.png" alt="avatar" />
                </v-avatar>
              </v-card>
              <v-card class="d-flex align-center flex-column" flat tile>
                <div class="">
                  <!-- <h5>{{ loggedInUser && loggedInUser.name }}</h5> -->
                </div>
                <div class="">
                  <p class="pb-0 mb-2">{{ loggedInUser && loggedInUser.username }}</p>
                </div>
              </v-card>
              <v-card class="d-flex align-center flex-column mt-1" flat tile>
                <v-btn text depressed disabled @click="goToProfile" class="customTopNav pop-user-button flex text-sm-center">
                  Mon profil
                </v-btn>
              </v-card>
            </div>
            <v-card class="d-flex align-center flex-column pt-0 pb-0" color="border-top" flat tile>
              <v-card-actions v-if="isAuthenticate" class="py-0">
                <v-btn text color="#000" depressed @click="logout" :loading="loading">
                  <v-icon left>
                    mdi-logout
                  </v-icon>Se déconnecter
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </template>
      </v-menu>
    </v-app-bar>

    <v-main class="bg-grey">
      <div class="custom-main-content">
        <nuxt />
      </div>

    </v-main>
    <v-footer height="auto" class="bg-grey pa-3">
      <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
      <span class="caption mr-1">&copy; {{ new Date().getFullYear() }}PLATEFORME DE GESTION DES INSCRIPTIONS</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppToolbar from '@/components/AppToolbar'

export default {
  // middleware({ redirect, $getToken, $getUser, $isLogged, $loggout }) {
  //   if ($getToken() == null || $getUser() == null || $isLogged() == null || $isLogged() == false) {
  //     $loggout()
  //     return redirect('/login')
  //   }
  // },
  components: {
    AppToolbar
  },
  mounted() {
    this.layout = this.$getUserMenu()
    this.isAuthenticate = this.$isLogged()
    this.loggedInUser = this.$getUser()
    this.$store.dispatch('annees/getList')
    this.getDetail(this.$getUser()?.id)

    // Récupérer la dernière bannette sélectionnée au chargement
    //this.loadSelectedBannette()
  },
  data: () => ({
    bannettesData: [
      {
        id: 1,
        title: "Tableau de bord",
        icon: "mdi-view-dashboard",
        href: "/dashboard"
      },
      {
        id: 2,
        title: "Gérer les inscriptions",
        icon: "mdi-file-document-outline",
        href: "/tests"
      },
      {
        id: 3,
        title: "Suivi des inscriptions",
        icon: "mdi-history",
        href: "/suivitests"
      }
    ],
    layout: [],
    loading: false,
    isAuthenticate: false,
    loggedInUser: null,
    drawer: null,
    listtypebannettes: [],
    selectedBannette: null
  }),
  methods: {
  async logout() {
      await localStorage.removeItem('user');
      this.$router.push('/login');
    },

    goToProfile() {
      this.$router.push('/profil')
    },

    async getDetail(id) {
      const bannettesData = await [
  {
    "id": 1,
    "name": "Tableau de bord",
    "type": "dashboard",
    "icon": "mdi-view-dashboard",
    "endpoint": "/dashboard",
    "clauses": ""
  },
  {
    "id": 2,
    "name": "Gérer les inscriptions",
    "type": "tests",
    "icon": "mdi-file-document-outline",
    "endpoint": "/tests",
    "clauses": "status=active"
  },
  {
    "id": 3,
    "name": "Suivi des inscriptions",
    "type": "tests",
    "icon": "mdi-history",
    "endpoint": "/tests",
    "clauses": "status=archived"
  }
]
this.transformBannettes(bannettesData)
      // this.progress = true
      // this.$mrvciApi.$get('/me')
      //   .then(async (response) => {
      //     await localStorage.setItem('loggedInUser', JSON.stringify(response?.user))
      //     this.transformBannettes(response.bannettes)
      //   }).catch((error) => {
      //     this.$toast.error(error?.response?.data?.message).goAway(5000)
      //   }).finally(() => {
      //     this.progress = false
      //   })

    },

    transformBannettes(bannettesData) {
      const bannettesByType = {}

      bannettesData.forEach(bannette => {
        const formattedType = this.formatTypeForDisplay(bannette.type)

        if (!bannettesByType[formattedType]) {
          bannettesByType[formattedType] = []
        }

        bannettesByType[formattedType].push({
          id: bannette.id, // Ajout de l'ID pour référence
          title: bannette.name,
          icon: bannette.icon || 'mdi-folder-outline',
          href: bannette.endpoint + (bannette.clauses && bannette.clauses !== 'status=' ? '?' + bannette.clauses : ''),
          originalData: bannette // Conservation des données originales
        })
      })

      this.listtypebannettes = Object.keys(bannettesByType).map(type => ({
        type: type,
        bannettes: bannettesByType[type]
      }))
    },

    formatTypeForDisplay(type) {
      if (!type) return 'AUTRES'

      let formatted = type.replace(/[-_]/g, ' ')

      formatted = formatted.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      switch (type) {
        case 'actions-attenuations': return 'Projets atténuations'
          break;
        case 'soutiens': return 'Soutiens'
          break;
        case 'donnees-d-activites': return 'Données activités'
          break;
        case 'donnees-d-emission': return 'Données émissions'
          break;
          case 'suivi-projets': return 'Suivi des données'
          break;
        default: return type
      }
    },

    selectBannette(bannette) {
      if (!bannette || !bannette.title || !bannette.href) {
        return
      }

      try {
        // Stocker les données essentielles + timestamp
        const bannetteToStore = {
          id: bannette.id,
          title: bannette.title,
          href: bannette.href,
          icon: bannette.icon,
          selectedAt: new Date().toISOString(),
          originalData: bannette.originalData // Optionnel: stocker les données complètes
        }

        localStorage.setItem('selectedBannette', JSON.stringify(bannetteToStore))
        this.selectedBannette = bannetteToStore
        this.$router.push({ path: bannette.href })

        // Feedback visuel
        /*  this.$toast.success(`Bannette "${bannette.title}" sélectionnée`, {
           timeout: 1500,
           icon: bannette.icon
         }) */
      } catch (error) {
        this.$toast.error('Erreur lors de la sélection').goAway(2000)
      }
    },

    loadSelectedBannette() {
      const storedBannette = localStorage.getItem('selectedBannette')
      if (storedBannette) {
        try {
          this.selectedBannette = JSON.parse(storedBannette)
          // Optionnel: vérifier si la route actuelle correspond à la bannette stockée
          if (this.$route.path !== this.selectedBannette.href) {
            this.$router.push({ path: this.selectedBannette.href })
          }
        } catch (e) {
          localStorage.removeItem('selectedBannette')
        }
      }
    },

    // Méthode utilitaire pour accéder à la bannette sélectionnée
    getSelectedBannette() {
      return this.selectedBannette || JSON.parse(localStorage.getItem('selectedBannette') || 'null')
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 5px;
}

.custom-border-btn {
  border-width: 2px;
}

.highlighted {
  color: #7aacdd !important;
  background: #00833d1d;
}

.highlighted .v-list-item__icon .v-icon {
  color: #1865b3 !important;
}

.text-menu {
  font-size: 13px !important;
  color: #075F30 !important;
}

.icon-menu {
  color: #075F30 !important;
}

.custom-top-title {
  color: #fff;
  font-weight: 600;
  font-family: "Roboto";
}

.lower-case {
  text-transform: capitalize;
}

.bg-grey {
  background-color: rgb(227, 235, 243) !important;
}

.custom-nav {
  background-color: #fff !important;
  box-shadow: -50px 6px 50px 18px #02622f;
}

.v-expansion-panel-content__wrap {
  padding: 0px;
  flex: 1 1 auto;
  max-width: 100%;
}

.custom-expansion-title {
  font-size: 14px;
  font-weight: 500;
  color: #005b2a;
}

.border-bottom-primary {
  border-bottom: solid 1px #005b2a30;
}

.v-navigation-drawer__border {
  background-color: #fff !important;
}

.custom-main-content {
  padding: 20px;
}

.custom-header {
  text-align: start;
}

</style>