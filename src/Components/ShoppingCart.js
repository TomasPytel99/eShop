import { Routes, Route, Outlet } from "react-router-dom";
import ShoppingCartNavbar from "./ShoppingCartNavbar";
import ShoppingCartView from "./ShoppingCartView";
import TransportView from "./TransportView";
import CustomerInfoView from "./CustomerInfoView";
import OrderInfo from "./OrderInfo";
import '../Styles/ShoppingCart.css';
import { useEffect, useState } from 'react';
import guitars from '../Data/guitars.json';
import { Link } from 'react-router-dom'

const ShoppingCart = ({items, callback}) => {
    let itemList = [];
    let loading = true;
    const [pageIndex, setPageIndex] = useState(1);
    const [itemCounts, setItemCounts] = useState([]);
    const [whereContinue, setWhereContinue] = useState('transportView');
    useEffect(() => {
        //items = localStorage.getItem('cart');
        if(items != null) {
            itemList = items;
            console.log('mame itemy');
        }
        console.log(items);
    },[items]);

    const handleContinue = () => {
        if(pageIndex < 3 ) {
            setPageIndex(pageIndex + 1);
            if(pageIndex +1 == 2) {
                setWhereContinue('customerInfoView');
            } else if(pageIndex +1 == 3) {
                setWhereContinue('');
            }
        } else {
            setPageIndex(1);
            setWhereContinue('transportView');
        }
    }

    const handleBack = () => {
        if(pageIndex > 1) {
            setPageIndex(pageIndex - 1);
        } else {
            setPageIndex(1);
        }
    }

    return (
        <div className="container-fluid offset-md-1 col-12 col-md-10 shoppingCartWrapper">
            <div className="col-xl-8 col-12">
                <ShoppingCartNavbar index={pageIndex}/>
            </div>
            <div className="col-12 my-5 rowWrapper">
                <div className="col-12 col-lg-8 cartWrapper">
                <Routes>
                    <Route index element= {<ShoppingCartView shoppedItems={items} removeItem={callback} itemCounts={itemCounts} setItemCounts={setItemCounts}/>}/>
                    <Route path="transportView" element= {<TransportView/>}/>
                    <Route path="customerInfoView" element= {<CustomerInfoView/>}/>
                </Routes> 
                <Outlet/>
                </div>
                <div className="col-12 col-lg-4 py-4 orderWrapper">
                    <OrderInfo cart={items} itemCounts={itemCounts}/>
                    <div className="cartInfoBtns">
                        {
                            (pageIndex > 1)?
                            (
                                <Link to='' className="p-2 px-4 px-lg-5 continueBtn"  onClick={handleBack}>Späť</Link>
                            ):""
                        }
                        {
                            (Object.keys(items).length > 0)?
                            (
                                <Link to={whereContinue} className="p-2 px-4 px-lg-5 continueBtn"  onClick={handleContinue}>Pokračovať</Link>
                            ):""
                        }
                        
                    </div>
                </div> 
           </div>
        </div>
     );
}
 
export default ShoppingCart;