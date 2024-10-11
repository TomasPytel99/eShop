import '../Styles/Footer.css'

const Footer = () => {
    return ( 
        <div className="container-fluid footer">
            <div className='about col-6 col-md-5'>
                <h2>O nás</h2>
                <a>Kto sme</a>
                <a>Pobočky</a>
                <a>Spracovanie osobných údajov</a>
            </div>
            <div className='contact col-md-5'>
                <h2>Kontaktujte nás</h2>
                <a>+421 949 312 215</a>
            </div>
        </div>
     );
}
 
export default Footer;