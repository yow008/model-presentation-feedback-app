import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
    return(
        // <!-- footer bottom-->
        <footer class="footer-bottom">
            <div class="container">
               <div class="row">   
                    <ul class="menu-footer" style={{textAlign: "center"}}>
                            <li><Link to="/terms-of-use">Terms of Use</Link></li>
                    </ul>                                              
                </div>
            </div>
        </footer>      
    )
}

export default footer;