import { Routes, Route, Outlet } from "react-router-dom";
import ShoppingCartNavbar from "./ShoppingCartNavbar";
import ShoppingCartView from "./ShoppingCartView";
import TransportView from "./TransportView";
import CustomerInfoView from "./CustomerInfoView";
import OrderInfo from "./OrderInfo";
import InvoiceView from "./InvoiceView";
import '../Styles/ShoppingCart.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const ShoppingCart = ({items, callback, setCart}) => {
    let itemList = [];
    let loading = true;
    const [pageIndex, setPageIndex] = useState(1);
    const [itemCounts, setItemCounts] = useState([]);
    const [whereContinue, setWhereContinue] = useState('transportView');
    const [whereBack, setWhereBack] = useState('.');
    const [transportMethod, setTransportMethod] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [showContinue, setShowContinue] = useState(true);
    const [orderData, setOrderData] = useState(null);
    const [showInfo, setShowInfo] = useState(true);

    useEffect(() => {
        if(items != null) {
            itemList = items;
            console.log('mame itemy');
        }
        //console.log(items);
    },[items]);

    useEffect(()=>{
        console.log("Nigga ");
        console.log(itemCounts);
    },[itemCounts]);
    
    const handleContinue = () => {
        if(pageIndex < 3 ) {
            if(pageIndex + 1 === 2) {
                setWhereBack('.');
                setWhereContinue('customerInfoView');
                if(!paymentMethod || !transportMethod) {
                    setShowContinue(false);
                }
            } else if(pageIndex + 1 === 3) {
                setWhereBack('transportView');
                setWhereContinue('customerInfoView');
                setShowContinue(false);
            }
            setPageIndex(pageIndex + 1);
        } else {
            setPageIndex(3);
            setWhereBack('transportView');
            setWhereContinue('customerInfoView');
            setShowContinue(false);
        }
    }

    const handleBack = () => {
        if(pageIndex > 1) {
            if(pageIndex - 1 === 2) {
                setWhereBack('.');
                setWhereContinue('customerInfoView');
            } else if (pageIndex - 1 === 1) {
                setWhereContinue('transportView');
                setWhereBack('.');
            }
            setPageIndex(pageIndex - 1);
        } else {
            setPageIndex(1);
            setWhereBack('.');
            setWhereContinue('transportView');
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
                    <Route index element= {<ShoppingCartView shoppedItems={items} removeItem={callback} setItemCounts={setItemCounts} setShowContinue={setShowContinue}/>}/>
                    <Route path="transportView" element= {<TransportView setTransportMethod={setTransportMethod} setPaymentMethod={setPaymentMethod} 
                                                                         transportMethod={transportMethod} paymentMethod={paymentMethod} setShowContinue={setShowContinue}/>}/>
                    <Route path="customerInfoView" element= {<CustomerInfoView itemList={itemList} setOrderData={setOrderData} setItemList={setCart} setPaymentMethod={setPaymentMethod}
                                                                               itemCounts={itemCounts} transportMethod={transportMethod} paymentMethod={paymentMethod}
                                                                               setTransportMethod={setTransportMethod} setShowInfo={setShowInfo}/>}/>
                    <Route path="invoiceDownload" element= {<InvoiceView orderData={orderData}/>}/>
                </Routes> 
                <Outlet/>
                </div>
                <div className="col-12 col-lg-4 py-4 orderWrapper">
                    {
                        (showInfo)?
                        (
                            <>
                                <OrderInfo cart={items} itemCounts={itemCounts} transportMethod={transportMethod} paymentMethod={paymentMethod}/>
                                <div className="cartInfoBtns">
                                    {
                                        (pageIndex > 1)?
                                        (
                                            <Link to={whereBack} className="p-2 px-4 px-lg-5 continueBtn"  onClick={handleBack}>Späť</Link>
                                        ):""
                                    }
                                    {
                                        (Object.keys(items).length > 0 && showContinue)?
                                        (
                                            <Link to={whereContinue} className="p-2 px-4 px-lg-5 continueBtn"  onClick={handleContinue}>Pokračovať</Link>
                                        ):""
                                    }
                                </div>
                            </>
                        ):""
                    }
                </div> 
           </div>
        </div>
     );
}
 
export default ShoppingCart;