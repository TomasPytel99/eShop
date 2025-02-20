import { useFetcher } from 'react-router-dom';
import '../Styles/OrderInfo.css'
import api from '../api'
import { useState, useEffect } from "react";

const OrderInfo = ({cart, itemCounts, transportMethod, paymentMethod}) => {
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
      if(transportMethod) {
        finalPrice += parseFloat(transportMethod.optionPrice);
      }
      if (paymentMethod) {
        finalPrice += parseFloat(paymentMethod.paymentPrice);
      }
      setFinalPrice(finalPrice);
    }, [cart, itemCounts, transportMethod, paymentMethod]);

    
    return ( 
      <div className="container-fluid py-2 px-3 mb-3 orderInfo">
        <h1>Produkty</h1>
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
          {
            (transportMethod)?
            (
              <div className='pt-2'>
                <h6>Doprava - {transportMethod.optionName}</h6>
                <h6>{transportMethod.optionPrice} €</h6>
              </div>
            ):""
          }
          
          {
            (paymentMethod)? 
            (
              <div className='pt-2'>
                <h6>Spôsob platby - {paymentMethod.paymentName}</h6>
                <h6>{(paymentMethod.paymentPrice == 0)? "Zadarmo":paymentMethod.paymentPrice + " €"}</h6>
              </div>
            ):""
          }
          <div className='pt-2'>
            <h4>Spolu</h4>
            <h4>{finalPrice} €</h4>
          </div>
        </div>
        
      </div>
     );
}
 
export default OrderInfo;