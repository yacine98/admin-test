<template>
  <div class="custom-container mt-6">
    <v-tabs v-model="tab">
      <v-tab class="text-normal custom-font-stats-size"> <span class="custom-font-stats-size">Mon profil</span></v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <div class="custom-container">
        <v-card class="container" flat>
          <v-row align="center" justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-utilisateur></info-utilisateur>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-utilisateur></actions-utilisateur>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-tabs-items>

  </div>


</template>

<script>
import PageHeader from '@/components/PageHeader';
import InfoUtilisateur from '@/components/profil/detail/InfoUtilisateur';
import ActionsUtilisateur from '@/components/profil/detail/ActionsUtilisateur';
export default {
  layout: "dashboard",
  components: {
    PageHeader,
    InfoUtilisateur,
    ActionsUtilisateur
  },
  // middleware: function ({ redirect, $hasPermission, $getUser }) {

  // },
  data() {
    return {
      tab:'',
      headerItems: [
        {
          text: 'Mon profil',
          disabled: true,
          exact: true
        }

      ]

    }
  }

}
</script>