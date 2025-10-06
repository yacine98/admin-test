<template>
  <div ref="carte" class="carte-container" style="
      width: 420px;
      height: 595px;
      box-sizing: border-box;
      padding: 20px;
      font-family: Arial, sans-serif;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid #000;
    ">
    <!-- En-tête -->
     <div style="text-align: center; font-size: 14px; margin-bottom: 10px;">
      <strong>LYCEE DEMBA DIOP DE MBOUR</strong>
    </div>

    <div style="text-align: center; color:blue;font-size: 14px; margin-bottom: 10px;">
      <strong>CARTE D'ACCÈS</strong>
    </div>

    <!-- Corps -->
    <div style="display: flex; flex-grow: 1;">
      <!-- Photo -->
      <div style="flex: 1;">
        <img :src="eleve.photo_url || '@/static/avatar/default-user.png'" alt="Photo élève"
          style="width: 100px; height: 120px; object-fit: cover; border: 1px solid #000;" />


      </div>

      <!-- Infos -->
      <div style="flex: 2; padding-left: 15px; font-size: 10px; width: 100px; height: 120px;">
        <p><strong>IEN :</strong> {{ eleve.ien }}</p>
        <p><strong>Prénoms et Nom :</strong> {{ eleve.prenom }} {{ eleve.nom }}</p>
        <p><strong>Date de naissance :</strong> {{ eleve.date_naissance }}</p>
        <p><strong>Lieu de naissance :</strong> {{ eleve.lieu_naissance }}</p>
        <p><strong>Classe :</strong> {{ eleve.classe }}</p>
        <p><strong>Année scolaire :</strong> 2025 / 2026</p>
      </div>
    </div>

    <!-- Signature -->
    <div style="text-align: right; font-size: 10px; margin-top: 20px;">
      <p>Le Proviseur</p>
      <p style="font-weight: bold;">Dioumacor DIOUF</p>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    eleve: {
      immediate: true,
      handler(newVal) {
        console.log('Élève reçu :', newVal)
        console.log('PHOTO URL+++', newVal.photo_url)
      }
    }
  },


  mounted() {

    console.log('PHOTO URL+++', this.eleve)
  },

  props: {
    eleve: { type: Object, required: true }
  }
}
</script>