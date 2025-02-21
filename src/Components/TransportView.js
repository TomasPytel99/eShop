import { useEffect, useState } from 'react';
import '../Styles/TransportView.css'
import { useFetcher } from 'react-router-dom';


const TransportView = ({setTransportMethod, setPaymentMethod, setShowContinue, transportMethod, paymentMethod}) => {
    const [transportError, setTransportError] = useState(true);
    const [paymentError, setPaymentError] = useState(true);

    const handleTransportChange = (e) => {
        const id = parseInt(e.target.value);
        const opt = transportOptions.find(option => option.optionId === id)

        setTransportMethod(opt);
        setTransportError(false);
        if(!paymentError) {
            setShowContinue(true);
        }
    }

    const handlePaymentOption = (e) => {
        const paymentId = parseInt(e.target.value);
        const opt = paymentOptions.find(pO => pO.paymentId === paymentId);

        setPaymentMethod(opt);
        setPaymentError(false);
        if(!transportError) {
            setShowContinue(true);
        }
    }

    const transportOptions = [
        {optionId: 1, optionName: "GLS", optionPrice: 3.59},
        {optionId: 2, optionName: "DPD", optionPrice: 4.59},
        {optionId: 3, optionName: "Packeta", optionPrice: 2.59},
        {optionId: 4, optionName: "Slovenská pošta", optionPrice: 1.59}
    ]

    const paymentOptions = [
        {paymentId: 1, paymentName: "Dobierka", paymentPrice: 1},
        {paymentId: 2, paymentName: "Karta", paymentPrice: 0},
        {paymentId: 3, paymentName: "Google pay", paymentPrice: 0},
        {paymentId: 4, paymentName: "PayPal", paymentPrice: 0},
    ]

    return ( 
        <div className='col-12 px-4 py-5 transportWrapper'>
            <h3 className='mb-4'>Spôsob dopravy</h3>
            <ul className="transportList">
                {
                    transportOptions.map((option) => (
                        <li key={option.optionId}>
                            <div>
                                <div>
                                    <input type="radio" name='transport' value={option.optionId} onChange={handleTransportChange} checked={(transportMethod)?(transportMethod.optionId === option.optionId):""}/>
                                    <label className='mx-2'>{option.optionName}</label>
                                </div>
                                <p className='mx-3'>Kuriérska spoločnosť</p>
                            </div>
                            <span>{option.optionPrice} €</span>
                        </li>
                    ))
                }
            </ul>
            <h3 className='mb-4'>Spôsob platby</h3>
            <ul className="mb-0 payMethodList">
                {
                    paymentOptions.map((paymentOption) => (
                        <li>
                            <div>
                                <input type="radio" name='payMethod' onChange={handlePaymentOption} value={paymentOption.paymentId} checked={(paymentMethod)?(paymentMethod.paymentId === paymentOption.paymentId):""}/>
                                <label className='mx-2'>{paymentOption.paymentName}</label>
                            </div>
                            <span>{(paymentOption.paymentPrice === 0)? "Zadarmo":paymentOption.paymentPrice + " €"}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
 
export default TransportView;