<template>
  <div>
    <v-form class="text-sm-left" v-model="valid" ref="form">
      <v-row>
        <v-col md="12" lg="12" sm="12">
          <v-text-field label="Slug *" outlined dense v-model="model.name" :rules="rules.slugRules"></v-text-field>
        </v-col>
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
import Notification from '@/components/Notification'
export default {
  components: {
    Notification
  },
  data: () => ({
    loading: false,
    message: null,
    color: null,
    valid: true,
    model: {
      name: '',
      description: ''
    },
    rules: {
      slugRules: [
        v => !!v || 'Le slug est obligatoire'
      ],
      descriptionRules: [
        v => !!v || 'La description est obligatoire'
      ],
    },
  }),
  methods: {
    submitForm() {
      this.loading = true;
      let validation = this.$refs.form.validate()
      validation && this.$mrvciApi.post('/permissions', { ...this.model })
        .then((res) => {
          this.$store.dispatch('toast/getMessage', { type: 'success', text: res.data.message || 'Ajout réussi' })
          this.$router.push('/permissions');
        })
        .catch((error) => {
          this.$store.dispatch('toast/getMessage', { type: 'error', text: error || 'Échec de l\'ajout' })
        }).finally(() => {
          this.loading = false;

        });
    },
  }
}
</script>