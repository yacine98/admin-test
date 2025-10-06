<template>
  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
    <div class="custom-container">
      <v-card class="container" flat>
        <v-row align="center" justify="center">
          <v-col cols="12" md="12" lg="12" sm="12">
            <info-permission></info-permission>
          </v-col>
          <v-col cols="12" md="12" lg="12" sm="12" class="mt-5">
            <actions-permission></actions-permission>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoPermission from '@/components/permissions/detail/InfoPermission';
import ActionsPermission from '@/components/permissions/detail/ActionsPermission';
export default {
  layout: "dashboard",
  components: {
    LeftMenu,
    PageHeader,
    InfoPermission,
    ActionsPermission
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
          text: 'Détail permission',
          disabled: true,
          exact: true
        }

      ]

    }
  }

}
</script>