<template>
  
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
    <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-role></info-role>
            </v-col>
            <v-col class="mt-5" cols="12" md="12" lg="12" sm="12">
              <actions-role></actions-role>
            </v-col>
          </v-row>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import InfoRole from '@/components/roles/detail/InfoRole';
import ActionsRole from '@/components/roles/detail/ActionsRole';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      InfoRole,
      ActionsRole
    },
    // middleware: function ({redirect,$hasPermission}) {
    //   if(!$hasPermission('manage-parameters')){
    //     return redirect('/')
    //   }
    // },
    data () {
      return {
        headerItems: [
        {
          text: 'Rôles',
          disabled: false,
          to: '/roles',
          exact: true
        },
        {
          text: 'Détail Rôle',
          disabled: true,
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
