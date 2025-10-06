<template>

  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
    <div class="custom-container">
      <v-card class="container" flat>
        <form-update-role></form-update-role>
      </v-card>
    </div>
  </div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormUpdateRole from '@/components/roles/modifier/FormUpdateRole';
export default {
  layout: "dashboard",
  components: {
    LeftMenu,
    PageHeader,
    FormUpdateRole
  },
  mounted: function () {
    this.$store.dispatch('permissions/getList')
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
          text: 'Rôles',
          disabled: false,
          to: '/roles',
          exact: true
        },
        {
          text: 'Modification',
          disabled: true,
          to: '/roles/addRole',
          exact: true
        }

      ],
    }
  }

}
</script>

<style scoped></style>
