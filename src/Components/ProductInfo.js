import { useEffect, useState } from 'react';
import '../Styles/ProductInfo.css'

const ProductInfo = ({item, callback}) => {
    const [currentItem, setCurrentItem] = useState(null);
    const [objectProperties, setObjectProperties] = useState(null);
    
    useEffect(()=> {
        setCurrentItem(JSON.parse(localStorage.getItem('currentItem')));
        let properties = Object.getOwnPropertyNames(JSON.parse(localStorage.getItem('currentItem')));
        let arr = ['Id_produktu', 'Aktualna_cena', 'obrazok', 'mime_type'];
        setObjectProperties(properties.filter(element => !arr.includes(element)));
    },[item, currentItem]);

    
    return (
        (currentItem)?
        (<div className="col-12">
            <div className='track'>
                <h3>{localStorage.getItem('section')}</h3>
            </div>
            <div className='offset-1 col-10 parWrap'>
                <div className='mainInfo'>
                    <div className='col-12 col-md-7 py-4 px-md-5 py-xl-5 my-xl-0 imageWrapper'>
                        <img className='p-5' src={`data:image/png;base64,${currentItem.obrazok}`}/>
                    </div>
                    <div className="col-12 col-md-5 buyInfoContainer">
                        <h2 className='my-3'>{currentItem.Nazov_produktu}</h2>
                        <div className='p-3 buyInfo'>
                            <h4>{currentItem.Aktualna_cena} €</h4>
                            <h6>Na sklade 18ks</h6>
                            <div className='itemCounter p-1'>
                                <button>-</button>
                                <input className='col-1 itemCounter' type='number' min='1' defaultValue='1'></input>
                                <button>+</button>
                            </div>
                            <button className='py-2 col-6 col-sm-5 col-md-8 col-xl-5 addToCartBtn' onClick={() => {callback(currentItem)}}>Pridať do košíka</button>
                        </div>
                    </div>
                </div>
                <div className="parameters col-12 col-md-7 py-4  py-xl-5 my-xl-0">
                    {
                        objectProperties.map((property, index) => (
                            <div key={index}>
                                <label>{property.replace('_', ' ')}</label>
                                <label>{currentItem[property]}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>):"Nic"
     );
}
 
export default ProductInfo;