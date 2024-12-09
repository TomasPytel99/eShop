import '../Styles/RegistrationForm.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
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
    const validatePassword = (password) => {
        const conditions = [
          { regex: /.{8,}/, message: "At least 8 characters" },
          { regex: /[A-Z]/, message: "At least one uppercase letter" },
          { regex: /[a-z]/, message: "At least one lowercase letter" },
          { regex: /\d/, message: "At least one number" },
          { regex: /[@$!%*?&;]/, message: "At least one special character" },
        ];
    
        const failedConditions = conditions
          .filter(({ regex }) => !regex.test(password))
          .map(({ message }) => message);
    
        return failedConditions;
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validatePSC = (psc) => {
        const trimmed = psc.replace(/\s+/g, '');
        const regex = /^\d{5}$/;
        return regex.test(trimmed);
    }

    const validatePhoneNumber = (number) => {
        const regex = /\d{1,4}\d{9}$/;
        const trimmed = number.replace(/\s+/g, '');
        return regex.test(trimmed);
    }

    const showPassword = () => {
        const passInput = document.getElementById('inputPassword');
        if(passInput.type === 'password') {
            passInput.type = 'text';
        } else {
            passInput.type = 'password';
        }
    };
    const handleRegistration = async (e) => {
        e.preventDefault();
        let hasRequired = true;
        Object.values(formData).forEach(element => {
            if(element.value === '') {
                hasRequired = false;
            }
        });
        if(hasRequired) {
            if(document.getElementById('inputPasswordAgain').value === formData.password) {
                if(validatePassword(formData['password']).length === 0) {
                    const hashedPassword = CryptoJS.SHA256(formData.password).toString();
                    const submissionData = {...formData, password: hashedPassword};
                    console.log(submissionData);
                    if(validateEmail(submissionData.email) && validatePSC(submissionData.psc)) {
                        if(validatePhoneNumber(submissionData.phone)) {
                            try {
                                const response = await api.post('/register', submissionData);
                                setFormData({
                                    name: '',
                                    surname: '',
                                    email: '',
                                    password: '',
                                    address: '',
                                    city: '',
                                    psc: '',
                                    phone: ''
                                });
                                navigate('/', {replace: true});
                            } catch(err) {
                                alert('Registrácia sa nepodarila, skúste to prosím neskôr');
                            }
                        } else {
                            alert('Neplatné telefónne číslo');
                        }
                    } else {
                        alert('Neplatný email alebo psc');
                    }
                } 
            } else {
                alert('Heslá sa nerovnajú.\n Skúste znova');
            }
        }
    };
    return (
        <div className="offset-1 col-10 offset-lg-2 col-lg-8 mt-5 mb-5 p-md-5 p-1 registrationWrapper">
            <h3 className='mb-5 header'>Registrovať sa</h3>
            <form onSubmit={handleRegistration}>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputName">Meno</label>
                        <input type="text" name='name' class="form-control py-lg-1 inputField" id="inputName" value={formData['name']} onChange={handleChange} placeholder="Meno" required/>
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
                        <div className='d-flex passwordDiv'>
                            <input type="password" name='password' class="form-control py-lg-1 inputField" id="inputPassword" onChange={handleChange} placeholder="Heslo" required
                            minlength="8" 
                            maxlength="20" 
                            pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&;])[A-Za-z\d@$!%*?&;]{8,}"
                            title="Heslo musí obsahovať aspoň 8 znakov, 1 veľké písmeno, 1 malé písmeno, číslo, a špeciálny znak."/>
                            <button className='bg-inherit'><i class="bi bi-eye" id="eyeIcon" onClick={showPassword}></i></button>
                        </div>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputPasswordAgain">Potvrdenie hesla</label>
                        <input type="password" name='passwordAgain' class="form-control py-lg-1 inputField" id="inputPasswordAgain" onChange={checkPasswordMatch} placeholder="Potvrdenie hesla" required/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputAdress">Adresa</label>
                        <input type="text" name='address' class="form-control py-lg-1 inputField" id="inputAddress" onChange={handleChange} placeholder="Adresa" required/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputCity">Mesto</label>
                        <input type="text" name='city' class="form-control py-lg-1 inputField" id="inputCity" onChange={handleChange} placeholder="Mesto" required/>
                    </div>
                </div>
                <div class="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPSC">PSČ</label>
                        <input type="text" name='psc' class="form-control py-lg-1 inputField" id="inputPSC" onChange={handleChange} placeholder="PSČ" required/>
                    </div>
                    <div class="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPhone">Tel. číslo (formát: 421...)</label>
                        <input type="text" name='phone' class="form-control py-lg-1 inputField" id="inputPhone" onChange={handleChange} placeholder="Telefónne číslo" required/>
                    </div>
                </div>
                <button type='submit' className="submitBtn offset-4 offset-md-0 mb-4 mb-md-2 mt-4 p-2 px-5">Potvrdiť</button>
            </form>
        </div>
     );
}
 
export default RegistrationForm;