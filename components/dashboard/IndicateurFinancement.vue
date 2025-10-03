<template>
  <div class="">

    <div class="row pb-25 mb-5">
      <div class="col-md-12 col-lg-12 col-sm-12 custom-card-box custom-bg-grey">

        <div class="d-flex justify-content-between">
          <v-autocomplete v-model="annee_id" :items="listannees" outlined dense class="mr-5" label="Année d'approbation"
            item-text="libelle" item-value="id" @change="updateStats">
          </v-autocomplete>
          <v-autocomplete v-model="secteur_principal_id" :items="listsecteurs" outlined dense class="mr-5"
            label="Secteur principal" item-text="libelle" item-value="id" @change="updateStats">
          </v-autocomplete>
          <v-btn :loading="loadingSubmit" color="secondary" outlined @click="clear" depressed>
            Réinitialiser
          </v-btn>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-4 col-sm-12 mt-0">
            <div id="custom-card-stat" class="blog-wrap-2 mb-0 height-100 bg-white bg-white-2">
              <div class="card-body border-solid-1px">
                <h2 class="card-text text-center pt-8 pb-5 text-grey">Nombre de projets</h2>

                <div class="pb-10 pt-5 text-center ">
                  <div class="volume" v-if="progress">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                  </div>
                  <div class="volume" v-else>
                    <h6 class="text-green">
                      {{ stats.nombre_financements }}
                    </h6>

                  </div>

                </div>

              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 mt-0 ">
            <div id="custom-card-stat" class="blog-wrap-2 mb-0 height-100 bg-white bg-white-2 ">
              <div class="card-body border-solid-1px">
                <h2 class="card-text text-center pt-8 pb-5 text-grey">Volume de financement</h2>

                <div class="pb-10 pt-5 text-center">
                  <div class="volume" v-if="progress">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                  </div>
                  <div v-else class="volume">
                    <h6 class="text-green">
                      {{ stats.volume_financement + ' CFA' }}
                    </h6>
                    <h6 class="text-green">
                      {{ stats.volume_financement_dollar + ' $' }}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 mt-0">
            <div id="custom-card-stat" class="blog-wrap-2 mb-0 height-100 bg-white bg-white-2">
              <div class="card-body border-solid-1px">

                <h2 class="card-text text-center pt-8 pb-5 text-grey">Nombre de bénéficiaires</h2>
                <div class="pb-10 pt-5 text-center">
                  <div class="volume" v-if="progress">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                  </div>
                  <div v-else class="volume">
                    <h6 class="text-green">
                      {{ 'Hommes : ' + stats.nombre_beneficiaires }}
                    </h6>
                    <h6 class="text-green">
                      {{ 'Femmes : ' + stats.nombre_beneficiaires_femme }}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pb-25 mb-5">
      <div class="col-md-12 col-lg-12 col-sm-12 custom-card-box custom-bg-grey">
        <div class="box d-flex flex-column align-items-start">
          <BarChart :data="barChartData" :options="barChartOptions" :styles="{
            height: '250px',
            position: 'relative',
            width: '100%',
          }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "~/components/dashboard/BarChart.vue";
