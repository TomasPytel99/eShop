import { Routes, Route, Outlet } from "react-router-dom";
import ShoppingCartNavbar from "./ShoppingCartNavbar";
import ShoppingCartView from "./ShoppingCartView";
import TransportView from "./TransportView";
import CustomerInfoView from "./CustomerInfoView";
import OrderInfo from "./OrderInfo";
import '../Styles/ShoppingCart.css'

const ShoppingCart = ({items}) => {
    return ( 
        <div className="container-fluid offset-md-1 col-12 col-md-10 shoppingCartWrapper">
            <div className="col-xl-8 col-12">
                <ShoppingCartNavbar index={1}/>
            </div>
            <div className="col-12 my-5 rowWrapper">
                <div className="col-12 col-lg-8 cartWrapper">
                <Routes>
                    <Route index element= {<ShoppingCartView shoppedItems={items}/>}/>
                    <Route path="transportView" element= {<TransportView/>}/>
                    <Route path="customerInfoView" element= {<CustomerInfoView/>}/>
                </Routes> 
                <Outlet/>
                </div>
                <div className="col-12 col-lg-4 py-4 orderWrapper">
                    <OrderInfo cart={items}/>
                </div> 
           </div>
        </div>
     );
}
 
export default ShoppingCart;