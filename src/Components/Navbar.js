import '../Styles/Navbar.css'
import logoPic from '../Assets/Ehop.svg'
import saleIcon from '../Assets/sale-icon.svg'
import shoppingCartIcon from '../Assets/shopping-trolley-icon.svg'
import userIcon from '../Assets/user-black-icon.svg'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return ( 
        <div className="container-fluid navbar">
            <a href='/' className='col-7 col-sm-5 col-md-4 col-lg-3 col-xl-2  logo-container'>
                <img className='logo' src={logoPic} alt='logo obrazok'/>
            </a>
            <div className=' searchbar-container d-none d-lg-flex col-lg-5 col-xl-5 '>
                <form className='d-flex w-100' id='searchForm' name='searchForm'>
                    <input id='searchInput' type='text' placeholder='Hľadať'></input>
                    <button className='search'></button>
                </form>
            </div>
            <div className='col-3 col-xl-5 d-xl-flex d-none userlinks-container'>
                <div className='userlinks'>
                    <a href='/'>
                        <img className='icon' alt='Zlavnene produkty' src={saleIcon}/>
                    </a>
                    <a href='/cart'>
                        <img className='icon' alt='Nakupný košík' src={shoppingCartIcon}/>
                        <span className='badge bg-red position-absolute top-10 start-10 translate-middle fs-5'>10</span>
                    </a>
                    <Link to='/loggIn'>
                        <img className='icon' alt='Užívateľský profil' src={userIcon}/>
                    </Link>
                </div>
                <Link className='registrationLink' to='/register'>Registrovať sa</Link>
            </div>
            <button data-mdb-button-init className='d-xl-none navbar-toggler ms-auto hamBtn'type='button' data-bs-target="#menu" data-bs-toggle="collapse" aria-expanded="false">
                <span className='navbar-toggler-icon'></span>
            </button>
            <ul className='d-xl-none list-unstyled col-12 collapse collapse-menu mobilenav' id='menu'>
                <li><a href='#'>Zľavnené produkty</a></li>
                <li><a href='#'>Nákupný košík</a></li>
                <li><Link to='/loggIn'>Užívateľský profil</Link></li>
                <li><Link to='/register'>Registrovať sa</Link></li>
            </ul>
        </div>
     );
}
 
export default Navbar;