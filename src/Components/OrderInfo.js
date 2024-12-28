import { useFetcher } from 'react-router-dom';
import '../Styles/OrderInfo.css'
import api from '../api'
import { useState, useEffect } from "react";

const OrderInfo = ({cart}) => {
    const [products, setProducts] = useState(cart);

    useEffect(() => {
      setProducts(cart);
    }, [cart]);
/*
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/');
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
*/
    return ( 
        <div className="container-fluid orderInfo">
            <h1>Products</h1>
      <ul>
      {
        (products)?
        (products.map((product) => (
          <li key={product.id}>
            {product.nazov_produktu}
          </li>
        ))):""
      }
      </ul>
        </div>
     );
}
 
export default OrderInfo;