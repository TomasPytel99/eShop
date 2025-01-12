import '../Styles/ProductView.css'
//import guitars from '../Data/guitars.json'
import { useEffect, useRef, useState } from 'react';
import { json, Link } from 'react-router-dom'
import api from '../api'

const ProductView = (props) => {
    //const guitarList = guitars;
    const [objectProperties, setObjectProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [propertyValues, setPropertyValues] = useState([]);
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        Nazov_produktu: '',
        Aktualna_cena: 0,
    });
    const [formName, setFormName] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const topImage = useRef(null);
    const addWindow = useRef(null);
    useEffect(()=>{
        if(!loading) {
            topImage.current.style.backgroundImage = `url(${localStorage.getItem('path')})`;
        }
    });
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await api.get('/items', {params:{'section': localStorage.getItem('section')}});
            setItems(Object.values(response.data));
            setLoading(false);
            console.log("loaded");
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
        
        fetchProducts();
    }, []);

    useEffect(() => {
        if(items) {
            setObjectProperties(Object.getOwnPropertyNames(items[0]));
            let arr = ['Id_produktu', 'Nazov_produktu', 'Aktualna_cena', 'obrazok', 'mime_type'];
            setFilteredProperties(objectProperties.filter(item => !arr.includes(item)));
        }
    },[items]);

    useEffect(() => {
        if(filteredProperties.length > 0) {
            setPropertyValues(filteredProperties.map((property) => 
                [...new Set(items.map((item) => item[property]))]
        ));}
    }, [filteredProperties]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
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
            const fdata = {
                ...formData, 
                section: localStorage.getItem('section'),
                user: localStorage.getItem('currentUser'),
                obrazok: uploadImage
            }
            console.log(localStorage.getItem('section'));
            if(uploadImage) {
                console.log(uploadImage);
            }
            const request = await api.post('/addItem', fdata, {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
        } catch(err) {
            console.log(err);
            alert('Nepodarilo sa pridat produkt');
        }
        handleModalClose();
        alert('Produkt sme úspešne pridali do ponuky');
    };

    const handleRemoveItem = async (item) => {
        const userConfirm = window.confirm(`Naozaj chcete vymazať produkt: ${item.Nazov_produktu}`);
        if(userConfirm) {/*
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
                        alert(response);
                    } catch(err) {
                        alert('Vymazanie sa nepodarilo!');
                    } 
                }*/
               alert("Ani nahodou");
        } else {
            alert("No máš šťastie");
        }
    };

    const handleFileChange = (e) => {
        e.preventDefault();
    }

    const handleFileDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            const previewImage = document.getElementById('previewImage');
            previewImage.src = URL.createObjectURL(droppedFile);
            const reader = new FileReader();

            reader.onloadend = () => {
                // This gives you the base64-encoded image
                setUploadImage(reader.result);
            };

            // Read the image as a data URL (base64 encoded)
            reader.readAsDataURL(droppedFile);
        }
    }

    const handleUpdateLoading = (item) => {
        setFormName('Upraviť');
        const nameInput = document.getElementById('Nazov_produktu');
        nameInput.value = item.Nazov_produktu;
        const priceInput = document.getElementById('Aktualna_cena');
        priceInput.value = item.Aktualna_cena;
        filteredProperties.forEach(property => {
            let propertyName = document.getElementById(property);
            propertyName.value = item[property];
        });
        const image = document.getElementById('previewImage');
        image.src = `data:image/png;base64,${item.obrazok}`;
        setSelectedItem(item);
        //const fileUpdate = document.getElementById('fileUpload');
        //fileUpdate.value = item.obrazok;
    }

    const decideHandle = async (e) => {
        e.preventDefault();
        if(formName === 'Upraviť') {
            handleUpdate();
        } else {
            handleNewItem(e);
        }
    }

    const handleUpdate = () => {
        let data = {
            user: JSON.parse(localStorage.getItem('currentUser')),
            item: selectedItem
        }
        try {
            const response = api.put('/editItem', data, {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token from localStorage
                }
            });
        }catch (err) {
            alert('Nepodarilo sa upraviť vlastnosti produktu');
        }
    }

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while fetching
    }

    return ( 
        <div className='productView-container col-12'>
            <div ref={topImage} className="topImage">
                <h2 className='col-6 offset-2'>Neprestávaj hrať</h2>
            </div>
            <div className='category px-0 container-fluid'>
                <h3 className='col-7 col-lg-9 py-3 mb-0 categoryName'>{localStorage.getItem('section')}</h3>
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
                                <form className='col-12' onSubmit={decideHandle} enctype='multipart/form-data'>
                                    <div className='col-12 col-lg-6'>
                                    <div className='inputProperties'>
                                        <label>Názov produktu</label>
                                        <input type='text'id='Nazov_produktu' name='nazov' onChange={handleChange}></input>
                                    </div>
                                    <div className='inputProperties'>
                                        <label>Cena (€)</label>
                                        <input type='number'id='Aktualna_cena' className='numberInput' name='cena' min='0' onChange={handleChange}></input>
                                    </div>
                                    {
                                        (filteredProperties.length > 0)?  
                                        (filteredProperties.map((property, index) =>(
                                            <div key={index} className='inputProperties'>
                                                <label>{property}</label>
                                                <input type='text' id={property} name={property} onChange={handleChange}></input>
                                            </div>
                                        ))) : ""
                                    }
                                    <button type='submit' className='py-2 px-4'>Potvrdiť</button>
                                    </div>
                                    <div className='dropZone col-12 offset-lg-1 col-lg-5' onDragOver={(e)=> e.preventDefault()} onDrop={handleFileDrop}>
                                        <img id='previewImage' className='px-5 pb-5'/>
                                        <p className='py-0'>Potiahnutím vložte súbory</p>
                                        <input type='file'hidden id='fileUpload' onChange={handleFileChange}></input>
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
                <select id='filterOptions' className='form-select sort col-12 col-lg-3 col-lg-2 col-xxl-1 my-3 my-md-0 mx-md-3'>
                    <option>Najpredávanejšie</option>
                    <option>Najlacnejšie</option>
                    <option>Najdrahšie</option>
                    <option>Najnovšie</option>
                    <option>Najstaršie</option>
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
                                <button key={index} className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target={'#' + property} aria-expanded='false'>{property}</button>
                                <ul key={index+10} id={property} className='collapse'>
                                    {
                                        (propertyValues.length > 0)?
                                        propertyValues[index].map((value, ind) =>(
                                            <li key={ind}>
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
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#' aria-expanded='false'>Cena</button>
                    <div className='price'>
                        
                    </div>
                    {
                        (filteredProperties)?
                        (filteredProperties.map((property, index) => (
                            <>
                                <button key={index} className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target={'#' + property} aria-expanded='false'>{property}</button>
                                <ul key={index+10} id={property} className='collapse'>
                                    {
                                        (propertyValues.length > 0)?
                                        propertyValues[index].map((value, ind) =>(
                                            <li key={ind}>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id={'inlineCheckbox'+ind*20} value={value}/>
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
                    <ul className='px-0'>
                    {
                        (items)?
                        (items.map((item, index)=>(
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
                                <img className='pt-3 pt-lg-5 px-5' src={`data:image/png;base64,${item.obrazok}`} alt='produkt obrazok'/>
                                <div className='container-fluid  itemInfo'>
                                    <div>
                                        <h6 className='col-8'>{item.Nazov_produktu}</h6>
                                        <h6 className='col-3'>{item.Aktualna_cena} €</h6>
                                    </div>
                                    {
                                        (item.Tvar)?
                                        (<p>{item.Tvar}</p>):""
                                    }
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