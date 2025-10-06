<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <form-update-permission></form-update-permission>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormUpdatePermission from '@/components/permissions/modifier/FormUpdatePermission';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormUpdatePermission
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
          text: 'Permissions',
          disabled: false,
          to: '/permissions',
          exact: true
        },
        {
          text: 'Modifier permission',
          disabled: true,
          exact: true
        }
        
        ],
      }
    }

  }
</script>

<style scoped>

</style>
