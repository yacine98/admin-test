<template>
  <div>
    <v-card-title class="col-6">
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher une permission" class="mt-5" outlined
        rounded dense hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers"
      :items="tab == 'tout' ? listpermissions : listpermissions.filter(permission => permission.status === tab)"
      item-key="id" :items-per-page="5" class="flat pt-4"   :loading="listpermissions.length >= 0 ? false : true"
      loading-text="Chargement... Patientez svp" hide-default-footer
      :search="search" :style="'cursor: pointer'" @click:row="visualiserItem">
      <template v-slot:top="{ pagination, options, updateOptions }">
        <v-row class="mb-1 border-bottom-small">
          <v-col md="6" sm="12" lg="6" class="pb-0 pt-4">
            <div class="row">

            </div>
          </v-col>
          <v-col md="6" sm="12" lg="6" class="pt-0 pb-2">
            <v-data-footer :pagination="pagination" :options="options" @update:options="updateOptions"
              items-per-page-text="$vuetify.dataTable.itemsPerPageText" class="border-top-none margin-none"
              itemsPerPageText='' />
          </v-col>
          <div class="text-center">
            <v-dialog persistent v-model="dialog" width="500">
              <v-card>
                <v-card-title class="text-h5"> Confirmation </v-card-title>
                <v-card-text>Voulez-vous supprimer cet élément ?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary darken-1" text @click="dialog = false" outlined>
                    Annuler
                  </v-btn>
                  <v-btn color="red darken-1" text @click="deleteItem" outlined>
                    Supprimer définitivement
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-row>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list shaped>
            <v-item-group>
              <v-list-item @click="visualiserItem(item)" link class="custom-v-list-action pl-2 pr-1">
                <v-list-item-title>
                  <v-icon small class="mr-2">
                    mdi-information-outline
                  </v-icon>Détail
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="editItem(item)" link class="custom-v-list-action pl-2 pr-1">
                <v-list-item-title>
                  <v-icon small class="mr-2"> mdi-pencil-outline </v-icon>Modifier
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="opendialog(item)"
                class="custom-v-list-action pl-2 pr-1">
                <v-list-item-title>
                  <v-icon small class="mr-2">
                    mdi-delete-outline </v-icon>Supprimer
                </v-list-item-title>
              </v-list-item>
            </v-item-group>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    listpermissions: 'permissions/listpermissions',
    headers: 'permissions/headerpermissions'
  }),
  props: ['tab'],
  metaInfo() {
    return {
      tab: this.tab,
    }
  },
  methods: {
    visualiserItem(item) {
      this.$store.dispatch('permissions/getDetail', item)
      this.$router.push('/permissions/detail/?id=' + item.id);
    },
    editItem(item) {
      this.$store.dispatch('permissions/getDetail', item)
      this.$router.push('/permissions/modifier/' + item.id);
    },
    deleteItem() {
      this.dialog = false
      this.$store.dispatch('toast/getMessage', { type: 'processing', text: 'Traitement en cours ...' })
      this.$mrvciApi.$delete('/permissions/' + this.activeItem.id)
        .then(async (response) => {
          this.$store.dispatch('permissions/deletePermission', this.activeItem.id)
          this.$store.dispatch('toast/getMessage', { type: 'success', text: response?.message || 'Suppression réussie' })
        }).catch((error) => {
          this.$store.dispatch('toast/getMessage', { type: 'error', text: error || 'Échec de la suppression' })
        }).finally(() => {
        });
    },
    opendialog(item) {
      this.dialog = true
      this.activeItem = item
    },
  },
  data: () => ({
    dialog: false,
    search: '',
    items: [],
    page: 1,
    itemsPerPage: '',
    options: {},
    activeItem: {}
  })
}
</script>
<style scoped>
.border-bottom-small {
  border-bottom: solid 1px #80808052;
}
</style>