<template>
  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
    <div class="custom-container">
      <v-card class="container" flat>
        <form-add-permission></form-add-permission>
      </v-card>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddPermission from '@/components/permissions/FormAddPermission';
export default {
  layout: "dashboard",
  components: {
    PageHeader,
    FormAddPermission
  },
  // middleware: function ({ redirect, $hasPermission }) {
  //   if (!$hasPermission('manage-parameters')) {
  //     return redirect('/')
  //   }
  // },
  data() {
    return {
      headerItems: [
        {
          text: 'Permissions',
          disabled: false,
          to: '/permissions',
          exact: true
        },
        {
          text: 'Nouvelle permission',
          disabled: true,
          to: '/permissions/addPermission',
          exact: true
        }

      ],
    }
  }

}
</script>