import '../Styles/ProductView.css'
import menuImage from '../Assets/list.svg'
import guitars from '../Data/guitars.json'

const ProductView = () => {
    const guitarList = [];
    return ( 
        <div className='productView-container col-12'>
            <div className="topImage">
                <h2 className='col-6 offset-2 offset-lg-1'>Neprestávaj hrať</h2>
            </div>
            <div className='category px-0 container-fluid'>
                <h2 className='col-10 py-3 mb-0 categoryName'>Gitary</h2>
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
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#types' aria-expanded='false'>Typ</button>
                    <ul id='types' className='collapse'>
                        <li>
                            <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox1">Elektrické</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox2">Elektro-Akustické</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox3">Akustické</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox4">Klasické</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox5" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox5">Ukulele</label>
                            </div>
                        </li>
                    </ul>
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#brand' aria-expanded='false'>Značka</button>
                    <ul id='brand' className='collapse'>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox6" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox6">Cort</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox7" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox7">Fender</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox8" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox8">LAG</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox9" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox9">Takamine</label>
                            </div>
                        </li>
                    </ul>
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#' aria-expanded='false'>Farba</button>
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#' aria-expanded='false'>Počet strún</button>
                </div>
            </div>
            <div className='contentWrapper col-12'>
                <div className='sidebar d-none d-md-flex col-md-3 col-xl-2 pe-2'>
                    <h3>Filtre</h3>
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#' aria-expanded='false'>Cena</button>
                    <div className='price'>
                        
                    </div>
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#types' aria-expanded='false'>Typ</button>
                    <ul id='types' className='collapse'>
                        <li>
                            <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox10" value="option1"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox10">Elektrické</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox11" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox11">Elektro-Akustické</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox12" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox12">Akustické</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox13" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox13">Klasické</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox14" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox14">Ukulele</label>
                            </div>
                        </li>
                    </ul>
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#brand' aria-expanded='false'>Značka</button>
                    <ul id='brand' className='collapse'>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox15" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox15">Cort</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox16" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox16">Fender</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox17" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox17">LAG</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox18" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox18">Takamine</label>
                            </div>
                        </li>
                    </ul>
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#' aria-expanded='false'>Farba</button>
                    <button className='dropdown-toggle sidePanelBtn py-2 mb-4 px-3' type='button' data-bs-toggle='collapse'data-bs-target='#' aria-expanded='false'>Počet strún</button>
                  
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