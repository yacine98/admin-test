<template>
  <v-row align="center" justify="space-around">
    <v-btn outlined rounded color="primary" v-on:click="retour()">
      <v-icon left>
        mdi-arrow-left
      </v-icon>
      Retour à la liste
    </v-btn>
    <v-btn rounded outlined v-on:click="modifier()">
      <v-icon left>
        mdi-pencil
      </v-icon>
      Modifier les infos
    </v-btn>
    <v-dialog persistent v-model="dialog" max-width="800px">
      <template v-slot:activator="{}">
        <v-btn outlined rounded color="red" v-on:click="reinitialiser()">
          <v-icon left>
            mdi-lock-reset
          </v-icon>
          Réinitialiser le mot de passe
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="pa-5">Réinitialisation du mot de passe
                                        <v-spacer></v-spacer>
                                        <v-btn class="custom-close" color="primary" outlined shaped icon
                                            @click="closeDialog()">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </v-card-title>
        <v-card-text>
          <v-container>
            <v-form class="row text-align-center" v-model="valid" ref="form" lazy-validation>
              <v-text-field class="col-md-12 col-lg-12 col-sm-12 pl-4 pr-4 pt-0" dense outlined
                name="password" label="Nouveau mot de passe" id="password"
                :append-icon="passwordFieldType === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="togglePasswordVisibility()" :type="passwordFieldType"  v-model="model.password" :rules="rules.passwordRules"></v-text-field>
              <v-text-field class="col-md-12 col-lg-12 col-sm-12 pl-4 pr-4 pt-0" dense outlined
               name="password_confirmation" label="Confirmer le mot de passe" id="password_confirmation"
                :append-icon="confirmPasswordFieldType === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="toggleConfirmPasswordVisibility()" :type="confirmPasswordFieldType" v-model="model.password_confirmation"
                :rules="rules.confirm_passwordRules.concat(passwordConfirmationRule)"></v-text-field>
              <v-spacer></v-spacer>
              <div class="layout column align-center col-md-12 col-lg-12 col-sm-12 pt-0">
                <v-btn depressed block color="primary" class="mt-5 pl-10 pr-10" @click="submitForm"
                  :loading="loading" :disabled="!valid">Enregistrer</v-btn>
              </div>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted: function () {
    this.model.email = this.detailUtilisateur.email
  },
  computed: {
    ...mapGetters({
    detailUtilisateur: 'utilisateurs/detailutilisateur'
    
  }),
  passwordConfirmationRule() {
      return () => (this.model.password === this.model.password_confirmation) || 'Les mots de passe ne sont pas identiques'
    },

},
  data: () => ({
    valid:false,
    loading: false,
    dialog: false,
    model: {
      email: '',
      password: '',
      password_confirmation: '',
    },
    rules: {
      passwordRules: [
        v => !!v || 'Le mot de passe est obligatoire',
        v => (v && v.length >= 6) || 'Le mot de passe doit contenir au moins 6 caractères',
        v => /[A-Z]/.test(v) || 'Le mot de passe doit contenir au moins une majuscule',
        v => /\d|[^A-Za-z0-9]/.test(v) || 'Le mot de passe doit contenir au moins un chiffre ou un caractère spécial (!@#$%^&*(),.?":{}|<>)',
      ],
      confirm_passwordRules: [
        v => !!v || 'Veuillez confirmer le mot de passe',
      ]
    },
    passwordFieldType: 'password',
    confirmPasswordFieldType: 'password',
  }),
  methods: {
    closeDialog() {
      this.dialog = false
      this.$refs.form.reset()
    },
    submitForm() {
      let validation = this.$refs.form.validate()
      this.loading = true;
      validation && this.$mrvciApi.post('/update_password', { ...this.model })
        .then((res) => {
          this.message = res.data.message
          this.color = 'success'
          this.$store.dispatch('toast/getMessage', { type: 'success', text: res.data.message })
        })
        .catch((error) => {
          this.message = error.response?.data?.message || 'Échec de la connexion'
          this.color = 'red'
        }).finally(() => {
          this.loading = false;

          this.dialog = false
        });
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    },
    retour() {
      this.$router.push('/utilisateurs');
    },
    modifier() {
      this.$router.push('/utilisateurs/modifier/' + this.detailUtilisateur.id);
    },
    reinitialiser() {
      this.dialog = true
    },
  },
}
</script>
<style scoped>
.custom-close:hover {
  background: rgba(255, 0, 0, 0.212);
}
</style>