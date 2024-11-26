import '../Styles/RegistrationForm.css'
import { useState } from 'react';
import api from '../api.js'
import CryptoJS from 'crypto-js';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        address: '',
        city: '',
        psc: '',
        phone: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const checkPasswordMatch = (e) => {
        if (e.target.value !== formData.password) {
            console.log('Passwords do not match');
            return;
        }
        console.log('finally match');
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        const hashedPassword = CryptoJS.SHA256(formData.password).toString();
        const submissionData = {...formData, password: hashedPassword};
        try {
            console.log(formData);
            const response = await api.post('/register', submissionData);
            console.log(formData);
        } catch(err) {
            alert('Noooooooo');
        }
    };
    return (
        <div className="offset-1 col-10 offset-lg-2 col-lg-8 mt-5 mb-5 p-md-5 p-1 registrationWrapper">
            <h3 className='mb-5 header'>Registrovať sa</h3>
            <form onSubmit={handleRegistration}>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputName">Meno</label>
                        <input type="text" name='name' class="form-control py-lg-1 inputField" id="inputName" onChange={handleChange} placeholder="Meno" required/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputSurname">Priezvisko</label>
                        <input type="text" name='surname' class="form-control py-lg-1 inputField" id="inputSurname" onChange={handleChange} placeholder="Priezvisko" required/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" name='email' class="form-control py-lg-1 inputField" id="inputEmail" onChange={handleChange} placeholder="Email" required/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputPassword">Heslo</label>
                        <input type="password" name='password' class="form-control py-lg-1 inputField" id="inputPassword" onChange={handleChange} placeholder="Heslo" required/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputPasswordAgain">Potvrdenie hesla</label>
                        <input type="password" name='passwordAgain' class="form-control py-lg-1 inputField" id="inputPasswordAgain" onChange={checkPasswordMatch} placeholder="Potvrdenie hesla"/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputAdress">Adresa</label>
                        <input type="text" name='address' class="form-control py-lg-1 inputField" id="inputAddress" onChange={handleChange} placeholder="Adresa"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputCity">Mesto</label>
                        <input type="text" name='city' class="form-control py-lg-1 inputField" id="inputCity" onChange={handleChange} placeholder="Mesto"/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPSC">PSČ</label>
                        <input type="text" name='PSC' class="form-control py-lg-1 inputField" id="inputPSC" onChange={handleChange} placeholder="PSČ"/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPhone">Tel. číslo</label>
                        <input type="text" name='phone' class="form-control py-lg-1 inputField" id="inputPhone" onChange={handleChange} placeholder="Telefónne číslo"/>
                    </div>
                </div>
                <button type='submit' className="submitBtn offset-4 offset-md-0 mb-4 mb-md-2 mt-4 p-2 px-5">Potvrdiť</button>
            </form>
        </div>
     );
}
 
export default RegistrationForm;