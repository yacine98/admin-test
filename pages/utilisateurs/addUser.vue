<template>
  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
    <div class="custom-container">
      <v-card class="container" flat>
        <form-add-user></form-add-user>
      </v-card>
    </div>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader';
import FormAddUser from '@/components/utilisateurs/FormAddUser';
export default {
  layout: "dashboard",
  components: {
    PageHeader,
    FormAddUser
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
          text: 'Nouvel utilisateur',
          disabled: true,
          exact: true
        }

      ],
    }
  }

}
</script>

<style scoped></style>
