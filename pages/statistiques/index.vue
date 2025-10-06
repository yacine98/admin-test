<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
  export default {
    layout: "dashboard",
    components: {
      PageHeader
    }

  }
</script>

<style scoped>

</style>
