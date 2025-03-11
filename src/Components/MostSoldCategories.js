import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useEffect, useState } from "react";
import api from '../api.js';

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend, Title);



const SalesByCategory = () => {
    const [fetchedData, setFetchedData] = useState(null);


    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await api.get('/categoryStats',{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                setFetchedData(response.data);
            } catch(error){

            }
        }
        fetchData();
    });

    const data = {
        labels: ['Gitary', 'Husle', 'Klávesy', 'Bicie', 'Harfy', 'Dychy', 'Akordeóny', 'Príslušenstvo'],
        datasets: [
            {
                data: fetchedData? fetchedData: [],
                backgroundColor: ["#FFD12F", "#272323", "#3B82F6", "#10B981", "#EF4444", "#F97316", "#8B5CF6", "#06B6D4"]
            }
        ]
    }
    
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true, // Display the title
                text: "Najpredávanejšie kategórie", // Chart title text
                color: "white", // Chart title color
                font: {
                  size: 20, // Font size for the title
                  weight: "bold", // Font weight for the title
                },
              },
            legend: {
                position: 'left',
                labels: {
                    color: 'white',
                    font: {size: 13}
                }
            },
            
        }
    }
    
    
    
    return ( 
        <>
            {
                (fetchedData)?
                (
                    <Doughnut data={data} options={options}/>
                ):""
            }
        </>
     );
}
 
export default SalesByCategory;