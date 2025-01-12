import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Styles/App.css';
import Navbar from './Components/Navbar';
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import RegistrationForm from "./Components/RegistrationForm";
import SignIn from "./Components/SignIn";
import ForgottenPassword from "./Components/ForgottenPassword";
import ProductView from "./Components/ProductView";
import ProductInfo from "./Components/ProductInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ShoppingCart from "./Components/ShoppingCart";
import Login from "./Components/Login";

function App() {

  const [currentSection, setCurrentSection] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [cartItemList, setItemList] = useState([]);

  const changeCurrSection = (value, path) => {
    setCurrentSection(value);
    setCurrentImage(path);
    localStorage.setItem('section', value);
    localStorage.setItem('path', path);
    localStorage.setItem('cart', JSON.stringify(cartItemList));
    console.log(value);
  };

  useEffect(() => {
    setItemList(JSON.parse(localStorage.getItem('cart')));
  }, []);

  const changeCurrItem = (item) => {
    localStorage.setItem('currentItem', JSON.stringify(item));
    setCurrentItem(item);
  }

  const addItemToCart = (item) => {
    let arr = [...cartItemList, item];
    setItemList(arr);
    //console.log(item.Nazov_produktu);
    //console.log(cartItemList);
    saveCart(arr);
  }

  const removeItemFromCart = (item) => {
    let removed = cartItemList.filter(it => it.Id_produktu !== item.Id_produktu);
    console.log(item);
    console.log(removed);
    setItemList(removed);
    saveCart(removed);
  }

  const saveCart = (updatedList) => {
    localStorage.setItem('cart', JSON.stringify(updatedList));
    console.log("Cart updated:", cartItemList);
  }

  return (
    <BrowserRouter>
      <>
        <Navbar itemList={cartItemList}/>
        <div className="mainContent">
          <Routes>
              <Route path="/" element= {<Home callback={changeCurrSection}/>}/>
              <Route path="/register" element= {<RegistrationForm/>}/>
              <Route path="/items" element= {<ProductView callback={changeCurrItem} section={currentSection} path={currentImage}/>}/>
              <Route path="/item" element= {<ProductInfo item={currentItem} callback={addItemToCart}/>}/>
              <Route path="/cart/*" element = {<ShoppingCart items={cartItemList} callback={removeItemFromCart}/>}/>
              <Route path="/loggIn" element= {<Login/>}/>
              <Route path="/forgotenPassword" element= {<ForgottenPassword/>}/>
          </Routes>
        </div>
        <Footer/>
      </>
    </BrowserRouter>
  );
}

export default App;
