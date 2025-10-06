<template>
  <div>
    <!-- Loader -->
    <div v-if="loadingUpload" class="no-data loader-overlay">
      <div class="loader"></div>
    </div>

    <!-- Formulaire -->
    <div class="bg-title-grey">
      <div class="custom-container py-4">
        <v-card class="pa-4" flat>

          <v-col cols="12">
            <v-file-input v-model="selectXlsx" label="Charger le fichier (Excel) *" accept=".xlsx" show-size
              @change="uploadXlsx" :rules="[rules.required]" outlined dense />
          </v-col>
          <v-col cols="12" md="6">
            <v-btn color="primary" class="mt-0" block @click="submitForm" depressed dense>
              <v-icon left>mdi-plus</v-icon>
              Importer les données
            </v-btn>
          </v-col>



        </v-card>
      </div>
    </div>

    <!-- Progress Dialog -->
    <v-dialog v-model="progressDialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Importation en cours</v-card-title>
        <v-card-text>
          <v-progress-linear :value="progress" height="20" color="green" striped rounded />
          <div class="mt-2 text-caption text-center">{{ progress }}%</div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import * as XLSX from 'xlsx'
export default {
  layout: "dashboard",
  // middleware: function ({ redirect, $hasPermission }) {
  //   if (!$hasPermission('manage-collects')) {
  //     return redirect('/')
  //   }
  // },
  computed: mapGetters({
    listdonneetests: 'donneetests/listdonneetests',
  }),
  mounted() {
    this.model.loggedInUser = this.$getUser()

  },

  data() {
    return {
      listactions: [],
      valid: false,
      loadingUpload: false,
      listannees: [],

      listcategories: [],
      selectXlsx: null,
      dialog: false,
      progressDialog: false,
      progress: 0,
      loading: false,
      model: {

        annee: null,
        loggedInUser: "",
        status: "init",
        state: "encours",
        action: null
      },
      rules: {
        required: (v) => !!v || "Ce champ est requis",
        numeric: (v) => !isNaN(parseFloat(v)) || "Ce champ doit être un nombre",
      },
    };
  },
  methods: {




    async submitForm() {
      this.progressDialog = true
      this.progress = 0
      this.loading = true

      try {
        const total = this.listdonneetests.length
        if (total === 0) {
          this.$store.dispatch('toast/getMessage', {
            type: 'error',
            text: 'Aucune donnée à importer.'
          })
          this.progressDialog = false
          this.loading = false
          return
        }

        const supabase = await this.$supabase

        for (let i = 0; i < total; i++) {
          const row = this.listdonneetests[i]

          // Construction du payload à insérer
          // Recherche de la classe dans Supabase
          const { data: classeData, error: classeError } = await supabase
            .from('classes')
            .select('id')
            .eq('libelle', row.classe)
            .single()

          if (classeError || !classeData) {
            console.warn(`Classe introuvable pour "${row.classe}" à la ligne ${i + 1}`)
            continue // ignore cette ligne si la classe n'existe pas
          }

          const payload = {
            ien: row.ien || '',
            prenom: row.prenom || '',
            nom: row.nom || '',
            sexe: row.sexe || '',
            date_naissance: row.date_naissance || '',
            lieu_naissance: row.lieu_naissance || '',
            classe: row.classe || '',
            classe_id: classeData.id, // ajout de l’ID trouvé
          }


          const { error } = await supabase.from('eleves').insert(payload)

          if (error) {
            console.error(`Erreur à la ligne ${i + 1} :`, error.message)
            this.$store.dispatch('toast/getMessage', {
              type: 'error',
              text: `Erreur à la ligne ${i + 1} : ${error.message}`
            })
          }

          // Mise à jour de la progression
          this.progress = Math.round(((i + 1) / total) * 100)
          await new Promise(resolve => setTimeout(resolve, 10)) // pour l'effet visuel
        }

        this.$store.dispatch('toast/getMessage', {
          type: 'success',
          text: 'Importation terminée avec succès.'
        })

        this.$store.commit('donneetests/initlist', [])
        this.selectXlsx = null
      } catch (error) {
        this.$store.dispatch('toast/getMessage', {
          type: 'error',
          text: error.message || 'Échec de l\'importation'
        })
      } finally {
        this.loading = false
        this.progressDialog = false
        this.progress = 0
      }
    },

    uploadXlsx() {
      this.loadingUpload = true
      if (!this.selectXlsx) {
        this.$store.commit('donneetests/initlist', []);
        this.loadingUpload = false
        return;
      }

      const fileName = this.selectXlsx.name.toLowerCase();
      if (!fileName.endsWith('.xlsx')) {
        alert("Format de fichier non valide. Veuillez uploader un fichier XLSX.");
        this.$store.commit('donneetests/initlist', []);
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });

          if (!wb.SheetNames.length) {
            alert("Le fichier XLSX est vide.");
            this.$store.commit('donneetests/initlist', []);
            return;
          }

          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

          if (data.length < 2) {
            alert("Le fichier XLSX ne contient pas assez de données.");
            this.$store.commit('donneetests/initlist', []);
            return;
          }

          // Mapper les en-têtes du fichier Excel aux noms attendus
          const expectedHeaders = {
            "IEN": "ien",
            "Prénoms": "prenom",
            "Nom": "nom",
            "Sexe": "sexe",
            "Date": "date_naissance",
            "Lieu": "lieu_naissance",
            "Classe": "classe",
          };

          // Récupération des en-têtes du fichier
          const fileHeaders = data[0].map(header => header.trim());

          // Vérification que toutes les colonnes attendues sont présentes
          const missingHeaders = Object.keys(expectedHeaders).filter(h => !fileHeaders.includes(h));
          if (missingHeaders.length > 0) {
            alert("Les colonnes attendues sont: " + missingHeaders)
            this.$store.commit('donneetests/initlist', []);
            return;
          }

          // Création de l'en-tête formaté pour affichage dans le tableau
          let headerdonneetests = fileHeaders.map(header => ({
            text: header,
            value: expectedHeaders[header], // Mapping vers le nom attendu
            sortable: true
          }));

          this.$store.commit('donneetests/initheader', headerdonneetests);

          let list = [];
          for (let i = 1; i < data.length; i++) {

            let row = {};
            fileHeaders.forEach((header, index) => {
              let key = expectedHeaders[header];
              row[key] = data[i][index] || ''
            });
            list.push(row);

          }
          this.$store.commit('donneetests/initlist', list);
          this.loadingUpload = false
        } catch (error) {

          this.$toast.error("Erreur lors de l'importation du fichier XLSX");
        }
      };

      reader.readAsBinaryString(this.selectXlsx);
      this.selectXlsx = null;
      this.loadingUpload = false
    }
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

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
}

.loader {
  border: 12px solid #f3f3f3;
  border-radius: 50%;
  border-top: 12px solid #ff7900;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.no-data {
  text-align: center;
}
</style>
