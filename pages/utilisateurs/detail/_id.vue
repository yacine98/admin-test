<template>
  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
    <div class="custom-container">
      <v-card class="container" flat>
        <v-row align="center" justify="center">
          <v-col cols="12" md="12" lg="12" sm="12">
            <info-utilisateur></info-utilisateur>
          </v-col>
          <v-col cols="12" md="12" lg="12" sm="12" class="mt-5">
            <actions-utilisateur></actions-utilisateur>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>


</template>

<script>

import PageHeader from '@/components/PageHeader';
import InfoUtilisateur from '@/components/utilisateurs/detail/InfoUtilisateur';
import ActionsUtilisateur from '@/components/utilisateurs/detail/ActionsUtilisateur';
export default {
  layout: "dashboard",
  components: {
    PageHeader,
    InfoUtilisateur,
    ActionsUtilisateur
  },
  // middleware: function ({ redirect, $hasPermission }) {
  //   if (!$hasPermission('manage-users')) {
  //     return redirect('/')
  //   }
  // },
  data() {
    return {
      headerItems: [
        {
          text: 'Utilisateurs',
          disabled: false,
          to: '/utilisateurs',
          exact: true
        },
        {
          text: 'Détail utilisateur',
          disabled: true,
          exact: true
        }

      ]

    }
  }

}
</script>