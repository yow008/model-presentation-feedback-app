//reference: https://scrimba.com/learn/learnreact/forms-in-react-select-option-co83b466d859cf1d6c4b3efaf
import React from 'react'
import axios from 'axios'
import Viewer from "./Viewer.js";
import { useEffect, useState } from 'react';
import { ImCancelCircle } from "react-icons/im";
import { IconContext } from "react-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { BiExit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const BindingSite = ({Id, res, resNum, x, y, z, email, setIsActive, setIsSiteActive, files, pdbId, url, isLoading,residueName}) => {
    const navigate = useNavigate()
    const [willOpen, setPopup] = useState(false);
    let path = "";
    const submitJob = (event) => {
        setIsActive(true);
        //console.log(email);
        const url = "";
        //console.log(url)
        axios.post(url, {
        })
            .then((responseObject) => { 
                // console.log("submit_job: ",responseObject);
                // console.log("success");
                navigate(path, {state: {runId:Id,x:x,y:y,z:z,files:files,pdbId:pdbId,residueName:residueName}})
            })
            .catch((err) => {
                alert(err);
            });

    }

    const returnStep = (e) => {
        setIsSiteActive(false);

    }

    return (
        <IconContext.Provider value={{color:"orange", style:{width:'30px',height:'30px',margin:'0 8px 0 8px'}}}>
        
        {isLoading? '' : 
        <div style={{maxWidth:'700px',padding:'6px',margin:'12pt'}}>
            <ul>
                <li>X: {x}</li>
                <li>Y: {y}</li>
                <li>Z: {z}</li>
            </ul>
            <div className="visualization-button-center" onClick={() => setPopup(true)}>3D Visualization</div>
            
            {willOpen && 
                <div className="cover">
                    <div className="box">
                        <ImCancelCircle className="close-icon" onClick={()=>setPopup(false)}/>
                        {
                            url ? 
                            <div>
                                <Viewer url={url} numbers={resNum}/>

                            </div>
                            :
                            <div>
                                <Viewer file={files[0]} numbers={resNum}/>
                            </div>
                        }
                        
                    </div>
                </div>
            }
            <br></br>
            <button className="generate-button" style={{color:"white",backgroundColor:"#00C6D7", marginTop:"10px"}} 
                onClick={submitJob}>Start generation (disabled)</button>
        </div>
        }    
        </IconContext.Provider>
    )
}

export default BindingSite