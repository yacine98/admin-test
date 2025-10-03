<template>
  <v-app id="inspire">
    <v-main class="">
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  export default {
    components: {
      AppToolbar
    }
  }
</script>