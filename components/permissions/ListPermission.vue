<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value"> {{ item.title }}</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <v-btn  depressed rounded color="primary" @click="goToAddPermission">
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouvelle permission
        </v-btn>
      </div>
    </div>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems" :key="item.value">
        <table-permission :tab="item.value"></table-permission>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import TablePermission from '@/components/permissions/TablePermission'
export default {
  components: {
    TablePermission
  },
  data: () => ({
    tab: null,
    tabItems: [
      { title: 'Tout', value: 'tout' }
    ],
  }),
  methods: {
    goToAddPermission() {
      this.$router.push('/permissions/addPermission');
    },
  }
}
</script>
