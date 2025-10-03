<template>
  <v-container fluid>
    <!-- Boutons Importer et Ajouter -->
    <v-row>
      <v-col cols="12">
        <v-row class="mb-0">
          <v-col class="text-right">
            <v-btn depressed rounded color="secondary" @click="goToImportTest" class="mr-2 mb-2">
              <v-icon left>mdi-cloud-upload</v-icon>
              Importer des données
            </v-btn>
          </v-col>

            <v-col class="text-left">
            <v-btn depressed rounded color="secondary" @click="ExportTest" class="mr-2 mb-2">
              <v-icon left>mdi-cloud-upload</v-icon>
              Exporter les billets d'inscription
            </v-btn>
          </v-col>
        </v-row>
        
        <v-card class="pa-4 pa-sm-6" flat style="overflow-x: auto;">
          <v-card-title class="flex-column flex-sm-row pa-0">
            <v-text-field 
              class="col-md-6 col-lg-6 col-sm-12 col-12" 
              rounded 
              v-model="search"
              label="Rechercher une donnée d'activité" 
              outlined 
              dense 
              clearable
              placeholder="Ex: Année, activité, combustible...">
            </v-text-field>
          </v-card-title>

          <v-data-table 
            v-model="selected" 
            :headers="headers" 
            :items="listtests" 
            :items-per-page="perpage"
            class="elevation-0 mt-4" 
            :loading="progress" 
            loading-text="Chargement en cours..." 
            hide-default-footer
            :search="search" 
            @click:row="visualiserItem" 
            style="cursor: pointer">

            <template v-slot:top="{ pagination, options, updateOptions }">
              <v-row class="mb-1 border-bottom-small">
                <v-col cols="12" class="pb-0 pt-0">
                  <!-- Contenu optionnel -->
                </v-col>
              </v-row>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="visualiserItem(item)">
                    <v-list-item-title>
                      <v-icon small class="mr-2">mdi-information-outline</v-icon>Détail
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item  @click="opendialog(item)">
                    <v-list-item-title>
                      <v-icon small class="mr-2">mdi-delete-outline</v-icon>Supprimer
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>

          <!-- Pagination ajustée -->
          <v-row class="mt-3" justify="center" justify-sm="end">
            <v-col cols="12" sm="auto" class="py-0">
              <v-pagination 
                v-model="page" 
                :length="totalpage" 
                :total-visible="$vuetify.breakpoint.xs ? 3 : 5" 
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left" 
                @input="handlePageChange"
                :dense="$vuetify.breakpoint.xs">
              </v-pagination>
            </v-col>
          </v-row>
        </v-card>

        <!-- Dialog de confirmation -->
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {

  mounted() {
    this.getList()
    this.$store.dispatch('statuts/getList')

  },
  computed: mapGetters({
    listtests: 'tests/listtests',
    headers: 'tests/headertests2',
    totalpage: 'tests/totalpage',
    perpage: 'tests/perpage',
    datasearch: 'tests/datasearch',
    liststatuts: 'statuts/liststatuts'
  }),
  props: ['tab'],
  metaInfo() {
    return {
      tab: this.tab,
    }
  },
  methods: {
    submitForm() {
      this.currentTab = 'INIT'
      this.page = 1
      this.loadingTotal = true;
      let validation = this.$refs.form.validate()
      this.loading = true;
      this.$store.commit('tests/initdatasearch', this.model.dataSearch)
      validation && this.getResult(1, this.model.dataSearch)
    },
    onClearClicked() {
      this.page = 1
      this.loadingTotal = true
      this.model.dataSearch = null
      this.$store.commit('tests/initdatasearch', this.model.dataSearch)
      this.$refs.inputRef.clearableCallback()
      this.getList(1)
    },
    updateTotalPage(value) {
      this.loadingTotal = true
      this.page = 1
      this.currentTab = value
      this.progress = true
      // this.$mrvciApi.$get('/emissions?status=' + value + '&page=' + 1)
      //   .then(async (response) => {
      //     this.total = response?.pagination?.total
      //     this.$store.dispatch('tests/getTotalPage', response?.pagination?.total_pages)
      //     this.$store.dispatch('tests/getPerPage', response?.pagination?.per_page)
      //     this.$store.dispatch('tests/getList', response?.data)
      //   }).catch((error) => {
      //     this.$toast.error(error?.response?.data?.message).goAway(5000)

      //   }).finally(() => {
      //     this.loadingTotal = false
      //     this.progress = false
      //   });

    },
    async getList(page) {
      this.progress = true
      const tests = [
  {
    "numero_dossier": "D496DRQHR",
    "ien": "496DRQHR",
    "prenom": "Mouhamed",
    "nom": "Ba",
    "date_naissance": "2007-05-12",
    "lieu_naissance": "Kaolack",
    "niveau": "Seconde",
    "classe": "",
    "statut": "Oriente"
  },
  {
    "numero_dossier": "D879HVRPR",
    "ien": "879HVRRP",
    "prenom": "Seynabou",
    "nom": "Ba",
    "date_naissance": "2010-01-25",
    "lieu_naissance": "Louga",
    "niveau": "Seconde",
    "classe": "2S0A",
    "statut": "Redoublant"
  },
  {
    "numero_dossier": "DT_VPFDF",
    "ien": "T_VPFDF",
    "prenom": "Khady",
    "nom": "Bocoum",
    "date_naissance": "2006-12-31",
    "lieu_naissance": "Mbour",
    "niveau": "Première",
    "classe": "1S1",
    "statut": "Passant"
  },
  {
    "numero_dossier": "D3BTV96Z",
    "ien": "3BTV96Z",
    "prenom": "Fallou",
    "nom": "Camara",
    "date_naissance": "2008-02-12",
    "lieu_naissance": "Thiès",
    "niveau": "Terminale",
    "classe": "TS2A",
    "statut": "Passant"
  },
  {
    "numero_dossier": "DT_VPFDF",
    "ien": "T_UN99F",
    "prenom": "Babacar",
    "nom": "Diouf",
    "date_naissance": "2005-04-24",
    "lieu_naissance": "Fatick",
    "niveau": "Terminale",
    "classe": "TS2B",
    "statut": "Passant"
  }
]
await this.$store.dispatch('tests/getList', tests)
 this.progress = false

      // this.$mrvciApi.$get('/emissions?status=' + this.currentTab + '&page=' + page)
      //   .then(async (response) => {
      //     this.total = response?.pagination?.total
      //     this.$store.dispatch('tests/getTotalPage', response?.pagination?.total_pages)
      //     this.$store.dispatch('tests/getPerPage', response?.pagination?.per_page)
      //     this.$store.dispatch('tests/getList', response?.data)
      //   }).catch((error) => {
      //     this.$toast.error(error?.response?.data?.message).goAway(5000)

      //   }).finally(() => {
      //     this.loadingTotal = false
      //     this.progress = false
      //   });
    },
    getResult(page, param) {
      this.tab = ''
      this.loadingTotal = true
      this.progress = true
      // this.$mrvciApi.get('/emission-multiple-search/' + param + '?page=' + page + '&status=' + this.currentTab)
      //   .then(async (response) => {
      //     this.total = response?.pagination?.total
      //     await this.$store.dispatch('tests/getList', response.data.data.data)
      //     this.$store.dispatch('tests/getTotalPage', response.data.data.last_page)
      //     this.$store.dispatch('tests/getPerPage', response.data.data.per_page)
      //   }).catch((error) => {

      //   }).finally(() => {
      //     this.loadingTotal = false
      //     this.loading = false;
      //     this.progress = false;
      //   });
    },

    handlePageChange(value) {

      this.getList(value)
    },
    visualiserItem(item) {
      this.$store.dispatch('tests/getDetail', item)
      this.$router.push('/tests/detail/?id=' + item.id);
    },
    editItem(item) {
      this.$store.dispatch('tests/getDetail', item)
      this.$router.push('/tests/modifier/' + item.id);
    },
    async deleteItem() {
      this.dialog = false
      this.$store.dispatch('toast/getMessage', { type: 'processing', text: 'Traitement en cours ...' })
      // this.$mrvciApi.$delete('/emissions/' + this.activeItem.id)
      //   .then(async (response) => {
      //     this.$store.dispatch('tests/deletetest', this.activeItem.id)
      //     this.$store.dispatch('toast/getMessage', { type: 'success', text: response?.message || 'Suppression réussie' })
      //   }).catch((error) => {
      //     this.$store.dispatch('toast/getMessage', { type: 'error', text: error || 'Échec de la suppression' })
      //   }).finally(() => {

      //   });
    },
    opendialog(item) {
      this.dialog = true
      this.activeItem = item
    },
    goToAddTest() {
      this.$router.push('/tests/addTest');
    },
    goToImportTest() {
      this.$router.push('/tests/importTest');
    },
  },
  data: () => ({
    loadingTotal: true,
    model: {
      dataSearch: '',
    },
    rules: {
      dataSearchRules: [
      ],
    },
    currentTab: '',
    status: ['active', 'inactive'],
    dialog: false,
    progress: true,
    selected: [],
    search: '',
    items: [],
    page: 1,
    itemsPerPage: '',
    activeItem: {}
  })
}
</script>
<style scoped>
.circle-number {
  font-size: 16px;
  color: white;
  background-color: #7e4f25;
  padding: 5px;
  padding-right: 10px;
  padding-left: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
}

.border-bottom-small {
  border-bottom: solid 1px #80808052;
}

.v-tab {
  justify-content: flex-start;
}

.bg-primary {
  background-color: #ff7900;
}

/* Ajustements pour petits écrans */
@media (max-width: 600px) {
  .v-data-table {
    width: 100%;
    overflow-x: auto;
    display: block;
  }
  .v-pagination {
    flex-wrap: wrap;
    justify-content: center;
  }
  .v-pagination__item {
    margin: 2px;
  }
}
</style>
