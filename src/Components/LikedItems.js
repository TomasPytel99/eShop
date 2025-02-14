import { useEffect } from "react";
import '../Styles/LikedItems.css'



export const LikedItems = ({items, removeLiked}) => {

    useEffect(() => {
        //items = localStorage.getItem('cart');
        if(items != null) {
            console.log('mame itemy');
        }
        console.log(items);
    },[items]);

    return (
        <div className="col-md-8 offset-md-2 col-12 px-3 px-md-0 py-5 likedItemsWrapper">
            <h2>Zoznam obľúbených produktov</h2>
            {
            (items != null && items.length > 0)?
                (<ul className="col-12 py-3 px-0 itemList">
                        {
                        items.map((item, index) => (
                            <li className='py-3 orderItem' key={index}>
                                <div className='py-1'>
                                    <img className='col-3' src={item.obrazok}/>
                                    <label className='px-4'>{item.Nazov_produktu}</label>
                                </div>
                                <div className='priceInfo col-5 col-lg-4 col-xxl-3'>
                                    <div className='itemCounter p-1'>
                                        <button data-target={`input${index}`}>-</button>
                                        <input id={`input${index}`} className='col-1 itemCount' type='number' min='1' defaultValue='1'></input>
                                        <button data-target={`input${index}`}>+</button>
                                    </div>
                                    <p className='m-0'>{item.Aktualna_cena} €</p>
                                    <i className="bi bi-x-circle" onClick={()=>removeLiked(item)}></i>
                                </div>
                            </li>
                        ))
                        }
                </ul>
                ):(
                    <div className='container-fluid emptyCart'>
                        <i class="bi bi-emoji-frown"></i>
                        <h3>Váš zoznam obľúbených produktov je prázdny</h3>
                    </div>
                )
                }
                {
                    (items.length > 0)?(
                        <button className='py-2 col-6 col-sm-5 col-md-8 col-xl-5 addToCartBtn'>Pridať všetko do košíka</button>
                    ):""
                }
        </div>
     );
}

export default LikedItems;