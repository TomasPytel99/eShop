import loginPic from '../Assets/user.png'
import '../Styles/SignIn.css'
import { Link } from 'react-router-dom'
import {useState } from "react";
import api from '../api'
import CryptoJS from 'crypto-js';

const SignIn = () => {
    const [formData, setFormData] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    localStorage.setItem('user', loggedIn);
    const logout = ()=>{
        setLoggedIn(false);
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        console.log(loggedIn);
    }
    const loggin = async (e) => {
        e.preventDefault();
        const hashedPassword = CryptoJS.SHA256(formData.password).toString();
        console.log(hashedPassword);
        setFormData({...formData, password: hashedPassword});
        try {
            console.log(formData);
            const response = await api.post('/login', formData);
            console.log(formData);
        } catch(err) {
            alert('Noooooooo');
        }
        setLoggedIn(true);
        console.log(loggedIn);
    };
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