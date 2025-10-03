<template>
  <v-card class="mx-auto" max-width="300" tile flat>
    <v-list shaped>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" @click="$router.push({ path: item.link })" link
          active-class="highlighted" :class="item.link === $route.path ? 'highlighted' : ''">
          <v-list-item-icon class="mr-3">
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" class="text-menu"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
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
.highlighted {
  color: #00833D !important;
  background: #00833D !important;
  ;
}

.highlighted .v-list-item__icon .v-icon {
  color: #00833D !important;
}

.text-menu {
  font-size: 13px !important;
}
</style>
