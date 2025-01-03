import { useEffect } from 'react';
import '../Styles/ShoppingCartView.css';


const ShoppingCartView = ({shoppedItems}) => {

    useEffect(() => {
        console.log("Som vo view");
        console.log(shoppedItems);
    },[shoppedItems])

    return ( 
        <ul className="col-12 py-3 px-0 itemList">
            {
                (shoppedItems)?
                (shoppedItems.map((item, index) => (
                    <li className='py-3 orderItem' key={index}>
                        <div>
                            <img className='col-3' src={`data:image/png;base64,${item.obrazok}`}/>
                            <label className='px-4'>{item.Nazov_produktu}</label>
                        </div>
                        <div className='priceInfo col-5 col-lg-4 col-xxl-3'>
                            <div className='itemCounter p-1'>
                                <button>-</button>
                                <input className='col-1 itemCount' type='number' min='1' defaultValue='1'></input>
                                <button>+</button>
                            </div>
                            <p className='m-0'>{item.Aktualna_cena} €</p>
                        </div>
                    </li>
                ))):""
            }
        </ul>
     );
}
 
export default ShoppingCartView;