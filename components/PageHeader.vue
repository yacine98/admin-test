<template>
  <div>
    <v-breadcrumbs :items="items" class="pt-0 pb-0 pl-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
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