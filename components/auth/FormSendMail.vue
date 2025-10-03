<template>
  <v-row justify="center">
    <v-dialog persistent v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <a class="caption ml-auto mr-3 text-decoration-none custom-text-small py-5" href="#" v-on="on" v-bind="attrs"
          @click="dialog = true">
          Mot de passe oublié ?
        </a>
      </template>
      <v-card>
        <v-card-text>
          <v-form class="row text-align-center pt-10 pb-5" v-model="valid" ref="form" lazy-validation>
            <v-text-field class="col-md-12 col-lg-12 col-sm-12 pl-4 pr-4 pt-0" dense outlined
              append-icon="mdi-email-outline" name="email" label="Saisir votre email" type="text" v-model="model.email"
              :rules="rules.emailRules">
            </v-text-field>
            <v-spacer></v-spacer>
            <div class="flex align-center pt-0">
              <v-btn color="blue darken-1" text @click="dialog = false">
                Fermer
              </v-btn>
              <v-btn depressed rounded color="primary" class="pl-10 pr-10" @click="sendMail" :loading="loading"
                :disabled="!valid">
                Soumettre
              </v-btn>
            </div>
          </v-form>
          <Notification :message="message" :color="color" v-if="message" class="my-5" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Notification from '@/components/Notification'
export default {
  layout: 'default',
  components: {
    Notification
  },
  data: () => ({
    valid: true,
    dialog: false,
    loading: false,
    color: null,
    message: null,
    model: {
      email: ''
    },
    rules: { 
      emailRules: [
        v => !!v || 'L\'adresse email est obligatoire',
        v => /.+@.+\..+/.test(v) || 'L\'adresse email doit être valide',
      ]
    },
  }),

  methods: {
    async sendMail() {
      let validation = this.$refs.form.validate()
      this.loading = true;
      this.color = "success"
      validation && this.$axios.post('/forget_password', { ...this.model })
        .then((res) => {
          this.$toast.success(res.data.message || 'Vérifiez votre boîte de réception').goAway(4000)
          setTimeout(() => {
            this.$router.push('/login');
          }, 1000);
        })
        .catch((error) => {
          this.$toast.error('Erreur').goAway(4000)
        }).finally(() => {
          this.loading = false;
          this.dialog = false
        });
    }
  }

};
</script>
