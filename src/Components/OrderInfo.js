import { useFetcher } from 'react-router-dom';
import '../Styles/OrderInfo.css'
import api from '../api'
import { useState, useEffect } from "react";

const OrderInfo = ({cart, itemCounts, transportPrice}) => {
    const [products, setProducts] = useState(cart);
    const [finalPrice, setFinalPrice] = useState(null);
    useEffect(() => {
      setProducts(cart);
      let finalPrice = 0;
      cart.forEach(element => {
        let itemC = itemCounts[element.Id_produktu];
        if(itemC == null || itemC < 0) {
          itemC = 1;
        }
        finalPrice += itemC * parseInt(element.Aktualna_cena);
      });
      finalPrice += parseInt(transportPrice);
      setFinalPrice(finalPrice);
    }, [cart, itemCounts]);

    
    return ( 
      <div className="container-fluid py-2 px-3 mb-3 orderInfo">
        <h1>Products</h1>
        <ul className='p-0'>
        {
          (products)?
          (products.map((product, index) => (
            <li key={product.id} className='py-1'>
              {<>
                <label>{product.Nazov_produktu}</label>
                <span>
                  <span className='mx-5'>{itemCounts[product.Id_produktu] || 1}x</span>
                  <span>{product.Aktualna_cena} €</span>
                </span>
              </>
              }
            </li>
          ))):""
        }
        </ul>
        <div className='finalPrice'>
          <div className='pt-2'>
            <h6>Doprava</h6>
            <h6>{transportPrice} €</h6>
          </div>
          <div>
            <h4>Spolu</h4>
            <h4>{finalPrice} €</h4>
          </div>
        </div>
        
      </div>
     );
}
 
export default OrderInfo;