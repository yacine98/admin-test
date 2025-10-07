<template>
    <div>
        <div v-if="loading" class="no-data loader-overlay">
            <div class="loader"></div>
        </div>
        <v-card color="#fff" flat>
            <v-container>
                <v-row>
                    <v-col md="6" lg="6" sm="12">
                        <v-card color="#fff" flat class="ma-2 ml-0">
                            <v-card-title>Nombre d'élèves inscrits par classe</v-card-title>
                            <div class="pa-5">
                                <BarChart :data="barChartData1" :options="barChartOptions1" :styles="{
                                    height: '250px',
                                    position: 'relative',
                                    width: '100%',
                                }" />
                            </div>
                        </v-card>
                    </v-col>
                    <v-col md="6" lg="6" sm="12">
                        <v-card color="#fff" flat class="ma-2 ml-0">
                            <v-card-title>Pourcentage des élèves inscrits</v-card-title>
                            <div class="pa-5">
                                <PieChart :data="pieChartData" :options="pieChartOptions" :styles="{
                                    height: '250px',
                                    position: 'relative',
                                    width: '100%',
                                }" />
                            </div>
                        </v-card>
                    </v-col>
                    <!-- <v-col md="6" lg="6" sm="12">
                    <v-card color="#fff" flat class="ma-2 mr-0 ml-0">
                        <v-card-title>Volume de financement par bailleur</v-card-title>
                        <div class="pa-5">
                            <BarChart :data="barChartData2" :options="barChartOptions2" :styles="{
                                height: '250px',
                                position: 'relative',
                                width: '100%',
                            }" />
                        </div>
                    </v-card>
                </v-col> -->
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import BarChart from "~/components/dashboard/BarChart.vue";
import PieChart from "~/components/dashboard/PieChart.vue";
import { mapGetters } from "vuex";
export default {
    components: { BarChart, PieChart },
    computed: mapGetters({
        detaildemande: "demandes/detaildemande",
        dashboardData: "dashboard/dashboardData",
        listannees: "annees/listannees"
    }),
    mounted: async function () {
        await this.$store.dispatch("annees/getList")
        this.getDetail()

    },

    data: () => ({
        loading: false,
        barChartData1: {},
        barChartData2: {},
        pieChartData: {},
        pieChartData2: {},
        repartition_activite: [],
        repartition_structure: [],
        repartition_secteur: [],
        repartition_districts: [],
        barChartOptions1: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    align: 'start'
                },
                title: {
                    display: true,
                    text: 'Répartition des élèves par classe'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Nombre d\'élèves'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Classe'
                    }
                }
            }
        },
        barChartOptions2: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: "bottom",
                align: "start",
            },
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true,
                    },
                    title: {
                        display: true,
                        text: "Nombre de projets"
                    }
                }
            }
        },




        pieChartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: "bottom",
                align: "start",
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let dataset = tooltipItem.dataset;
                            let value = dataset.data[tooltipItem.dataIndex];
                            return `${value}%`;
                        }
                    }
                }
            }
        },
        pieChartOptions2: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: "bottom",
                align: "start",
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let dataset = tooltipItem.dataset;
                            let value = dataset.data[tooltipItem.dataIndex];
                            return `${value}%`;
                        }
                    }
                }
            }
        }
    }),
    props: ['annee'],
    metaInfo() {
        return {
            annee: this.annee,
        }
    },
    watch: {
        annee(newAnnee) {
            this.getDetail()
        }
    },
    methods: {
        async getDetail() {

            this.loading = true
            let url = ''
            if (this.annee) {
                let annee_saisie = await this.listannees.find(item => item.id == this.annee).libelle
                url = '?id_annee=' + this.annee + '&annee_saisie=' + annee_saisie
            }
            this.$mrvciApi.post('/kpiEmissions' + url)
                .then((res) => {
                    this.$store.dispatch('dashboard/getDashboardData', res.data)
                    this.repartition_structure = res.data.repartition_structure
                    this.barChartData1 = {
                        labels: this.repartition_structure.map(item => item.structure.libelle),
                        datasets: [
                            {
                                label: "Total Données Saisies",
                                backgroundColor: "#3fcf85",
                                borderColor: "#000",
                                borderWidth: 0.5,
                                data: this.repartition_structure.map(item => item.total)
                            }
                        ]
                    };

                    this.pieChartData = {
                        labels: this.repartition_structure.map(item => item.structure.libelle),
                        datasets: [
                            {
                                data: this.repartition_structure.map(item => item.total),
                                backgroundColor: ["#3fcf85", "#e37077", "#4A90E2", "#FDB813"],
                                borderColor: "#000",
                                borderWidth: 0.5,
                            }
                        ]
                    }
                })
                .catch((error) => {
                    this.$store.dispatch('toast/getMessage', { type: 'error', text: error || 'Échec de la récupération des données' })
                }).finally(() => {
                    this.loading = false
                });

            this.$mrvciApi.post('/kpiProjets' + url)
                .then((res) => {
                    this.repartition_secteur = res.data.data.repartition_par_secteur;
                    this.repartition_districts = res.data.data.repartition_districts;

                    this.barChartData2 = {
                        labels: Object.keys(this.repartition_secteur),
                        datasets: [
                            {
                                label: "Nombre de projets",
                                backgroundColor: "#3fcf85",
                                borderColor: "#000",
                                borderWidth: 0.5,
                                data: Object.values(this.repartition_secteur)
                            }
                        ]
                    };

                    this.pieChartData2 = {
                        labels: Object.keys(this.repartition_districts),
                        datasets: [
                            {
                                data: Object.values(this.repartition_districts),
                                backgroundColor: ["#3fcf85", "#e37077", "#4A90E2", "#FDB813"],
                                borderColor: "#000",
                                borderWidth: 0.5,
                            }
                        ]
                    }
                })
                .catch((error) => {
                    this.$store.dispatch('toast/getMessage', { type: 'error', text: error || 'Échec de la récupération des données' })
                }).finally(() => {
                    this.loading = false
                });


        }
    },
};
</script>

