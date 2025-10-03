<template>
  <div>
    <v-form class="text-sm-left" v-model="valid" ref="form">
      <v-row>

        <v-col md="12" lg="12" sm="12">
          <v-textarea label="Description *" outlined dense v-model="model.description"
            :rules="rules.descriptionRules"></v-textarea>
        </v-col>
      </v-row>
      <div class="d-flex flex-row-reverse">
      <v-btn :loading="loading" :disabled="!valid" depressed class="mt-5 text-white" color="primary"
        @click="submitForm">
        Enregistrer
      </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted: function () {
    this.getDetail(this.$nuxt._route.params.id);
    
  },
  computed: mapGetters({
    detailpermission: 'permissions/detailpermission'
  }),
  data: () => ({
    loading: false,
    message: null,
    color: null,
    valid: true,
    model: {
      id: null,
      name: '',
      description: '',
      status: 'actif'
    },
    rules: {
      descriptionRules: [
        v => !!v || 'La description est obligatoire'
      ],
    },
  }),
  methods: {
    async getDetail(id) {
      this.$mrvciApi
        .$get(`/permissions/${id}`)
        .then(async (response) => {
          this.$store.dispatch('permissions/getDetail', response.data);
          this.model.id = response.data.id
          this.model.name = response.data.name
          this.model.description = response.data.description
            
        })
        .catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(3000);
        });
    },
    submitForm() {
      this.loading = true;
      let validation = this.$refs.form.validate()
      validation && this.$mrvciApi.put('/permissions/' + this.model.id, { ...this.model })
        .then((res) => {
          this.$store.dispatch('toast/getMessage', { type: 'success', text: res.data.message || 'Modification réussie' })
          this.$router.push('/permissions');
          this.loading = false;
        })
        .catch((error) => {
          this.$store.dispatch('toast/getMessage', { type: 'error', text: error || 'Échec de la modification' })
        }).finally(() => {
          this.loading = false;
        });
    },
  }
}
</script>
