<template>
  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
    <div class="custom-container">
      <v-card class="container" flat>
        <table-user></table-user>
      </v-card>
    </div>
  </div>
</template>

<script>

import TableUser from '@/components/utilisateurs/TableUser'

export default {
  layout: "dashboard",
  // middleware: function ({ redirect, $hasPermission }) {
  //   if (!$hasPermission('manage-users')) {
  //     return redirect('/')
  //   }
  // },
  components: {
    TableUser
  },

  data() {
    return {
      headerItems: [
      {
          text: 'Paramétrage',
          disabled: false,
          to: '/parametres',
          exact: true
        },
        {
          text: 'Liste des utilisateurs',
          disabled: true,
          to: '/utilisateurs',
          exact: true
        }
      ]
    }
  }

}
</script>