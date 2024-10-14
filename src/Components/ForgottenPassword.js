import '../Styles/ForgottenPassword.css'

const ForgottenPassword = () => {
    return ( 
        <form className="container-fluid col-5 wrapper">
            <div className='forgotpass'>
                <h2>Zabudnuté heslo</h2>
                <button className="submitBtn offset-4 offset-md-0 mb-5 mb-md-2 mt-5 p-2 px-5">Prihlásiť</button>
            </div>
            <div class="col-8 my-3">
                    <label for="inputEmail4">Email</label>
                    <input type="email" class="form-control mt-3 px-4 inputField" id="inputEmail4" placeholder="Email"/>
                </div>
                <div class="col-8 my-3 code">
                    <label for="inputPassword4">Overovací kód</label>
                    <input type="password" class="form-control my-3 px-4 inputField" id="inputPassword4" placeholder="Password"/>
                </div>
        </form>
     );
}
 
export default ForgottenPassword;