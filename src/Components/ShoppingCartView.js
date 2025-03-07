import { useEffect } from 'react';
import '../Styles/ShoppingCartView.css';


const ShoppingCartView = ({shoppedItems, removeItem, setItemCounts, setShowContinue}) => {
    
    useEffect(()=>{
        setShowContinue(true);
        shoppedItems.forEach(item => {
            setItemCounts((prevCounts) => ({
                ...prevCounts,
                [item.Id_produktu]: 1
            }));
        });
    },[]);
/*
    shoppedItems.forEach(item => {
        setItemCounts((prevCounts) => ({
            ...prevCounts,
            [item.Id_produktu]: 1
        }));
    });*/

    ////////////////////chat GPT
    const increaseItemAmount = (index, item) => {
        const input = document.getElementById('input' + index);
        let prevValue = parseInt(input.value);
        if(prevValue + 1 > item.Pocet) {
            alert('Pridávate si do košíka väčšie množstvo ako je aktuálne na sklade, preto môže dodanie trvať dlhšie');
        }
        input.value = prevValue + 1;
        setItemCounts((prevCounts) => ({
            ...prevCounts,
            [item.Id_produktu]: (prevCounts[item.Id_produktu] || 1) + 1,
          }));
    }

    const decreaseItemAmount = (index, item) => {
        const input = document.getElementById('input' + index);
        let prevValue = parseInt(input.value);
        if (prevValue > 1) {
            input.value = prevValue - 1;
            setItemCounts((prevCounts) => ({
                ...prevCounts,
                [item.Id_produktu]: Math.max((prevCounts[item.Id_produktu] || 1) - 1, 0), 
            }));
        }
    }
    ////////////////////////////
    return ( 
            (shoppedItems != null && shoppedItems.length > 0)?
            (<ul className="col-12 py-3 px-0 itemList">
                    {
                    shoppedItems.map((item, index) => (
                        <li className='py-3 orderItem' key={index}>
                            <div className='py-1'>
                                <img className='col-3' src={item.obrazok}/>
                                <label className='px-4'>{item.Nazov_produktu}</label>
                            </div>
                            <div className='priceInfo col-5 col-lg-4 col-xxl-5'>
                                <p className='m-0 px-1'>Na sklade {item.Pocet} ks</p>
                                <div className='itemCounter p-1'>
                                    <button data-target={`input${index}`} onClick={()=>{decreaseItemAmount(index,item)}}>-</button>
                                    <input id={`input${index}`} className='col-1 itemCount' type='number' min='1' defaultValue='1'></input>
                                    <button data-target={`input${index}`} onClick={()=>{increaseItemAmount(index,item)}}>+</button>
                                </div>
                                <p className='m-0'>{item.Aktualna_cena - (item.Aktualna_cena / 100 * item.Zlava)} €</p>
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