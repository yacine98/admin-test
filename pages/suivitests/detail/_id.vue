<template>
  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
    <div class="custom-container">
      <v-card class="container" flat>
        <v-row align="center" justify="center">
          <v-col cols="12" md="12" lg="12" sm="12">
            <info-test></info-test>
          </v-col>
          <v-col cols="12" md="12" lg="12" sm="12" class="mt-5">
            <actions-test></actions-test>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoTest from '@/components/suivitests/detail/InfoTest';
import ActionsTest from '@/components/suivitests/detail/ActionsTest';
export default {
  layout: "dashboard",
  components: {
    LeftMenu,
    PageHeader,
    InfoTest,
    ActionsTest
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
          text: 'Élèves',
          disabled: false,
          to: '/suivitests',
          exact: true
        },
        {
          text: 'Fiche élève',
          disabled: true,
          exact: true
        }

      ]

    }
  }

}
</script>