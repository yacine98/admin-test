<template>
  <div>
    <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div>
    <div class="custom-container">
        <form-import-test></form-import-test>
    </div>
    <div class="custom-container">
        <list-donnee-test></list-donnee-test>
    </div>
  </div>
    
    
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormImportTest from '@/components/tests/FormImportTest';
import ListDonneeTest from '@/components/tests/ListDonneeTest';
export default {
  layout: "dashboard",
  components: {
    PageHeader,
    FormImportTest,
    ListDonneeTest,
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
          text: 'Liste des élèves',
          disabled: false,
          to: '/tests',
          exact: true
        },
        {
          text: 'Importation',
          disabled: true,
        }

      ],
    }
  }

}
</script>