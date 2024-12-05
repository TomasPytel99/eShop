import loginPic from '../Assets/user.png'
import '../Styles/SignIn.css'
import { Link } from 'react-router-dom'
import {useState } from "react";
import api from '../api'
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

const SignIn = ({login}) => {
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const loggin = async (e) => {
        e.preventDefault();
        const hashedPassword = CryptoJS.SHA256(formData.password).toString();
        const submissionData = {...formData, password: hashedPassword};
        if(validateEmail(submissionData.email) && validatePassword(formData.password).length === 0) {
            try {
                const response = await api.post('/login', submissionData);
                
                // Save the token (e.g., to localStorage or state)
                localStorage.setItem('token', response.data.token);
                login(true);
                navigate('/loggIn', {replace: true});
            } catch (err) {
                alert('Invalid credentials');
            }
        } else {
            alert('Neplatný email alebo heslo');
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
        console.log(password);
        console.log(failedConditions);
        return failedConditions;
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(regex.test(email));
        return regex.test(email);
    }

    return ( 
        <div className="login-container container-fluid col-10 my-5 offset-lg-3 col-lg-6 my offset-xl-4  col-xl-4">
            <h2 className='my-4 my-lg-5 header'>Prihlásenie</h2>
            <img className='mb-3 mb-lg-2' src={loginPic} alt='obrazok používateľa'/>
            <form className='offset-0 col-10' onSubmit={loggin}>
                <div className="col-11 col-lg-8 my-3">
                    <label htmlFor="inputEmail">Email</label>
                    <input type="email" name='email' className="form-control mt-3 px-4 inputField" id="inputEmail" placeholder="Email" onChange={handleChange}/>
                </div>
                <div className="col-11 col-lg-8 my-3">
                    <label htmlFor="inputPassword">Heslo</label>
                    <input type="password" name='password' className="form-control my-3 px-4 inputField" id="inputPassword" placeholder="Password" onChange={handleChange}/>
                </div>
                <button className="submitBtn offset-md-0 mb-2 mb-md-2 mt-5 p-2 px-4 px-lg-5">Prihlásiť</button>
                <Link className='mb-3' to='/forgotenPassword'>Zabudnuté heslo?</Link>
            </form>
        </div>
     );
}
 
export default SignIn;