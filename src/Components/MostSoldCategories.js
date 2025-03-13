import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useEffect, useState } from "react";
import api from '../api.js';
import '../Styles/MostSoldCategories.css'

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend, Title);



const SalesByCategory = ({period}) => {
    const [fetchedData, setFetchedData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

    const filterData = () => {
        if(fetchedData == null) {
            return;
        }
        if(period === 'month' || period === 'lastMonth') {
            let data = [0,0,0,0,0,0,0,0];
            const now = new Date();
            if(period === 'lastMonth') {
                now.setMonth(now.getMonth() - 1);
            }
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            let prefiltered = fetchedData.filter(item => {
                const itemDate = new Date(item.datum);
                return itemDate >= firstDay && itemDate <= lastDay;
            });
            
            prefiltered.forEach(element => {
                const id = parseInt(element.id_kategorie);
                data[id - 1] += 1; 
            });
            setFilteredData(data);
        } else {
            let data = [0,0,0,0,0,0,0,0];
            
            fetchedData.forEach(element => {
                const id = parseInt(element.id_kategorie);
                data[id - 1] += 1; 
            });
            setFilteredData(data);
        }
    }
    
    useEffect(()=> {
        filterData();
    }, [fetchedData, period]);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const today = new Date();
                const str = today.toLocaleDateString();
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
    }, []);

    const data = {
        labels: ['Gitary', 'Husle', 'Klávesy', 'Bicie', 'Harfy', 'Dychy', 'Akordeóny', 'Príslušenstvo'],
        datasets: [
            {
                data: filteredData? filteredData: [],
                backgroundColor: ["#FFD12F", "#272323", "#3B82F6", "#10B981", "#EF4444", "#F97316", "#8B5CF6", "#06B6D4"]
            }
        ]
    }
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left',
                labels: {color: 'white', font: {size: 13}}
            },
            
        }
    }
    
    
    
    return ( 
        <>
            {
                (fetchedData)?
                (
                    <div className="mt-2 d-flex flex-column align-items-center">
                        <h3 className="mb-3 mt-3 fw-bold">Najpredávanejšie kategórie</h3>
                        <Doughnut data={data} options={options}/>
                    </div>
                ):""
            }
        </>
     );
}
 
export default SalesByCategory;