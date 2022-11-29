//reference: https://scrimba.com/learn/learnreact/forms-in-react-select-option-co83b466d859cf1d6c4b3efaf
import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
//import { fontSize } from '@mui/system'

const ResidueList = ({ nonstandard_res, Id, setResNum, setX, setY, setZ, x,y,z, isSiteActive, setIsSiteActive, 
    isLoading, setIsLoading, isCoLoading, setIsCoLoading, nonResOption, setNonResOption}) => {

    const dropdownDefaultValue = "--- SELECT ---"
    const [radius, setRadius] = useState(7.5)
    const [radius1, setRadius1] = useState(7.5)

    function handleResChange(event) {
        // console.log("RESIDUE: ",event.target.value);
        setNonResOption(event.target.value);
        setIsSiteActive(false);
    }

    function handleChangeRadius(event) {
        setRadius(event.target.value);
        setIsSiteActive(false);
    }

    function handleChangeRadius1(event) {
        setRadius1(event.target.value);
        setIsSiteActive(false);
    }

    function enterXyzRadius(e) {
        e.preventDefault();
        if(x==='' || y==='' || z==='') {
            alert("Invalid coordinates!");
            return;
        }
        setNonResOption(null);
        setIsCoLoading(true);
        var url = "https://west.ucsd.edu:8000/get_binding_site?target_id="+Id+"&x="+x+"&y="+y+"&z="+z+"&radius="+radius;
        axios.get(url)
        .then((responseObject) => {
            // console.log(url)
            setIsCoLoading(false);
            if (responseObject.data.invalid_coords === false) {
                setInvalidXYZ(false);
                setIsSiteActive(true);
                // console.log("get_binding_site");
                // console.log(responseObject);
                // console.log(responseObject.data.residues);
                setResNum(responseObject.data.residues);
                setX(responseObject.data.x);
                setY(responseObject.data.y);
                setZ(responseObject.data.z);
            } else {
                setIsSiteActive(false);
                setInvalidXYZ(true);
            }
            
            
        })
        .catch((error) => {
            alert(error);
            setIsCoLoading(false);
        });
    }

    function enterResRadius(e) {
        e.preventDefault();
        if(nonResOption === null || nonResOption === dropdownDefaultValue) {
            alert("Please select a valid residue!")
            return
        }
        setIsLoading(true);
        var url = "https://west.ucsd.edu:8000/get_binding_site?target_id="+Id+"&res="+nonResOption+"&radius="+radius1;
        axios.get(url)
        .then((responseObject) => {
            console.log("xxx",responseObject)
            if (responseObject.data.x === 0 && responseObject.data.y===0 && responseObject.data.z===0) {
                setIsLoading(false);
                setIsSiteActive(false);
                // setResNum('');
                // setX('');
                // setY('');
                // setZ('');
                alert("This residue is invalid, please select another residue, or enter coordinates manually")
            } else {
                setIsLoading(false);
                setIsSiteActive(true);
                // console.log("get_binding_site");
                // console.log(url)
                // console.log(responseObject);
                // console.log(responseObject.data.x);
                setResNum(responseObject.data.residues);
                // if (responseObject.data.residues.length > 0) {
                //     setNonResOption(responseObject.data.residues[0]);
                // }
                setX(responseObject.data.x);
                setY(responseObject.data.y);
                setZ(responseObject.data.z);
            }
            
            
        })
        .catch((error) => {
            alert(error);
            setIsLoading(false);
        });
    }

    // If user chooses the input xyz option
    const [inputXYZ, willInputXYZ] = useState(true);
    const [invalidXYZ, setInvalidXYZ] = useState(false);

    // Change style of options
    let optionStyle1={backgroundColor:'lightseagreen',color:'white'}
    let optionStyle2={}
    if(inputXYZ) {
        optionStyle1={backgroundColor:'lightseagreen',color:'white'}
        optionStyle2={}
    } else {
        optionStyle1={}
        optionStyle2={backgroundColor:'lightseagreen',color:'white'}
    }

    function handleOption(e) {
        // console.log(isSiteActive);
        if(e) {
            if (isSiteActive) {
                setIsSiteActive(false);
                // console.log("here");
            }
            willInputXYZ(true)
        } 
        else if(!e) {
            if (isSiteActive) {
                setIsSiteActive(false);
            }
            willInputXYZ(false);
        }
    }

    return (
        <div style={{maxWidth:'700px',margin:'0 auto'}}>
            <br/>
            <br/>
            <form htmlFor="favColor">
                <label style={{ width:"100%"}}>
                    <div style={{ float:"left"}}>
                        <h3 style={{fontWeight:'bold', fontSize:"18pt"}}>3.</h3>
                    </div>
                </label>
                <br/>

                <div className="pdb-input-option-parent" style={{width:"100%"}}>
                    <div className='pdb-input-option' 
                    onClick={()=>{handleOption(true);setRadius(7.5);setX('');setY('');setZ('')}} style={optionStyle1}>
                        Input coordinates
                    </div>
                    <div className='pdb-input-option' 
                    onClick={()=>{handleOption(false);setRadius1(7.5);setNonResOption(null);}} style={optionStyle2}>
                        Select residues
                    </div>
                </div>

                {inputXYZ ?
                <div style={{textAlign:"center"}}>
                    <p className='text-description'></p>
                    <label for="x">X:</label>
                    <input type="number" step="0.1" onInput={e=>{setX(e.target.value);setIsSiteActive(false);}} style={{width:"80px", marginLeft:"20px"}}/><br/>
                    <label for="y">Y:</label>
                    <input type="number" step="0.1" onInput={e=>{setY(e.target.value);setIsSiteActive(false);}} style={{width:"80px", marginLeft:"20px"}}/><br/>
                    <label for="z">Z:</label>
                    <input type="number" step="0.1" onInput={e=>{setZ(e.target.value);setIsSiteActive(false);}} style={{width:"80px", marginLeft:"20px"}}/><br/>
                    {(invalidXYZ && !isCoLoading) ? <div style={{color:"red"}}>The coordinates are invalid, please provide a new set</div>
                        :   
                        <div></div>
                    }
                    <br/>
                    <div>
                        <div style={{fontWeight:'bold'}}>Radius of the binding site: </div>
                        <input type="number" step="0.1" min="1" defaultValue="7.5"
                        onChange={handleChangeRadius} style={{width:'90px'}}/>
                    </div>
                    <br/>
                    {isCoLoading ? 
                        <button className="generate-button">
                            <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> 
                        </button>
                        : 
                        
                        <button className="generate-button" style={{color:"white",backgroundColor:"#00C6D7", marginTop:"5px"}} 
                            onClick={enterXyzRadius}>Enter</button>
                    }
                    
                    <br/>
                    <br/>
                </div>
                :
                <div style={{textAlign:'center'}}>
                    <p className="text-description">
                    </p>
                    <div>
                        <label for="res" style={{marginRight:"10px"}}>Residue:</label>
                        <select id="res" onChange={handleResChange} style={{width:'130px'}}>
                            <option>{dropdownDefaultValue}</option>
                        {
                            nonstandard_res &&
                            nonstandard_res.map(f => (
                            <option value={f}>{f}</option>))
                        }
                        </select>
                    </div>
                    <br/>
                    <div>
                        <div style={{fontWeight:'bold'}}>Radius: </div>
                        <input type="number" step="0.1" min="1" defaultValue="7.5"
                        onChange={handleChangeRadius1} style={{width:'90px'}}/>
                    </div>
                    <br/>
                    {isLoading ? 
                        <button className="generate-button">
                            <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> 
                        </button>
                        : 
                        <button className="generate-button" onClick={enterResRadius} >Enter</button>
                    }
                    <br/>
                    <br/>
                    
                </div>
                }
            </form>
        </div>
        
    )
}

export default ResidueList