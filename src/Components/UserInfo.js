import { useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import api from '../api.js'
import CryptoJS from 'crypto-js';
import '../Styles/RegistrationForm.css'

const UserInfo = ({logout}) => {
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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(localStorage.getItem('token'));
                const response = await api.get('/user', {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Get the token from localStorage
                    }
                  });
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
          };
          fetchUser();
    },[]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout(false);
        navigate('/loggIn', {replace: true});
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        let hasRequired = true;
        Object.values(formData).forEach(element => {
            if(element.value === '') {
                hasRequired = false;
            }
        });
        if(hasRequired) {
            const submissionData = {...formData};
            try {
                const response = await api.put('/user', submissionData, {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token from localStorage
                    }
                  });
            } catch(err) {
                alert('Registrácia sa nepodarila, skúste to prosím neskôr');
            }
        } 
    };
    const showPassword = () => {
        const passInput = document.getElementById('inputPassword');
        if(passInput.type === 'password') {
            passInput.type = 'text';
        } else {
            passInput.type = 'password';
        }
        
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
    
    return (
        <div className="offset-1 col-10 offset-lg-2 col-lg-8 mt-5 mb-5 p-md-5 p-1 registrationWrapper">
            <h3 className='mb-5 header'>Váš profil</h3>
            <form onSubmit={handleUpdate}>
                <div className="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div className="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputName">Meno</label>
                        <input type="text" name='name' className="form-control py-lg-1 inputField" id="inputName" value={formData.name} onChange={handleChange} placeholder="Meno" required/>
                    </div>
                </div>
                <div className="row g-3 mb-3 g-lg-5 mb-lg-4">
                <div className="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputSurname">Priezvisko</label>
                        <input type="text" name='surname' className="form-control py-lg-1 inputField" id="inputSurname" value={formData.surname} onChange={handleChange} placeholder="Priezvisko" required/>
                    </div>
                    <div className="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" name='email' className="form-control py-lg-1 inputField" id="inputEmail" value={formData.email} onChange={handleChange} placeholder="Email" required/>
                    </div>
                </div>
                <div className="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div className="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputAdress">Adresa</label>
                        <input type="text" name='address' className="form-control py-lg-1 inputField" id="inputAddress" value={formData.address} onChange={handleChange} placeholder="Adresa" required/>
                    </div>
                    <div className="offset-1 col-10 offset-md-0 col-md-6">
                        <label htmlFor="inputCity">Mesto</label>
                        <input type="text" name='city' className="form-control py-lg-1 inputField" id="inputCity" value={formData.city} onChange={handleChange} placeholder="Mesto" required/>
                    </div>
                </div>
                <div className="row g-3 mb-3 g-lg-5 mb-lg-4">
                    <div className="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPSC">PSČ</label>
                        <input type="text" name='PSC' className="form-control py-lg-1 inputField" id="inputPSC" value={formData.psc} onChange={handleChange} placeholder="PSČ" required/>
                    </div>
                    <div className="offset-1 col-10 offset-md-0 col-md-6">
                        <label for="inputPhone">Tel. číslo</label>
                        <input type="text" name='phone' className="form-control py-lg-1 inputField" id="inputPhone" value={formData.phone} onChange={handleChange} placeholder="Telefónne číslo" required/>
                    </div>
                </div>
                <button type='submit' className="submitBtn offset-4 offset-md-0 mb-4 mb-md-2 mt-4 p-2 px-5">Potvrdiť</button>
            </form>
            <button onClick={handleLogout}>Odhlásiť</button>
        </div>
    );
}
 
export default UserInfo;