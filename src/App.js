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
import Stats from "./Components/Statistics.js";
import api from './api.js'
import UserDashboard from "./Components/UserDashboard.js";

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
        <Navbar itemList={cartItemList} favouriteList={favouriteList} changeSection={changeCurrSection}/>
        <div className="mainContent">
          <Routes>
              <Route path="/" element= {<Home callback={changeCurrSection}/>}/>
              <Route path="/register" element= {<RegistrationForm/>}/>
              <Route path="/items" element= {<ProductView callback={changeCurrItem} section={currentSection} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/Gitary" element= {<ProductView callback={changeCurrItem} section={'Gitary'} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/Husle" element= {<ProductView callback={changeCurrItem} section={'Husle'} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/Klavesy" element= {<ProductView callback={changeCurrItem} section={'Klavesy'} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/Bicie" element= {<ProductView callback={changeCurrItem} section={'Bicie'} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/Harfy" element= {<ProductView callback={changeCurrItem} section={'Harfy'} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/Dychy" element= {<ProductView callback={changeCurrItem} section={'Dychy'} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/Akordeony" element= {<ProductView callback={changeCurrItem} section={'Akordeony'} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/Prislusenstvo" element= {<ProductView callback={changeCurrItem} section={'Prislusenstvo'} path={currentImage} addCategoryToLiked={addCategoryToLiked} removeFromLikedCategories={removeFromLikedCategories}/>}/>
              <Route path="/item" element= {<ProductInfo item={currentItem} callback={addItemToCart} addToLiked={addItemToLiked} removeLiked={removeItemFromLiked} changeCurrItem={changeCurrItem}/>}/>
              <Route path="/Gitary/:id" element= {<ProductInfo callback={addItemToCart} addToLiked={addItemToLiked} removeLiked={removeItemFromLiked} changeCurrItem={changeCurrItem}/>}/>
              <Route path="/Husle/:id" element= {<ProductInfo callback={addItemToCart} addToLiked={addItemToLiked} removeLiked={removeItemFromLiked} changeCurrItem={changeCurrItem}/>}/>
              <Route path="/Klavesy/:id" element= {<ProductInfo callback={addItemToCart} addToLiked={addItemToLiked} removeLiked={removeItemFromLiked} changeCurrItem={changeCurrItem}/>}/>
              <Route path="/Bicie/:id" element= {<ProductInfo callback={addItemToCart} addToLiked={addItemToLiked} removeLiked={removeItemFromLiked} changeCurrItem={changeCurrItem}/>}/>
              <Route path="/Harfy/:id" element= {<ProductInfo callback={addItemToCart} addToLiked={addItemToLiked} removeLiked={removeItemFromLiked} changeCurrItem={changeCurrItem}/>}/>
              <Route path="/Dychy/:id" element= {<ProductInfo callback={addItemToCart} addToLiked={addItemToLiked} removeLiked={removeItemFromLiked} changeCurrItem={changeCurrItem}/>}/>
              <Route path="/Akordeony/:id" element= {<ProductInfo callback={addItemToCart} addToLiked={addItemToLiked} removeLiked={removeItemFromLiked} changeCurrItem={changeCurrItem}/>}/>
              <Route path="/Prislusenstvo/:id" element= {<ProductInfo callback={addItemToCart} addToLiked={addItemToLiked} removeLiked={removeItemFromLiked} changeCurrItem={changeCurrItem}/>}/>
              <Route path="/cart/*" element = {<ShoppingCart items={cartItemList} callback={removeItemFromCart} setCart={setItemList}/>}/>
              <Route path="/likedItems/" element = {<LikedItems items={favouriteList} removeLiked={removeItemFromLiked}/>}/>
              <Route path="/loggIn" element= {<Login/>}/>
              <Route path="/forgotenPassword" element= {<ForgottenPassword/>}/>
              <Route path="/statistiky" element= {<Stats/>}/>
              <Route path="/spravaUzivatelov" element= {<UserDashboard/>}/>
          </Routes>
        </div>
        <Footer/>
      </>
    </BrowserRouter>
  );
}

export default App;
