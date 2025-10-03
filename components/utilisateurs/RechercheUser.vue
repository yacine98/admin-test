<template>
  <v-form class=" mt-5 row" v-model="valid" ref="form" enctype="multipart/form-data">
    <v-col md="6" lg="6" sm="12" class="mb-0 pb-0 d-flex">
      <v-text-field ref="inputRef" label="Rechercher un utilisateur" outlined dense v-model="model.dataSearch"
        :rules="rules.dataSearchRules" placeholder="Email, Prénom, Nom" clearable :clear-icon-cb="onClearClicked"
        rounded></v-text-field>

    </v-col>

    <v-col lg="3" md="3" sm="12" class="d-flex">
      <v-btn :loading="loading" :disabled="!valid" class="mr-4 text-white" color="secondary" @click="submitForm"
        depressed rounded>
        Rechercher
      </v-btn>
      <v-btn text @click="onClearClicked" rounded color="red">Réinitialiser</v-btn>
    </v-col>
  </v-form>
</template>

<script>
export default {

  data: () => ({
    loading: false,
    message: null,
    color: null,
    valid: true,
    progress: true,
    items: [],
    page: 1,
    totalPages: 1,
    model: {
      dataSearch: '',
    },
    rules: {
      dataSearchRules: [
        v => !!v || 'Champ obligatoire'
      ],
    },
  }),
  methods: {
    onClearClicked() {
      this.$refs.inputRef.clearableCallback()
      this.page = 1
      this.getList()
    },
    submitForm() {
      let validation = this.$refs.form.validate()
      this.loading = true;
      this.$store.commit('utilisateurs/initdatasearch', this.model.dataSearch)
      validation && this.getResult(1, this.model.dataSearch)
    },
    getList() {
      this.page = 1
      this.progress = true
      this.$store.dispatch('utilisateurs/getDataSearch', null)
      this.$mrvciApi.$get('/users?page=1')
        .then(async (response) => {
          this.page = 1
          let totalPages = Math.ceil(response.data.total / response.data.per_page)
          this.$store.dispatch('utilisateurs/getTotalPage', totalPages)
          this.$store.dispatch('utilisateurs/getPerPage', response.data.per_page)
          this.$store.dispatch('utilisateurs/getList', response.data.data)
        }).catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(5000)

        }).finally(() => {
          this.progress = false
        });
    },
    getResult(page, param) {
      this.page = 1
      this.progress = true
      this.$mrvciApi.get('/user-multiple-search/' + param + '?page=' + page)
        .then(async (response) => {
          await this.$store.dispatch('utilisateurs/getList', response.data.data.data)
          this.$store.dispatch('utilisateurs/getTotalPage', response.data.data.last_page)
          this.$store.dispatch('utilisateurs/getPerPage', response.data.data.per_page)

        }).catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(5000)

        }).finally(() => {

          this.progress = false;
          this.loading = false;
        });
    },
  },

}
</script>
