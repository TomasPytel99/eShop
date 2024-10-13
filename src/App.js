import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Styles/App.css';
import Navbar from './Components/Navbar';
import Footer from "./Components/Footer";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="mainContent">
        <Home/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
