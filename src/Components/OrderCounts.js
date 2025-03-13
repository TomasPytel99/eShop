import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";
import { useState, useEffect } from "react";
import api from '../api'

// Register necessary chart components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);


const OrderCounts = ({fetchedData, period}) => {

    const [filteredData, setFilteredData] = useState(null);
    
    const [labels, setLabels] = useState(null);
    const monthNames = ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'];

    const filterData = () => {
        if(fetchedData == null) {
            return;
        }
        if(period === 'month' || period === 'lastMonth') {
            const now = new Date();
            if(period === 'lastMonth') {
                now.setMonth(now.getMonth() - 1);
            }
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            let data = new Array(lastDay.getDate()).fill(0);

            let prefiltered = fetchedData.filter(item => {
                const itemDate = new Date(item.datum);
                return itemDate >= firstDay && itemDate <= lastDay;
            });
            
            prefiltered.forEach(element => {
                const datum = new Date(element.datum);
                const id = parseInt(datum.getDate());
                data[id - 1] += 1;
            });

            let lab = [];
            
            while(firstDay <= lastDay) {
                lab.push(firstDay.getDate());
                firstDay.setDate(firstDay.getDate() + 1);
            }

            setFilteredData(data);
            setLabels(lab);
            
        } else {

            let data = new Array(12).fill(0);
            
            fetchedData.forEach(element => {
                const datum = new Date(element.datum);
                const id = parseInt(datum.getMonth());
                data[id] += 1;
            });
            setFilteredData(data);
            setLabels(monthNames);
        }
    }
    
    useEffect(()=> {
        filterData();
    }, [fetchedData, period]);

    const data = {
        labels: labels? labels: [],
        datasets: [
            {
                data: filteredData? filteredData:[] ,
                backgroundColor: ["#ff8c00"],
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {color: "white", font: {size: 15}},
                border: {color: "rgba(255, 209, 47, 1)"}
            },
            y: {
                ticks: {
                    stepSize: 1,
                    color: "white",
                    font: {size: 15}
                  },
                grid: {color: "rgba(255, 209, 47, 0.3)"},
                border: {color: "rgba(255, 209, 47, 1)"}
            }
        }
    }
    return ( 
        <>
            <div className="d-flex flex-column align-items-center w-100 h-100">
                <h3 className="mb-3 mt-3 fw-bold">Počet objednávok</h3>
                <Bar data={data} options={options}/>
            </div>
        </>
     );
}
 
export default OrderCounts;