<style>
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 9999;
}

.loader {
    border: 12px solid #f3f3f3;
    border-radius: 50%;
    border-top: 12px solid #ff7900;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.no-data {
    text-align: center;
}
</style>

<script>
import BarChart from '~/components/dashboard/BarChart.vue'
import PieChart from '~/components/dashboard/PieChart.vue'

export default {
  components: { BarChart, PieChart },
  data() {
    return {
      loading: false,
      barChartData1: {},
      pieChartData: {},
      barChartOptions1: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: true, position: 'bottom', align: 'start' },
        scales: {
          y: {
            ticks: { beginAtZero: true },
            title: { display: true, text: 'Nombre d’élèves' }
          }
        }
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: true, position: 'bottom', align: 'start' },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const dataset = tooltipItem.dataset
                const value = dataset.data[tooltipItem.dataIndex]
                return `${value}%`
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    this.loadChartData()
  },
  methods: {
    async loadChartData() {
  this.loading = true;
  const supabase = this.$supabase;

  // Récupération des données élèves
  const { data: eleves, error } = await supabase
    .from('eleves')
    .select('classe, payed');

  if (error) {
    console.error('Erreur Supabase:', error.message);
    this.loading = false;
    return;
  }

  // Initialisation des compteurs
  const classeCounts = {};       // Total élèves par classe
  const classeInscrits = {};     // Élèves inscrits par classe
  let totalInscrits = 0;
  let totalNonInscrits = 0;

  // Regroupement des données
  eleves.forEach(eleve => {
    const classe = eleve.classe || 'Non définie';
    classeCounts[classe] = (classeCounts[classe] || 0) + 1;

    if (eleve.payed) {
      classeInscrits[classe] = (classeInscrits[classe] || 0) + 1;
      totalInscrits++;
    } else {
      totalNonInscrits++;
    }
  });

  const classes = Object.keys(classeCounts);

  // ✅ Bar chart : deux barres par classe
  this.barChartData1 = {
    labels: classes,
    datasets: [
      {
        label: 'Total élèves',
        backgroundColor: '#244b70',
        borderColor: '#000',
        borderWidth: 0.5,
        data: classes.map(classe => classeCounts[classe])
      },
      {
        label: 'Élèves inscrits',
        backgroundColor: '#3fcf85',
        borderColor: '#000',
        borderWidth: 0.5,
        data: classes.map(classe => classeInscrits[classe] || 0)
      }
    ]
  };

  // ✅ Pie chart : taux d’inscription global
  const total = totalInscrits + totalNonInscrits;
  const inscritsPercent = total > 0 ? ((totalInscrits / total) * 100).toFixed(1) : 0;
  const nonInscritsPercent = total > 0 ? ((totalNonInscrits / total) * 100).toFixed(1) : 0;

  this.pieChartData = {
    labels: ['Inscrits', 'Non inscrits'],
    datasets: [
      {
        data: [inscritsPercent, nonInscritsPercent],
        backgroundColor: ['#3fcf85', '#e37077'],
        borderColor: '#000',
        borderWidth: 0.5
      }
    ]
  };

  this.loading = false;
}
  }
}
</script>

<style scoped>
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 9999;
}

.loader {
    border: 12px solid #f3f3f3;
    border-radius: 50%;
    border-top: 12px solid #ff7900;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>