import { useEffect } from 'react';
import '../Styles/ProductInfo.css'

const ProductInfo = ({item, callback}) => {
    let currentItem = item;
    let objectProperties;
    if(item) {
        objectProperties = Object.getOwnPropertyNames(item);
    }
    
    useEffect(()=> {
        currentItem = JSON.parse(localStorage.getItem('currentItem'));
        objectProperties = Object.getOwnPropertyNames(item);
        objectProperties.pop();
        objectProperties.shift();
    },[]);

    
    return (
        (currentItem)?
        (<div className="col-12">
            <div className='track'>
                <h3>Cesta</h3>
            </div>
            <div className='offset-1 col-10 parWrap'>
                <div className='mainInfo'>
                    <div className='col-12 col-md-7 py-4 px-md-5 py-xl-5 my-xl-0 imageWrapper'>
                        <img className='p-5' src={`data:image/png;base64,${currentItem.obrazok}`}/>
                    </div>
                    <div className="col-12 col-md-5 buyInfoContainer">
                        <h2 className='my-3'>{currentItem.Nazov_produktu}</h2>
                        <div className='p-3 buyInfo'>
                            <h4>356€</h4>
                            <h6>Na sklade 18ks</h6>
                            <div className='itemCounter p-1'>
                                <button>-</button>
                                <input className='col-1 itemCount' type='number' min='1' defaultValue='1'></input>
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
                                <label>{property}</label>
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