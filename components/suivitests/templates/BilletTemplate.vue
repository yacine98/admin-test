<template>
  <div ref="billet" class="billet-container" style="width: 700px; padding: 30px;font-family: Arial, sans-serif; background: #fff;">
    
    <!-- En-tête -->
    <div style="text-align: center; margin-bottom: 15px;">
      <img src="@/static/senegal_flag.png" alt="Drapeau Sénégal" style="height: 60px;" />
      <div style="font-size: 16px; font-weight: bold; margin-top: 5px;">RÉPUBLIQUE DU SÉNÉGAL</div>
      <div style="font-size: 14px; font-style: italic; margin-top: 2px;">Un Peuple - Un But - Une Foi</div>
      <div style="font-size: 15px; font-weight: bold; margin-top: 10px;">MINISTÈRE DE L'ÉDUCATION</div>
      <div style="font-size: 15px; font-weight: bold; margin-top: 5px;">LYCÉE DEMBA DIOP DE MBOUR</div>
    </div>

    <hr style="border: 1px solid #000; margin: 15px 0;" />

    <!-- Corps du billet -->
   <div style="font-size: 14px; line-height: 1.6; text-align: justify; margin-top: 20px;">
  <p>
    L'élève <strong>{{ eleve.prenom }} {{ eleve.nom }}</strong>, né(e) le <strong>{{ eleve.date_naissance }}</strong> à <strong>{{ eleve.lieu_naissance }}</strong>, inscrit sous l'<strong>Identifiant Élève National (IEN) {{ eleve.ien }}</strong>, a bien réglé ses droits d'inscription pour la classe de <strong>{{ eleve.classe || 'Non défini' }}</strong> au titre de l'année scolaire <strong>2025/2026</strong>.
  </p>
</div>

    <!-- Signature -->
    <div style="margin-top: 50px; display: flex; justify-content: flex-end; align-items: center;">
      <div style="text-align: center;">
        <div>Le Proviseur</div>
        <div style="font-weight: bold;">Dioumacor Diouf</div>
        <img src="@/static/signature.png" alt="Signature" style="width: 120px; margin-top: 5px;" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    eleve: { type: Object, required: true }
  }
}
</script>
