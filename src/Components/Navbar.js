import '../Styles/Navbar.css'
import logoPic from '../Assets/Ehop.svg'
import saleIcon from '../Assets/sale-icon.svg'
import shoppingCartIcon from '../Assets/shopping-trolley-icon.svg'
import userIcon from '../Assets/user-black-icon.svg'

const Navbar = () => {
    return ( 
        <div className="container-fluid navbar">
            <a href='/' className='col-7 col-sm-5 col-md-4 col-lg-3 col-xl-2  logo-container'>
                <img className='logo' src={logoPic}></img>
            </a>
            <div className=' searchbar-container d-none d-lg-flex col-lg-5 col-xl-5 '>
                <form className='d-flex w-100'>
                    <input type='text' placeholder='Hľadať'></input>
                    <button className='search'></button>
                </form>
            </div>
            <div className='col-3 col-xl-5 d-xl-flex d-none userlinks-container'>
                <div className='userlinks'>
                    <a href='/'>
                        <img className='icon' alt='Zlavnene produkty' src={saleIcon}/>
                    </a>
                    <a href='/'>
                        <img className='icon' alt='Nakupný košík' src={shoppingCartIcon}/>
                    </a>
                    <a href='/'>
                        <img className='icon' alt='Užívateľský profil' src={userIcon}/>
                </a>
                </div>
                <a className='registrationLink' href='/'>Registrovať sa</a>
            </div>
            <button className='d-xl-none navbar-toggler ms-auto hamBtn'type='button' data-bs-target="#menu" data-bs-toggle="collapse" aria-expanded="false">
                <span className='navbar-toggler-icon'></span>
            </button>
            <ul className='d-xl-none list-unstyled col-12 collapse collapse-menu mobilenav' id='menu'>
                <li><a href='#'>Zľavnené produkty</a></li>
                <li><a href='#'>Nákupný košík</a></li>
                <li><a href='#'>Užívateľský profil</a></li>
                <li><a href='#'>Registrovať sa</a></li>
            </ul>
        </div>
     );
}
 
export default Navbar;