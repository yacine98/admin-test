<template>
  <v-card ref="carte" class="pa-4"
    style="width: 420px; height: 595px; border: 1px solid #000; font-family: Arial, sans-serif;">
    <!-- Ligne 1 : Titre centré -->
    <div class="d-flex justify-center mb-2">
      <strong style="font-size: 14px;">LYCÉE DEMBA DIOP DE MBOUR</strong>
    </div>

    <!-- Ligne 2 : Drapeau + Carte d'accès -->
    <v-row align="center">
      <v-col cols="4" class="d-flex justify-start">
        <img src="@/static/senegal_flag.png" alt="Drapeau Sénégal" style="height: 30px;" />
      </v-col>
      <v-col cols="5" class="d-flex">
        <strong style="color: #0e3e9f; font-size: 14px; border-bottom: 1px solid #0e3e9f;
padding-bottom: 1px;">CARTE D'ACCÈS</strong>
      </v-col>
      <v-col cols="3" class="d-flex justify-center">

      </v-col>
    </v-row>

    <!-- Ligne 3 : Infos élève -->
    <v-row class="align-stretch" style="font-family: Arial, sans-serif;">
      <!-- Colonne infos -->
      <v-col cols="8" class="text-left"
        style="font-size: 10px; line-height: 0.8; display: flex; flex-direction: column; justify-content: center;">
        <p style="margin: 2px 0;"><strong>IEN :</strong> {{ eleve.ien }}</p>
        <p style="margin: 2px 0;"><strong>Prénoms et Nom :</strong> {{ eleve.prenom }} {{ eleve.nom }}</p>
        <p style="margin: 2px 0;"><strong>Date de naissance :</strong> {{  formatDate(eleve.date_naissance) }}</p>
        <p style="margin: 2px 0;"><strong>Lieu de naissance :</strong> {{ eleve.lieu_naissance }}</p>
        <p style="margin: 2px 0;"><strong>Classe :</strong> {{ eleve.classe }}</p>
        <p style="margin: 2px 0;"><strong>Année scolaire :</strong> 2025 / 2026</p>
      </v-col>

      <!-- Colonne photo -->
      <v-col cols="4" class="d-flex justify-center align-center"
        style="display: flex; align-items: center; justify-content: center;">
        <img :src="eleve.photo_url || '@/static/avatar/default-user.png'" alt="Photo élève"
          style="width: 100px; height: 120px; object-fit: cover;" />
      </v-col>
    </v-row>

    <!-- Ligne 4 : Signature + texte + tampon -->
    <v-row align="center">
      <!-- Signature -->
      <v-col cols="4" class="d-flex justify-start">
        <img src="@/static/signature.png" alt="Signature" style="height: 60px;" />
      </v-col>

      <!-- Bloc texte proviseur -->
      <v-col cols="4" class="d-flex justify-center" style="font-size: 10px; line-height: 1;">
        <div class="text-center">
          <p style="margin: 0; text-decoration: underline;">Le Proviseur</p>
          <p style="margin: 0; font-weight: bold; text-decoration: underline;">Dioumacor DIOUF</p>
        </div>
      </v-col>

      <!-- Tampon -->
      <v-col cols="4" class="d-flex justify-end">
        <img src="@/static/tampon.png" alt="Tampon" style="height: 80px;" />
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
export default {
  props: {
    eleve: { type: Object, required: true }
  },
  methods: {
  formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }
},
  watch: {
    eleve: {
      immediate: true,
      handler(newVal) {
        console.log('Élève reçu :', newVal)
      }
    }
  }
}
</script>