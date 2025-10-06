<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row class="mb-0">
          <v-col class="text-right mb-2">
            <v-btn color="primary" @click="goToImportTest">
              <v-icon left>mdi-cloud-upload</v-icon>Importer la liste des élèves
            </v-btn>
          </v-col>
          <!-- <v-col class="text-left">
            <v-btn color="primary" @click="exportPDF">
              <v-icon left>mdi-cloud-download</v-icon>Exporter les billets
            </v-btn>
          </v-col> -->
          <!-- <v-col class="text-left">
            <v-btn color="primary" @click="exportCartes">
              <v-icon left>mdi-cloud-download</v-icon>Exporter les cartes
            </v-btn>
          </v-col> -->
        </v-row>

        <v-card class="pa-4" flat style="overflow-x: auto;">
          <v-data-table :headers="headers" :items="listtests" :items-per-page="perpage" :search="search"
            class="elevation-0 mt-4" @click:row="visualiserItem" :style="'cursor: pointer'">
            <template v-slot:item.actions="{ item }">
              <v-btn small @click="visualiserItem(item)">Détail</v-btn>
            </template>
            <template v-slot:[`item.payed`]="{ item }">
              <v-chip :color="$getColore(item.payed)" outlined>
                {{ $getLibelleByKey(item.payed) }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <!-- Cartes scolaires invisibles -->
    <div style="position: absolute; left: -9999px;">
      <carte-scolaire v-for="eleve in listtests" :key="'carte-' + eleve.numero_dossier" :eleve="eleve"
        :ref="'carte-' + eleve.numero_dossier" />
    </div>

    <!-- Billets invisibles pour l'export -->
    <div style="position: absolute; left: -9999px;">
      <billet-template v-for="eleve in listtests" :key="eleve.numero_dossier" :eleve="eleve"
        :ref="'billet-' + eleve.numero_dossier"></billet-template>
    </div>
  </v-container>
</template>

<script>
import BilletTemplate from '@/components/tests/templates/BilletTemplate.vue'
import CarteScolaire from '@/components/tests/templates/CarteScolaire.vue'



import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  components: {
    BilletTemplate,
    CarteScolaire
  },
  data() {
    return {
      search: '',
      perpage: 10,
      listtests: [],
      headers: [
        { text: 'IEN', value: 'ien' },
        { text: 'Prénom(s)', value: 'prenom' },
        { text: 'Nom', value: 'nom' },
        { text: 'Sexe', value: 'sexe' },
        { text: 'Date de naissance', value: 'date_naissance' },
        { text: 'Lieu de naissance', value: 'lieu_naissance' },
        { text: 'Classe', value: 'classe' },
        { text: 'Inscrit', value: 'payed' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {


    async getList() {
      try {
        const supabase = await this.$supabase

        const { data, error } = await supabase
          .from('eleves')
          .select('*')
          .order('nom', { ascending: true }) // optionnel

        if (error) {
          console.error('Erreur Supabase:', error.message)
          this.$store.dispatch('toast/getMessage', {
            type: 'error',
            text: 'Erreur lors du chargement des élèves'
          })
          return
        }

        this.listtests = data || []
      } catch (err) {
        console.error('Erreur getList:', err)
        this.$store.dispatch('toast/getMessage', {
          type: 'error',
          text: 'Erreur inattendue'
        })
      }
    },
    async exportCartes() {
      await this.$nextTick();

      for (const eleve of this.listtests) {
        const carteRef = this.$refs['carte-' + eleve.numero_dossier];
        if (!carteRef || !carteRef[0]) continue;

        const element = carteRef[0].$el;
        const canvas = await html2canvas(element, { scale: 2 });

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: [420, 595] // Format A6
        });

        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 420, 595);
        pdf.save(`${eleve.prenom}_${eleve.nom}_carte.pdf`);
      }
    },

    async exportPDF() {
      await this.$nextTick(); // attend que tous les billets soient rendus

      for (const eleve of this.listtests) {
        const billetRef = this.$refs['billet-' + eleve.numero_dossier];
        if (!billetRef || !billetRef[0]) continue;

        const element = billetRef[0].$el;
        const canvas = await html2canvas(element, { scale: 2 });

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        pdf.save(`${eleve.prenom}_${eleve.nom}_billet.pdf`);
      }
    },
    goToImportTest() {
      // redirection vers la page d'import
      this.$router.push('/tests/importTest')
    },
    visualiserItem(item) {
      this.$store.dispatch('tests/getDetail', item)
      this.$router.push('/tests/detail/?id=' + item.id);
    },
  }
}
</script>
