<template>
  <v-app-bar app elevation="0" color="#fff">
    <nuxt-link class="customTopNav flex text-sm-left" to="/">
      <img src="@/static/logo.png" width="170" alt="PLATEFORME DE GESTION DES INSCRIPTIONS">
    </nuxt-link>

    <nuxt-link class="customTopNav flex text-sm-center" v-for="(item, i) in layout" :key="i"
      :to="item.href ? item.href : null">
      <div class="headline"><v-icon :color="$route.path == item.href ? 'primary' : ''">{{ item.icon }}</v-icon></div>
      <span :class="$route.path == item.href ? 'text-primary' : ''">{{ item.title }}</span>
    </nuxt-link>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-responsive max-width="260">
      <v-text-field append-icon="mdi-magnify" outlined rounded dense hide-details
        placeholder="Ex: Numéro de dossier, date de depot"></v-text-field>
    </v-responsive>
    <v-menu offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-avatar size="30px">
            <img src="@/static/avatar/default-user.png" alt="avatar" />
          </v-avatar>
        </v-btn>
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
                <p class="pb-0 mb-2">{{ loggedInUser && loggedInUser.email }}</p>
              </div>
            </v-card>
            <v-card class="d-flex align-center flex-column mt-1" flat tile>
              <v-btn text color="white" depressed @click="goToProfile"
                class="customTopNav pop-user-button flex text-sm-center">
                Parametres
              </v-btn>
            </v-card>
          </div>
          <v-card class="d-flex align-center flex-column pt-0 pb-0" color="border-top" flat tile>
            <v-card-actions v-if="isAuthenticate" class="py-0">
              <v-btn text color="white" depressed @click="logout" :loading="loading" class="my-2">
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
</template>

<script>
export default {
  mounted: function () {
    this.layout = this.$getUserMenu()
    this.isAuthenticate = this.$isLogged()
    this.loggedInUser = this.$getUser()
  },
  data: function () {
    return {
      layout: [],
      loading: false,
      isAuthenticate: false,
      loggedInUser: null
    }
  },
  methods: {
    async logout() {
      await localStorage.removeItem('user');
      this.$router.push('/login');
    },
    goToProfile() {
      this.$router.push('/utilisateurs/detail/' + this.loggedInUser.id);
    },
  }
}
</script>

<style scoped>
.border-top {
  border-top: solid 1px rgba(128, 128, 128, 0.219) !important;
}

.text-primary {
  color: #1976d2 !important;
  font-weight: 500;
}
</style>