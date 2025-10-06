<template>
  <div>
    <v-form class="text-sm-left" v-model="valid" ref="form">
      <v-row>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Prénom *" outlined dense v-model="model.prenom"
            :rules="rules.codeCategorieRules"></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field label="Nom *" outlined dense v-model="model.nom"
            :rules="rules.libelleCategorieRules"></v-text-field>
        </v-col>

      </v-row>
      <div class="d-flex flex-row-reverse">
        <v-btn :loading="loading" disabled="true" depressed class="mt-5 text-white" color="primary"
          @click="submitForm">
          Enregistrer
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>

export default {
  layout: "dashboard",

  data() {
    return {
      listannees: [],
      loading: false,
      listsecteurs: [],
      model: {
        prenom: null,
        nom: null,
        co2: null,
      
      },
      rules: {
        required: (v) => !!v || "Ce champ est requis",
        numeric: (v) => !isNaN(parseFloat(v)) || "Ce champ doit être un nombre",
      
      },

    };
  },
  mounted() {
    // this.getDetail(this.$nuxt._route.params.id);

  },
  methods: {
    getDetail(id) {
      // this.$mrvciApi.$get(`/tests/${id}`)
      //   .then(async (response) => {
      //     this.$store.dispatch('tests/getDetail', response.data);
      //     this.model.id = response.data.id;
      //     this.model.prenom = response.data.prenom;
      //     this.model.nom = response.data.nom;

      //   })
      //   .catch((error) => {
      //     this.$toast.error(error?.response?.data?.message).goAway(3000);
      //   });
    },


 
    async submitForm() {
      let validation = this.$refs.form.validate();
    
      this.loading = true;

      // validation &&
      //   this.$mrvciFileApi
      //     .put(`/tests/${this.model.id}`, { ...this.model, prenom: libelleAnnee, annee_id: idAnnee, secteur: libelleSecteur, secteur_id: idSecteur })
      //     .then((res) => {
      //       this.$store.dispatch('toast/getMessage', {
      //         type: 'success',
      //         text: res.data.message || 'Modification réussie',
      //       });
      //       this.$router.push('/activites');
      //     })
      //     .catch((error) => {
      //       this.$store.dispatch('toast/getMessage', {
      //         type: 'error',
      //         text: error || 'Échec de la modification',
      //       });
      //     })
      //     .finally(() => {
      //       this.loading = false;
      //     });
    },
  },
};
</script>

<style scoped>
.custom-height {
  height: 85vh;
}

.v-treeview-node {
  position: relative;
  padding-left: 24px;
}

.v-treeview-node__root {
  position: relative;
}

.v-treeview-node:before {
  content: "";
  position: absolute;
  top: 0;
  left: 12px;
  bottom: 0;
  border-left: 1px solid #bdbdbd;
}

.v-treeview-node:last-child:before {
  height: 50%;
  bottom: auto;
}

.v-treeview-node__content {
  position: relative;
}

.v-treeview-node__content:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -12px;
  width: 12px;
  border-top: 1px solid #bdbdbd;
}

.bg-light-grey {
  background-color: #f1f6f4b5;
}

.v-stepper__wrapper {
  overflow: hidden;
  transition: none;
  padding: 15px;
}
</style>
