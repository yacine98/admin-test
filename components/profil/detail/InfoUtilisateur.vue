<template>

  <v-card class="custom-card-user border-grey">
    <v-card-text>
      <v-row>
        <div class="col-md-4">
          <p class="info-profil mb-4" v-if="detailUtilisateur.name"><span>Prénom(s) et nom :
            </span>{{ detailUtilisateur.name }}</p>
          <p class="info-profil mb-4" v-if="detailUtilisateur.email"><span>Adresse e-mail :
            </span>{{ detailUtilisateur.email }}</p>
          <p class="info-profil mb-4" v-if="detailUtilisateur.telephone"><span>Téléphone :
            </span>{{ detailUtilisateur.telephone }}</p>
          <p class="info-profil mb-4" v-if="detailUtilisateur.adresse"><span>Adresse :
            </span>{{ detailUtilisateur.adresse }}</p>
        </div>
        <div class="col-md-4 border-left">
          <p class="info-profil mb-4"><span>Rôle(s) : </span>
            <v-chip color="primary" small outlined class="my-1 mr-1" v-for="role in detailUtilisateur.roles"
              :key="role.id">
              {{ role.description }}
            </v-chip>
          </p>
          <p class="info-profil mb-4" v-if="detailUtilisateur.structure"><span>Structure : </span>
            <v-chip color="primary" small outlined class="my-1 mr-1">
              {{ detailUtilisateur.structure.libelle }}
            </v-chip>
          </p>
        </div>
      </v-row>
      <v-row>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted: function () {
    this.getDetail(this.$getUser()?.id)
  },
  computed: mapGetters({
    detailUtilisateur: 'utilisateurs/detailutilisateur'
  }),
  data() {
    return {
      id: '',
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
}
</script>