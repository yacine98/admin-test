<template>
  <div>
    <div>     
        <table-test></table-test>
    </div>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader';
import TableTest from "@/components/tests/TableTest";

export default {
  layout: "dashboard",
 middleware: 'auth',
  components: {
    PageHeader,
    TableTest
  },
      middleware: function ({ redirect }) {
    if (!localStorage.getItem('user')) {
      return redirect('/login')
    }
  },
  data() {
    return {
      headerItems: [
        {
          text: 'Activités',
          disabled: false,
          to: '/tests',
          exact: true
        },
        {
          text: 'Liste des données d\'activité',
          disabled: true,
          to: '/tests',
          exact: true
        }
      ]
    }
  },

};
</script>
