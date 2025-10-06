<template>

  <div>
    <!-- <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>
    </div> -->
    <div class="custom-container row">
      <div class="col-6">
        <v-text-field v-model="search" append-icon="mdi-magnify" placeholder="Rechercher..." class="mt-5" background-color="#fff" outlined 
         dense hide-details></v-text-field>
      </div>
      <div class="col-6">
      </div>
      <v-card @click="goToCardElement(item)"
        class="custom-card pl-10 pt-10 pb-10 pr-10 col-md-2 col-lg-2 col-sm-12 text-sm-center mb-4 mr-4 ml-4 mt-4"
        v-for="(item, i) in filteredLayout" :key="i">
        <nuxt-link class="customTopNav" :to="item.href ? item.href : null">
          <v-icon :color="$route.path == item.href ? 'primary' : ''" size="38">{{ item.icon }}</v-icon>
          <div :class="$route.path == item.href ? 'text-primary' : 'text-secondary'">{{ item.title }}</div>
        </nuxt-link>
        
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  // middleware: function ({ redirect, $hasPermission }) {
  //   if (!$hasPermission('manage-parameters')) {
  //     return redirect('/')
  //   }
  // },
  components: {
  },
  mounted: function () {
    this.layoutadmin = this.$getParametreMenu()
  },
  data: function () {
    return {
      search:'',
      layoutadmin: [],
      headerItems: [
        {
          text: 'Paramétrage',
          disabled: false,
          to: '/parametres',
          exact: true
        }
      ]
    }
  },
  computed: { 
        filteredLayout() {
          if(this.search!=''){
            return this.layoutadmin.filter(item=>item.title.toLowerCase().includes(this.search.toLowerCase()));
          }
          else{
            return this.layoutadmin
          }
           
        }
    },
  methods: {
    goToCardElement(item) {
      this.$router.push(item.href)
    }
  }

}
</script>

<style scoped>
.text-secondary {
  font-weight: 500;
  font-size: 12px;
}

.custom-card:hover {
  border-color: #02351a !important;
  box-shadow: 5px 0 15px rgba(4, 86, 21, 0.2);
  /* Ombre au survol */
}
</style>
