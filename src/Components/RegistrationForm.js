import '../Styles/RegistrationForm.css'

const RegistrationForm = () => {
    return ( 
        <div className="offset-1 col-10 offset-lg-2 col-lg-8 mt-5 mb-5 p-md-5 p-1 registrationWrapper">
            <h3 className='mb-5 header'>Registrovať sa</h3>
            <form>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputName">Meno</label>
                        <input type="text" class="form-control py-lg-1 inputField" id="inputName" placeholder="Meno"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputSurname">Priezvisko</label>
                        <input type="text" class="form-control py-lg-1 inputField" id="inputSurname" placeholder="Priezvisko"/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" class="form-control py-lg-1 inputField" id="inputEmail" placeholder="Email"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputUsername">Používateľské meno</label>
                        <input type="text" class="form-control py-lg-1 inputField" id="inputUsername" placeholder="Používateľské meno"/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputPassword">Heslo</label>
                        <input type="password" class="form-control py-lg-1 inputField" id="inputPassword" placeholder="Heslo"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputPasswordAgain">Potvrdenie hesla</label>
                        <input type="password" class="form-control py-lg-1 inputField" id="inputPasswordAgain" placeholder="Potvrdenie hesla"/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputAdress">Adresa</label>
                        <input type="text" class="form-control py-lg-1 inputField" id="inputAdress" placeholder="Adresa"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputCity">Mesto</label>
                        <input type="text" class="form-control py-lg-1 inputField" id="inputCity" placeholder="Mesto"/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPSC">PSČ</label>
                        <input type="text" class="form-control py-lg-1 inputField" id="inputPSC" placeholder="PSČ"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPhone">Tel. číslo</label>
                        <input type="text" class="form-control py-lg-1 inputField" id="inputPhone" placeholder="Telefónne číslo"/>
                    </div>
                </div>
                <button className="submitBtn offset-4 offset-md-0 mb-4 mb-md-2 mt-4 p-2 px-5">Potvrdiť</button>
            </form>
        </div>
     );
}
 
export default RegistrationForm;