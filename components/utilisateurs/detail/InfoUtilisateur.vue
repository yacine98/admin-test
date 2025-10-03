<template>
  <v-card class="custom-card-user border-grey">
    <v-card-text>
      <v-row>
        <v-col md="9" sm="12" lg="9" text-md-left>
          <div class="row">
            <div class="col-md-6 ">
              <p class="info-profil mb-4"><span>Prénom(s) et nom : </span>{{ detailUtilisateur.name }}</p>
              <p class="info-profil mb-4"><span>Adresse e-mail : </span>{{ detailUtilisateur.email }}</p>
              <p class="info-profil mb-4"><span>Téléphone : </span>{{ detailUtilisateur.telephone }}</p>
            </div>
            <div class="col-md-6 border-left">

              <p class="info-profil mb-4"><span>Rôle(s) : </span>
                <v-chip color="primary" small outlined class="my-1 mr-1" v-for="role in detailUtilisateur.roles"
                  :key="role.id">
                  {{ role.description }}
                </v-chip>
              </p>
              <p class="info-profil mb-4" v-if="detailUtilisateur.centres"><span>Centre fiscal : </span>
                <v-chip color="primary" small outlined class="my-1 mr-1" v-for="centre in detailUtilisateur.centres"
                  :key="centre.id">
                  {{ centre.tax_centre_desc }}
                </v-chip>
              </p>
              <p class="info-profil mb-4" v-if="detailUtilisateur.structure"><span>Structure : </span>
                <v-chip color="primary" small outlined class="my-1 mr-1" 
                  >
                  {{ detailUtilisateur.structure.libelle }}
                </v-chip>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted: function () {
    this.getDetail(this.id)
  },
  data() {
    return {
      id: this.$nuxt._route.query.id,
    }
  },
  methods: {
    getDetail(id) {
      this.progress = true
      this.$mrvciApi.$get('/users/' + id)
        .then(async (response) => {

          this.$store.dispatch('utilisateurs/getDetail', response.data)
        }).catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(5000)

        }).finally(() => {

        });

    },
  },
  computed: mapGetters({
    detailUtilisateur: 'utilisateurs/detailutilisateur'
  }),

}
</script>
