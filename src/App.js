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
import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import { useState, useEffect } from "react";
import ShoppingCart from "./Components/ShoppingCart";
import Login from "./Components/Login";
import { LikedItem, LikedItems } from "./Components/LikedItems";
import Invoice from "./Components/InvoiceView.js";
import api from './api.js'

function App() {

  const [currentSection, setCurrentSection] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [cartItemList, setItemList] = useState([]);
  const [favouriteList, setFavouriteList] = useState([]);
  const [favouriteCategories, setFavouriteCategories] = useState([]);

  const changeCurrSection = (value, path) => {
    setCurrentSection(value);
    setCurrentImage(path);
    localStorage.setItem('section', value);
    localStorage.setItem('path', path);
    localStorage.setItem('cart', JSON.stringify(cartItemList));
    localStorage.setItem('favouriteList', JSON.stringify(favouriteList));
  };

  useEffect(() => {
    setItemList(JSON.parse(localStorage.getItem('cart')));
    setFavouriteList(JSON.parse(localStorage.getItem('favouriteList')));
  }, []);

  const changeCurrItem = (item) => {
    localStorage.setItem('currentItem', JSON.stringify(item));
    setCurrentItem(item);
  }

  const addItemToCart = (item) => {
    let arr = [...cartItemList, item];
    setItemList(arr);
    saveCart(arr);
  }

  const removeItemFromCart = (item) => {
    let removed = cartItemList.filter(it => it.Id_produktu !== item.Id_produktu);
    setItemList(removed);
    saveCart(removed);
  }

  const saveCart = (updatedList) => {
    localStorage.setItem('cart', JSON.stringify(updatedList));
  }

  const addItemToLiked = (item) => {
    let arr = [...favouriteList, item];
    setFavouriteList(arr);
    saveFavourite(arr);
  }

  const addCategoryToLiked = (categoryId) => {
    let arr = [...favouriteCategories, categoryId];
    setFavouriteCategories(arr);
    saveFavouriteCategory(arr);
  }

  const removeItemFromLiked = async (item) => {
    let removed = favouriteList.filter(it => it.Id_produktu !== item.Id_produktu);
    if(localStorage.getItem('currentUser') != null) {
      try {
          const response = await api.delete(`/dislikeItem/${item.Id_produktu}`, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
          });
          alert("Produkt bol úspešne odstránený z obľúbených");
      } catch(error) {
          alert("Ľutujeme, produkt sa nepodarilo odstrániť z obľúbených");
      }
  }
    setFavouriteList(removed);
    saveFavourite(removed);
  }


  const removeFromLikedCategories = async (categoryId) => {
    let removed = favouriteCategories.filter(id => id !== categoryId);
    if(localStorage.getItem('currentUser') != null) {
      try {
          const response = await api.delete(`/dislikeCategory/${categoryId}`, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
          });
          alert("Kategória bola úspešne odstránená z obľúbených");
      } catch(error) {
          alert("Ľutujeme, kategóriu sa nepodarilo odstrániť z obľúbených");
      }
  }
    setFavouriteCategories(removed);
    saveFavouriteCategory(removed);
  }

  const saveFavourite = (updatedList) => {
    localStorage.setItem('favouriteList', JSON.stringify(updatedList));
  }

  const saveFavouriteCategory = (updatedList) => {
    localStorage.setItem('favouriteCategories', JSON.stringify(updatedList));
  }

  return (
    <BrowserRouter>
      <>
        <Navbar itemList={cartItemList} favouriteList={favouriteList}/>
        <div className="mainContent">
          <Routes>
              <Route path="/" element= {<Home callback={changeCurrSection}/>}/>
              <Route path="/register" element= {<RegistrationForm/>}/>
              <Route path="/items" element= {<ProductView callback={changeCurrItem} section={currentSection} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/gitary" element= {<ProductView callback={changeCurrItem} section={currentSection} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/husle" element= {<ProductView callback={changeCurrItem} section={currentSection} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/klavesy" element= {<ProductView callback={changeCurrItem} section={currentSection} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/bicie" element= {<ProductView callback={changeCurrItem} section={currentSection} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/harfy" element= {<ProductView callback={changeCurrItem} section={currentSection} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/dychy" element= {<ProductView callback={changeCurrItem} section={currentSection} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/akordeony" element= {<ProductView callback={changeCurrItem} section={currentSection} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/prislusenstvo" element= {<ProductView callback={changeCurrItem} section={currentSection} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/item" element= {<ProductInfo item={currentItem} callback={addItemToCart} addToLiked={addItemToLiked} removeLiked={removeItemFromLiked} changeCurrItem={changeCurrItem}/>}/>
              <Route path="/cart/*" element = {<ShoppingCart items={cartItemList} callback={removeItemFromCart} setCart={setItemList}/>}/>
              <Route path="/likedItems/" element = {<LikedItems items={favouriteList} removeLiked={removeItemFromLiked}/>}/>
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
