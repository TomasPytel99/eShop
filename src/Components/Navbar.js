import '../Styles/Navbar.css'
import logoPic from '../Assets/Ehop.svg'
import saleIcon from '../Assets/sale-icon.svg'
import shoppingCartIcon from '../Assets/shopping-trolley-icon.svg'
import userIcon from '../Assets/user-black-icon.svg'

const Navbar = () => {
    return ( 
        <div className="container-fluid navbar">
            <a href='/' className='col-2 logo-container'>
                <img className='logo' src={logoPic}></img>
            </a>
            <div className='searchbar-container col-5'>
                <form>
                    <input type='text' placeholder='Hľadať'></input>
                    <button className='search'></button>
                </form>
            </div>
            <div className='col-5 userlinks-container'>
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
        </div>
     );
}
 
export default Navbar;