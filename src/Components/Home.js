import '../Styles/Home.css'
import Gitara from '../Assets/MainMenu/gitara.png'
import Husle from '../Assets/MainMenu/husle.png'
import Klavesy from '../Assets/MainMenu/klavesy.png'
import Bicie from '../Assets/MainMenu/bicie.png'
import Harfa from '../Assets/MainMenu/harfa.png'
import Trubka from '../Assets/MainMenu/trubka.png'
import Akordeon from '../Assets/MainMenu/akordeon.png'
import Prislusenstvo from '../Assets/MainMenu/prislusenstvo.png'
import { Link } from 'react-router-dom'

const Home = ({callback}) => {
    return ( 
        <div className='home-container col-12'>
            <div className="upperImage">
                <h2 className='col-6 col-sm-6 col-md-6 offset-2'>Neprestávaj hrať</h2>
            </div>
            <div className='home offset-1 col-10'>
                <div className='row'>
                    <Link className="item" to='/gitary' onClick={() => callback('Gitary', '/Images/guitar.jpg')}>
                        <img src={Gitara} className='largerImg' alt='gitara obrazok'/>
                        <p>Gitary</p>
                    </Link>
                    <Link className="item" to='/husle' onClick={() => callback('Husle', '/Images/Classic_music.png')}>
                        <img src={Husle} className='largerImg' alt='husle obrazok'/>
                        <p>Husle</p>
                    </Link>
                    <Link className="item" to='/klavesy' onClick={() => callback('Klávesy', '/Images/klavesy.jpg')} >
                        <img src={Klavesy} alt='klavesy obrazok'/>
                        <p>Klávesy</p>
                    </Link>
                    <Link className="item" to='/bicie' onClick={() => callback('Bicie', '/Images/bicie.jpg')}>
                        <img src={Bicie} alt='bicie obrazok'/>
                        <p>Bicie</p>
                    </Link>
                    <Link className="item" to='/harfy' onClick={() => callback('Harfy', '/Images/harfa.jpg')}>
                        <img src={Harfa} alt='harfa obrazok'/>
                        <p>Harfy</p>
                    </Link>
                    <Link className="item" to='/dychy' onClick={() => callback('Dychy', '/Images/saxofon.jpg')}>
                        <img src={Trubka} alt='trubka obrazok'/>
                        <p>Dychy</p>
                    </Link>
                    <Link className="item" to='/akordeony' onClick={() => callback('Akordeóny', '/Images/akordeon.jpg')}>
                        <img src={Akordeon} alt='akordeon obrazok'/>
                        <p>Akordeóny</p>
                    </Link>
                    <Link className="item" to='/prislusenstvo' onClick={() => callback('Príslušenstvo', '/Images/sluchadla.jpg')}>
                        <img src={Prislusenstvo} alt='prislusenstvo obrazok'/>
                        <p>Príslušenstvo</p>
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default Home;