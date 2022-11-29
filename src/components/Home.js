import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//js 1
import 'intro.js/introjs.css';

//js 2
// import Joyride from 'react-joyride';

//js 3
// import * as Driver from 'driver.js';
// import 'driver.js/dist/driver.min.css';


const Home = () => {
    useEffect(() => {
        document.title = "LIMO";  
    })

    const navigate = useNavigate();
    const id = "f51f21a2a32c085a";
    
    const [error, setError] = useState('');

    function sampleLink() {
    
        sessionStorage.clear();
    
        let qedValue = 0;
        let saValue = 0;
        let nValue = 0;
        let oValue = 0;
        let autodockValue = 0;
        let hValue = 0;
    
        const url = 'https://west.ucsd.edu:8000/get_mols?target='+id+'&qed_slider='+qedValue
        +'&sa_slider='+saValue+'&autodock_slider='+autodockValue+'&hydrogen_bonds='+hValue;
            // console.log(url)
        fetch(url)
            .then((responseObject) => {
                if (!responseObject.ok) {
                    throw new Error(responseObject.status);
                }
                return responseObject.json();
            })
            .then((j) => {
                // console.log(j);
                // console.log(id);
                navigate("/sample-page", {state: {param1: j, param2: id}});               
            })
            .catch((error) => {
                setError(error.message);
                // alert(error);
            });
    }

    let state = {
        stepsEnabled: false,
        initialStep: 0,
        steps : [
            {
                element: '#b1',
                intro: 'A one-time survey',
                position: 'right',
                tooltipClass: 'myTooltipClass',
                highlightClass: 'myHighlightClass',
                nextLabel: "Next", doneLabel: "Done",
            },
            {
                element: '#b2',
                intro: 'a demo of the main functionality of the website',
                position: 'right',
                nextLabel: "Next", doneLabel: "Done",
            },
            {
                element: '#b3',
                intro: 'Click to generate your molecule binders',
                position: 'right',
                nextLabel: "Next", doneLabel: "Done",
                hideNext: 'false',skipLabel:"x"
            },
        ],
        hintsEnabled: true,
        hints: [
            {
                element: "#b0",
                hint: "Follow me to fulfill the workflow of LIMO",
                hintPosition: "top-right"
            },
            {
                element: '#b1',
                hint: 'Firstly please fill out the survey',
                hintPosition: "top-right"
            }
        ]
    };


        //change styles according to device types
        var isSmallSceen = false;
        if (window.screen.width < 479) {
            isSmallSceen = true;
        } else {
        }

        let toggleSteps = () => {
            this.setState(prevState => ({ stepsEnabled: !prevState.stepsEnabled }));
        };
    
        let onExit = () => {
            this.setState(() => ({ stepsEnabled: false }));
        };

        
        return (
            <>
            <section className="content_info">
                <div style={{position:'absolute',textAlign:'center',
                    height:'100%', width:'100%', backgroundColor:'#19191987',padding:'3%'}}>
                    <h1 className="homepage-header">
                        Welcome to LIMO
                    </h1>
                    <div style={{height:'6vh'}}></div>
                    <div style={{fontSize:'15pt',lineHeight:'21pt',marginBottom:"5%"}}>
                    </div>
                    <div style={{height:'6vh'}}></div>
                    <NavLink className="submit-voting" to="/try-limo"> The Tool </NavLink>
                    <div style={{height:'10vh'}}></div>
                </div>  
            </section>   

            {isSmallSceen? 
                <div>
                    <div style={{backgroundColor:"#bfd3d6",padding:"50pt",textAlign:"center" ,justifyContent:"center"}}>
                        
                        {/* <Link className='home-button' to="/demo">Demo</Link>
                        <Link className='home-button' id="b3" to="/intro" >Learn more</Link> */}
                        <div style={{marginBottom:"30pt"}}>
                            <Link id="b1" to="/demo" style={{color:"black",fontSize: "22pt"}}>Demo</Link>
                        </div>
                        <div style={{marginBottom:"30pt"}}>
                            <Link id="b1" to="/intro" style={{color:"black",fontSize: "22pt"}}>About</Link>
                        </div>
                        <div style={{marginBottom:"30pt"}}>
                            <Link id="b1" to="/people" style={{color:"black",fontSize: "22pt"}}>People</Link>
                        </div>
                        <Link id="b1" to="/contact-us" style={{color:"black",fontSize: "22pt"}}>Contact</Link>

                    </div>
                    <div style={{backgroundColor:"#f3f2ef",padding:"50pt",display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                        <div id="b1" className='homepage-links' onClick={sampleLink}>
                            <div style={{paddingBottom:'1em'}}>Sample Output</div>
                        </div>
                        <br></br>
                            
                    </div>
                </div>
                :
                <div>   
                    <div style={{display: 'flex',backgroundColor:"#bfd3d6",justifyContent: 'space-evenly',padding:"50pt"}}>
                        
                        <Link id="b1" to="/demo" style={{color:"black",fontSize: "22pt"}}>Demo</Link>
                        <Link id="b1" to="/intro" style={{color:"black",fontSize: "22pt"}}>About</Link>

                    </div>
                    <div style={{backgroundColor:"#f3f2ef",padding:"50pt",display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                        <div id="b1" className='homepage-links' onClick={sampleLink}>
                            <div style={{paddingBottom:'1em'}}>Sample Output</div>
                        </div>
                        <br></br>
                            
                    </div>
                </div>
            }
            

            <div style={{clear:"both"}}></div>
            
            </>
        );
}



export default Home;