<template>
  <div class="container bg-title-grey">
    <div class="row pt-0">
      <div class="col-12 pt-0">
        <div class="custom-container pt-0">
          <v-card class="pa-5" flat v-if="listdonneetests.length > 0">
            <v-row class="d-flex justify-space-between align-center">
              <v-col cols="6">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher une donnée d'activité"
                  class="mt-0" outlined rounded dense hide-details>
                </v-text-field>
              </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="listdonneetests" item-key="id" :items-per-page="5"
              class="flat pt-0" :loading="listdonneetests.length ? false : true"
              loading-text="Chargement... Patientez svp" :search="search">
              <template v-slot:top="{ pagination, options, updateOptions }">
                <v-row class="mb-1 border-bottom-small">
                  <v-col md="6" sm="12" lg="6" class="pb-0 pt-4">
                    <div class="row">
                    </div>
                  </v-col>
                </v-row>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    listdonneetests: 'donneetests/listdonneetests',
    headers: 'donneetests/headerdonneetests'
  }),
  props: ['tab'],
  metaInfo() {
    return {
      tab: this.tab,
    }
  },
  data: () => ({
    search: '',
  })
}
</script>
<style scoped>
.border-bottom-small {
  border-bottom: solid 1px #80808052;
}
</style>