import { useEffect, useRef, useState } from 'react';
import '../Styles/ProductInfo.css'
import { useFetcher, useParams } from 'react-router-dom';
import api from '../api'
import { ClipboardSignature } from 'lucide-react';

const ProductInfo = ({item, callback, addToLiked, removeLiked}) => {
    const [currentItem, setCurrentItem] = useState(null);
    const [objectProperties, setObjectProperties] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(()=> {
        const fetchLike = async () => {
            console.log(item);
            let likedItem = JSON.parse(localStorage.getItem('currentItem'));
            if(likedItem == null) {
                return;
            }
            const response = await api.get('/isItemLiked', {params: {Id_produktu: likedItem.Id_produktu} ,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            //alert(response.data);
            if(response.data === true) {
                setClicked(true)          
            } else if(response.data === false) {
                setClicked(false);
            }
        }

        fetchLike();
    },[item]);

    useEffect(()=> {
        setCurrentItem(JSON.parse(localStorage.getItem('currentItem')));
        let properties = Object.getOwnPropertyNames(JSON.parse(localStorage.getItem('currentItem')));
        let arr = ['Id_produktu', 'Aktualna_cena', 'obrazok', 'Id_obrazka', 'Zlava', 'zvuk'];
        setObjectProperties(properties.filter(element => !arr.includes(element)));
    },[item]);

    const handleLike = async (e) => {
        if(!clicked) {
            document.getElementById('heart').className = "bi bi-heart-fill";
            setClicked(true)
            let likedItem = JSON.parse(localStorage.getItem('currentItem'));
            addToLiked(likedItem);
            if(localStorage.getItem('currentUser') != null) {
                try {
                    const response = await api.post('/likeItem', {Id_produktu: likedItem.Id_produktu}, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    alert("Produkt bol úspešne pridaný do obľúbených");
                } catch(error) {
                    alert("Ľutujeme, produkt sa nepodarilo pridať do obľúbených");
                }
            }
        } else {
            document.getElementById('heart').className = "bi bi-heart";
            setClicked(false);
            let likedItem = JSON.parse(localStorage.getItem('currentItem'));
            removeLiked(likedItem);
            if(localStorage.getItem('currentUser') != null) {
                try {
                    const response = await api.delete(`/dislikeItem/${likedItem.Id_produktu}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    alert("Produkt bol úspešne odstránený z obľúbených");
                } catch(error) {
                    alert("Ľutujeme, produkt sa nepodarilo odstrániť z obľúbených");
                }
            }
        }
    }

    const handlePlay = () => {
        if(audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }

    const handleMusicEnd = () => {
        setIsPlaying(false);
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
                            <div className='d-flex'>
                                {
                                    (currentItem.Zlava > 0)?
                                    (
                                        <>
                                            <h4 className='text-danger actualPrice'>{currentItem.Aktualna_cena - (currentItem.Aktualna_cena / 100 * currentItem.Zlava)} €</h4>
                                            <h4 className='text-decoration-line-through formerPrice' id='actualPrice'>{currentItem.Aktualna_cena} €</h4>
                                        </>
                                    ):(
                                        <h4 id='actualPrice'>{currentItem.Aktualna_cena} €</h4>
                                    )
                                }
                                
                            </div>
                            <h6>Na sklade 18ks</h6>
                            {
                                (currentItem.zvuk)?
                                (
                                    <div className='soundWrapper p-1'>
                                        <audio ref={audioRef} src={currentItem.zvuk} onEnded={handleMusicEnd}></audio>
                                        {
                                            (isPlaying)?
                                            (
                                                <i className="bi bi-pause-circle playBtn" onClick={handlePlay}></i>
                                            ):(
                                                <i className="bi bi-play-circle playBtn" onClick={handlePlay}></i>
                                            )
                                        }
                                        <label className='px-2'>Zvuková ukážka</label>
                                    </div>
                                ):""
                            }
                            <div className='saveFavouriteDiv p-1' onClick={handleLike}>
                                <i id='heart' className={clicked? "bi bi-heart-fill":"bi bi-heart"}></i>
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