class MasterStyle extends React.Component {
    render(){
        return(
            <>
                 <nav id="sidebar">
                        <div className="sidebar-header box">
                        <img src="Images/uon_horse.png" alt="UoN Logo" className="ULogo"></img>
                        <h3 style={{paddingLeft: "10px"}}>KnowUoN</h3>
                        </div>                    

                    <ul className="list-unstyled components">
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li>
                            <a href="test.html">What to Know</a>
                        </li>
                        
                        <li>
                            <a href="#">Directory</a>
                        </li>
                        <li>
                            <a href="#">Services</a>
                        </li>            
                        <li>
                            <a href="#">About UoN</a>
                        </li>
                        <li>
                            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">More</a>
                            <ul className="collapse list-unstyled" id="pageSubmenu">
                                <li>
                                    <a href="#">FAQs & Testimonials</a>
                                </li>
                                <li>
                                    <a href="#">Social Media</a>
                                </li>
                                <li>
                                    <a href="#">Contact Information</a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="list-unstyled CTAs">
                        <li>
                            <a href="https://www.newcastle.edu.au/" className="primaryBtn">UoN Website</a>
                        </li>
                        <li>
                            <a href="https://myuon.newcastle.edu.au" className="secondaryBtn">My UoN</a>
                        </li>
                        <li>
                            <a href="https://uonline.newcastle.edu.au/webapps/login/" className="primaryBtn">Blackboard</a>
                        </li>
                        <li>
                            <a href="https://uon.okta.com/login/login.htm" className="secondaryBtn">My Hub</a>
                        </li>
                    </ul>

                </nav> 
              
            </>

        )
    }
}