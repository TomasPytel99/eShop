import loginPic from '../Assets/user.png'
import '../Styles/SignIn.css'
import { Link } from 'react-router-dom'

const SignIn = ({callback}) => {
    return ( 
        <div className="login-container container-fluid col-10 my-5 offset-lg-3 col-lg-6 my offset-xl-4  col-xl-4">
            <h2 className='my-4 my-lg-5 header'>Prihlásenie</h2>
            <img className='mb-3 mb-lg-5' src={loginPic} alt='obrazok používateľa'/>
            <form className='offset-0 col-10'>
                <div className="col-11 col-lg-8 my-3">
                    <label htmlFor="inputEmail">Používateľské meno</label>
                    <input type="email" className="form-control mt-3 px-4 inputField" id="inputEmail" placeholder="Email"/>
                </div>
                <div className="col-11 col-lg-8 my-3">
                    <label htmlFor="inputPassword">Heslo</label>
                    <input type="password" className="form-control my-3 px-4 inputField" id="inputPassword" placeholder="Password"/>
                </div>
                <button className="submitBtn offset-md-0 mb-2 mb-md-2 mt-5 p-2 px-4 px-lg-5" onClick={callback}>Prihlásiť</button>
                <Link className='mb-3' to='/forgotenPassword'>Zabudnuté heslo?</Link>
            </form>
        </div>
     );
}
 
export default SignIn;