import { mapGetters } from "vuex";
export default {
  components: { BarChart },
  mounted: function () {
    this.updateStats()
  },
  computed: {
    ...mapGetters({
      detailUtilisateur: "utilisateurs/detailutilisateur",
      listannees: "annees/listannees",
      listsecteurs: "secteurs/listsecteurs",
    }),
  },
  data() {
    return {
      stats: "",
      status: "publie",
      annee_id: "",
      secteur_principal_id: "",
      progress: false,
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: "bottom",
          align: "start",
        },
        scales: {
          yAxes: [
            {
              id: 'A',
              type: 'linear',
              position: 'left',
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Nombre de projets'
              }
            },
            {
              id: 'B',
              type: 'linear',
              position: 'right',
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Volume de financement'
              }
            },
            {
              id: 'C',
              type: 'linear',
              position: 'right',
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Nombre de bénéficiaires'
              },
              gridLines: {
                drawOnChartArea: false
              }
            }
          ]
        }
      },
      barChartData: null
    };
  },

  methods: {
    getStatistique() {
      this.progress = true;
      this.$mrvciApi
        .$get("/financements/stats?status=" + this.status + "&annee_id=" + this.annee_id + "&secteur_principal_id=" + this.secteur_principal_id)
        .then(async (response) => {
          this.stats = response;
        })
        .catch((error) => {
        })
        .finally(() => {
          this.progress = false
        });
    },
    getStatistiqueBySecteur() {
      this.progress = true;
      this.$mrvciApi
        .$get("/financements/stats/secteur-principal?status=" + this.status + "&annee_id=" + this.annee_id + "&secteur_principal_id=" + this.secteur_principal_id)
        .then(async (response) => {
          this.barChartData = this.formatChartData(response)
        })
        .catch((error) => {

        })
        .finally(() => {

        });
    },
    async updateStats() {
      this.getStatistique()
      this.getStatistiqueBySecteur()
    },
    clear() {
      this.annee_id = ""
      this.secteur_principal_id = ""
      this.updateStats()
    },
    formatChartData(data) {
      return {
        labels: data.map(item => item.secteur_libelle),
        datasets: [
          {
            label: "Nombre de projets",
            backgroundColor: "#ef8700",
            data: data.map(item => item.nombre_financements),
            yAxisID: 'A'
          },
          {
            label: "Volume de financement",
            backgroundColor: "#0073e6",
            data: data.map(item => item.volume_financement),
            yAxisID: 'B'
          },
          {
            label: "Nombre de bénéficiaires",
            backgroundColor: "#00b300",
            data: data.map(item => item.nombre_beneficiaires),
            yAxisID: 'C'
          }
        ]
      };
    }
  },
};
</script>
<style scoped>
path {
  fill: #ffffff;
  cursor: pointer;
  -webkit-transition: all 150ms;
  -moz-transition: all 150ms;
  -o-transition: all 150ms;
  transition: all 150ms;
}

path:hover {
  opacity: 0.85;
}

.lan {
  fill-opacity: 1;
  stroke: rgb(0, 0, 0);
  stroke-opacity: 1;
  stroke-miterlimit: 22.926;
  stroke-width: 0.5;
}

.description {
  pointer-events: none;
  position: absolute;
  font-size: 18px;
  text-align: center;
  background: rgba(255, 255, 255, 0.795);
  padding: 50px;
  padding-top: 15px;
  z-index: 5;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  color: #21669e;
  border-radius: 5px;
  box-shadow: 0 0 0 1px #eee;
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.description.active {
  display: block;
}

.description:after {
  content: "";
  position: absolute;
  left: 50%;
  top: 100%;
  width: 0;
  height: 0;
  margin-left: -10px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 100px;
  color: #2e495e;
  letter-spacing: 1px;
  font-size: 6em;
}

.green {
  color: #00c48d;
}

.subtitle {
  font-weight: 300;
  font-size: 1em;
  color: #2e495e;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.custom-text-btn {
  font-size: 14px !important;
}

.custom-card-box {
  border: solid 2px #0080005e;
  padding: 27px;
  max-height: 100%;
}

.border-right {
  border-right: 1px;
}

.box {
  width: 100%;
}

.custom-bg-grey {
  background-color: #f2f2f2;
}

.custom-section {
  background-color: #eef3fb;
}

.bg-white {
  background-color: #fff !important;
}

.bg-white-2:hover {
  background-color: hsla(120, 100%, 25%, 0.251) !important;
}

.text-green {
  color: green !important;
}

.text-grey {
  color: rgba(0, 0, 0, 0.61) !important;
}

#custom-card-stat h2 {
  color: white !important;
  background-color: #00833D;
}

.border-solid-1px {
  text-align: center !important;
  border: solid 2px #0080006e;
}

.chiffre {
  font-size: 25px;
  background: #00833D24;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
}

.montant {
  font-size: 25px;
  background: #00833D24;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
}

.volume {
  font-size: 25px;
  background: #00833D24;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
}

.row {
  display: flex;
  align-items: stretch;
}

#custom-card-stat {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
