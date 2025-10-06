<template>

  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
    <div class="custom-container">
      <v-card class="container" flat>
        <form-add-role></form-add-role>
      </v-card>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddRole from '@/components/roles/FormAddRole';
export default {
  layout: "dashboard",
  components: {
    PageHeader,
    FormAddRole
  },
  // middleware: function ({ redirect, $hasPermission }) {
  //   if (!$hasPermission('manage-parameters')) {
  //     return redirect('/')
  //   }
  // },
  mounted: function () {
    this.$store.dispatch('permissions/getList')
  },
  data() {
    return {
      headerItems: [
        {
          text: 'Rôles',
          disabled: false,
          to: '/roles',
          exact: true
        },
        {
          text: 'Nouveau rôle',
          disabled: true,
          to: '/roles/addRole',
          exact: true
        }

      ],
    }
  }

}
</script>