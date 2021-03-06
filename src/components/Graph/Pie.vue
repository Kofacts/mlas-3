<script>
    import DashboardHeader from "@/components/Layouts/DashboardHeader";
    import DashboardCard from "@/components/DashboardCards";
    import Alert from "@/components/Alert";
    import {Doughnut} from "vue-chartjs";

    export default {
        components: {DashboardHeader, Alert, DashboardCard},
        extends: Doughnut,
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
                    hoverBackgroundColor: "red",
                    hoverBorderWidth: 10,
                    datasets: [
                        {
                            label: this.name,
                            data: this.data,
                            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
                            borderColor: "rgba(56, 40, 191, 1)",
                            pointBackgroundColor: "rgba(41, 235, 205, 1)"
                        }
                    ]
                },
                {

                    title: {
                        display: true,
                        text: this.description
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            );
        }
    };
</script>
