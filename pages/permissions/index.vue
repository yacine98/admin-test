<template>
  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
    <div class="custom-container">
      <v-card class="container" flat>
        <list-permission></list-permission>
      </v-card>
    </div>
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader';
import ListPermission from '@/components/permissions/ListPermission'
export default {
  layout: "dashboard",
  // middleware: function ({ redirect, $hasPermission }) {
  //   if (!$hasPermission('manage-parameters')) {
  //     return redirect('/')
  //   }
  // },
  components: {
    PageHeader,
    ListPermission
  },
  mounted: function () {
    this.$store.dispatch('permissions/getList')
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
          text: 'Liste des permissions',
          disabled: true,
          to: '/permissions',
          exact: true
        }
      ]
    }
  }

}
</script>

<style scoped></style>
