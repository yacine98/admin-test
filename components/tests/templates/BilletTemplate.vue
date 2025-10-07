<template>
  <div>
  <div>
  <v-card ref="billet" class="pa-6" style="width: 700px; font-family: Arial, sans-serif; background: #fff;">
    <!-- Ligne 1 : En-tête à 3 colonnes -->
    <v-row class="mb-4" align="center">
      <v-col cols="3" class="d-flex justify-start">
        <img src="@/static/senegal_flag.png" alt="Drapeau Sénégal" style="height: 60px;" />
      </v-col>
      <v-col cols="6" class="d-flex flex-column align-center">
        <div style="font-size: 16px; font-weight: bold; color:#22ba67">LYCÉE DEMBA DIOP DE MBOUR</div>
        <div style="font-size: 14px;">Année scolaire : 2025 / 2026</div>
      </v-col>
      <v-col cols="3" class="d-flex justify-end">
        <img src="@/static/inspection.png" alt="Inspection" style="height: 60px;" />
      </v-col>
    </v-row>

    <!-- Ligne 2 : Trait horizontal -->
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-center">
        <hr style="width: 90%; border: 0.5px solid #000;" />
      </v-col>
    </v-row>

    <!-- Ligne 3 : Titre centré et surligné -->
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-center">
        <div style="font-weight: bold; padding: 4px 12px;">
          <strong style="color: #0e3e9f; font-size: 16px; border-bottom: 1px solid #0e3e9f;
padding-bottom: 1px;">ATTESTATION D'INSCRIPTION</strong>

        </div>
      </v-col>
    </v-row>

    <!-- Ligne 4 : Texte principal -->
    <v-row class="mb-4">
      <v-col cols="12" style="font-size: 14px; line-height: 1.6; text-align: justify;">
        <p>
          L'élève <strong>{{ eleve.prenom }} {{ eleve.nom }}</strong>, IEN <strong>{{ eleve.ien }}</strong>,
          né(e) le <strong>{{  formatDate(eleve.date_naissance) }}</strong> à <strong>{{ eleve.lieu_naissance }}</strong>,
          est bien inscrit(e) en classe de <strong>{{ eleve.classe }}</strong> pour l'année scolaire
          <strong>2025 / 2026</strong>.
        </p>
      </v-col>
    </v-row>

    <!-- Ligne 5 : Signature, texte, tampon -->
    <v-row class="mt-6" align="center">
      <v-col cols="4" class="d-flex justify-center">
        <img src="@/static/signature.png" alt="Signature" style="height: 60px;" />
      </v-col>
      <v-col cols="4" class="d-flex flex-column align-center">
        <div style="font-size: 14px; text-decoration: underline;">Le Proviseur</div>
        <div style="font-weight: bold; text-decoration: underline;">Dioumacor DIOUF</div>
      </v-col>

      <v-col cols="4" class="d-flex justify-center">
        <img src="@/static/tampon.png" alt="Tampon" style="height: 80px;" />
      </v-col>
    </v-row>
  </v-card>
  </div>
    <div class="mt-5">
    <v-card ref="billet" class="pa-6" style="width: 700px; font-family: Arial, sans-serif; background: #fff;">
    <!-- Ligne 1 : En-tête à 3 colonnes -->
    <v-row class="mb-4" align="center">
      <v-col cols="3" class="d-flex justify-start">
        <img src="@/static/senegal_flag.png" alt="Drapeau Sénégal" style="height: 60px;" />
      </v-col>
      <v-col cols="6" class="d-flex flex-column align-center">
        <div style="font-size: 16px; font-weight: bold; color:#22ba67">LYCÉE DEMBA DIOP DE MBOUR</div>
        <div style="font-size: 14px;">Année scolaire : 2025 / 2026</div>
      </v-col>
      <v-col cols="3" class="d-flex justify-end">
        <img src="@/static/inspection.png" alt="Inspection" style="height: 60px;" />
      </v-col>
    </v-row>

    <!-- Ligne 2 : Trait horizontal -->
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-center">
        <hr style="width: 90%; border: 0.5px solid #000;" />
      </v-col>
    </v-row>

    <!-- Ligne 3 : Titre centré et surligné -->
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-center">
        <div style="font-weight: bold; padding: 4px 12px;">
          <strong style="color: #0e3e9f; font-size: 16px; border-bottom: 1px solid #0e3e9f;
padding-bottom: 1px;">ATTESTATION D'INSCRIPTION</strong>

        </div>
      </v-col>
    </v-row>

    <!-- Ligne 4 : Texte principal -->
    <v-row class="mb-4">
      <v-col cols="12" style="font-size: 14px; line-height: 1.6; text-align: justify;">
        <p>
          L'élève <strong>{{ eleve.prenom }} {{ eleve.nom }}</strong>, IEN <strong>{{ eleve.ien }}</strong>,
          né(e) le <strong>{{  formatDate(eleve.date_naissance) }}</strong> à <strong>{{ eleve.lieu_naissance }}</strong>,
          est bien inscrit(e) en classe de <strong>{{ eleve.classe }}</strong> pour l'année scolaire
          <strong>2025 / 2026</strong>.
        </p>
      </v-col>
    </v-row>

    <!-- Ligne 5 : Signature, texte, tampon -->
    <v-row class="mt-6" align="center">
      <v-col cols="4" class="d-flex justify-center">
        <img src="@/static/signature.png" alt="Signature" style="height: 60px;" />
      </v-col>
      <v-col cols="4" class="d-flex flex-column align-center">
        <div style="font-size: 14px; text-decoration: underline;">Le Proviseur</div>
        <div style="font-weight: bold; text-decoration: underline;">Dioumacor DIOUF</div>
      </v-col>

      <v-col cols="4" class="d-flex justify-center">
        <img src="@/static/tampon.png" alt="Tampon" style="height: 80px;" />
      </v-col>
    </v-row>
  </v-card>
  </div>
</div>
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
}
}
</script>
