<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value"> {{ item.title }}</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <v-btn depressed rounded color="primary" @click="goToAddUser">
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouvel utilisateur
        </v-btn>
      </div>
    </div>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems" :key="item.value">
        <table-user :tab="item.value"></table-user>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import TableUser from '@/components/utilisateurs/TableUser'
export default {
  components: {
    TableUser
  },
  data: () => ({
    tab: null,
    tabItems: [
      { title: 'Tout', value: 'tout' }
    ],
  }),
  methods: {
    goToAddUser() {
      this.$router.push('/utilisateurs/addUser');
    },
  }
}
</script>
<style scoped>
.border-bottom-small {
  border-bottom: solid 1px #80808052;
}
</style>
