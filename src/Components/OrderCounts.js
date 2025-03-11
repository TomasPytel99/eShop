import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";

// Register necessary chart components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);


const OrderCounts = () => {
    const data = {
        labels: ['Gitary', 'Husle', 'Klávesy', 'Bicie', 'Harfy', 'Dychy', 'Akordeóny', 'Príslušenstvo'],
        datasets: [
            {
                data: [20,30,12,15,6,23,5,9],
                backgroundColor: ["#FFD12F", "#272323", "#3B82F6", "#10B981", "#EF4444", "#F97316", "#8B5CF6", "#06B6D4"],
                borderColor: "rgba(255, 99, 132, 1)"
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true, // Display the title
                text: "Počty objednávok", // Chart title text
                color: "white", // Chart title color
                font: {
                  size: 20, // Font size for the title
                  weight: "bold", // Font weight for the title
                },
              },
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "white", // X-axis label color
                    font: {size: 15}
                  },
                  grid: {
                    color: "rgba(255, 209, 47, 0.3)", // X-axis grid line color
                  },
            },
            y: {
                title: {
                    display: true,
                    text: 'Počet'
                },
                ticks: {
                    color: "white", // X-axis label color
                    font: {size: 15}
                  },
                  grid: {
                    color: "rgba(255, 209, 47, 0.3)", // X-axis grid line color
                },
            }
        }
    }
    return ( 
        <>
            <Bar data={data} options={options}/>
        </>
     );
}
 
export default OrderCounts;