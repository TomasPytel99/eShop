import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Styles/App.css';
import Navbar from './Components/Navbar';
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import RegistrationForm from "./Components/RegistrationForm";
import SignIn from "./Components/SignIn";
import ForgottenPassword from "./Components/ForgottenPassword";
import ProductView from "./Components/ProductView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {

  const [currentSection, setCurrentSection] = useState(null);
  const changeCurrSection = (value) =>{
    setCurrentSection(value);
    console.log(value);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <div className="mainContent">
          <Routes>
              <Route path="/" element= {<Home callback={changeCurrSection}/>}/>
              <Route path="/register" element= {<RegistrationForm/>}/>
              <Route path="/items" element= {<ProductView section={currentSection}/>}/>
              <Route path="/login" element= {<SignIn/>}/>
              <Route path="/forgotenPassword" element= {<ForgottenPassword/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
