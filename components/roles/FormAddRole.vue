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
      <v-row class="my-0">
        <v-col md="12" lg="12" sm="12" class="my-0 py-0">
          <template>
            <v-card-title class="pl-0 pr-0">
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher une permission *" outlined dense
                hide-details clearable></v-text-field>
            </v-card-title>
            <v-data-table v-model="selected" :headers="headers" :items="listpermissions"
              :loading="listpermissions.length ? false : true" loading-text="Chargement... Patientez svp"
              :single-select="singleSelect" item-key="name" show-select class="elevation-1" :search="search">
            </v-data-table>
          </template>
        </v-col>
      </v-row>

      <div class="d-flex flex-row-reverse">
        <v-btn :loading="loading" :disabled="!valid" depressed class="text-white mt-5" color="primary"
        @click="submitForm">
        Enregistrer
      </v-btn>
    </div>
     
    </v-form>
    <Notification :message="message" :color="color" v-if="message" class="my-5 mb-10" />
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import { mapGetters } from 'vuex'
export default {
  components: {
    Notification
  },
  computed: mapGetters({
    listpermissions: 'permissions/listpermissions',
    headers: 'permissions/headerpermissions'
  }),
  data: () => ({
    singleSelect:false,
    loading: false,
    message: null,
    color: null,
    valid: true,
    search: '',
    selected: [],
    valid: true,
    model: {
      name: '',
      description: ''
    },
    rules: {
      slugRules: [
        v => !!v || 'Le slug est obligatoire',
        v => (v && v.length <= 50) || 'Le slug ne doit pas dépasser 50 caractères',
      ],
      descriptionRules: [
        v => !!v || 'La description est obligatoire',
        v => (v && v.length <= 255) || 'La description ne doit pas dépasser 255 caractères',
      ]
    },
  }),
  methods: {
    submitForm() {
      this.loading = true;
      let validation = this.$refs.form.validate()
      let selectedPermissions = this.selected.map((item) => { return item.id })
      validation && this.$mrvciApi.post('/roles', { ...this.model, permissions: selectedPermissions })
        .then((res) => {
          this.$store.dispatch('toast/getMessage', { type: 'success', text: res.data.message || 'Ajout réussi' })
          this.$router.push('/roles');
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