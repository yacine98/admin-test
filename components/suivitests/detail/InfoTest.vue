<template>
  <div>
    <v-row class="mb-0">
      <v-col class="text-right mb-2">
        <v-btn v-if="!detailTest.payed && isRetrieved" color="#2e7d32" class="mt-4 text-white" @click="payerEtExporter">
          <v-icon left>mdi-cash</v-icon>
          Payer
        </v-btn>
        <v-btn v-if="detailTest.payed && isRetrieved" color="#2e7d32" class="mt-4 text-white" @click="exportCarte">
          <v-icon left>mdi-cash</v-icon>
          Télécharger la carte
        </v-btn>
        <v-btn v-if="detailTest.payed && isRetrieved" color="#2e7d32" class="mt-4 text-white" @click="exportBillet">
          <v-icon left>mdi-cash</v-icon>
          Télécharger le billet
        </v-btn>

      </v-col>

    </v-row>



    <div v-if="showCamera" class="mt-4">
      <video ref="video" autoplay playsinline width="300" height="225"></video>
      <v-btn color="success" class="mt-2" @click="capturePhoto">
        <v-icon left>mdi-camera-plus</v-icon>Capturer
      </v-btn>
    </div>

    <v-card class="custom-card-test border-grey">
      <v-btn color="primary" @click="openCamera">
        <v-icon right class="mr-2">mdi-camera</v-icon>Prendre une photo
      </v-btn>

      <v-card-text>

        <v-row>
          <v-col md="9" sm="12" lg="9" text-md-left>
            <div class="row">
              <div class="col-md-6">
                <p class="info-profil mb-4"><span>IEN : </span>{{ detailTest.ien }}</p>
                <p class="info-profil mb-4"><span>Prénom(s) et nom: </span>{{ detailTest.prenom }} {{ detailTest.nom }}
                </p>
                <p class="info-profil mb-4"><span>Sexe : </span>{{ detailTest.sexe == 'M' ? 'Homme' : 'Femme' }}</p>
              </div>

              <div class="col-md-6 border-left">
                <p class="info-profil mb-4"><span>Classe : </span>{{ detailTest.classe }}</p>
                <p class="info-profil mb-4"><span>Date et lieu de naissance : </span>{{ detailTest.date_naissance }} à
                  {{ detailTest.lieu_naissance }}</p>
                <p class="info-profil mb-4"><span>Inscrit : </span>
                  <v-chip :color="getStatusColor(detailTest.payed)" small outlined>
                    {{ detailTest.payed == false ? 'Non' : 'Oui' }}
                  </v-chip>
                </p>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-6">

              </div>


            </div>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col cols="12" class="text-center">
            <div v-if="detailTest.photo_url">
              <v-avatar size="150">
                <img :src="detailTest.photo_url" alt="Photo de l'élève" />
              </v-avatar>
              <v-btn text small class="mt-2" @click="showPhoto = true">
                Agrandir l'image
              </v-btn>
            </div>
            <div v-else>
              <v-icon color="grey" size="64">mdi-account</v-icon>
              <p class="caption">Aucune photo disponible</p>
            </div>
          </v-col>
        </v-row>

        <!-- Dialog pour agrandir la photo -->
        <v-dialog v-model="showPhoto" max-width="500">
          <v-card>
            <v-img :src="detailTest.photo_url" aspect-ratio="1" />
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="showPhoto = false">Fermer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
    <!-- Carte scolaire invisible pour export -->
    <div style="position: absolute; left: -9999px;">
      <carte-scolaire v-if="detailTest" :eleve="detailTest" :ref="'carte-' + detailTest.ien" />
    </div>
    <!-- Billet invisible pour export individuel -->
    <div style="position: absolute; left: -9999px;">
      <billet-template v-if="detailTest" :eleve="detailTest" :ref="'billet-' + detailTest.ien" />
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import CarteScolaire from '@/components/suivitests/templates/CarteScolaire.vue'
import BilletTemplate from '@/components/suivitests/templates/BilletTemplate.vue'


