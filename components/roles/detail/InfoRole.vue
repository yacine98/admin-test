<template>
  <v-card class="custom-card-user border-grey">
    <v-card-text>
      <v-row>
        <v-col lg="6" md="6" sm="12">
          <p class="info-profil mb-4"><span>Slug :
            </span>{{ detailrole.name }}
          </p>
          <p class="info-profil"><span>Description :
            </span>{{ detailrole.description }}
          </p>
        </v-col>
        <v-col lg="6" md="6" sm="12">
          <p class="info-profil mb-4"><span>Permission(s) : </span>
            <v-chip color="primary" small outlined class="my-1 mr-1" v-for="permission in detailrole.permissions"
              :key="permission.id">
              {{ permission.description }}
            </v-chip>
          </p>
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
      this.$mrvciApi.$get('/roles/' + id)
        .then(async (response) => {
          this.$store.dispatch('roles/getDetail', response)
        }).catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(5000)

        }).finally(() => {

        });

    },
  },
  computed: mapGetters({
    detailrole: 'roles/detailrole'
  }),
}
</script>
<style scoped>
.border-left {
  border-left: solid 2px rgb(0 0 0 / 4%);
  ;
}
</style>