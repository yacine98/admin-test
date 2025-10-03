<template>
  <div>
    <v-form class="text-sm-center" v-model="valid" ref="form" enctype="multipart/form-data">
      <v-row>
        <v-col md="4" lg="4" sm="12">
          <v-text-field label="Prénom *" outlined dense v-model="model.firstname"
            :rules="rules.firstnameRules"></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12">
          <v-text-field label="Nom *" outlined dense v-model="model.lastname"
            :rules="rules.lastnameRules"></v-text-field>
        </v-col>

        <v-col md="4" lg="4" sm="12">
          <v-text-field label="Téléphone *" outlined dense v-model="model.telephone"
            :rules="rules.firstnameRules"></v-text-field>
        </v-col>

        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Adresse e-mail *" outlined dense v-model="model.email"
            :rules="rules.emailRules"></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Username *" outlined dense v-model="model.username"
            :rules="rules.usernameRules"></v-text-field>
        </v-col>


        <v-col lg="6" md="6" sm="12">
          <v-autocomplete v-model="model.roles" :items="listroles.filter(role => role.name != 'super_admin')"
            :rules="rules.rolesRules" outlined dense multiple small-chips label="Rôle(s) *" item-text="description"
            item-value="id" clearable return-object></v-autocomplete>
        </v-col>

        <v-col lg="6" md="6" sm="12">
          <v-autocomplete v-model="model.type" :items="typeItems" :rules="rules.typeRules" outlined dense small-chips
            label="Type *" item-text="description" item-value="libelle" clearable></v-autocomplete>
        </v-col>

        <v-col md="12" lg="12" sm="12">
          <v-autocomplete v-model="model.structure_id" :items="listallstructures" outlined dense label="Structure *"
            item-text="libelle" item-value="id" small-chips :filter="customFilter" :rules="rules.structureRules">
            <template v-slot:item="{ item }">
              {{ item.code }} - {{ item.libelle }}
            </template>
          </v-autocomplete>
        </v-col>
        <v-col md="12" lg="12" sm="12">
          <v-autocomplete v-model="model.secteur_id" :items="listallsecteurs" outlined dense label="Secteur"
            item-text="libelle" item-value="id" small-chips :filter="customFilter2" :rules="rules.secteurRules">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {
    this.getDetail(this.$nuxt._route.params.id);
    this.$store.dispatch('structures/getListAllStructures');
    this.$store.dispatch('secteurs/getListAllSecteurs');
  },
  computed: mapGetters({
    detailutilisateur: 'utilisateurs/detailutilisateur',
    listroles: 'roles/selectlistroles',
    listallstructures: 'structures/listallstructures',
    listallsecteurs: 'secteurs/listallsecteurs',
  }),
  data: () => ({
    loading: false,
    valid: true,
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
      firstname: '',
      lastname: '',
      telephone: '',
      email: '',
      roles: null,
      structure_id: null,
      secteur_id: null,
      username: '',
      type: null,
      status: '',
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
      rolesRules: [
        v => (v && !!v.length) || 'Le rôle est obligatoire',
      ],
      typeRules: [
        v => (v && !!v.length) || 'Le type d\'utilisateur est obligatoire',
      ],
      structureRules: [
        v => (!!v) || 'La structure est obligatoire',
      ],

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

    getDetail(id) {
      this.$mrvciApi
        .$get(`/users/${id}`)
        .then(async (response) => {
          await this.$store.dispatch('utilisateurs/getDetail', response.data);
          this.model.id = response.data.id;
          this.model.username = response.data.username;
          this.model.firstname = response.data.firstname;
          this.model.lastname = response.data.lastname;
          this.model.telephone = response.data.telephone;
          this.model.email = response.data.email;
          this.model.roles = await response.data.roles;
          this.model.type = response.data.type;
          this.model.status = response.data.status;
          this.model.structure_id = response.data.structure_id
          this.model.secteur_id = response.data.secteur_id


        })
        .catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(3000);
        });
    },
    submitForm() {
      let validation = this.$refs.form.validate();
      let selectedRoles = this.model.roles.map((item) => item.id);
      this.model.roles = selectedRoles;
      this.loading = true;

      validation &&
        this.$mrvciFileApi
          .put(`/users/${this.model.id}`, { ...this.model, roles: selectedRoles })
          .then((res) => {
            this.$store.dispatch('toast/getMessage', {
              type: 'success',
              text: res.data.message || 'Modification réussie',
            });
            this.$router.push('/utilisateurs');
          })
          .catch((error) => {
            this.$store.dispatch('toast/getMessage', {
              type: 'error',
              text: error || 'Échec de la modification',
            });
          })
          .finally(() => {
            this.loading = false;
          });
    },

  },
};
</script>
