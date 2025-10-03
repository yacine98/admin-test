<template>
  <v-container pl-0>
    <v-row>
      <v-col md="2" lg="2" sm="12">
        <v-container pl-0>
          <left-menu :items="leftmenuItems"></left-menu>
        </v-container>
      </v-col>
      <v-col md="9" lg="9" sm="12" class="full-height">
        <page-header :items="headerItems"></page-header>
        <div>Erreur lors de la connexion</div>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
export default {
  layout: "dashboard",
  components: {
    LeftMenu,
    PageHeader,
  },
  data() {
    return {
      leftmenuItems: [
      ],
      headerItems: [
      ]
    }
  }

}
</script>