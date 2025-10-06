<template>
  <div>
  <v-container fluid>
  <v-row>
    <v-col cols="12" md="6">
      <v-card class="pa-4 elevation-1">
        <div class="text-chiffre">{{ nombreInscritsDuJour }}</div>
        <div>Élèves inscrits aujourd'hui</div>
      </v-card>
    </v-col>

    <v-col cols="12" md="6">
      <v-card class="pa-4 elevation-1">
        <div class="text-chiffre">{{ totalPaiementDuJour }} FCFA</div>
        <div>Total paiement reçu</div>
      </v-card>
    </v-col>
  </v-row>
</v-container>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
export default {

  computed: mapGetters({
    dashboardData: 'dashboard/dashboardData',
  
  }),
data: () => ({
  loading: false,
  nombreInscritsDuJour: 0,
  totalPaiementDuJour: 0
}),

mounted: async function () {
  await this.getStatsDuJour()
},

methods: {
  async getStatsDuJour() {
    this.loading = true
    const supabase = await this.$supabase

    const today = new Date().toISOString().slice(0, 10) // format YYYY-MM-DD

    const { data, error } = await supabase
      .from('eleves')
      .select('id')
      .gte('payed_at', today)

    if (error) {
      console.error('Erreur Supabase:', error.message)
      this.$store.dispatch('toast/getMessage', {
        type: 'error',
        text: 'Erreur lors du chargement des statistiques'
      })
      this.loading = false
      return
    }

    this.nombreInscritsDuJour = data.length
    this.totalPaiementDuJour = data.length * 8000
    this.loading = false
  }
}
};
</script>

<style>
.border-right {
  border-right: solid 2px #e6eaee !important;
}

.no-radius {
  border-radius: 0px 0px 0px 0px !important;
}

.text-chiffre {
  font-size: 20px;
  font-weight: 700;
}

.align-items-center {
  align-items: center;
}

.align-items-end {
  align-items: end;
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