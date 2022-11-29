// Reference
// https://www.youtube.com/watch?v=3pQY--GR2sI
// https://github.com/mariofornaroli/y-react-upload-file

// https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThanEqual, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import FileUpload from './FileUpload';
import FileList from './FileList';
import ResidueList from './ResidueList';
import BindingSite from './BindingSite';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Viewer from "./Viewer.js";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ImCancelCircle } from "react-icons/im";
import { IconContext } from "react-icons";

const UploadPdb = () => {

    useEffect(() => {
        document.title = "Try LIMO | LIMO";  
      });

    const [pdbId, setPdbId] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [uploadCount, setUploadCount] = useState(0);
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    //pdb files uploaded, one at a time
    const [files, setFiles] = useState(null);
    //residues within the file
    const [residues, setResidues] = useState([]);
    //user selected residue 
    const [resOption, setResOption] = useState('');
    const [targetId, setTargetId] = useState('');
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [z, setZ] = useState('');
    //the residue numbers for 3D visualization
    const [resNum, setResNum] = useState([]);
    //whether finished entire upload procedure
    const [isActive, setIsActive] = useState(false);
    //whether Residues are ready to be viewed
    const [isResActive, setIsResActive] = useState(false);
    //whether binding site is ready to be viewed
    const [isSiteActive, setIsSiteActive] = useState(false);
    //BindingSite residue name
    const [nonResOption, setNonResOption] = useState(null);

    // Check whether BindingSite is loading through selecting residue.
    const [isLoading, setIsLoading] = useState(false);
    // Check whether BindingSite is loading through input coordinate.
    const [isCoLoading, setIsCoLoading] = useState(false);

    // If user chooses the uploading PDB file option
    const [uploadFile, willUploadFile] = useState(true);

    const [validEmail, emailIsValid] = useState(true);
    const [step2, showStep2] = useState(true);
    const [pdbIdLoading, loadPdbId] = useState(false);

// for PDB ID option
    const [isResActive2, setIsResActive2] = useState(false);
    const [isSiteActive2, setIsSiteActive2] = useState(false);

    const [willOpen, setPopup] = useState(true);

    const removeFile = () => {
        // setFiles(files.filter(file => file.name !== filename))
        setFiles(null);
        setIsResActive(false);
        setIsSiteActive(false);
        setResidues(null);
        setTargetId(null);
    }

    function submitPdbId(e) {
        e.preventDefault();
        if(pdbId == '') {
            alert("Empty PDB ID! Please either provide a valid PDB ID or upload a PDB file.")
            return
        }
        loadPdbId(true);
        
        const formData = new FormData();
        const url = "https://west.ucsd.edu:8000/upload_from_pdb?id=" + pdbId;

        axios.post(url, formData, {
            headers: {
                // "Content-type": file.type,
                "mode": 'no-cors',
            }, 
        })
            .then((responseObject) => {
                loadPdbId(false)
                // console.log("upload_from_pdb");
                // console.log(responseObject);
                if(responseObject.data.nonstandard_res.length === 0) {
                    setIsResActive2(false)
                    setIsSiteActive2(false) 
                    alert("Invalid PDB ID! Please provide a valid PDB ID.")
                    return
                }
                setIsResActive2(true);
                setResidues(responseObject.data.nonstandard_res);
                setTargetId(responseObject.data.target_id);
                // console.log(responseObject.data.nonstandard_res);
                // console.log("success");
            })
            .catch((err) => {
                alert(err);
            });

    }

    // Change style of options
    let optionStyle1={backgroundColor:'lightseagreen',color:'white'}
    let optionStyle2={}
    if(uploadFile) {
        optionStyle1={backgroundColor:'lightseagreen',color:'white'}
        optionStyle2={}
    } else {
        optionStyle1={}
        optionStyle2={backgroundColor:'lightseagreen',color:'white'}
    }

    function handleOption(e) {
        if(files != null) {
            alert("You have opted to upload a PDB file!\nTo enter a PDB ID instead, please remove the PDB file.")
        }
        else if(pdbId != '') {
            alert("You have opted to enter a PDB ID!\nTo upload a PDB file instead, please remove the PDB ID.")
        }
        else if(e) {
            removeFile()
            willUploadFile(true)
        } 
        else if(!e) {
            willUploadFile(false)
        }
    }

    function getUrl(id) {
        let pdbUrl = "https://files.rcsb.org/download/"+id+".pdb"
        return pdbUrl
    }

    function handleEmail(e) {
        setEmail(e.target.value)
        showStep2(false)
    }

    function checkEmail(e) {
        if(String(email).toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            showStep2(true)
            e.preventDefault()
        } else {
            showStep2(false)
        }
    }

    function handlePdbIdChange(e) {
        setPdbId(e.target.value.toLowerCase())
        setIsResActive2(false)
        setIsSiteActive2(false)
        setResidues(null);
        setTargetId(null);
    }

    function hidePopup() {
        setPopup(false)
    }

    let popupStyle = willOpen ? {display:'block'} : {display:'none'};

    return (
        <IconContext.Provider value={{color:"orange", style:{width:'30px',height:'30px',margin:'0 8px 0 8px'}}}>
        <div className="paddings127">
                {/* <div className="cover" style={popupStyle} onClick={hidePopup}>
                    <div className="box" style={{maxWidth:'600px'}}>
                        <ImCancelCircle className="close-icon" onClick={hidePopup}/>
                        <div>Please fill out this <a href='/survey'>survey</a> before using this tool.
                            You may want to watch a demo <a href='/demo'>here</a>.
                        </div>
                    </div>
                </div> */}

            <div style={{display:isActive?'none':'block'}}>
                <h1 className="page-header">Input</h1>
                <div style={{maxWidth:'500px',margin:"0 auto"}}>
                    <p className='text-description'>
                        <a href='/demo'>Demo</a>
                    </p>
                    <br/>
                    <div ><h3 style={{fontWeight:'bold'}}>1.</h3>(disabled)</div>
                    {/* <p className="text-description"></p>
                    <form>
                        <input type="email" value={email} onChange={(e)=>handleEmail(e)} maxLength="40"/>
                        <button onClick={(e)=>checkEmail(e)} className='generate-button'>Enter</button>
                    </form> */}



                    
                    {step2 ?  
                        <div>
                        <br></br>
                        <div><h3 style={{fontWeight:'bold'}}>2.</h3></div>
                        <div className="pdb-input-option-parent" style={{width:"100%"}}>
                            <div className='pdb-input-option' onClick={()=>handleOption(true)} style={optionStyle1}>
                                Upload a PDB file
                            </div>
                            <div className='pdb-input-option' onClick={()=>handleOption(false)} style={optionStyle2}>
                                Enter a PDB ID
                            </div>
                        </div>

                        {uploadFile ? <div style={{textAlign:"center"}}> 
                            <FileUpload files={files} setFiles={setFiles} setIsResActive={setIsResActive} email={email} setIsSiteActive={setIsSiteActive}
                                removeFile={removeFile} setNonstandard_res={setResidues} setId={setTargetId}/>
                            <FileList files={files} removeFile={removeFile} setIsResActive={setIsResActive} setIsSiteActive={setIsSiteActive}
                            setNonstandard_res={setResidues} setId={setTargetId}/>

                            <div style={{display: isResActive?'block':'none'}}>
                                <ResidueList nonstandard_res={residues} Id={targetId} setResNum={setResNum} isSiteActive={isSiteActive}
                                    setIsSiteActive={setIsSiteActive} setX={setX} setY={setY} setZ={setZ}
                                    x={x} y={y} z={z} isLoading={isLoading} setIsLoading={setIsLoading} 
                                    isCoLoading={isCoLoading} setIsCoLoading={setIsCoLoading} nonResOption={nonResOption}
                                    setNonResOption={setNonResOption}/>
                            </div>
                            
                            <div style={{display: isSiteActive?'block':'none'}}>
                                <BindingSite Id={targetId} res={resOption} resNum={resNum}
                                    x={x} y={y} z={z} email={email} setIsActive={setIsActive}
                                    setIsSiteActive={setIsSiteActive} 
                                    files={files} isLoading={isLoading} residueName={nonResOption}/>
                            </div>
                            
                        </div>
                        :



                        <div style={{textAlign:"center"}}>
                            <br/>
                            <br/>
                            <form>
                                <input value={pdbId} onChange={(e)=>handlePdbIdChange(e)} maxLength="4"/>
                                {pdbIdLoading ? 
                                    <button className="generate-button">
                                        <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> 
                                    </button>
                                    : 
                                    <button className="generate-button" onClick={(e)=>submitPdbId(e)}>Enter</button>
                                }
                            </form>

                            <div style={{display: isResActive2?'block':'none'}}>
                                <ResidueList nonstandard_res={residues} Id={targetId} setResNum={setResNum} isSiteActive={isSiteActive2}
                                    setIsSiteActive={setIsSiteActive2} setX={setX} setY={setY} setZ={setZ}
                                    x={x} y={y} z={z} isLoading={isLoading} setIsLoading={setIsLoading} 
                                    isCoLoading={isCoLoading} setIsCoLoading={setIsCoLoading} nonResOption={nonResOption}
                                    setNonResOption={setNonResOption}/>
                            </div>
                            
                            <div style={{display: isSiteActive2?'block':'none'}}>
                                <BindingSite Id={targetId} res={resOption} resNum={resNum}
                                    x={x} y={y} z={z} email={email} setIsActive={setIsActive}
                                    setIsSiteActive={setIsSiteActive2}  pdbId={pdbId} url={getUrl(pdbId)} 
                                    isLoading={isLoading} residueName={nonResOption}/>
                            </div>

                            <br/>
                            <br/>
                            <br/>
                            
                        </div>
                        }
                        </div> : <div></div>
                    }
                </div>

                <br></br>
                <p style={{color:"red", display:"none"}}>Thank you for submitting the protein! A confirmation email has been sent to your email address.</p>
            </div>

        </div>
        </IconContext.Provider>
    )
}

export default UploadPdb