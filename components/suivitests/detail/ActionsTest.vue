<template>
  <v-row align="center" justify="space-around">
    <v-btn outlined rounded color="primary" v-on:click="retour()">
      <v-icon left>
        mdi-arrow-left
      </v-icon>
      Retour à la liste
    </v-btn>
   
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted: function () {
  },
  computed: mapGetters({
    detailtest: 'suivitests/detailtest'
  }),
  data: () => ({
    
  }),
  methods: {
    retour() {
      this.$router.push('/suivitests');
    }
  },
}
</script>