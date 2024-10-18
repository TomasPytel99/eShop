import '../Styles/RegistrationForm.css'

const RegistrationForm = () => {
    return ( 
        <div className="offset-1 col-10 offset-lg-2 col-lg-8 mt-5 mb-5 p-md-5 p-1 registrationWrapper">
            <h2 className='mb-5 header'>Registrovať sa</h2>
            <form>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputEmail4">Meno</label>
                        <input type="email" class="form-control py-lg-2 inputField" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPassword4">Priezvisko</label>
                        <input type="password" class="form-control py-lg-2 inputField" id="inputPassword4" placeholder="Password"/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputEmail4">Email</label>
                        <input type="email" class="form-control py-lg-2 inputField" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPassword4">Používateľské meno</label>
                        <input type="password" class="form-control py-lg-2 inputField" id="inputPassword4" placeholder="Password"/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputEmail4">Heslo</label>
                        <input type="email" class="form-control py-lg-2 inputField" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPassword4">Potvrdenie hesla</label>
                        <input type="password" class="form-control py-lg-2 inputField" id="inputPassword4" placeholder="Password"/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputEmail4">Adresa</label>
                        <input type="email" class="form-control py-lg-2 inputField" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPassword4">Mesto</label>
                        <input type="password" class="form-control py-lg-2 inputField" id="inputPassword4" placeholder="Password"/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputEmail4">PSČ</label>
                        <input type="email" class="form-control py-2 inputField" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPassword4">Tel. číslo</label>
                        <input type="password" class="form-control py-lg-2 inputField" id="inputPassword4" placeholder="Password"/>
                    </div>
                </div>
                <button className="submitBtn offset-4 offset-md-0 mb-5 mb-md-2 mt-5 p-2 px-5">Potvrdiť</button>
            </form>
        </div>
     );
}
 
export default RegistrationForm;