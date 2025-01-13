import { useEffect } from 'react';
import '../Styles/ShoppingCartView.css';


const ShoppingCartView = ({shoppedItems, removeItem, itemCounts, setItemCounts}) => {

    const increaseItemAmount = (index, item) => {
        const input = document.getElementById('input' + index);
        let prevValue = parseInt(input.value);
        input.value = prevValue + 1;
        setItemCounts((prevCounts) => ({
            ...prevCounts,
            [item.Id_produktu]: (prevCounts[item.Id_produktu] || 1) + 1, // Initialize to 1 if it doesn't exist, otherwise increment
          }));
    }

    const decreaseItemAmount = (index, item) => {
        const input = document.getElementById('input' + index);
        let prevValue = parseInt(input.value);
        if (prevValue > 1) {
            input.value = prevValue - 1;
            setItemCounts((prevCounts) => ({
                ...prevCounts,
                [item.Id_produktu]: Math.max((prevCounts[item.Id_produktu] || 1) - 1, 0), // Decrement but ensure it doesn't go below 0
            }));
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
                                    <button data-target={`input${index}`} onClick={()=>{decreaseItemAmount(index,item)}}>-</button>
                                    <input id={`input${index}`} className='col-1 itemCount' type='number' min='1' defaultValue='1'></input>
                                    <button data-target={`input${index}`} onClick={()=>{increaseItemAmount(index,item)}}>+</button>
                                </div>
                                <p className='m-0'>{item.Aktualna_cena} €</p>
                                <i className="bi bi-x-circle" onClick={()=>removeItem(item)}></i>
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