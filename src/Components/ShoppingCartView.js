import { useEffect } from 'react';
import '../Styles/ShoppingCartView.css';


const ShoppingCartView = ({shoppedItems}) => {

    useEffect(() => {
        console.log("Som vo view");
        console.log(shoppedItems);
    },[shoppedItems])

    const increaseItemAmount = (e) => {
        const inputId = e.target.getAttribute('data-target');
        const input = document.getElementById(inputId);
        let prevValue = parseInt(input.value);
        input.value = prevValue + 1;
    }

    const decreaseItemAmount = (e) => {
        const inputId = e.target.getAttribute('data-target');
        const input = document.getElementById(inputId);
        let prevValue = parseInt(input.value);
        if (prevValue > 1) {
            input.value = prevValue - 1;
        }
    }

    return ( 
            (shoppedItems != null && shoppedItems.length > 0)?
            (<ul className="col-12 py-3 px-0 itemList">
                    {
                    shoppedItems.map((item, index) => (
                        <li className='py-3 orderItem' key={index}>
                            <div className='py-1'>
                                <img className='col-3' src={`data:image/png;base64,${item.obrazok}`}/>
                                <label className='px-4'>{item.Nazov_produktu}</label>
                            </div>
                            <div className='priceInfo col-5 col-lg-4 col-xxl-3'>
                                <div className='itemCounter p-1'>
                                    <button data-target={`input${index}`} onClick={decreaseItemAmount}>-</button>
                                    <input id={`input${index}`} className='col-1 itemCount' type='number' min='1' defaultValue='1'></input>
                                    <button data-target={`input${index}`} onClick={increaseItemAmount}>+</button>
                                </div>
                                <p className='m-0'>{item.Aktualna_cena} €</p>
                            </div>
                        </li>
                    ))
                    }
            </ul>
            ):(
                <div className='container-fluid emptyCart'>
                    <i class="bi bi-emoji-frown"></i>
                    <h3>Váš nákupný košík je prázdny</h3>
                </div>
            )
     );
}
 
export default ShoppingCartView;