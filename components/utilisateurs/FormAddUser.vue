<template>
  <div>
    <v-form class="text-sm-center" v-model="valid" ref="form" enctype="multipart/form-data">
      <v-row>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Prénom *" outlined dense v-model="model.firstname"
            :rules="rules.firstnameRules"></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Nom *" outlined dense v-model="model.lastname"
            :rules="rules.lastnameRules"></v-text-field>
        </v-col>

        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Adresse e-mail *" outlined dense v-model="model.email"
            :rules="rules.emailRules"></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Username *" outlined dense v-model="model.username"
            :rules="rules.usernameRules"></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Mot de passe *" outlined title="Actualisez le mot de passe "
            append-icon="mdi-sync-circle" @click:append="generatedPassword()" dense v-model=model.password
            :rules="rules.passwordRules"></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Téléphone *" outlined dense v-model="model.telephone"
            :rules="rules.telephoneRules"></v-text-field>
        </v-col>
        <v-col lg="6" md="6" sm="12">
          <v-autocomplete v-model="model.roles" :items="listroles.filter(role => role.name != 'super_admin')"
            :rules="rules.rolesRules" outlined dense multiple small-chips label="Rôle(s) *" item-text="description"
            item-value="id" clearable return-object>
          </v-autocomplete>
        </v-col>

        <v-col lg="6" md="6" sm="12">
          <v-autocomplete v-model="model.type" :items="typeItems" :rules="rules.typeRules" outlined dense small-chips
            label="Type *" item-text="description" item-value="libelle" clearable>
          </v-autocomplete>
        </v-col>


        <v-col md="12" lg="12" sm="12">
          <v-autocomplete v-model="model.structure_id" :items="listallstructures" outlined dense label="Structure"
            item-text="libelle" item-value="id" small-chips :filter="customFilter2" :rules="rules.structureRules">
            <template v-slot:item="{ item }">
              {{ item.code }} - {{ item.libelle }}
            </template>
          </v-autocomplete>
        </v-col>
        <v-col md="12" lg="12" sm="12">
          <v-autocomplete v-model="model.secteur_id" :items="listallsecteurs" outlined dense label="Secteur"
            item-text="libelle" item-value="id" small-chips :filter="customFilter" :rules="rules.secteurRules">
            <template v-slot:item="{ item }">
              {{ item.code }} - {{ item.libelle }}
            </template>
          </v-autocomplete>
        </v-col>
        <v-col lg="6" md="6" sm="12">
          <v-radio-group v-model="model.status" row>
            Statut
            <v-radio style="margin-left: 3%;" label="Actif" value="active"></v-radio>
            <v-radio label="Inactif" value="inactive"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <div class="d-flex flex-row-reverse">
        <v-btn :loading="loading" :disabled="!valid" class="mr-4 text-white" color="primary" @click="submitForm">
          Enregistrer
        </v-btn>
      </div>

    </v-form>
    <Notification :message="message" :color="color" v-if="message" class="my-5" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Notification from '@/components/Notification'
export default {
  components: {
    Notification
  },
  mounted: function () {
    this.$store.dispatch('roles/getList')
    this.$store.dispatch('structures/getListAllStructures')
    this.$store.dispatch('secteurs/getListAllSecteurs')
    this.generatedPassword()
  },
  computed: {
    ...mapGetters({
      listroles: 'roles/selectlistroles',
      listallstructures: 'structures/listallstructures',
      listallsecteurs: 'secteurs/listallsecteurs',
    })
  },
  data: () => ({
    loading: false,
    message: null,
    color: null,
    valid: true,
    message: null,
    getValPass: '',
    typeItems: [
      {
        "libelle": "standard",
        "description": "Standard"
      },
      {
        "libelle": "administrateur_fonctionnel",
        "description": "Administrateur fonctionnel"
      },
      {
        "libelle": "administrateur_technique",
        "description": "Administrateur technique"
      }
    ],
    model: {
      structure_id: '',
      secteur_id: '',
      firstname: '',
      username: '',
      lastname: '',
      email: '',
      roles: null,
      type: null,
      status: '',
      telephone: '',
      password: ''
    },
    rules: {
      firstnameRules: [
        v => !!v || 'Le prénom est obligatoire',
        v => (v && v.length <= 120) || 'Le prénom ne doit pas dépasser 120 caractères',
      ],
      lastnameRules: [
        v => !!v || 'Le nom est obligatoire',
        v => (v && v.length <= 50) || 'Le nom ne doit pas dépasser 50 caractères',
      ],
      emailRules: [
        v => !!v || 'L\'adresse e-mail est obligatoire',
        v => /.+@.+\..+/.test(v) || 'L\'adresse e-mail doit être valide',
      ],
      usernameRules: [
        v => !!v || 'Ce champ est obligatoire',
        v => (v && v.length <= 50) || 'Ce champ ne doit pas dépasser 50 caractères',
      ],
      passwordRules: [
        V => !!V || 'Le mot de passe est obligatoire',
        (V) => !!V || 'Le mot de passe est obligatoire.',
        //(V) => (V && /\d/.test(V)) || 'Au moins un chiffre',
        (V) => (V && /[A-Z]{1}/.test(V)) || 'Le mot de passe doit contenir au moins une majuscule',
        (V) => (V && /[^A-Za-z0-9]/.test(V)) || 'Le mot de passe doit contenir au moins un caractère spécial',
      ],
      rolesRules: [
        v => (v && !!v.length) || 'Le rôle est obligatoire',
      ],
      typeRules: [
        v => (v && !!v.length) || 'Le type d\'utilisateur est obligatoire',
      ],
      telephoneRules: [
        v => !!v || 'Le téléphone est obligatoire',
      ],
      structureRules: [
        v => (!!v) || 'La structure est obligatoire',
      ]
    },
  }),
  methods: {
    customFilter(item, query, text) {
      if (!query) return true;
      const search = query.toLowerCase();
      return (
        item.code.toLowerCase().includes(search) ||
        item.libelle.toLowerCase().includes(search)
      );
    },
     customFilter2(item, query, text) {
      if (!query) return true;
      const search = query.toLowerCase();
      return (
        item.code.toLowerCase().includes(search) ||
        item.libelle.toLowerCase().includes(search)
      );
    },
    submitForm() {
      let validation = this.$refs.form.validate()
      let selectedRoles = this.model.roles && this.model.roles.map((item) => { return item.id })
      this.model.roles = selectedRoles
      this.loading = true;
      validation && this.$mrvciFileApi.post('/users', { ...this.model, roles: selectedRoles })
        .then((res) => {
          this.$store.dispatch('toast/getMessage', { type: 'success', text: res.data.message })
          this.$router.push('/utilisateurs');
        })
        .catch((error) => {
          this.$store.dispatch('toast/getMessage', { type: 'error', text: error || 'Échec de l\'ajout ' })
        }).finally(() => {
          this.loading = false
        });
    },
    generatedPassword() {
      const minLength = 8
      const passwordLength = minLength

      const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
      const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const numberChars = '0123456789'
      const symbolChars = '?*_!'

      // Base characters for random selection
      const allChars = lowerCaseChars + upperCaseChars + numberChars + symbolChars

      let password = ''

      // Ensure at least one uppercase and one symbol
      password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]
      password += symbolChars[Math.floor(Math.random() * symbolChars.length)]

      // Fill the rest of the password
      for (let i = 2; i < passwordLength; i++) {
        const randomChar = allChars[Math.floor(Math.random() * allChars.length)]
        password += randomChar
      }

      // Shuffle the password to randomize position of required characters
      password = password
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('')

      this.model.password = password
    }

  },
}

</script>