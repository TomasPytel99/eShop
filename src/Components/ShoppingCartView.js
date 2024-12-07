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
        <ul className="col-12 py-3 px-0 itemList">
            {
                itemList.map((item, index) => (
                    <li className='py-3 orderItem'>
                        <div>
                            <img className='col-3' src={item.Path}/>
                            <label>{item.Brand}</label>
                        </div>
                        <div className='priceInfo col-5 col-lg-4 col-xxl-3'>
                            <div className='itemCounter p-1'>
                                <button>-</button>
                                <input className='col-1 itemCount' type='number' min='1' defaultValue='1'></input>
                                <button>+</button>
                            </div>
                            <p className='m-0'>{item.Price} €</p>
                        </div>
                    </li>
                ))
            }
        </ul>
     );
}
 
export default ShoppingCartView;