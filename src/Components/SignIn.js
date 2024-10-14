import loginPic from '../Assets/user.png'
import '../Styles/SignIn.css'

const SignIn = () => {
    return ( 
        <div className="login-container container-fluid offset-4 my-5 col-4">
            <h2 className='my-5 header'>Prihlásenie</h2>
            <img className='mb-5' src={loginPic}/>
            <form className='offset-0 col-10'>
                <div class="col-8 my-3">
                    <label for="inputEmail4">Používateľské meno</label>
                    <input type="email" class="form-control mt-3 inputField" id="inputEmail4" placeholder="Email"/>
                </div>
                <div class="col-8 my-3">
                    <label for="inputPassword4">Heslo</label>
                    <input type="password" class="form-control my-3 inputField" id="inputPassword4" placeholder="Password"/>
                </div>
                <button className="submitBtn offset-4 offset-md-0 mb-5 mb-md-2 mt-5 p-2 px-5">Prihlásiť</button>
                <a className='mb-3' href='#'>Zabudnuté heslo?</a>
            </form>
        </div>
     );
}
 
export default SignIn;