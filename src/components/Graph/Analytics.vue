<script>
import DashboardHeader from "@/components/Layouts/DashboardHeader";
import DashboardCard from "@/components/DashboardCards";
import Alert from "@/components/Alert";
import { Line } from "vue-chartjs";

export default {
  components: { DashboardHeader, Alert, DashboardCard },
  extends: Line,
  props: {
    name: {
      required: true
    },
    description: {
      required: true
    },
    labels: {
      required: true
    },
    data: {
      required: true
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: this.name,
            data: this.data,
            backgroundColor: "transparent",
            borderColor: "rgba(56, 40, 191, 1)",
            pointBackgroundColor: "rgba(41, 235, 205, 1)"
          }
        ]
      },
      {
        title: {
          display: true,
          text: this.description,
          responsive: true,
          maintainAspectRatio: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    );
  }
};
</script>
