import musicPic from '../Assets/Classic_music.png'
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

const Home = () => {
    return ( 
        <div className='home-container col-12'>
            <div className="upperImage">
                <h2 className='col-6 col-sm-6 col-md-6 offset-2'>Neprestávaj hrať</h2>
            </div>
            <div className='home offset-1 col-10'>
                <div className='row'>
                    <Link className="item" to='/guitars'>
                        <img src={Gitara} className='largerImg' alt='gitara obrazok'/>
                        <p>Gitary</p>
                    </Link>
                    <a className="item" href='/'>
                        <img src={Husle} className='largerImg' alt='husle obrazok'/>
                        <p>Husle</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Klavesy} alt='klavesy obrazok'/>
                        <p>Klávesy</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Bicie} alt='bicie obrazok'/>
                        <p>Bicie</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Harfa} alt='harfa obrazok'/>
                        <p>Harfy</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Trubka} alt='trubka obrazok'/>
                        <p>Dychy</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Akordeon} alt='akordeon obrazok'/>
                        <p>Akordeóny</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Prislusenstvo} alt='prislusenstvo obrazok'/>
                        <p>Príslušenstvo</p>
                    </a>
                </div>
            </div>
        </div>
     );
}
 
export default Home;