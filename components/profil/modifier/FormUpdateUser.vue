<template>
  <div>
    <v-form class="text-sm-center" v-model="valid" ref="form" enctype="multipart/form-data">
      <v-row>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Login *" outlined dense v-model="model.username"
            :rules="rules.usernameRules"></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="E-mail *" outlined dense v-model="model.email" :rules="rules.emailRules"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Prénom *" outlined dense v-model="model.firstname"
            :rules="rules.firstnameRules"></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Nom *" outlined dense v-model="model.lastname"
            :rules="rules.lastnameRules"></v-text-field>
        </v-col>

      </v-row>
      <v-row>
        <v-col md="12" lg="12" sm="12">
          <v-autocomplete v-model="model.structure_id" :items="listallstructures" outlined dense label="Structure *"
            item-text="libelle" item-value="id" small-chips :filter="customFilter" :rules="rules.structureRules">
            <template v-slot:item="{ item }">
              {{ item.code }} - {{ item.libelle }}
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12" lg="12" sm="12">
          <v-text-field label="Téléphone mobile *" outlined dense v-model="model.telephone"
            :rules="rules.telephoneRules"></v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex flex-row-reverse">
      <v-btn depressed :loading="loading" :disabled="!valid" class="mr-4 text-white" color="primary"
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
    this.getDetail(this.$getUser()?.id)
    this.$store.dispatch('structures/getListAllStructures');
  },
  computed:
    mapGetters({
      detailutilisateur: 'utilisateurs/detailutilisateur',
      listallstructures: 'structures/listallstructures',
    }),
  data: () => ({
    loading: false,
    message: null,
    color: null,
    valid: true,
    model: {
      id: null,
      name: '',
      firstname: '',
      lastname: '',
      structure_id:null,
      email: '',
      roles: null,
      telephone: ''
    },
    rules: {
      firstnameRules: [
        v => !!v || 'Le prénom est obligatoire',
        v => (v && v.length <= 100) || 'Le prénom ne doit pas dépasser 100 caractères',
      ],
      lastnameRules: [
        v => !!v || 'Le nom est obligatoire',
        v => (v && v.length <= 100) || 'Le nom ne doit pas dépasser 100 caractères',
      ],
      structureRules: [
        v => (!!v) || 'La structure est obligatoire',
      ],
      emailRules: [
        v => !!v || 'L\'adresse email est obligatoire',
        v => /.+@.+\..+/.test(v) || 'L\'adresse e-mail doit être valide',
      ],
      usernameRules: [
        v => !!v || 'Le login est obligatoire',
        v => (v && v.length <= 50) || 'Le login ne doit pas dépasser 50 caractères',
      ],
      telephoneRules: [
        v => !!v || 'Le numéro de téléphone mobile est obligatoire',
        v => (v && v.length <= 25) || 'Le numéro de téléphone mobile ne doit pas dépasser 25 caractères',
      ]
    },

    imageData: null,
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
    getDetail(id) {
      this.$mrvciApi.$get('/users/' + id)
        .then(async (response) => {
          this.$store.dispatch('utilisateurs/getDetail', response.data)
          this.model.id = response.data.id
          this.model.firstname = response.data.firstname,
            this.model.lastname = response.data.lastname,
            this.model.structure_id = response.data.structure_id,
            this.model.telephone = response.data.telephone,
            this.model.email = response.data.email
          this.model.username = response.data.username
          this.model.roles = response.data.roles
        }).catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(5000)

        }).finally(() => {

        });

    },
    handleFileUpload(e) {
      //Récupère le fichier
      const input = this.$refs.file
      const files = input.files

      //Récupère l'extension
      let idxDot = files[0].name.lastIndexOf(".") + 1;
      let extFile = files[0].name.substr(idxDot, files[0].name.length).toLowerCase();
      let size = files[0].size / 1024 / 1024 //La taille en Mbit

      if (size <= 2 && (extFile == "jpg" || extFile == "jpeg" || extFile == "png")) {
        //Affecte le fichier image au modèle avatar
        this.model.avatar = e.target.files[0];

        //Prévisualise l'image
        if (files && files[0]) {
          const reader = new FileReader
          reader.onload = e => {
            this.imageData = e.target.result
          }
          reader.readAsDataURL(files[0])
          this.$emit('input', files[0])
        }
      } else {
        alert("Seules les images jpg/jpeg/png et de taille inférieure à 2Mb sont acceptées !");
      }
    },
    submitForm() {
      let validation = this.$refs.form.validate()
      let selectedRoles = this.model.roles.map((item) => { return item.id })
      this.model.roles = selectedRoles
      this.model.name = this.model.firstname + ' ' + this.model.lastname
      this.loading = true;
      validation && this.$mrvciApi.put('/users/' + this.model.id, { ...this.model, roles: selectedRoles, ...this.model.avatar })
        .then((res) => {
          this.$store.dispatch('toast/getMessage', { type: 'success', text: res.data.message || 'Modification réussie' })
          this.$router.push('/profil');
        })
        .catch((error) => {
          this.$store.dispatch('toast/getMessage', { type: 'error', text: error || 'Échec de la modification' })
        }).finally(() => {
          this.loading = false;

        });
    },
  },
  metaInfo() {
    return {
      items: this.items,
    }
  }
}
</script>