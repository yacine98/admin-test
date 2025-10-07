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
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field v-model="search" label="Recherche par mot-clé (prénom, nom, IEN)" clearable dense outlined
              background-color="white" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-select v-model="filterClasseId" :items="classesDisponibles" item-text="libelle" item-value="id"
              label="Filtrer par classe" clearable dense outlined background-color="white" />
          </v-col>

          <v-col cols="12" md="4">
            <v-select v-model="filterPayed" :items="['Inscrits', 'Non inscrits']" label="Filtrer par statut de paiement"
              clearable outlined dense background-color="white" />
          </v-col>

          <v-col cols="12" md="4">
            <v-menu ref="menu" v-model="menuDate" :close-on-content-click="false" transition="scale-transition"
              offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="filterDate" label="Filtrer par date de paiement" readonly v-bind="attrs"
                  v-on="on" clearable outlined dense background-color="white" />
              </template>
              <v-date-picker v-model="filterDate" @input="menuDate = false" />
            </v-menu>
          </v-col>
        </v-row>
        <v-row class="justify-end mb-2">
          <v-col cols="auto">
            <v-chip color="primary" text-color="white" label>
              <v-icon left small>mdi-account-group</v-icon>
              {{ filteredTests.length }} élève{{ filteredTests.length > 1 ? 's' : '' }}
            </v-chip>
          </v-col>
        </v-row>
        <v-card class="pa-4" flat style="overflow-x: auto;">
          <v-data-table :headers="headers" :items="filteredTests" :items-per-page="perpage" :search="search"
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
      <carte-scolaire v-for="eleve in listtests" :key="'carte-' + eleve.ien" :eleve="eleve"
        :ref="'carte-' + eleve.ien" />
    </div>

    <!-- Billets invisibles pour l'export -->
    <div style="position: absolute; left: -9999px;">
      <billet-template v-for="eleve in listtests" :key="eleve.ien" :eleve="eleve"
        :ref="'billet-' + eleve.ien"></billet-template>
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
      filteredTests: [],
      filterClasseId: null,
      filterPayed: null,
      filterDate: null,
      menuDate: false,
      classesDisponibles: [],
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
  watch: {
    filterClasseId: 'applyFilters',
    filterPayed: 'applyFilters',
    filterDate: 'applyFilters',
    search: 'applyFilters'
  },

  methods: {
    applyFilters() {
      const keyword = this.search?.toLowerCase().trim();

      this.filteredTests = this.listtests.filter(eleve => {
        const matchClasse = this.filterClasseId ? eleve.classe_id === this.filterClasseId : true;
        const matchPayed = this.filterPayed === 'Inscrits' ? eleve.payed === true
          : this.filterPayed === 'Non inscrits' ? eleve.payed === false
            : true;
        const matchDate = this.filterDate ? eleve.payed_at && eleve.payed_at.startsWith(this.filterDate) : true;

        const matchKeyword = keyword
          ? eleve.prenom?.toLowerCase().includes(keyword) ||
          eleve.nom?.toLowerCase().includes(keyword) ||
          eleve.ien?.toLowerCase().includes(keyword)
          : true;

        return matchClasse && matchPayed && matchDate && matchKeyword;
      });
    },

    async getList() {
      try {
        const supabase = this.$supabase;
        // Récupérer les classes
        const { data: classes, error: errorClasses } = await supabase
          .from('classes')
          .select('id, libelle')
          .order('libelle', { ascending: true });

        if (errorClasses) {
          console.error('Erreur chargement classes:', errorClasses.message);
          return;
        }
        this.classesDisponibles = classes;
        // Récupérer les élèves
        const { data: eleves, error: errorEleves } = await supabase
          .from('eleves')
          .select('*')
          .order('nom', { ascending: true });

        if (errorEleves) {
          console.error('Erreur chargement élèves:', errorEleves.message);
          return;
        }
        this.listtests = eleves || [];
        this.applyFilters();
      } catch (err) {
        console.error('Erreur getList:', err);
      }
    },
    async exportCartes() {
      await this.$nextTick();

      for (const eleve of this.listtests) {
        const carteRef = this.$refs['carte-' + eleve.ien];
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
        const billetRef = this.$refs['billet-' + eleve.ien];
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
