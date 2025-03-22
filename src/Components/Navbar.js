import '../Styles/Navbar.css'
import logoPic from '../Assets/Ehop.svg'
import saleIcon from '../Assets/sale-icon.svg'
import shoppingCartIcon from '../Assets/shopping-trolley-icon.svg'
import userIcon from '../Assets/user-black-icon.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import api from '../api'

const Navbar = ({itemList, favouriteList, changeSection}) => {
    const query = useRef(null);
    const [queryValue, setQueryValue] = useState(null);
    const searchInput = useRef(null);
    const [suggestedItems, setSuggestedItems] = useState(null);


    const handleSearch = async () => {
        const q = query.current.value;


        const request = await api.get('/search', {params: {query: q}});
        
        if(request.data) {

        }
    }

    const handleSuggestion = async () => {
        const q = query.current.value;
        setQueryValue(q);
        try {
            const request = await api.get('/search', {params: {query: q}});
            
            setSuggestedItems(request.data);
        } catch(err) {

        }
    }


    const handleClick = (section) => {
        setSuggestedItems(null);
        changeSection(section);
        setQueryValue('');
    }

    return ( 
        <div className="container-fluid navbar">
            <Link to='/' className='col-7 col-sm-5 col-md-4 col-lg-3 col-xl-2  logo-container'>
                <img className='logo' src={logoPic} alt='logo obrazok'/>
            </Link>
            <div className=' searchbar-container d-none d-lg-flex col-lg-5 col-xl-5 '>
                <form className='d-flex w-100 mt-2'  ref={searchInput} name='searchForm' onSubmit={handleSearch}>
                    <input ref={query} type='text' placeholder='Hľadať' value={queryValue} onChange={handleSuggestion}></input>
                    <button className='search' type='submit'></button>
                </form>
                {
                    (suggestedItems && suggestedItems.length !== 0)?
                    (
                        <ul className='pt-1 pb-2 ps-0 suggestedItems'>
                            {
                                suggestedItems.map((product, index)=>(
                                    (product.id_produktu)?
                                    (
                                        <li className='ps-3 mx-1' key={index}>
                                            <Link to={'/'+product.nazov_kategorie.replace(/^./, (letter)=>letter.toUpperCase())+'/'+product.id_produktu} 
                                                  onClick={()=>handleClick(product.nazov_kategorie.replace(/^./, (letter)=>letter.toUpperCase()))}
                                                  className='w-100'>
                                                {product.nazov_kategorie} - {product.nazov_produktu}
                                            </Link>
                                        </li>
                                    ):(
                                        <li className='ps-3 mx-1' key={index}>
                                            <Link to={'/'+product.nazov_kategorie.replace(/^./, (letter)=>letter.toUpperCase())} 
                                                  onClick={()=>handleClick(product.nazov_kategorie.replace(/^./, (letter)=>letter.toUpperCase()))}
                                                  className='w-100'>
                                                {product.nazov_kategorie}
                                            </Link>
                                        </li>
                                    )
                                ))
                            }
                        </ul>
                    ):""
                }
            </div>
            <div className='col-3 col-xl-5 d-xl-flex d-none userlinks-container'>
                <div className='userlinks'>
                    {
                        (JSON.parse(localStorage.getItem('currentUser')) !== null && JSON.parse(localStorage.getItem('currentUser')).admin === 'y')?
                        (
                            <>
                            <Link to='/spravaUzivatelov' className='px-2'>
                                <i className="bi bi-people-fill dashboard"></i>
                            </Link>
                            <Link to='/statistiky' className='px-2'>
                                <i className="bi bi-bar-chart-fill stats"></i>
                            </Link>
                            </>
                            
                        ):""
                    }
                    {
                        (localStorage.getItem('currentUser') !== null)?
                        (<Link to='/likedItems' className='px-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="black" className="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" stroke="black" strokeWidth="0.3"/>
                            </svg>
                            {
                                (favouriteList !== null && favouriteList.length > 0)?
                                (<span className='badge bg-red position-absolute top-10 start-10 translate-middle fs-6'>{favouriteList.length}</span>)
                                :(<></>)
                            }
                        </Link>):""  
                    }
                    <Link to='/cart' className='px-2'>
                        <img className='icon' alt='Nakupný košík' src={shoppingCartIcon}/>
                        {
                            (itemList)?
                            (
                                <span className='badge bg-red position-absolute top-10 start-10 translate-middle fs-6'>{itemList.length}</span>
                            ):""
                        }
                    </Link>
                    <Link to='/loggIn' className='px-2'>
                        <img className='icon' alt='Užívateľský profil' src={userIcon}/>
                    </Link>
                </div>
                <Link className='registrationLink' to='/register'>Registrovať sa</Link>
            </div>
            <button data-mdb-button-init className='d-xl-none navbar-toggler ms-auto hamBtn'type='button' data-bs-target="#menu" data-bs-toggle="collapse" aria-expanded="false">
                <span className='navbar-toggler-icon'></span>
            </button>
            <ul className='d-xl-none list-unstyled col-12 collapse collapse-menu mobilenav' id='menu'>
                <li><Link to='/'>Zľavnené produkty</Link></li>
                <li><Link to='/'>Nákupný košík</Link></li>
                <li><Link to='/loggIn'>Užívateľský profil</Link></li>
                <li><Link to='/register'>Registrovať sa</Link></li>
            </ul>
        </div>
     );
}
 
export default Navbar;