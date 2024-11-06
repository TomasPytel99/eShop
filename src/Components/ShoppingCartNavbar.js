import { useEffect } from 'react';
import '../Styles/ShoppingCartNavbar.css'

const ShoppingCartNavbar = ({index}) => {
    useEffect(() => {
        switch(index){
            case 1:
                document.getElementById('cart').style.backgroundColor = `#FFD12F`;
                break;
            case 2:
                document.getElementById('transport').style.backgroundColor = `#FFD12F`;
                break;
            case 3:
                document.getElementById('customerInfo').style.backgroundColor = `#FFD12F`;
                break;
            default:
                document.getElementById('cart').style.backgroundColor = `#FFD12F`;
                break;
        }
    },[index])
    
    return ( 
        <div className="container-fluid col-12 cartNavbar">
            <div className="cart">
                <div className="rounded-circle" id='cart'></div>
                <span>Nákupný košík</span>
            </div>
            <div className="transport">
                <div className="rounded-circle" id='transport'></div>
                <span>Doprava</span>
            </div>
            <div className="customerInfo">
                <div className="rounded-circle"  id='cutomerInfo'></div>
                <span>Osobné údaje</span>
            </div>
        </div>
     );
}
 
export default ShoppingCartNavbar;