<template>
    <div class="custom-container">
        <form-add-test></form-add-test>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddTest from '@/components/tests/FormAddTest';
export default {
  layout: "dashboard",
  components: {
    PageHeader,
    FormAddTest
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
          text: 'Importation',
          disabled: false,
          to: '/addTest',
          exact: true
        },
        {
          text: 'Nouveau test',
          disabled: true,
          to: '#',
          exact: true
        }

      ],
    }
  }

}
</script>