import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/molecule_1.png";

const Navbar = () => {
    const [hovered, setDropdown] = useState(false);
    
    const dropdownStyle = {
        display: 'block',
        width:'220px',
        left: '0',
        top: '45px'
    }

    function mouseEnter() {
        setDropdown(true);
    }

    function mouseLeave() {
        setDropdown(false);
    }

    var isSmallSceen = false;
    if (window.screen.width < 479) {
        isSmallSceen = true;
    } else {
    }

    return (
        // Header
        
            <header>  
            { /* Row*/ }
            {isSmallSceen?
            <div>
                <Link id="LIMO" to="/" style={{color:"white",height:"45px"}}>
                    LIMO
                    </Link>
                {/* Menu */}
                <ul id="menu" className="sf-menu" style={{float:'right'}}>
                            
                    <li><Link to="/try-limo">Run LIMO</Link></li>
                    <li><Link to="/people">People</Link></li>
                    <li><Link to="/contact-us">Contact</Link></li>
                </ul>
                { /* End Menu*/ }
            </div>
            :
            <div>
                <Link id="LIMO" to="/" style={{display:'inline-block',verticalAlign:'middle',color:"white",height:"45px"}}>
                    LIMO
                    <div style={{fontSize:'small',lineHeight:'16pt'}}>LIMO</div></Link>
                {/* Menu */}
                <ul id="menu" className="sf-menu" style={{float:'right'}}>        
                    <li><Link to="/try-limo">Tool</Link></li>
                    <li><Link to="/people">People</Link></li>
                    <li><Link to="/contact-us">Contact</Link></li>
                </ul>
                { /* End Menu*/ }
            </div>
            }
            </header>
            // End Header
        
        
    );
};

export default Navbar;