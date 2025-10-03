<template>
  <v-card class="custom-card-test border-grey">
    <v-card-text>
      <v-row>
        <v-col md="9" sm="12" lg="9" text-md-left>
          <div class="row">
            <div class="col-md-6">
              <p class="info-profil mb-4"><span>Prénom : </span>{{ detailTest.prenom }}</p>
            
            </div>

            <div class="col-md-6 border-left">
             
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-md-6">

            </div>

            <div class="col-md-6 border-left">
              <p class="info-profil mb-4"><span>Statut : </span>
                <v-chip :color="getStatusColor(detailTest.status)" small outlined>
                  {{ detailTest.status }}
                </v-chip>
              </p>
              <p class="info-profil mb-4"><span>État : </span>
                <v-chip color="secondary" small outlined>
                  {{ detailTest.state }}
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
import { mapGetters } from 'vuex';

export default {
  mounted() {
    this.getDetail(this.id);
  },
  computed: mapGetters({
    detailTest: 'tests/detailtest'
  }),
  data() {
    return {
      id: this.$route.query.id,
    };
  },
  methods: {
    retour() {
      this.$router.push('/tests');
    },
    getDetail(id) {
      // this.$mrvciApi.$get('/emissions/' + id)
      //   .then(async (response) => {
      //     this.$store.dispatch('tests/getDetail', response.data);
      //   })
      //   .catch((error) => {
      //     this.$toast.error(error?.response?.data?.message).goAway(5000);
      //   });
    },
    getStatusColor(status) {
      switch (status) {
        case 'validé': return 'green';
        case 'rejeté': return 'red';
        case 'en attente': return 'orange';
        default: return 'grey';
      }
    }
  },
};
</script>
