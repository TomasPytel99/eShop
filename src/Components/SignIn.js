import loginPic from '../Assets/user.png'
import '../Styles/SignIn.css'

const SignIn = () => {
    return ( 
        <div className="login-container container-fluid col-10 my-5 offset-lg-3 col-lg-6 my offset-xl-4  col-xl-4">
            <h2 className='my-4 my-lg-5 header'>Prihlásenie</h2>
            <img className='mb-3 mb-lg-5' src={loginPic}/>
            <form className='offset-0 col-10'>
                <div class="col-11 col-lg-8 my-3">
                    <label for="inputEmail4">Používateľské meno</label>
                    <input type="email" class="form-control mt-3 px-4 inputField" id="inputEmail4" placeholder="Email"/>
                </div>
                <div class="col-11 col-lg-8 my-3">
                    <label for="inputPassword4">Heslo</label>
                    <input type="password" class="form-control my-3 px-4 inputField" id="inputPassword4" placeholder="Password"/>
                </div>
                <button className="submitBtn offset-md-0 mb-2 mb-md-2 mt-5 p-2 px-4 px-lg-5">Prihlásiť</button>
                <a className='mb-3' href='#'>Zabudnuté heslo?</a>
            </form>
        </div>
     );
}
 
export default SignIn;