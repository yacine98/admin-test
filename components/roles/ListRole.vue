<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value"> {{ item.title }}</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <v-btn  depressed rounded color="primary" @click="goToAddRole">
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouveau rôle
        </v-btn>
      </div>
    </div>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems" :key="item.value">
        <table-role :tab="item.value"></table-role>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import TableRole from '@/components/roles/TableRole'
export default {
  components: {
    TableRole
  },
  data: () => ({
    tab: null,
    tabItems: [
      { title: 'Tout', value: 'tout' }
    ],
  }),
  methods: {
    goToAddRole() {
      this.$router.push('/roles/addRole');
    },
  }
}
</script>