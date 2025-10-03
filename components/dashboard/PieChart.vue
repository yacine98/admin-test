<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
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
