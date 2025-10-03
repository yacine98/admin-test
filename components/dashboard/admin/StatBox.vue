<template>
  <v-card :class="classBox">                   
    <v-card-text class="custom-card-body">
      <v-row row wrap>
        <v-col cols="12" class="text-md-center">
          <v-avatar size="100px" :color="colorIcon" class="my-5">
            <v-icon color="white" x-large>{{icon}}</v-icon>
          </v-avatar>
          <h4 class="card-title custom-font">{{title}}</h4> 
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col cols="12" class="text-md-center"><p class="card-chiffre">{{nbr}}</p></v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: ['title','description','icon','nbr','colorIcon','classBox'],
    data: () => ({
      
    })
  }
</script>
<style scoped>

</style>