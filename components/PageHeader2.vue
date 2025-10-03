<template>
  <div>
    <v-breadcrumbs :items="items" class="pl-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-divider class="mt-2"></v-divider>
    </div>
</template>

  <script>
  export default {
    props: ['items'],
    data: () => ({
    }),
    metaInfo() {
      return {
        items: this.items,
      }
    }
  }
</script>

  <style scoped>


  .theme--light.v-breadcrumbs .v-breadcrumbs__item {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
    color: #02622f;
  }

  .v-breadcrumbs{
    padding: none !important;
  }
</style>