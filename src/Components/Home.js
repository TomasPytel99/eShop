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

const Home = () => {
    return ( 
        <div className='home-container'>
            <div className="upperImage">
                <h2 className='col-6 col-sm-6 col-md-6 offset-2'>Neprestávaj hrať</h2>
            </div>
            <div className='home offset-1 col-10'>
                <div className='row'>
                    <a className="item" href='/'>
                        <img src={Gitara} className='largerImg'/>
                        <p>Gitary</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Husle} className='largerImg'/>
                        <p>Husle</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Klavesy}/>
                        <p>Klávesy</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Bicie}/>
                        <p>Bicie</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Harfa}/>
                        <p>Harfy</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Trubka}/>
                        <p>Dychy</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Akordeon}/>
                        <p>Akordeóny</p>
                    </a>
                    <a className="item" href='/'>
                        <img src={Prislusenstvo}/>
                        <p>Príslušenstvo</p>
                    </a>
                </div>
            </div>
        </div>
     );
}
 
export default Home;