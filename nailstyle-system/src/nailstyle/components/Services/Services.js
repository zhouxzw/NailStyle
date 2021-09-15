import "./Services.css";

function Services() {

    return (
        <div className="srvc-parent-ctn">
            <div className="srvc-">
                <div className="srvc-header-ctn">
                    <span>SERVICES</span>
                    <p>Our premium manicure and pedicure nail care services...</p>
                </div>

                <div className="srvc-panel-ctn">
                    <div className="srvc-nav">
                        <ul className="srvc-ctgs">
                            <li><a href="#">MANICURE</a></li>
                            <li><a href="#">PEDICURE</a></li>
                            <li><a href="#">NAIL EXT.</a></li>
                            <li><a href="#">EYELASHES</a></li>
                            <li><a href="#">WAXING</a></li>
                        </ul>
                    </div>
                    <div className="srvc-display">

                        <div className="display-title">
                            <span className="display-mani-pg mani">MANICURE</span>
                            <span className="display-pedi-pg pedi">PEDICURE</span>
                            <span className="display-nail-pg nail">NAIL EXT.</span>
                            <span className="display-eye-pg eye">EYELASHES</span>
                            <span className="display-wax-pg wax">WAXING</span>
                        </div>

                        <div className="display-srvc">
                            <div className="mani">
                                <ul className="mani-srvc">
                                    <li><span>Regular Manicure</span></li>
                                    <li>Gel Manicure</li>
                                </ul>
                                <ul className="mani-price">
                                    <li><span>$60</span></li>
                                    <li>$50</li>
                                </ul>
                            </div>
                            <div className="pedi">
                                <ul className="pedi-srvc">
                                    <li><span></span></li>
                                    <li></li>
                                </ul>
                                <ul className="pedi-price">
                                    <li><span></span></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div className="nail">
                                <ul className="nail-srvc">
                                    <li><span></span></li>
                                    <li></li>
                                </ul>
                                <ul className="nail-price">
                                    <li><span></span></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div className="eye">
                                <ul className="eye-srvc">
                                    <li><span></span></li>
                                    <li></li>
                                </ul>
                                <ul className="eye-price">
                                    <li><span></span></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div className="wax">
                                <ul className="wax-srvc">
                                    <li><span></span></li>
                                    <li></li>
                                </ul>
                                <ul className="wax-price">
                                    <li><span></span></li>
                                    <li></li>
                                </ul>
                            </div>
                            
                        </div>

                        <div className="display-desc">
                            <p className="srvc-desc">Description goes here</p>
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>


    );

}


export default Services;
