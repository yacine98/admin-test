<template>
  <div>
    <div class="custom-container ">
      <div class="row">
        <div class="col-4">
          <div>
            <v-card class="full-height" style="overflow-y: auto;" flat>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-treeview :items="treeData" item-text="title" item-key="id" :open.sync="openNodes" activatable
                      @update:active="onItemClicked">
                      <template v-slot:prepend="{ item }">
                        <v-icon v-if="item.children && item.children.length > 0">mdi-folder</v-icon>
                        <v-icon v-else>mdi-file-document</v-icon>
                      </template>
                    </v-treeview>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </div>
        </div>
        <div class="col-8">
          <div class="custom-container">
            <v-card class="pa-5" flat>
              <v-container>
                <v-row
                  class=" mb-5 custom-card-user border-grey bg-light-grey d-flex justify-space-between align-start">
                  <v-col cols="8">
                    <p class="info-profil mb-2"><span>Secteur : </span>Énergie</p>
                    <p class="info-profil mb-2"><span>Catégorie : </span>{{ categorie_combustible_libelle }}</p>
                    <p class="info-profil mb-2"><span>Sous Catégorie : </span>{{
                      sous_categorie_combustible_libelle }}
                    </p>
                  </v-col>
                  <v-col cols="4" class="text-right">
                    <v-autocomplete v-model="selectedAnnee" :items="listannees" outlined dense label="Année *"
                      :rules="anneeRules" item-text="libelle" item-value="id" @change="changeAnnee()" return-object />
                  </v-col>
                </v-row>
                <v-row class="mb-5 custom-card-user border-grey " v-if="selectedItem">
                  <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                    <v-form ref="form1" v-model="validStep1">
                      <v-row>
                        <v-col cols="6" md="6">
                          <v-text-field dense label="Émissions CO2 *" v-model="model.co2" outlined
                            :rules="rules.champRules" />
                        </v-col>
                        <v-col cols="6" md="6">
                          <v-text-field dense label="Émissions CH4 *" v-model="model.ch4" outlined
                            :rules="rules.champRules" />
                        </v-col>
                        <v-col cols="6" md="6">
                          <v-text-field dense label="Émissions N20 *" v-model="model.n2o" outlined
                            :rules="rules.champRules" />
                        </v-col>
                        <v-col cols="6" md="6">
                          <v-text-field dense label="Émissions NOx *" v-model="model.nox" outlined
                            :rules="rules.champRules" />
                        </v-col>
                        <v-col cols="6" md="6">
                          <v-text-field dense label="CO *" v-model="model.co" outlined :rules="rules.champRules" />
                        </v-col>
                        <v-col cols="6" md="6">
                          <v-text-field dense label="NMVOCs *" v-model="model.nmvocs" outlined
                            :rules="rules.champRules" />
                        </v-col>
                        <v-col cols="6" md="6">
                          <v-text-field dense label="SO2 *" v-model="model.so2" outlined :rules="rules.champRules" />
                        </v-col>
                        <v-col cols="6" md="6">
                          <v-text-field dense label="Émissions totales *" v-model="model.activites_totales" outlined
                            :rules="rules.champRules" />
                        </v-col>
                      </v-row>
                    </v-form>

                    <!-- Boutons -->
                    <v-row class="d-flex justify-space-between">
                      <v-col>
                        <v-btn color="primary" @click="submitForm()" :disabled="!(validStep1 && selectedAnnee)"
                          :loading="loading" class="float-right">SOUMETTRE</v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-row>
              </v-container>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: "dashboard",
  // middleware: function ({ redirect, $hasPermission }) {
  //   if (!$hasPermission('manage-collects')) {
  //     return redirect('/')
  //   }
  // },
  computed: mapGetters({

  }),

  data() {
    return {
      listcombustibles: [],
      selectedCombustibles: [],
      listtypecombustibles: [],
      listunites: [],
      progress: false,
      loading: false,
      treeData: [],
      selectedItem: null,
      step: 1, // Étape actuelle
      validStep1: false, // Validation de l'étape 1
      validStep2: false, // Validation de l'étape 2
      validStep3: false, // Validation de l'étape 3
      listallcategories: [],
      listannees: [],
      selectedAnnee: null,
      model: {
        code_categorie: '',
        libelle_categorie: '',
        secteur_id: null,
        secteur: '',
        co2: '',
        ch4: '',
        n2o: '',
        so2: '',
        nmvocs: '',
        co: '',
        nox: '',
        annee_id: null,
        annee: '',
        activites_totales: '',
      },
      rules: {
        champRules: [
          (v) => !!v || "Ce champ est requis",
          (v) => !isNaN(parseFloat(v)) || "Ce champ doit être un nombre",
        ],
        anneeRules: [
          (v) => !!v || "Ce champ est obligatoire",
          (v) => !isNaN(parseFloat(v)) || "Ce champ doit être un nombre",
        ]


      },
    };
  },
  mounted() {
    this.getListTypeCombustibles()
    this.getListCombustibles()
    this.getListUnites()
    this.getList()
    this.getListAllCategories()
    this.getListAnnees()
  },
  methods: {

    changeAnnee() {
      this.model.annee_id = this.selectedAnnee?.id
      this.model.annee = this.selectedAnnee?.libelle
    },

    changeTypeCombustible(item) {
      this.selectedCombustibles = this.listcombustibles.filter(combustible => combustible.type_combustible_id == item.id)
    },getListTypeCombustibles
    () {
      // this.$mrvciApi.$get('/type_combustibles')
      //   .then(async (response) => {
      //     this.listtypecombustibles = response.data
      //   }).catch((error) => {
      //     this.$toast.error(error?.response?.message).goAway(3000)
      //   }).finally(() => {

      //   });

    },
    getListUnites() {
      // this.$mrvciApi.$get('/unites')
      //   .then(async (response) => {
      //     this.listunites = response.data
      //   }).catch((error) => {
      //     this.$toast.error(error?.response?.message).goAway(3000)
      //   }).finally(() => {

      //   });

    },

    getListCombustibles() {
      // this.$mrvciApi.$get('/combustibles')
      //   .then(async (response) => {
      //     this.listcombustibles = response.data
      //     this.selectedCombustibles = response.data
      //   }).catch((error) => {
      //     this.$toast.error(error?.response?.message).goAway(3000)
      //   }).finally(() => {

      //   });

    },

    showForm() {
      this.selectedItem = null
      this.showSecteurForm = true

    },
    async getList() {
      this.progress = true
      // this.$mrvciApi.$get('/categorie_combustibles')
      //   .then(async (response) => {
      //     this.treeData = await this.transformMenuToTree(response.data);
      //     this.openNodes = this.treeData.map(item => item.id);
      //   }).catch((error) => {
      //     this.$toast.error(error?.response?.message).goAway(3000)
      //   }).finally(() => {

      //     this.progress = false
      //   });
    },
    transformMenuToTree(children) {
      return children.map((item) => ({
        id: item.id,
        name: item.libelle,
        title: item.libelle,
        code: item.code,
        parent_id: item.parent_id || null,
        children: item.children ? this.transformMenuToTree(item.children) : [],
      }));
    },
    getListAllCategories() {
      // this.$mrvciApi.$get('/allCategorieCombustibles')
      //   .then(async (response) => {
      //     this.listallcategories = response.data
      //   }).catch((error) => {
      //     this.$toast.error(error?.response?.message).goAway(3000)
      //   }).finally(() => {
      //   });
    },
    getListAnnees() {
      // this.$mrvciApi.$get('/annees')
      //   .then(async (response) => {
      //     this.listannees = response.data
      //   }).catch((error) => {
      //     this.$toast.error(error?.response?.message).goAway(3000)
      //   }).finally(() => {
      //   });
    },
    onItemClicked(activeIds) {
      if (activeIds.length > 0) {
        const findItem = (items, id) => {
          for (let item of items) {
            if (item.id === id) return item;
            if (item.children) {
              const found = findItem(item.children, id);
              if (found) return found;
            }
          }
          return null;
        };

        const selectedTreeItem = findItem(this.treeData, activeIds[0]);
        if (selectedTreeItem && (selectedTreeItem.parent_id)) {

          this.selectItem(selectedTreeItem); // Charge les données dans le formulaire
        } else {
          this.selectItem(null)
        }
        // if (selectedTreeItem && (!selectedTreeItem.children || selectedTreeItem.children.length === 0)) {
        //   // Vérifie si l'élément n'a pas d'enfants
        //   this.selectItem(selectedTreeItem); // Charge les données dans le formulaire
        // } else {
        //   this.selectItem(null)
        // }
      }
    },
    async selectItem(item) {
      this.selectedItem = item; // Charge l'objet original
      // this.selectedCombustibles = item?.combustibles
      this.sous_categorie_combustible_libelle = item?.name
      this.model.code_categorie = item?.code
      let secteur = await this.listallcategories.find(categorie => categorie.code == "1")
      this.model.secteur_id = secteur.id
      this.model.secteur = secteur.libelle
      this.model.libelle_categorie = item?.name
      this.categorie_combustible_libelle = this.listallcategories.find(categorie => categorie.id == item?.parent_id)?.libelle

    },
    nextStep() {
      if (this.step < 3) this.step++;
    },
    previousStep() {
      if (this.step > 1) this.step--;
    },
    async goToStep(targetStep) {
      const formRef = `form${this.step}`;
      const form = this.$refs[formRef];

      if (await form.validate()) {
        this.step = targetStep;
      }
    },
    submitForm() {
      this.loading = true;

      let validation = this.selectedAnnee && this.$refs.form1.validate()
      // validation && this.$mrvciApi.post('/donnee_activites', this.model)
      //   .then((res) => {
      //     this.$store.dispatch('toast/getMessage', { type: 'success', text: res?.data?.message || 'Ajout réussi' })
      //     this.$refs.form1.reset()
      //   })
      //   .catch((error) => {

      //     this.$store.dispatch('toast/getMessage', { type: 'error', text: error || 'Échec de l\'ajout' })
      //   }).finally(() => {
      //     this.loading = false;

      //   });
    },
  },
};
</script>

<style scoped>
.custom-height {
  height: 85vh;
}

.v-treeview-node {
  position: relative;
  padding-left: 24px;
}

.v-treeview-node__root {
  position: relative;
}

.v-treeview-node:before {
  content: "";
  position: absolute;
  top: 0;
  left: 12px;
  bottom: 0;
  border-left: 1px solid #bdbdbd;
}

.v-treeview-node:last-child:before {
  height: 50%;
  bottom: auto;
}

.v-treeview-node__content {
  position: relative;
}

.v-treeview-node__content:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -12px;
  width: 12px;
  border-top: 1px solid #bdbdbd;
}

.bg-light-grey {
  background-color: #f1f6f4b5;
}

.v-stepper__wrapper {
  overflow: hidden;
  transition: none;
  padding: 15px;
}
</style>
