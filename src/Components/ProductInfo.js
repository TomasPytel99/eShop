import { useEffect, useState } from 'react';
import '../Styles/ProductInfo.css'
import { useFetcher, useParams } from 'react-router-dom';
import api from '../api'

const ProductInfo = ({item, callback}) => {
    const [currentItem, setCurrentItem] = useState(null);
    const [objectProperties, setObjectProperties] = useState(null);
    const [clicked, setClicked] = useState(false);
    
    useEffect(()=> {
        setCurrentItem(JSON.parse(localStorage.getItem('currentItem')));
        let properties = Object.getOwnPropertyNames(JSON.parse(localStorage.getItem('currentItem')));
        let arr = ['Id_produktu', 'Aktualna_cena', 'obrazok', 'Id_obrazka'];
        setObjectProperties(properties.filter(element => !arr.includes(element)));
    },[item, currentItem]);

    useEffect(()=> {
        const fetchLike = async () => {
            let likedItem = localStorage.getItem('currentItem');
            if(likedItem == null) {
                return;
            }
            const response = await api.get('/isItemLiked', {
                //params: { Id_produktu: likedItem.Id_produktu },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(response == true) {
                document.getElementById('heart').className = "bi bi-heart-fill";
                setClicked(true)
            } else {
                document.getElementById('heart').className = "bi bi-heart";
                setClicked(false);
            }
        }

        fetchLike();
    },[]);

    const handleLike = async (e) => {
        if(!clicked) {
            document.getElementById('heart').className = "bi bi-heart-fill";
            setClicked(true)
            let likedItem = localStorage.getItem('currentItem');
            const response = await api.post('/likeItem', {Id_produktu: likedItem.Id_produktu}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            alert(response);
        } else {
            document.getElementById('heart').className = "bi bi-heart";
            setClicked(false);
            let likedItem = localStorage.getItem('currentItem');
            const response = await api.delete(`/dislikeItem/${likedItem.Id_produktu}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        }
    }

    
    return (
        (currentItem)?
        (<div className="col-12">
            <div className='track'>
                <h3>{localStorage.getItem('section')}</h3>
            </div>
            <div className='offset-1 col-10 parWrap'>
                <div className='mainInfo'>
                    <div className='col-12 col-md-7 py-4 px-md-5 py-xl-5 my-xl-0 imageWrapper'>
                        <img className='p-5' src={currentItem.obrazok}/>
                    </div>
                    <div className="col-12 col-md-5 buyInfoContainer">
                        <h2 className='my-3'>{currentItem.Nazov_produktu}</h2>
                        <div className='p-3 buyInfo'>
                            <h4>{currentItem.Aktualna_cena} €</h4>
                            <h6>Na sklade 18ks</h6>
                            <div className='saveFavouriteDiv p-1' onClick={handleLike}>
                                <i id='heart' class="bi bi-heart"></i>
                                <label className='px-2'>Uložiť</label>
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