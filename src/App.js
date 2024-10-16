import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Styles/App.css';
import Navbar from './Components/Navbar';
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import RegistrationForm from "./Components/RegistrationForm";
import SignIn from "./Components/SignIn";
import ForgottenPassword from "./Components/ForgottenPassword";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="mainContent">
        <ForgottenPassword/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