export default {
  components: {
    CarteScolaire,
    BilletTemplate
  },

  mounted() {
    this.getDetail(this.id);
  },
  computed: mapGetters({
    detailTest: 'suivitests/detailtest'
  }),
  data() {
    return {
      isRetrieved: false,
      id: this.$route.query.id,
      showCamera: false,
      photoBlob: null,
      showPhoto: false
    }
  },
  methods: {
    async payerEtExporter() {
      const supabase = this.$supabase;

      // Si déjà payé, on saute la mise à jour
      if (!this.detailTest.payed) {
        const now = new Date().toISOString();

        const { error } = await supabase
          .from('eleves')
          .update({
            payed: true,
            payed_at: now
          })
          .eq('id', this.id);

        if (error) {
          console.error('Erreur mise à jour paiement:', error.message);
          this.$toast.error('Échec de l\'enregistrement du paiement').goAway(5000);
          return;
        }

        this.$toast.success('Paiement enregistré avec succès').goAway(5000);
        await this.getDetail(this.id);
      }

     
    },
    async exportBillet() {
      await this.$nextTick()

      const refName = 'billet-' + this.detailTest.ien
      const billetRef = this.$refs[refName]

      if (!billetRef || !billetRef.$el) {
        this.$toast.error('Billet introuvable').goAway(5000)
        return
      }

      const element = billetRef.$el
      const canvas = await html2canvas(element, { scale: 2 })

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`${this.detailTest.prenom}_${this.detailTest.nom}_billet.pdf`)
    },
    async openCamera() {
      this.showCamera = true
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        this.$refs.video.srcObject = stream
      } catch (err) {
        console.error('Erreur caméra:', err)
        this.$toast.error('Impossible d’accéder à la caméra').goAway(5000)
      }
    },

    async capturePhoto() {
      const video = this.$refs.video
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d').drawImage(video, 0, 0)

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'))
      this.photoBlob = blob

      // Arrêter la caméra
      const stream = video.srcObject
      stream.getTracks().forEach(track => track.stop())
      this.showCamera = false

      // Envoie vers Supabase Storage
      await this.uploadPhotoToSupabase(blob)
    },

    async uploadPhotoToSupabase(blob) {
      const supabase = this.$supabase;
      const fileName = `eleve-${this.id}-${Date.now()}.jpg`;

      const { data, error } = await supabase.storage
        .from('photos-eleves')
        .upload(fileName, blob, {
          contentType: 'image/jpeg'
        });

      if (error) {
        console.error('Erreur upload:', error.message);
        this.$toast.error('Échec de l\'envoi de la photo').goAway(5000);
        return;
      }

      const publicUrl = `https://gpadxlfxuxzpbpkfippw.supabase.co/storage/v1/object/public/photos-eleves/${fileName}`;

      const { error: updateError } = await supabase
        .from('eleves')
        .update({ photo_url: publicUrl })
        .eq('id', this.id);

      if (updateError) {
        console.error('Erreur mise à jour élève:', updateError.message);
        this.$toast.error('Échec de l\'enregistrement de la photo').goAway(5000);
        return;
      }

      // ✅ Mise à jour locale immédiate
      await this.getDetail(this.id);

      this.$toast.success('Photo enregistrée avec succès').goAway(5000);
    },
    retour() {
      this.$router.push('/suivitests');
    },
    async getDetail(id) {
      try {
        const supabase = this.$supabase

        const { data, error } = await supabase
          .from('eleves')
          .select('*')
          .eq('id', id) // selon ta logique
          .single() // pour ne récupérer qu’un seul résultat

        if (error) {
          console.error('Erreur Supabase:', error.message)
          this.$toast.error('Impossible de récupérer les détails de l\'élève').goAway(5000)
          return
        }
        else{
          this.isRetrieved=true
        }

        // Envoie les données dans le store ou traite-les localement
        this.$store.dispatch('suivitests/getDetail', data)
      } catch (err) {
        console.error('Erreur getDetail:', err)
        this.$toast.error('Erreur inattendue').goAway(5000)
      }
    },
    getStatusColor(status) {
      switch (status) {
        case false: return 'red';
        case true: return 'green';
      }
    },
    async exportCarte() {

      if(!this.detailTest.photo_url){
        alert("Attention, vous n'avez pas encore pris de photo")
        return
      }
      await this.$nextTick()

      const refName = 'carte-' + this.detailTest.ien
      const carteRef = this.$refs[refName]

      if (!carteRef || !carteRef.$el) {
        this.$toast.error('Carte introuvable').goAway(5000)
        return
      }

      const element = carteRef.$el

      const canvas = await html2canvas(element, {
        useCORS: true,       // autorise le chargement des images externes
        allowTaint: true,    // permet les images "tainted" (cross-domain)
        scale: 2,            // optionnel : meilleure qualité du rendu
      })

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [420, 595] // Format A6
      })

      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'PNG', 0, 0, 420, 595)
      pdf.save(`${this.detailTest.prenom}_${this.detailTest.nom}_carte.pdf`)
    }

  },

};
</script>
