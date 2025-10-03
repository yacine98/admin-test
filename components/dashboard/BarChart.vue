<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  },
  watch: {
    data(newData) {
      if (newData) {
        this.renderChart(this.data, this.options); // Crée le graphique une fois les données prêtes
      }
    }
  },
};
</script>
