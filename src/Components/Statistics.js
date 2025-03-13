
import '../Styles/Statistics.css'
import SalesByCategory from './MostSoldCategories';
import Profit from './Profit';
import OrderCounts from './OrderCounts';
import { useState, useEffect } from 'react';
import api from '../api'

const Stats = () => {
    const [data, setData] = useState(null);
    const [filter, setFilter] =  useState('year');
    const [activeBtn, setActiveBtn] = useState(1);
    const [hasCustomInterval, setHasCustomInterval] = useState(false);
    const [begin, setBegin] = useState(null);
    const [end, setEnd] = useState(null);

    const handleFilter = (filter) => {
        setFilter(filter);
        const element = document.getElementById('custom');
        element.checked = false;
        setHasCustomInterval(false);
        switch (filter) {
            case 'year':
                setActiveBtn(1);
                break;
            case 'month':
                setActiveBtn(2);
                break;
            case 'lastMonth':
                setActiveBtn(3);
                break;
        }
    }

    const handleCustom = (e) => {
        setHasCustomInterval(e.target.checked);
        if(e.target.checked) {
            setActiveBtn(4);
        }
    }

    const handleEndChange = (e) => {
        setEnd(new Date(e.target.value));
    }

    const handleBeginChange = (e) => {
        setBegin(new Date(e.target.value));
    }

    useEffect(()=> {
        if(begin && end) {
            setFilter('custom');
            console.log('Custooom');
        }
    }, [begin, end])

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const today = new Date();
                const str = today.toLocaleDateString();
                const response = await api.get('/orderStats',{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                setData(response.data);
            } catch(error){

            }
        }
        fetchData();
    }, []);

    return (
        (data)?
        (
        <div className="col-12 statsWrapper">
            <div className='mt-3 mb-3 headerWrapper'>
                <h2 className='offset-1 mb-3'>Štatistiky</h2>
            </div>
            <div className="d-flex offset-1 align-items-center">
                <button className={activeBtn == 1? "px-3 py-1 active":"px-3 py-1"} onClick={()=>handleFilter('year')}>Tento Rok</button>
                <button className={activeBtn == 2? "ms-2 px-3 py-1 active":"ms-2 px-3 py-1"} onClick={()=>handleFilter('month')}>Tento Mesiac</button>
                <button className={activeBtn == 3? "ms-2 px-3 py-1 active":"ms-2 px-3 py-1"} onClick={()=>handleFilter('lastMonth')}>Minulý Mesiac</button>
                <input type='checkbox' id='custom' onChange={(e)=>handleCustom(e)} className='ms-2 mt-0 form-check-input'/>
                <label className='ms-2 p-0'>Zadať vlastný interval</label>
                {
                    (hasCustomInterval)?
                    (
                        <div className='ms-3'>
                            <label className='me-1'>Od:</label>
                            <input type='date' className='datePicker' onChange={(e)=>handleBeginChange(e)}></input>
                            <label className='ms-2 me-1'>Do:</label>
                            <input type='date' className='datePicker' onChange={(e)=>handleEndChange(e)}></input>
                        </div>
                    ):""
                }
                
            </div>
            <div className='container-fluid pt-5 row'>
                <div className='col-4 mx-5 column'>
                    <SalesByCategory period={filter} begin={begin} end={end}/>
                </div>
                <div className='col-6 column'>
                    <OrderCounts fetchedData={data} period={filter} begin={begin} end={end}/>
                </div>
            </div>

            <div className='container-fluid offset-1 col-10 row'>
                <Profit fetchedData={data} period={filter} begin={begin} end={end}/>
            </div>
        </div>
        ):(
            <div className='col-12 align-items-center statsWrapper'>Načítava sa</div>
        )
    );
}
 
export default Stats;