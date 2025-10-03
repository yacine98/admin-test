<template>
  <v-card class="custom-card-user border-grey">
    <v-card-text>
      <v-row>
        <v-col md="9" sm="12" lg="9" text-md-left>
          <div class="row">
            <div class="col-md-6">
              <p class="info-profil mb-4"><span>Slug :
                </span>{{ detailpermission.name }}
              </p>
            </div>
            <div class="col-md-6 border-left">
              <p class="info-profil mb-4"><span>Description :
                </span>{{ detailpermission.description }}
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
      this.$mrvciApi.$get('/permissions/' + id)
        .then(async (response) => {
          this.$store.dispatch('permissions/getDetail', response.data)
        }).catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(5000)

        }).finally(() => {

        });

    },
  },
  computed: mapGetters({
    detailpermission: 'permissions/detailpermission'
  }),
}
</script>
<style scoped>
.border-left {
  border-left: solid 2px rgb(0 0 0 / 4%);
  ;
}
</style>