<template>
  <div class="mt-5 custom-container">

    <chiffres></chiffres>
    <v-row class="d-flex mb-6 mt-6 align-center">


      <!-- Bouton ajouter projet -->
      <v-col cols="4" class="text-right ml-auto">
        <v-btn hide-details large width="100%" depressed class="text-white" color="primary" @click="addInscription">
          Gérer les inscriptions
          <v-icon class="ml-2">mdi-database</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <charts></charts>
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
  middleware: function ({ redirect }) {
    if (!localStorage.getItem('user')) {
      return redirect('/login')
    }
  },
  mounted: async function () {

  },
  computed: mapGetters({

  }),
  data() {
    return {

    };
  },
  methods: {
    addInscription() {
      this.$router.push('/tests');
    },
    reinitialiser() {

    }
  },
};
</script>
