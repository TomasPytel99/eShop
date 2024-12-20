import '../Styles/ProductView.css'
//import guitars from '../Data/guitars.json'
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import api from '../api'

const ProductView = (props) => {
    //const guitarList = guitars;
    const [objectProperties, setObjectProperties] = useState([]);
    const [propertyValues, setPropertyValues] = useState([]);
    const [guitars, setGuitars] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(null);
    const topImage = useRef(null);
    useEffect(()=>{
        if(!loading) {
            topImage.current.style.backgroundImage = `url(${localStorage.getItem('path')})`;
        }
    });
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await api.get('/gitary');
            setGuitars(Object.values(response.data));
            setLoading(false);
            console.log("loaded");
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
        
        fetchProducts();
      }, []);

      useEffect(() => {
        if(guitars) {
            setObjectProperties(Object.getOwnPropertyNames(guitars[0]));
            console.log(objectProperties);
        }
    },[guitars]);

    useEffect(() => {
        if(objectProperties.length > 0) {
            setPropertyValues(objectProperties.map((property) => 
                [...new Set(guitars.map((item) => item[property]))]
        ));}
    }, [objectProperties]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleNewItem = async (e) => {
        e.preventDefault();
        try {
            setFormData({...formData, section: localStorage.getItem('section')})
            console.log(localStorage.getItem('section'));
            const request = await api.post('/newItem', formData);
        } catch(err) {
            alert('Noooooooo');
        }
    };

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
                <button className='col-2 col-lg-1 my-3 mx-3' data-bs-toggle='modal' data-bs-target='#addProductWindow'>Upraviť</button>
                <button className='col-2 col-lg-1 my-3 mx-6' data-bs-toggle='modal' data-bs-target='#addProductWindow'>Pridať</button>
                <div id='addProductWindow' className='modal fade addProductWindow'>
                    <div className='modal-dialog modal-lg'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h4 className='my-0'>Pridanie produktu</h4>
                                <button type='button' className='close' data-bs-dismiss='modal'><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div className='modal-body col-12'>
                                <form className='col-12' onSubmit={handleNewItem}>
                                    <div className='col-12 col-lg-6'>
                                    <div className='inputProperties'>
                                        <label>Názov produktu</label>
                                        <input type='text' name='nazov' onChange={handleChange}></input>
                                    </div>
                                    <div className='inputProperties'>
                                        <label>Cena (€)</label>
                                        <input type='number' name='cena' min='0' onChange={handleChange}></input>
                                    </div>
                                    {
                                        (objectProperties.length > 0)?  
                                        (objectProperties.map((property, index) =>(
                                            <div className='inputProperties'>
                                                <label>{property}</label>
                                                <input type='text' name={property} onChange={handleChange}></input>
                                            </div>
                                        ))) : ""
                                    }
                                    <button type='submit' className='py-2 px-4'>Potvrdiť</button>
                                    </div>
                                    <div className='dropZone col-12 offset-lg-1 col-lg-5'>
                                        <p className='py-0'>Potiahnutím vložte súbory</p>
                                        <input type='file'hidden id='fileUpload'></input>
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
                        (objectProperties.length > 0)?
                        (objectProperties.map((property, index) => (
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
                        (objectProperties)?
                        (objectProperties.map((property, index) => (
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
                        (guitars)?
                        (guitars.map((guitar, index)=>(
                            <li key={index} className='item'>
                                <Link to='/item' onClick={() => {props.callback(guitar)}}>
                                <img className='pt-4 pt-lg-5' src={`data:image/png;base64,${guitar.obrazok}`} alt='produkt obrazok'/>
                                <div className='container-fluid pt-3 itemInfo'>
                                    <div>
                                        <h5>{guitar.nazovproduktu}</h5>
                                        <h6>{guitar.aktualna_cena} €</h6>
                                    </div>
                                    <p>{guitar.tvar}</p>
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