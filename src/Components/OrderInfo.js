import '../Styles/OrderInfo.css'
import api from '../api'
import { useState, useEffect } from "react";

const OrderInfo = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/gitary');
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

    return ( 
        <div className="container-fluid orderInfo">
            <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.password}: ${product.email}
          </li>
        ))}
      </ul>
        </div>
     );
}
 
export default OrderInfo;