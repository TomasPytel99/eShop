import { useEffect } from 'react';
import '../Styles/ShoppingCartView.css';
import guitars from '../Data/guitars.json';

const ShoppingCartView = ({items}) => {
    let itemList = guitars;
    useEffect(() => {
        if(items != null) {
            itemList = items;
            console.log('mame itemy');
        }
        console.log('prazdny kosik');
    })
    return ( 
        <div className="col-12 p-3 itemList">
            {
                itemList.map((item, index) => (
                    <div className='orderItem'>
                        <img className='col-2' src={item.Path}/>
                        <label>{item.Brand}</label>

                    </div>
                ))
            }
        </div>
     );
}
 
export default ShoppingCartView;