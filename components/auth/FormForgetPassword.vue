<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md3 lg3>
            <v-card flat class="elevation-0 pl-5 pr-5 pt-0 pb-0 border-grey">
              <v-card-text>
                <Notification :message="message" :color="color" v-if="message" />
                <div class="layout column align-center py-5">
                  <img src="@/static/logo-plateforme.png" alt="PLATEFORME DE GESTION DES INSCRIPTIONS" width="150" height="">
                  <p class="flex my-8 custom-font-mark">Réinitialisation mot de passe</p>
                </div>
                <v-form class="row text-align-center pt-0" v-model="valid" ref="form" lazy-validation>
                  <v-text-field class="col-md-12 col-lg-12 col-sm-12 pl-4 pr-4 pt-0" dense outlined
                    append-icon="mdi-lock-outline" name="password" label="Nouveau mot de passe" id="password"
                    type="password" v-model="model.password" :rules="rules.passwordRules"></v-text-field>
                  <v-text-field class="col-md-12 col-lg-12 col-sm-12 pl-4 pr-4 pt-0" dense outlined
                    append-icon="mdi-lock-outline" name="password_confirmation" label="Confirmer mot de passe"
                    id="password_confirmation" type="password" v-model="model.password_confirmation"
                    :rules="confirm_passwordRules"></v-text-field>
                  <v-spacer></v-spacer>
                  <div class="layout column align-center col-md-12 col-lg-12 col-sm-12 pt-0">
                    <v-btn depressed rounded block color="primary" class="pl-10 pr-10" @click="submitForm"
                      :loading="loading" :disabled="!valid">Enregistrer</v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
            <div class="layout column align-center py-5">
              <span class="caption mr-1">&copy; {{ new Date().getFullYear() }} PLATEFORME DE GESTION DES INSCRIPTIONS, Tous droits réservés</span>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Notification from '@/components/Notification'
import { mapGetters } from 'vuex'
export default {
  components: {
    Notification
  },
  mounted: function () {
    this.model.email = this.$route.query.email
  },
  computed: {
    ...mapGetters({
      tokenTemporaire: 'forgetpassword/token',
      emailTemporaire: 'forgetpassword/email',
    }),
    confirm_passwordRules() {
      return [
        v => !!v || 'Confirmation mot de passe est obligatoire',
        v => (v && v.length >= 8) || 'Mot de passe doit etre superieur ou égal à 8 caracteres',
        v => v === this.model.password || 'Les mot de passe ne sont pas identiques',
      ];
    },
  },
  data: () => ({
    valid: true,
    loading: false,
    color: null,
    message: null,
    model: {
      email: '',
      password: '',
      password_confirmation: '',
    },
    rules: {
      passwordRules: [
        v => !!v || 'Mot de passe est obligatoire',
        v => (v && v.length >= 8) || 'Mot de passe doit etre superieur ou égal à 8 caracteres',
      ],
      emailRules: [
        v => !!v || 'L\'adresse email est obligatoire',
        v => /.+@.+\..+/.test(v) || 'L\'adresse email doit être valide',
      ]

    },
  }),
  methods: {
    submitForm() {
      let validation = this.$refs.form.validate()
      
      this.loading = true;
      validation && this.$axios.post('/update_password', { ...this.model,email:this.$route.query.email }, { headers: { Authorization: 'Bearer ' + this.$route.query.token } })
        .then((res) => {
          this.message = res.data.message
          this.color = 'success'
          setTimeout(() => {
            this.$router.push('/login');
          }, 1000);
        })
        .catch((error) => {
          this.message = error.response?.data?.message || 'Echec de la connection'
          this.color = 'red'
        }).finally(() => {
          this.loading = false;
        });
    },
  }

};
</script>
<style scoped lang="css">
#login {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}

.custom-font-mark {
  font-family: "MarkProBook";
  font-size: 28px;
  color: #000;
  letter-spacing: -2px;
}

.v-btn {
  min-width: 0 !important;
}

.v-input .v-label {
  font-family: "MarkProBook";
  font-size: 8px !important;
}

.text-decoration-none {
  text-decoration: none !important;
  color: rgba(0, 0, 0, 0.6) !important;
}

.custom-text-small {
  font-size: 10px !important;
}
</style>
