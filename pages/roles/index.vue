<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-role></list-role>  
    </v-card>
  </div> 
</div>
</template>

<script>

import PageHeader from '@/components/PageHeader';
import ListRole from '@/components/roles/ListRole'
  export default {
    layout: "dashboard",
    // middleware: function ({redirect,$hasPermission}) {
    //   if(!$hasPermission('manage-parameters')){
    //     return redirect('/')
    //   }
    // },
    components: {
      PageHeader,
      ListRole
    },
    mounted: function() {
      this.$store.dispatch('roles/getList')
    },
    data () {
      return {
        headerItems: [
        {
          text: 'Paramétrage',
          disabled: false,
          to: '/parametres',
          exact: true
        },
          {
            text: 'Liste des rôles',
            disabled: true,
            to: '/roles',
            exact: true
          }
        ]
      }
    }

  }
</script>