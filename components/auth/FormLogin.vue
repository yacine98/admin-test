<template>
  <div class="full-height custom-div-bg d-flex flex-row">
    <v-col cols="6" :cols="screenWidth > 800 ? 5 : 12" class="d-flex custom-vcol flex-column">
      <!-- Contenu du formulaire -->
      <div class="py-6 custom-padding" flat>
        <div class="d-flex justify-center">
          <img class="white--text mt-6 mb-6 pa-6" width="60%" src="@/static/logo-plateforme.png">
        </div>
        <h3 class="text-center custom-title pa-6 mt-6">PLATEFORME DE GESTION <br> DES INSCRIPTIONS</h3>
        <div class="pa-6 mb-6">
          <v-form class="row text-align-center py-4" ref="form">
            <v-text-field color="secondary" outlined class="custom-text-field col-md-12 pl-4 pr-4 pt-0"
              prepend-inner-icon="mdi-account-outline" name="email" label="Identifiant" type="text"
              v-model="model.username" :rules="rules.emailRules">
            </v-text-field>
            <v-text-field color="secondary" class="custom-text-field col-md-12 pl-4 pr-4 pt-6" outlined
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="passwordFieldType === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="togglePasswordVisibility()" name="password" label="Mot de passe" id="password"
              :type="passwordFieldType" v-model="model.password" :rules="rules.passwordRules">
            </v-text-field>
            <div class="col-md-12 pl-0 pr-4 pt-0 pb-0 mt-6 d-flex justify-content-between align-items-center">
              <v-checkbox dense v-model="checkbox" rounded class="pl-3 pt-0" color="#ffc542">
                <template v-slot:label>
                  <div class="caption pt-0 mt-0">Rester connecté</div>
                </template>
              </v-checkbox>
              <form-send-mail></form-send-mail>
            </div>
            <v-spacer></v-spacer>
            <div class="col-md-12">
              <v-btn depressed block large color="secondary" class="custom-btn pl-4 pr-4 pt-0 mt-5" @click="login"
                :loading="loading" :disabled="!valid">
                <span> SE CONNECTER</span>
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </v-col>
    <v-col cols="7" v-if="screenWidth > 800" class="d-flex flex-column justify-center position-relative">
      <!-- Image à droite avec texte superposé -->
      <!-- <img class="full-height" width="100%" height="100%" src="@/static/background.mnv"> -->
      <h3 class="text-left custom-right-title position-absolute" style="top: 0%; color: black;">PLATEFORME DE GESTION
        DES
        INSCRIPTIONS</h3>
      <p class="text-left custom-paragraph position-absolute" style="top: 5%; color: black;">Dans le cadre de la
        modernisation des services éducatifs, notre plateforme facilite l'inscription des élèves en ligne en
        garantissant la
        transparence, la traçabilité et l'accessibilité pour tous. Elle s'inscrit dans une démarche inclusive visant à
        renforcer la digitalisation des processus administratifs et à simplifier les échanges entre établissements et
        apprenants.</p>
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormSendMail from '@/components/auth/FormSendMail'
export default {
  data: () => ({
    screenWidth: window.innerWidth,
    valid: true,
    checkbox: true,
    loading: false,
    model: {
      username: '',
      password: '',
    },
    rules: {
      passwordRules: [
        v => !v || v.length > 0 || 'Le mot de passe est obligatoire',
      ],
      emailRules: [
        v => !v || v.length > 0 || "L'e-mail ou le login est obligatoire",
      ]
    },
    passwordFieldType: 'password',
  }),

  computed: mapGetters({
    dialoglogin: 'auth/dialoglogin'
  }),
  components: {
    FormSendMail
  },
  mounted() {
    this.setDialogMaxWidth()
    window.addEventListener("resize", this.updateScreenWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  methods: {
    async updateScreenWidth() {
      this.screenWidth = await window.innerWidth;
      this.setDialogMaxWidth();
    },
    setDialogMaxWidth() {
      if (this.screenWidth <= 800) {
        this.dialogMaxWidth = "100%";
      } else {
        this.dialogMaxWidth = "50%";
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    async login() {
      this.loading = true;

      const validation = this.$refs.form.validate();
      if (!validation) {
        this.loading = false;
        return;
      }

      try {
        const supabase = this.$supabase;

        const { data: users, error } = await supabase
          .from('utilisateurs')
          .select('*')
          .eq('username', this.model.username)
          .eq('password', this.model.password)
          .limit(1);

        if (error || !users || users.length === 0) {
          this.$toast.error("Identifiant ou mot de passe incorrect").goAway(5000);
          this.loading = false;
          return;
        }

        const user = users[0];

        // Stocker les infos dans localStorage
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          username: user.username,
          role: user.role || 'user'
        }));

        this.$router.push('/tests');
      } catch (err) {
        console.error('Erreur login:', err);
        this.$toast.error("Erreur serveur");
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.custom-div-bg {

  background-image: url('@/static/background-mnv.png');
  background-repeat: no-repeat;
  background-size: 150% 100%;
  background-position: right;
  overflow: hidden;
}

.custom-btn {
  border-radius: 0px;
  /* Supprime les angles arrondis */
  font-size: 14px !important;
  font-weight: bold !important;
}

.full-height {
  height: 100vh;
  overflow: hidden;
  /* Hauteur de la vue entière */
}

.custom-vcol {
  background-color: white;
}

.custom-padding {
  padding: 50px;
}

.custom-title {
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  padding: 20px;
  color: #462b11;
}

.custom-right-title {
  font-size: 16px;
  text-align: left;
  padding: 80px;
}

.custom-paragraph {
  font-size: 14px;
  text-align: left;
  padding: 80px;
}

.custom-bg {
  background-color: #fff;
  position: relative;
  /* Pour positionner le texte absolument par rapport à cette div */
}

.position-absolute {
  position: absolute;
}

.custom-text-field {
  font-weight: bold
}

.v-text-field--outlined>>>fieldset {
  border-color: rgb(58, 57, 57);
  border-radius: 0px !important;
  transition: border-color 0.3s;
}

.v-text-field--outlined:hover>>>fieldset {
  border: 2px solid #0cbf5f !important;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.2);
}

.v-text-field--outlined:hover>>>.v-input__prepend-inner .mdi {
  color: #0cbf5f !important;
  /* Icône verte */
}

.v-text-field--outlined:hover>>>.v-input__append-inner .mdi {
  color: #0cbf5f !important;
  /* Icône verte */
}

.v-text-field--outlined:hover>>>.v-input__label {
  color: #0cbf5f !important;
  /* Icône verte */
}
</style>