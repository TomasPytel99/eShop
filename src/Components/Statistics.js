import { Doughnut } from 'react-chartjs-2';
import '../Styles/Statistics.css'
import SalesByCategory from './MostSoldCategories';
import Profit from './Profit';
import OrderCounts from './OrderCounts';


const Stats = () => {
    return ( 
        <div className="col-12 my-5 statsWrapper">
            <div className='container-fluid pt-5 row'>
                <div className='col-4 mx-5 column'>
                    <SalesByCategory/>
                </div>
                <div className='col-6 column'>
                    <OrderCounts/>
                </div>
            </div>
            <div className='container-fluid offset-1 col-10 row'>
                <Profit/>
            </div>
        </div>
    );
}
 
export default Stats;