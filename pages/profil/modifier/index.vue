<template>
  <div>
    <div class="custom-container bg-title-grey mt-6">
      <page-header :items="headerItems" class=""></page-header>
    </div>

    <div class="custom-container">
      <v-tabs-items v-model="tab">
        <div class="custom-container">
          <v-card class="container pl-10 pb-10 pr-10" flat>
            <form-update-user></form-update-user>
          </v-card>
        </div>
      </v-tabs-items>

    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateUser from '@/components/profil/modifier/FormUpdateUser';
export default {
  layout: "dashboard",
  components: {
    PageHeader,
    FormUpdateUser
  },
  // middleware: function ({ redirect, $hasPermission, $getUser }) {

  // },
  mounted: function () {
    this.$store.dispatch('roles/getList')
  },
  data() {
    return {
      tab:'',
      headerItems: [
        {
          text: 'Retour',
          disabled: false,
          to: '/profil',
          exact: true
        }

      ],
    }
  }

}
</script>