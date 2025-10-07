<template>
  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
  <div class="custom-container">
    <v-card class="container" flat>
      <form-update-test></form-update-test>
      </v-card>
      
  </div>
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateTest from '@/components/suivitests/modifier/FormUpdateTest';
export default {
layout: "dashboard",
components: {
  PageHeader,
  FormUpdateTest
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
        text: 'Tests',
        disabled: false,
        to: '/suivitests',
        exact: true
      },
      {
        text: 'Modifier test',
        disabled: true,
        to: '#',
        exact: true
      }

    ],
  }
}

}
</script>