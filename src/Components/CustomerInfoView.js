import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api.js'
import '../Styles/CustomerInfoView.css'

const CustomerInfoView = ({logout}) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        address: '',
        city: '',
        psc: '',
        phone: ''
    });

    const [companyData, setCompanyData] = useState({
        ico: '',
        companyName: '',
        companyType: 's.r.o.'
    })
    const companyTypes = [
        {typeId: 1 ,typeName: "s.r.o."},
        {typeId: 2 ,typeName: "a.s."},
        {typeId: 3 ,typeName: "j.s.a."},
        {typeId: 4 ,typeName: "v.o.s."},
        {typeId: 5 ,typeName: "k.s."},
    ]

    const [compType, setCompType] = useState(null);
    const [compVal, setCompVal] = useState(1);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(localStorage.getItem('token'));
                const response = await api.get('/user', {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                  });
                if(response.data != null) {
                    setFormData(response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
          };
          fetchUser();
    },[]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name == 'ico' || name == 'companyName') {
            setCompanyData({...companyData, [name]: value});
        } else {
            setFormData({...formData, [name]: value});
        }
    }

    const handleTypeChange = (e) => {
        const id = parseInt(e.target.value);
        const opt = companyTypes.find(option => option.typeId === id)

        setCompVal(opt.typeId);
        setCompType(opt);
        setCompanyData({...companyData, companyType: opt.typeName});
    }

    const handleOrder = async (e) => {
        e.preventDefault();
        let hasRequired = true;
        Object.values(formData).forEach(element => {
            if(element.value === '') {
                hasRequired = false;
            }
        });
        if(companyData.name != '' || companyData.companyName != '') {
            Object.values(companyData).forEach(element => {
                if(element.value === '') {
                    hasRequired = false;
                }
            });
        }
        if(hasRequired) {
            let submissionData;
            if(companyData.ico != '') {
                if(!validateICO(companyData.ico)) {
                    alert('Nesprávny formát ICO alebo neplatné ICO');
                    return;
                }
                submissionData = {...formData, ...companyData};
            } else {
                submissionData = {...formData};
            }
            if(validatePSC(submissionData.psc) && validatePhoneNumber(submissionData.phone)) {
                try {
                    const response = await api.post('/newOrder', submissionData);
                } catch(err) {
                    alert('Nepodarilo sa vytvorit objednavku, skúste to prosím neskôr');
                }
            } else {
                alert('Neplatné PSČ alebo telefónne číslo');
            }
        } 
    };
    //chat GPT
    const validatePSC = (psc) => {
        const trimmed = psc.replace(/\s+/g, '');
        const regex = /^\d{5}$/;
        return regex.test(trimmed);
    }

    const validatePhoneNumber = (number) => {
        const regex = /\d{1,4}\d{9}$/;
        const trimmed = number.replace(/\s+/g, '');
        return regex.test(trimmed);
    }
    //////////////

    const validateICO = (ico) => {
        const regex = /^\d{8}$/;
        const trimmed = ico.replace(/\s+/g, '');
        let sum = 0
        for(let i = 0; i < 7; i++){
            sum += parseInt(ico[i]) * (8 - i);
        }
        let checkDigit = sum % 11;
        (checkDigit == 10)? checkDigit = 0: checkDigit=checkDigit;
        return regex.test(trimmed) && checkDigit === ico[7]; 
    }

    return (
        <div className="offset-1 col-10 offset-lg-0 col-lg-12 mt-4 mb-5 p-md-5 registrationWrapper">
            <h3 className='mb-5 header'>Vaše údaje</h3>
            <form onSubmit={handleOrder} className="customerInfo">
                <div className="userInfo col-12 col-md-6">
                    <div className="roww g-3 mb-3 mb-lg-4">
                        <div className="offset-1 col-10 offset-md-0 col-md-10">
                            <label htmlFor="inputName">Meno</label>
                            <input type="text" name='name' className="form-control py-lg-1 inputField" id="inputName" value={formData.name} onChange={handleChange} placeholder="Meno" required/>
                        </div>
                    </div>
                    <div className="roww g-3 mb-3 g-lg-5 mb-lg-4">
                        <div className="offset-1 col-10 offset-md-0 col-md-10">
                            <label htmlFor="inputSurname">Priezvisko</label>
                            <input type="text" name='surname' className="form-control py-lg-1 inputField" id="inputSurname" value={formData.surname} onChange={handleChange} placeholder="Priezvisko" required/>
                        </div>
                    </div>
                    <div className="roww g-3 mb-3 g-lg-5 mb-lg-4">
                        <div className="offset-1 col-10 offset-md-0 col-md-10">
                            <label htmlFor="inputCity">Mesto</label>
                            <input type="text" name='city' className="form-control py-lg-1 inputField" id="inputCity" value={formData.city} onChange={handleChange} placeholder="Mesto" required/>
                        </div>
                    </div>
                    <div className="roww g-3 mb-3 g-lg-5 mb-lg-4">
                        <div className="offset-1 col-10 offset-md-0 col-md-10">
                            <label htmlFor="inputAdress">Adresa</label>
                            <input type="text" name='address' className="form-control py-lg-1 inputField" id="inputAddress" value={formData.address} onChange={handleChange} placeholder="Adresa" required/>
                        </div>
                    </div>
                    <div className="roww g-3 mb-3 g-lg-5 mb-lg-4">
                        <div className="offset-1 col-10 offset-md-0 col-md-10">
                            <label for="inputPSC">PSČ</label>
                            <input type="text" name='PSC' className="form-control py-lg-1 inputField" id="inputPSC" value={formData.psc} onChange={handleChange} placeholder="PSČ" required/>
                        </div>
                    </div>
                    <div className="roww g-3 mb-3 g-lg-5 mb-lg-4">
                        <div className="offset-1 col-10 offset-md-0 col-md-10">
                            <label htmlFor="inputEmail">Email</label>
                            <input type="email" name='email' className="form-control py-lg-1 inputField" id="inputEmail" value={formData.email} onChange={handleChange} placeholder="Email" required/>
                        </div>
                    </div>
                    <div className="roww g-3 mb-3 g-lg-5 mb-lg-4">
                        <div className="offset-1 col-10 offset-md-0 col-md-10">
                            <label for="inputPhone">Tel. číslo</label>
                            <input type="text" name='phone' className="form-control py-lg-1 inputField" id="inputPhone" value={formData.phone} onChange={handleChange} placeholder="Telefónne číslo" required/>
                        </div>
                    </div>
                </div>
                <div className="companyInfo col-12 col-md-6 mt-4">
                    <div>
                        <div className="roww g-3 mb-3 g-lg-5 mb-lg-4">
                            <div className="offset-1 col-10 offset-md-0 col-md-10 companyHeader">
                                <h3 className="mb-0 pb-1 company">Kúpiť na firmu</h3>
                            </div>
                        </div>
                        <div className="roww g-3 mb-3 g-lg-5 mb-lg-4">
                            <div className="offset-1 col-10 offset-md-0 col-md-10">
                                <label htmlFor="inputICO">IČO</label>
                                <input type="text" name='ico' className="form-control py-lg-1 inputField" id="inputICO" maxlength="8" value={companyData.ico} onChange={handleChange} placeholder="IČO"/>
                            </div>
                        </div>
                        <div className="roww g-3 mb-3 g-lg-5 mb-lg-4">
                            <div className="offset-1 col-10 offset-md-0 col-md-10">
                                <label htmlFor="inputCompanyName">Názov spoločnosti</label>
                                <input type="text" name='companyName' className="form-control py-lg-1 inputField" id="inputCompanyName" value={companyData.companyName} onChange={handleChange} placeholder="Názov spoločnosti"/>
                            </div>
                        </div>
                        <div className="roww g-3 mb-3 g-lg-5 mb-lg-4">
                            <div className="offset-1 col-10 offset-md-0 col-md-10">
                                <label>Typ spoločnosti</label>
                                <select id='filterOptions' className='form-select py-lg-1 inputField' value={compVal} onChange={handleTypeChange}>
                                    {
                                        companyTypes.map((comType)=>(
                                            <option key={comType.typeId} value={comType.typeId}>{comType.typeName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 submitDiv">
                        <button className="continueBtn py-2 px-3 me-5">Potvrdiť</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

 
export default CustomerInfoView;