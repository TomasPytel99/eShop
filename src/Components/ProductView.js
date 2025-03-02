import '../Styles/ProductView.css'
import { useEffect, useRef, useState } from 'react';
import { json, Link } from 'react-router-dom'
import api from '../api'



import {File } from "lucide-react";
import { Range, getTrackBackground } from 'react-range';
import userEvent from '@testing-library/user-event';

const ProductView = (props) => {
    const [objectProperties, setObjectProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [propertyValues, setPropertyValues] = useState([]);
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        Nazov_produktu: '',
        Aktualna_cena: 0,
        Zlava: 0
    });
    const [formName, setFormName] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [sound, setSound] = useState(null);
    const topImage = useRef(null);
    const addWindow = useRef(null);
    const heart = useRef(null);
    const [values, setValues] = useState([5, 50]);
    const [filters, setFilters] = useState({});
    const [filtereditems, setFilteredItems] = useState(null);
    const [clicked, setClicked] = useState(false);

    const orderOptions = [
        {name: 'Najlacnejšie', val: 1},
        {name: 'Najdrahšie', val: 2},
        {name: 'Najnovšie', val: 3},
        {name: 'Najstaršie', val: 4}
    ]

    useEffect(()=>{
        if(!loading) {
            topImage.current.style.backgroundImage = `url(${localStorage.getItem('path')})`;
        }
    });
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const res = await api.get('/categoryProperties', {params:{'section': localStorage.getItem('section')}});
            const response = await api.get('/items', {params:{'section': localStorage.getItem('section')}});
            
            const user = JSON.parse(localStorage.getItem('currentUser'));
            if(user) {
                const req = await api.get('/isCategoryLiked', {params:{'Nazov_kategorie': localStorage.getItem('section')} ,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if(req.data === true) {
                    setClicked(true);
                    heart.className = "bi bi-heart-fill";
                    //alert('Yessss');
                } else {
                    setClicked(false);
                    heart.className = "bi bi-heart";
                    //alert('OUha');
                }
            }
            
            setObjectProperties(res.data);
            setItems(Object.values(response.data));
            setFilteredItems(Object.values(response.data));
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
        
        fetchProducts();
    }, []);

    useEffect(() => {
        if(objectProperties && objectProperties.length > 0) {
            //setObjectProperties(Object.getOwnPropertyNames(items[0]));
            let arr = ['Model', 'Výška', 'Šírka', 'Hĺbka', 'Prstoklad'];
            setFilteredProperties(objectProperties.filter(item => !arr.includes(item)));//chat GPT
            setLoading(false);
        }
    },[objectProperties]);

    useEffect(() => {
        console.log(filteredProperties);
        if(filteredProperties.length > 0) {
            setPropertyValues(filteredProperties.map((property) => //chat GPT tento riadok a pod nim
                [...new Set(items.map((item) => item[property]))]
        ));}
    }, [filteredProperties]);
    
    const handleChange = (e) => {
        const {name, value} = e.target; //chat GPT
        if(name == 'Zlava') {
            if(value > 99) {
                alert('Nemôžeš dať zľavu viac ako 99%');
                setFormData({...formData, [name]: 0});
                e.target.value = 0;
                return;
            }
        }
        setFormData({...formData, [name]: value}); //chat GPT
    };

    const handleModalClose = () => {
        const name = document.getElementById('Nazov_produktu');
        name.value = '';
        const price = document.getElementById('Aktualna_cena');
        price.value = '';
        const image = document.getElementById('previewImage');
        image.src = '';
        filteredProperties.forEach(element => {
            const input = document.getElementById(element);
            input.value = '';
        });
    }

    const handleNewItem = async (e) => {
        try {
            //chat GPT
            const fdata = new FormData();
            fdata.append('element', JSON.stringify(formData));
            fdata.append('section', localStorage.getItem('section'));
            fdata.append('user', localStorage.getItem('currentUser'));
            fdata.append('obrazok', uploadImage);
            ///////
            fdata.append('zvuk', sound);
            const request = await api.post('/addItem', fdata, {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
                }
            });
            alert('Produkt sme úspešne pridali do ponuky');
        } catch(err) {
            console.log(err);
            alert('Nepodarilo sa pridat produkt');
        }
        handleModalClose();
        
    };

    const handleRemoveItem = async (item) => {
        const userConfirm = window.confirm(`Naozaj chcete vymazať produkt: ${item.Nazov_produktu}`);
        if(userConfirm) {
            if (JSON.parse(localStorage.getItem('currentUser')) !== null && (JSON.parse(localStorage.getItem('currentUser')).category === localStorage.getItem('section') 
                || JSON.parse(localStorage.getItem('currentUser')).admin === 'y')) {
                    try {
                        const user = localStorage.getItem('currentUser');
                        const response = await api.delete(`/deleteItem/${item.Id_produktu}`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            },
                            data: user
                        });
                        alert('Úspešne ste vymazali produkt');
                    } catch(err) {
                        alert('Vymazanie sa nepodarilo!');
                    } 
                }
        } else {
            alert("No máš šťastie");
        }
    };
    //chat GPT
    const handleFileChange = (e) => {
        e.preventDefault();
    }

    const handleFileDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const id = e.target.id;

        const droppedFile = e.dataTransfer.files[0];
        
        if (droppedFile && id === 'imageUpload') {
            const previewImage = document.getElementById('previewImage');
            previewImage.src = URL.createObjectURL(droppedFile);
            setUploadImage(droppedFile);
        } else if(droppedFile && id === 'soundUpload') {
            setSound(droppedFile);
        }
    }
    ///////////
    const handleUpdateLoading = (item) => {
        setFormName('Upraviť');
        const nameInput = document.getElementById('Nazov_produktu');
        nameInput.value = item.Nazov_produktu;
        const priceInput = document.getElementById('Aktualna_cena');
        priceInput.value = item.Aktualna_cena;
        const saleInput = document.getElementById('Zlava');
        saleInput.value = item.Zlava;
        filteredProperties.forEach(property => {
            let propertyName = document.getElementById(property);
            propertyName.value = item[property];
        });
        const image = document.getElementById('previewImage');
        image.src = item.obrazok;
        setSelectedItem(item);
    }

    const decideHandle = async (e) => {
        e.preventDefault();
        if(formName === 'Upraviť') {
            handleUpdate();
        } else {
            handleNewItem(e);
        }
    }

    const handleUpdate = async () => {
        const tdata = {
            element: JSON.stringify(formData),
            id_produktu: selectedItem.Id_produktu,
            section: localStorage.getItem('section'),
            user: localStorage.getItem('currentUser'),
            obrazok: uploadImage,
            zvuk: sound
        };

        try {
            if(JSON.parse(localStorage.getItem('currentUser')) !== null && (JSON.parse(localStorage.getItem('currentUser')).category === localStorage.getItem('section') 
                || JSON.parse(localStorage.getItem('currentUser')).admin === 'y')) {
                console.log(tdata);
                const response = await api.post('/editItem', tdata, {
                    headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, //chat GPT
                    'Content-Type': 'multipart/form-data', //chat GPT
                    }
                });
                alert('Produkt bol upraveny');
            }
        }catch (err) {
            alert('Nepodarilo sa upraviť vlastnosti produktu');
        }
    }

    const handleOrderBy = (e) => {
        const val = parseInt(e.target.value);
        console.log('sortujem ' + val);
        let arr = Object.values(items); 
        if(val === 1) {
            arr = arr.sort((itemA, itemB) => (itemA.Aktualna_cena - itemA.Aktualna_cena /100 * itemA.Zlava) - (itemB.Aktualna_cena - itemB.Aktualna_cena /100 * itemB.Zlava));
        } else if(val === 2) {
            arr = arr.sort((itemA, itemB) => (itemB.Aktualna_cena - itemB.Aktualna_cena /100 * itemB.Zlava) - (itemA.Aktualna_cena - itemA.Aktualna_cena /100 * itemA.Zlava));
        } else if(val === 3) {
            arr = arr.sort((itemA, itemB) => itemB.Id_produktu - itemA.Id_produktu);
        } else if(val === 4) {
            arr = arr.sort((itemA, itemB) => itemA.Id_produktu - itemB.Id_produktu);
        }
        setItems(arr);
    }

    const handleFilterChange = (property, value) => {
        setFilters(prev => {
            const updatedFilters = { ...prev };
    
            if (!updatedFilters[property]) {
                updatedFilters[property] = [];
            }
    
            if (updatedFilters[property].includes(value)) {
                updatedFilters[property] = updatedFilters[property].filter(v => v !== value);
            } else {
                updatedFilters[property].push(value);
            }
    
            console.log("Updated Filters:", updatedFilters); // Check updated filters
            return updatedFilters; // This should trigger useEffect
        });
    }

    useEffect(() => {
        if(items) {
        let filtered = Object.values(items).filter(item => {
            return Object.entries(filters).every(([property, values]) => {
                return values.length === 0 || values.includes(item[property]);
            });
        });
        console.log("Filtered Items:", filtered)
        setFilteredItems(filtered);
    }
    }, [filters, items]);

    const handleLike = async (e) => {
        if(!clicked) {
            
            let likedCategory = localStorage.getItem('section');
            
            if(localStorage.getItem('currentUser') != null) {
                try {
                    const response = await api.post('/likeCategory', {Nazov_kategorie: likedCategory}, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    heart.className = "bi bi-heart-fill";
                    setClicked(true);
                    props.addCategoryToLiked(likedCategory);
                    alert("Kategória bola úspešne pridaná do obľúbených");
                } catch(error) {
                    alert("Ľutujeme, kategóriu sa nepodarilo pridať do obľúbených");
                }
            }
        } else {
            
            let likedCategory = localStorage.getItem('section');
            
            if(localStorage.getItem('currentUser') != null) {
                try {
                    const response = await api.delete(`/dislikeCategory/${likedCategory}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    heart.className = "bi bi-heart";
                    setClicked(false);
                    props.removeFromLikedCategories(likedCategory);
                    alert("Kategória bola úspešne odstránená z obľúbených");
                } catch(error) {
                    alert("Ľutujeme, kategóriu sa nepodarilo odstrániť z obľúbených");
                }
            }
        }
    }
    

    if (loading) {
        return <div className='col-12 loadingScreen'>Loading...</div>; //chat GPT
    }

    return (
        <div className='productView-container col-12'>
            <div ref={topImage} className="topImage">
                <h2 className='col-6 offset-2'>Neprestávaj hrať</h2>
            </div>
            <div className='category px-0 container-fluid'>
                <div className='col-7 col-lg-9 py-3 mb-0 d-flex align-items-center categoryName'>
                    <h3>{localStorage.getItem('section')}</h3>
                    {
                        (JSON.parse(localStorage.getItem('currentUser')) !== null)?
                        (
                            <i ref={heart} className={clicked? "bi bi-heart-fill":"bi bi-heart"} onClick={handleLike}></i>
                        ):""
                    }
                </div>
                {
                    (JSON.parse(localStorage.getItem('currentUser')) !== null && (JSON.parse(localStorage.getItem('currentUser')).category === localStorage.getItem('section') 
                    || JSON.parse(localStorage.getItem('currentUser')).admin === 'y'))?
                    (<>
                        <button className='col-2 col-lg-1 my-3 mx-5' data-bs-toggle='modal' data-bs-target='#addProductWindow' name='Pridať' onClick={() => setFormName('Pridať')}>Pridať</button>
                    </>
                    ):""
                }
                <div id='addProductWindow' className='modal fade addProductWindow'>
                    <div className='modal-dialog modal-lg' ref={addWindow}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h4 className='my-0'>{formName} produkt</h4>
                                <button type='button' className='close' data-bs-dismiss='modal' onClick={()=>handleModalClose()}><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div className='modal-body col-12'>
                                <form className='col-12' onSubmit={decideHandle} encType='multipart/form-data'>
                                    <div className='col-12 col-lg-6'>
                                    <div className='inputProperties'>
                                        <label>Názov produktu</label>
                                        <input type='text'id='Nazov_produktu' name='Nazov_produktu' onChange={handleChange}></input>
                                    </div>
                                    <div className='inputProperties'>
                                        <label>Cena (€)</label>
                                        <input type='number' step="0.01" id='Aktualna_cena' className='numberInput' name='Aktualna_cena' min='0' onChange={handleChange}></input>
                                    </div>
                                    <div className='inputProperties'>
                                        <label>Zľava (%)</label>
                                        <input type='number' step="1" id='Zlava' className='numberInput' name='Zlava' min='0' onChange={handleChange}></input>
                                    </div>
                                    {
                                        (filteredProperties.length > 0)?  
                                        (filteredProperties.map((property, index) =>(
                                            <div key={index} className='inputProperties'>
                                                <label>{property.replace('_', ' ')}</label>
                                                <input type='text' id={property} name={property} onChange={handleChange}></input>
                                            </div>
                                        ))) : ""
                                    }
                                    <button type='submit' className='py-2 px-4 my-3 my-lg-0'>Potvrdiť</button>
                                    </div>
                                    <div className='container-fluid dropzones'>
                                        <div className='dropZonesWrapper'>
                                            <label className='offset-1'>Obrázok</label>
                                            <div className='dropZone col-12 offset-lg-1 col-lg-11' id='imageUpload' onDragOver={(e)=> e.preventDefault()} onDrop={handleFileDrop}>
                                                <img id='previewImage' className='px-5 pb-2 previewImage'/>
                                                <p className='py-0'>Potiahnutím vložte súbory</p>
                                                <input type='file'hidden id='fileUpload' onChange={handleFileChange}></input>
                                            </div>
                                        </div>
                                        <div className='dropZonesWrapper'>
                                            <label className='offset-1'>Zvuková nahrávka</label>
                                            <div className='dropZone col-12 offset-lg-1 col-lg-11' id='soundUpload' onDragOver={(e)=> e.preventDefault()} onDrop={handleFileDrop}>
                                                {
                                                    (sound)?
                                                    (
                                                        <>
                                                            <File size={40} className="text-gray-500 mb-1"/>
                                                            <p className='py-0'>{sound.name}</p>
                                                        </>
                                                        
                                                    ):(
                                                        <p className='py-0'>Potiahnutím vložte súbory</p>
                                                    )
                                                }
                                                <input type='file'hidden id='fileUpload2' onChange={handleFileChange}></input>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </form>
                                
                            </div>
                            <div className='modal-footer'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sortBy container-fluid'>
                <h5 className='d-none d-md-inline col-lg-3 col-xxl-2'>Zoradiť podľa:</h5>
                <select id='sortByOptions' className='form-select sort col-12 col-lg-3 col-lg-2 col-xxl-1 my-3 my-md-0 mx-md-3' onChange={handleOrderBy}>
                    {
                        orderOptions.map((op, index) => (
                            <option value={op.val} key={index}>{op.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className='filter d-md-none mt-0'>
                <button className='py-2 mx-3' type="button" data-bs-toggle="offcanvas" data-bs-target="#filters" aria-controls="filters">Filtre</button>
                <div className="offcanvas offcanvas-start w-75 sideOffsetPanel" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="0" id="filters">
                    <div className='filterNavigation m-2'>
                        <h2>Filtre</h2>
                        <button className="btn-close close ms-auto text-white" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#' aria-expanded='false'>Cena</button>
                    <div className='price'>
                        
                    </div>
                    {
                        (filteredProperties.length > 0)?
                        (filteredProperties.map((property, index) => (
                            <>
                                <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target={'#' + property} aria-expanded='false'>{property.replace('_', ' ')}</button>
                                <ul key={index} id={property} className='collapse'>
                                    {
                                        (propertyValues.length > 0)?
                                        propertyValues[index].map((value, ind) =>(
                                            <li key={ind+24}>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id={'inlineCheckbox'+ind*20} value="option1"/>
                                                    <label className="form-check-label" htmlFor={'inlineCheckbox'+ind*20}>{value}</label>
                                                </div>
                                            </li>
                                        )) : ""
                                    }
                                </ul>
                            </>
                        ))):""
                    }
                </div>
            </div>
            <div className='contentWrapper col-12'>
                <div className='sidebar d-none d-md-flex col-md-3 col-xl-2 pe-2'>
                    <h5>Filtre</h5>
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-1 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#' aria-expanded='false'>Cena</button>
                    <Range values={values}
                step={1} // Step size
                min={5}
                max={50}
                onChange={setValues} renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            backgroundColor: '#fff',
                            borderRadius: '5px',
                        }}
                    >
                        {children}
                    </div>
                )} renderThumb={({ index, props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '15px',
                            width: '15px',
                            borderRadius: '50%',
                            backgroundColor: '#FFD12F',
                        }}
                    />
                )}></Range>
                    
                    <div className='d-flex mt-2 mb-2'>
                        <div className='d-flex align-items-center'>
                            <label className="form-check-label">Od</label>
                            <input className='form-control w-1 mx-3' value={values[0]}></input>
                        </div>
                        <div className='d-flex align-items-center'>
                            <label className="form-check-label">Do</label>
                            <input type='number' className='form-control w-1 mx-3' value={values[1]}></input>
                        </div>
                    </div>
                    <div className='price'>
                        
                    </div>
                    {
                        (filteredProperties)?
                        (filteredProperties.map((property, index) => (
                            <>
                                <button key={index} className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target={'#' + property} aria-expanded='false'>{property.replace('_', ' ')}</button>
                                <ul key={index+10} id={property} className='collapse'>
                                    {
                                        (propertyValues.length > 0)?
                                        propertyValues[index].map((value, ind) =>(
                                            <li key={ind+50}>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id={'inlineCheckbox'+ind*20} value={value} onChange={()=> handleFilterChange(property, value)}/>
                                                    <label className="form-check-label" htmlFor={'inlineCheckbox'+ind*20}>{value}</label>
                                                </div>
                                            </li>
                                        )):""
                                    }
                                </ul>
                            </>
                        ))) : ""
                    }
                </div>
                <div className='itemView offset-0 col-md-9 col-lg-10 mt-3 mx-md-3'>
                {
                    (items.length === 0)? 
                    (<div className='nonExisting'>Neexistujú žiadne produkty v tejto sekcii</div>):""
                }
                    <ul className='px-0'>
                    {
                        (filtereditems)?
                        (filtereditems.map((item, index)=>(
                            <li key={index} className='item'>
                                {
                                    (JSON.parse(localStorage.getItem('currentUser')) !== null && (JSON.parse(localStorage.getItem('currentUser')).category === localStorage.getItem('section') 
                                    || JSON.parse(localStorage.getItem('currentUser')).admin === 'y'))?
                                    (<div className='editIcons'>
                                        <i className="bi bi-pencil-fill editBtn" data-bs-toggle='modal' data-bs-target='#addProductWindow' onClick={()=>handleUpdateLoading(item)}></i>
                                        <i className="bi bi-x-circle deleteBtn" onClick={()=>handleRemoveItem(item)}></i>
                                    </div>
                                    ):""
                                }
                                <Link to='/item' onClick={() => {props.callback(item)}}>
                                <img className='pt-3 pt-lg-5 px-5' src={item.obrazok} alt='produkt obrazok'/>
                                <div className='container-fluid  itemInfo'>
                                    <div>
                                        <h6 className='col-8'>{item.Nazov_produktu}</h6>
                                        {
                                            (item.Zlava > 0)?
                                            (
                                                <h6 className='col-3 text-danger aktualnaCenaLabel'>{item.Aktualna_cena - (item.Aktualna_cena / 100 * item.Zlava)} €</h6>
                                            ):(
                                                <h6 className='col-3 aktualnaCenaLabel'>{item.Aktualna_cena - (item.Aktualna_cena / 100 * item.Zlava)} €</h6>
                                            )
                                        }
                                        
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        {
                                            (item.Tvar)?
                                            (<p>{item.Tvar}</p>):(<p></p>)
                                        }
                                        {
                                            (item.Zlava > 0)?
                                            (
                                                <p className='text-decoration-line-through aktualnaCenaLabel'>{item.Aktualna_cena} €</p>
                                            ):" "
                                        }
                                    </div>
                                    
                                </div>
                                </Link>
                            </li>
                        ))):""
                    }
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default ProductView;