import '../Styles/ProductView.css'
import guitars from '../Data/guitars.json'

const ProductView = (props) => {
    //const guitarList = guitars;
    const objectProperties = Object.getOwnPropertyNames(guitars.at(0));
    objectProperties.pop();
    objectProperties.shift();
    const propertyValues = [];
    for(let p of objectProperties){
        propertyValues.push([...new Set(guitars.map(item => item[p]))]);
    }

    return ( 
        <div className='productView-container col-12'>
            <div className="topImage">
                <h2 className='col-6 offset-2 offset-lg-1'>Neprestávaj hrať</h2>
            </div>
            <div className='category px-0 container-fluid'>
                <h2 className='col-10 py-3 mb-0 categoryName'>{props.section}</h2>
            </div>
            <div className='sortBy container-fluid'>
                <h3 className='d-none d-md-inline col-lg-3 col-xxl-2'>Zoradiť podľa:</h3>
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
                        objectProperties.map((property, index) => (
                            <>
                                <button key={index} className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target={'#' + property} aria-expanded='false'>{property}</button>
                                <ul key={index+10} id={property} className='collapse'>
                                    {
                                        propertyValues[index].map((value, ind) =>(
                                            <li key={ind}>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id={'inlineCheckbox'+ind*20} value="option1"/>
                                                    <label className="form-check-label" htmlFor={'inlineCheckbox'+ind*20}>{value}</label>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </>
                        ))
                    }
                </div>
            </div>
            <div className='contentWrapper col-12'>
                <div className='sidebar d-none d-md-flex col-md-3 col-xl-2 pe-2'>
                    <h3>Filtre</h3>
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#' aria-expanded='false'>Cena</button>
                    <div className='price'>
                        
                    </div>
                    {
                        objectProperties.map((property, index) => (
                            <>
                                <button key={index} className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target={'#' + property} aria-expanded='false'>{property}</button>
                                <ul key={index+10} id={property} className='collapse'>
                                    {
                                        propertyValues[index].map((value, ind) =>(
                                            <li key={ind}>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id={'inlineCheckbox'+ind*20} value={value}/>
                                                    <label className="form-check-label" htmlFor={'inlineCheckbox'+ind*20}>{value}</label>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </>
                        ))
                    }
                </div>
                <div className='itemView offset-0 col-md-9 col-lg-10 mt-3 mx-md-3'>
                    <ul className='px-0'>
                    {
                        guitars.map((guitar, index)=>(
                            <li key={index} className='item'>
                                <img className='pt-5' src={guitar.Path} alt='produkt obrazok'/>
                                <div className='container-fluid mt-5 pt-3 itemInfo'>
                                    <div>
                                        <h4>{guitar.Brand}</h4>
                                        <h5>{guitar.Price} €</h5>
                                    </div>
                                    <p>{guitar.Type}</p>
                                </div>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default ProductView;