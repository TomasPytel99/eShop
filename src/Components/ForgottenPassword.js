import '../Styles/ForgottenPassword.css'

const ForgottenPassword = () => {
    return ( 
        <div className="container-fluid offset-1 col-10 col-lg-6 col-xxl-5 mt-5 mb-5 wrapper">
            <div className='forgotpass offset-1 offset-md-0 col-10 pt-4 ps-md-3 mb-2'>
                <h2>Zabudnuté heslo</h2>
            </div>
            <form className='offset-1 offset-md-0 ps-md-3 col-12 col-sm-11 mt-lg-5 emailForm'>
                <div class="col-10 col-md-7 col-lg-9 col-xl-9 col-xxl-7 my-3 mb-5">
                    <label for="inputEmail4">Email</label>
                    <input type="email" class="form-control mt-2 mt-lg-3 px-4 inputField" id="inputEmail4" placeholder="Email"/>
                </div>
                <button className="submitBtn mt-0 mt-lg-5 p-2 px-4 px-sm-5">Odoslať kód</button>
            </form>
            <form className='offset-1 offset-md-0 ps-md-3 col-12 col-sm-11 mt-lg-5 codeForm'>
                <div class="col-10 col-md-7 col-lg-9 col-xl-9 col-xxl-7 my-3 mb-5">
                    <label for="inputEmail4">Overovací kód</label>
                    <input type="email" class="form-control mt-2 mt-lg-3 px-4 inputField" id="inputEmail4" placeholder="Email"/>
                </div>
                <button className="submitBtn mt-0 mt-lg-5 p-2 px-4 px-sm-5">Potvrdiť</button>
            </form>
            <form className='offset-1 offset-md-0 ps-md-3 col-12 col-sm-11 mt-lg-3 newPassForm'>
                <div class="col-10 col-md-7 col-lg-9 col-xl-9 col-xxl-7 my-3 mb-3">
                    <label for="inputEmail4">Nové heslo</label>
                    <input type="email" class="form-control mt-2 mt-lg-3 px-4 inputField" id="inputEmail4" placeholder="Email"/>
                </div>
                <div class="col-10 col-md-7 col-lg-9 col-xl-9 col-xxl-7 my-3 mb-3">
                    <label for="inputEmail4">Potvrďte nové heslo</label>
                    <input type="email" class="form-control mt-2 mt-lg-3 px-4 inputField" id="inputEmail4" placeholder="Email"/>
                </div>
                <button className="submitBtn mt-4 mt-lg-5 p-2 px-4 px-sm-5">Potvrdiť</button>
            </form>
        </div>
     );
}
 
export default ForgottenPassword;