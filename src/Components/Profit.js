import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title} from "chart.js";
import { useState, useEffect } from "react";
import api from '../api'
// Register required Chart.js components
Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title);




const Profit = ({fetchedData, period, begin, end}) => {
    const [filteredData, setFilteredData] = useState(null);
    const [activeBtn, setActiveBtn] = useState(1);
    const [labels, setLabels] = useState(null);
    const monthNames = ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'];

    const filterData = () => {
        if(fetchedData == null) {
            return;
        }
        const now = new Date();
        let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);


        if(period === 'month' || period === 'lastMonth' || period === 'custom') {
            
            if(period === 'lastMonth') {
                now.setMonth(now.getMonth() - 1);
            } else if(period === 'custom') {
                firstDay = begin;
                lastDay = end;
            }
            const days = Math.floor((lastDay - firstDay)/(1000*3600*24));
            
            let data = new Array(days + 1).fill(0);

            let prefiltered = fetchedData.filter(item => {
                const itemDate = new Date(item.datum);
                return itemDate >= firstDay && itemDate <= lastDay;
            });
            
            prefiltered.forEach(element => {
                const datum = new Date(element.datum);
                const id = parseInt(datum.getDate());
                const index = id - firstDay.getDate();
                data[index] += parseFloat(element.celkova_cena);
            });

            let lab = [];
            
            while(firstDay <= lastDay) {
                lab.push(firstDay.getDate());
                firstDay.setDate(firstDay.getDate() + 1);
            }

            setFilteredData(data);
            if(period === 'lastMonth') {
                setActiveBtn(3);
            } else {
                setActiveBtn(2);
            }
            setLabels(lab);
        } else {
            let data = new Array(12).fill(0);
            
            fetchedData.forEach(element => {
                const datum = new Date(element.datum);
                const id = parseInt(datum.getMonth());
                data[id] += parseFloat(element.celkova_cena);
            });
            setFilteredData(data);
            setActiveBtn(1);
            setLabels(monthNames);
        }
    }
    
    useEffect(()=> {
        if(period !== 'custom') {
            filterData();
        } else if(begin && end) {
            filterData();
        }
    }, [fetchedData, period, begin, end]);

    const data = {
        labels: labels? labels:[],
        datasets: [
            {
                data: filteredData? filteredData:[],
                backgroundColor: ["#FFD12F"],
                borderColor: "rgba(255, 140, 0, 1)"
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {display: false},
        },
        scales: {
            x: {
                ticks: {color: "white", font: {size: 15}},
                border: {color: "rgba(255, 209, 47, 1)"},
            },
            y: {
                ticks: {color: "white", font: {size: 15}},
                grid: {color: "rgba(255, 209, 47, 0.3)"},
                border: {color: "rgba(255, 209, 47, 1)"}
            }
        }
    }

    return ( 
        <>
            <div className="d-flex flex-column align-items-center w-100 h-100">
                <h3 className="mb-3 mt-3 fw-bold">Zisky</h3>
                <Line data={data} options={options}/>
            </div>
        </>
     );
}
 
export default Profit;