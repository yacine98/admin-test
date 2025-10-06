<template>
  <div>
    <div>     
        <table-test></table-test>
    </div>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader';
import TableTest from "@/components/suivitests/TableTest";

export default {
  layout: "dashboard",
  // middleware: function ({ redirect, $hasPermission }) {
  //   if (!$hasPermission('manage-collects')) {
  //     return redirect('/')
  //   }
  // },
  components: {
    PageHeader,
    TableTest
  },

  data() {
    return {
      headerItems: [
        {
          text: 'Activités',
          disabled: false,
          to: '/suivitests',
          exact: true
        },
        {
          text: 'Liste des données d\'activité',
          disabled: true,
          to: '/suivitests',
          exact: true
        }
      ]
    }
  },

};
</script>
