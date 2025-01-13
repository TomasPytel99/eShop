import '../Styles/TransportView.css'


const TransportView = ({transportPrice, setTransportPrice}) => {


    return ( 
        <div className='col-12 px-4 py-5 transportWrapper'>
            <h3 className='mb-4'>Spôsob dopravy</h3>
            <ul className="transportList">
                <li>
                    <div>
                        <div>
                            <input type="radio" name='transport' value={0}/>
                            <label className='mx-2'>GLS</label>
                        </div>
                        <p className='mx-3'>Kuriérska spoločnosť</p>
                    </div>
                    <span>3,59 €</span>
                </li>
                <li>
                    <div>
                        <div>
                            <input type="radio" name='transport' value={1}/>
                            <label className='mx-2'>DPD</label>
                        </div>
                        <p className='mx-3'>Kuriérska spoločnosť</p>
                    </div>
                    <span>4,59 €</span>
                </li>
                <li>
                    <div>
                        <div>
                            <input type="radio" name='transport' value={2}/>
                            <label className='mx-2'>Packeta</label>
                        </div>
                        <p className='mx-3'>Kuriérska spoločnosť</p>
                    </div>
                    <span>2,59 €</span>
                </li>
                <li>
                    <div>
                        <div>
                            <input type="radio" name='transport' value={3}/>
                            <label className='mx-2'>Slovenská pošta</label>
                        </div>
                    </div>
                    <span>1,59 €</span>
                </li>
            </ul>
            <h3 className='mb-4'>Spôsob platby</h3>
            <ul className="mb-0 payMethodList">
                <li>
                    <div>
                        <input type="radio" name='payMethod'/>
                        <label className='mx-2'>Dobierka</label>
                    </div>
                    <span>1 €</span>
                </li>
                <li>
                    <div>
                        <input type="radio" name='payMethod'/>
                        <label className='mx-2'>Karta</label>
                    </div>
                    <span>Zadarmo</span>
                </li>
                <li>
                    <div>
                        <input type="radio" name='payMethod'/>
                        <label className='mx-2'>Google Pay</label>
                    </div>
                    <span>Zadarmo</span>
                </li>
                <li>
                    <div>
                        <input type="radio" name='payMethod'/>
                        <label className='mx-2'>PayPal</label>
                    </div>
                    <span>Zadarmo</span>
                </li>
            </ul>
        </div>
    );
}
 
export default TransportView;