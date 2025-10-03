<template>
  <div class="mt-5 custom-container">
    
    <chiffres :annee="annee"></chiffres>
    <v-row class="d-flex mb-6 mt-6 align-center">
  <!-- Autocomplete + Bouton réinitialiser -->
  <v-col cols="4" class="d-flex align-center">
    <v-autocomplete
      hide-details
      v-model="annee"
      :items="listannees"
      append-icon="mdi-calendar"
      outlined
      dense
      item-text="libelle"
      item-value="id"
      background-color="#fff"
      class="flex-grow-1"
      
    />
  </v-col>

  <!-- Bouton ajouter projet -->
  <v-col cols="4" class="text-right ml-auto">
    <v-btn
      hide-details
      large
      width="100%"
      depressed
      class="text-white"
      color="#00833d"
      @click="addProjet"
    >
      Ajouter un Nouvel Projet
      <v-icon class="ml-2">mdi-plus</v-icon>
    </v-btn>
  </v-col>
</v-row>

    <charts :annee="annee"></charts>
  </div>
</template>

<script>
import Charts from "@/components/statistiques/Charts";
import Chiffres from "@/components/statistiques/Chiffres";

import { mapGetters } from "vuex";

export default {
  layout: "dashboard",
  components: {
    Charts,
    Chiffres,
  },
  mounted: async function () {
    await this.$store.dispatch('annees/getList')
    this.$store.dispatch('annees/getSelectedAnnee')
    this.listannees = await [...this.initiallistannees]
    this.listannees.unshift({
        id: null,
        libelle: "Filtrer par année",
      })
  },
  computed: mapGetters({
    initiallistannees: 'annees/listannees'
  }),
  data() {
    return {
      listannees:[],
      annee: null,
    };
  },
  methods: {
    addProjet() {
        this.$router.push('/projets/addProjet');
      },
      reinitialiser(){
        this.annee = ''
      }
  },
};
</script>
