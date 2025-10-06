<template>
  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
    <div class="custom-container">
      <v-card class="container" flat>
        <form-update-user></form-update-user>
      </v-card>
    </div>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader';
import FormUpdateUser from '@/components/utilisateurs/modifier/FormUpdateUser';
export default {
  layout: "dashboard",
  components: {
    PageHeader,
    FormUpdateUser
  },
  // middleware: function ({ redirect, $hasPermission }) {
  //   if (!$hasPermission('manage-users')) {
  //     return redirect('/')
  //   }
  // },
  mounted: function () {
    this.$store.dispatch('roles/getList')
  },
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
          text: 'Modifier utilisateur',
          disabled: true,
          exact: true
        }

      ],
    }
  }

}
</script>