import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { HiOutlineThumbUp, HiOutlineThumbDown } from "react-icons/hi";
import { BiCommentDetail, BiNoEntry } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { useLocation } from 'react-router-dom';
import MuiSlider from "./MuiSlider.js";
import Viewer from "./Viewer.js";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const SamplePage = () => {

    const navigate = useNavigate();
    const locationObject = useLocation();

    const molecules = locationObject.state.param1.mols;
    const num_mols = locationObject.state.param1.num_mols;
    // console.log(molecules.length);
    // console.log(num_mols);
    const target = locationObject.state.param2;
    // console.log(target);

    useEffect(() => {     
        document.title = "Sample Output | LIMO"; 
    });

    const [willOpenSurvey, setSurveyPopup] = useState(true);

    const [upIsSelected, selectThumbUp] = useState(        
        JSON.parse(sessionStorage.getItem('thumb_up_arr') == null) ? 
        new Array(molecules.length).fill(false) : JSON.parse(sessionStorage.getItem('thumb_up_arr')))
    const [downIsSelected, selectThumbDown] = useState(        
        JSON.parse(sessionStorage.getItem('thumb_down_arr') == null) ? 
        new Array(molecules.length).fill(false) : JSON.parse(sessionStorage.getItem('thumb_down_arr')))
    const [willShowComment, showComment] = useState(new Array(molecules.length).fill(false));
    const [willShowMore, showMore] = useState(new Array(molecules.length).fill(false));
    const [willOpen, openPopup] = useState(new Array(molecules.length).fill(false));
    const [show3DInfo, set3DInfoVisibility] = useState(new Array(molecules.length).fill(false));
    const [downloadPdbArr, setDownloadPdbVisibility] = useState(new Array(molecules.length).fill(false));
    const [comment, setComment] = useState(
        JSON.parse(sessionStorage.getItem('comment_arr') == null) ? 
        new Array(molecules.length).fill('') : JSON.parse(sessionStorage.getItem('comment_arr')))
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [qedValue, setValQed] = useState(() => {
        if((JSON.parse(sessionStorage.getItem('qed_value_data'))) == null) {
            return 0;
        } else {
            return (JSON.parse(sessionStorage.getItem('qed_value_data')));
        }
    });
    const [saValue, setValSa] = useState(() => {
        if((JSON.parse(sessionStorage.getItem('sa_value_data'))) == null) {
            return 0;
        } else {
            return (JSON.parse(sessionStorage.getItem('sa_value_data')));
        }
    });
    const [nValue, setValN] = useState(() => {
        if((JSON.parse(sessionStorage.getItem('n_value_data'))) == null) {
            return 0;
        } else {
            return (JSON.parse(sessionStorage.getItem('n_value_data')));
        }
    });
    const [oValue, setValO] = useState(() => {
        if((JSON.parse(sessionStorage.getItem('o_value_data'))) == null) {
            return 0;
        } else {
            return (JSON.parse(sessionStorage.getItem('o_value_data')));
        }
    });
    const [autoDockValue, setValAutoDock] = useState(() => {
        if((JSON.parse(sessionStorage.getItem('autodock_value_data'))) == null) {
            return 0;
        } else {
            return (JSON.parse(sessionStorage.getItem('autodock_value_data')));
        }
    });
    const [hValue, setValH] = useState(() => {
        if((JSON.parse(sessionStorage.getItem('h_value_data'))) == null) {
            return 0;
        } else {
            return (JSON.parse(sessionStorage.getItem('h_value_data')));
        }
    });
    
    const handleChangeQed = selectedValue => {sessionStorage.setItem('qed_value_data', 
        JSON.stringify(selectedValue));setValQed(selectedValue);};
    const handleChangeSa  = selectedValue => {sessionStorage.setItem('sa_value_data', 
    JSON.stringify(selectedValue));setValSa(selectedValue);};
    const handleChangeN   = selectedValue => {sessionStorage.setItem('n_value_data', 
    JSON.stringify(selectedValue));setValN(selectedValue);};
    const handleChangeO   = selectedValue => {sessionStorage.setItem('o_value_data', 
    JSON.stringify(selectedValue));setValO(selectedValue);};
    const handleChangeAutoDock   = selectedValue => {sessionStorage.setItem('autodock_value_data', 
    JSON.stringify(selectedValue));setValAutoDock(selectedValue);};
    const handleChangeH   = selectedValue => {sessionStorage.setItem('h_value_data', 
    JSON.stringify(selectedValue));setValH(selectedValue);};

    function changeThumbUpColor(ind) {
        const thumbUpArr = upIsSelected.map((value, index) => index === ind ? !value : value);
        const thumbDownArr = downIsSelected.map((value, index) => index === ind ? false : value);
        selectThumbUp(thumbUpArr);
        selectThumbDown(thumbDownArr);
        sessionStorage.setItem('thumb_up_arr',JSON.stringify(thumbUpArr));
        sessionStorage.setItem('thumb_down_arr',JSON.stringify(thumbDownArr));
    }

    function changeThumbDownColor(ind) {
        const thumbDownArr = downIsSelected.map((value, index) => index === ind ? !value : value);
        const thumbUpArr = upIsSelected.map((value, index) => index === ind ? false : value);
        selectThumbDown(thumbDownArr);
        selectThumbUp(thumbUpArr);
        sessionStorage.setItem('thumb_up_arr',JSON.stringify(thumbUpArr));
        sessionStorage.setItem('thumb_down_arr',JSON.stringify(thumbDownArr));   
    }

    function changeVisibility(ind) {
        const showMoreArr = willShowMore.map((value, index) => index === ind ? !value : false);
        const textboxArr = willShowComment.map((value, index) => value = false);
        showMore(showMoreArr);
        showComment(textboxArr);
    }

    function setTextbox(ind) {
        const textboxArr = willShowComment.map((value, index) => index === ind ? !value : false);
        const showMoreArr = willShowMore.map((value, index) => value = false);
        showComment(textboxArr);
        showMore(showMoreArr);
    }

    function setPopup(ind) {
        const popupArr = willOpen.map((value, index) => 
            index === ind ? !value : false
        );
        const showMoreArr = willShowMore.map((value, index) => 
            value = false
        );
        openPopup(popupArr);
        showMore(showMoreArr);
    }

    function handleCommentChange(commentText, ind) {
        // console.log(commentText);
        const commentArr = comment.map((value, index) => 
            index === ind ? commentText : value
        );
        setComment(commentArr);
        sessionStorage.setItem('comment_arr',JSON.stringify(commentArr));
    }

    function sliderClick() {
        setLoading(true)

        sessionStorage.removeItem('thumb_up_arr');
        sessionStorage.removeItem('thumb_down_arr');
        sessionStorage.removeItem('comment_arr');

        //get slider values
        var qed_slider = qedValue;
        var sa_slider = saValue;
        var nitrogen_slider = nValue; 
        var oxygen_slider = oValue;
        var autodock_slider = autoDockValue;
        var hydrogen_slider = hValue;

        //plug into url
        var url = "https://west.ucsd.edu:8000/get_mols?target="+target+"&qed_slider="+qed_slider
        +"&sa_slider="+sa_slider+"&autodock_slider="+autodock_slider+"&hydrogen_bonds="+hydrogen_slider;

        //fetch
        fetch(url)
            .then((responseObject) => {
                if (!responseObject.ok) {
                    throw new Error(responseObject.status);
                }
                return responseObject.json();
            })
            .then((j) => {
                // console.log(j);
                // console.log(target);
                //update
                locationObject.state.param1 = j;
                // console.log(locationObject.state.param1);
                locationObject.state.param2 = target;
                navigate("/sample-page", {replace: true, state: {param1: j, param2: target}}); 
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                // setError(error.message);
                alert(error);
            });

    }

    function handleSubmission() {
        molecules.map((e, index) => {
            if(upIsSelected[index]) {
                const url1 = 
                    "";
                axios.get(url1)
                    .then((response1) => {
                        // console.log(response1);
                    })
                    .catch((error1) => {
                        alert(error1);
                    })
            }
            if(downIsSelected[index]) {
                const url2 = 
                    "";
                axios.get(url2)
                    .then((response2) => {
                        // console.log(response2);
                    })
                    .catch((error2) => {
                        alert(error2);
                    })
            }
            if(comment[index].trim().length !== 0) {
                const string = comment[index].trim();
                const url3 = 
                    "";
                axios.get(url3)
                    .then((reponse3) => {
                        // console.log(reponse3);
                    })
                    .catch((error3) => {
                        alert(error3);
                    })
            }
        })
        sessionStorage.clear();
        navigate("/thank-you/"+target)
    }

    function showVisualizationInfo(ind) {
        const show3DInfoArr = show3DInfo.map((value, index) => 
        index === ind ? !value : false
        );
        set3DInfoVisibility(show3DInfoArr);
    }

    function changeDownloadPdbVisibility(ind) {
        const showDownloadPdbArr = downloadPdbArr.map((value, index) => 
        index === ind ? !value : false
        );
        setDownloadPdbVisibility(showDownloadPdbArr);
    }

    let itemWork = (index, smiles, autodock, qed, sa, image) => {

        const urlImg = "https://west.ucsd.edu:8000/" + image;
        const url3D = "https://west.ucsd.edu:8000/get_structure?smiles="+smiles+"&target="+target;
        var isLongSmiles = false;
        if(smiles.length > 30){
            isLongSmiles = true;
        }
        return (
            <IconContext.Provider value={{color:"orange", style:{width:'30px',height:'30px',margin:'0 8px 0 8px'}}}>
            {/* Item Work */}
            <div className="col-md-4 desing">
                <div className="item-work">
                    <div className="visualization-button" onClick={() => setPopup(index)}>3D Visualization</div>
                    {willOpen[index] && 
                        <div className="cover">
                            <div className="box"  style={{textAlign:'center'}}>
                                <ImCancelCircle className="close-icon" onClick={()=>setPopup(index)}/>
                                <div><Viewer url={url3D}/></div>
                            </div>
                        </div>
                    }
                    <div className="hover">
                        <img src={urlImg} alt="molecule binder visualization"/>
                    </div>                                   
                    <div className="info-work">
                        {isLongSmiles?
                            <div style={{lineHeight:'14pt'}}>
                                SMILES: {smiles.slice(0,30)} <br/>
                                {smiles.slice(30,smiles.length)}
                            </div>
                            :
                            <div style={{lineHeight:'14pt'}}>SMILES: {smiles}</div>
                        }
                        <div>AutoDock affinity: {autodock.toExponential(3)}</div>
                        <div className='showMoreButton' onClick={() => changeVisibility(index)} 
                            style={{color: willShowMore[index] ? '#ff8c00':''}}>
                            {willShowMore[index] ? 'Show Less' : 'Show More'}
                        </div>
                        
                        {willShowMore[index] && 
                            <div className="moreInfo">
                                <div>SA: {sa.toFixed(3)}</div>
                                <div>QED: {qed.toFixed(3)}</div>
                                
                            </div>  
                        }
                        <div className="icons-work">
                            <HiOutlineThumbUp id="thumbs" onClick={() => changeThumbUpColor(index)} 
                                style={{fill: upIsSelected[index] ? '#FFB43F':''}}/>
                            <HiOutlineThumbDown id="thumbs" onClick={() => changeThumbDownColor(index)} 
                                style={{fill: downIsSelected[index] ? '#FFB43F':''}}/> 
                            <BiCommentDetail id="thumb3" onClick={() => setTextbox(index)} 
                                style={{fill: willShowComment[index] ? 'brown':''}}/> 
                            {willShowComment[index] && 
                                <div className="commentArea">
                                    <textarea className="textboxComment" value={comment[index]} 
                                        onChange={(e) => handleCommentChange(e.target.value, index)} name="Comment"/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            </IconContext.Provider>
        );
    };

    function hidePopup() {
        setSurveyPopup(false)
    }

    let popupStyle = willOpen ? {display:'block'} : {display:'none'};

    return (
        /* layout*/
        <div id="layout" className="paddings127">
            <h1 className="page-header">Sample Output</h1>
            <div className="content127">
                <div className="text-description">
                    (Text Description Removed)
                </div>
                <div style={{color:"#01b5c6", fontSize:"large",marginTop:'1em',fontWeight:'bold'}}>Filter Results</div>
                <div className="submit-voting-wrapper"><div className='submit-voting'>Submit (disabled)</div></div>
                <p className="text-description" style={{textAlign:'center'}}>
                </p>
                <div style={{display:"flex", margin:"auto", marginTop:"0.8em",marginBottom:'1em'}}>
                    
                    <div style={{textAlign:"right"}}>
                        <MuiSlider param="QED" val={qedValue} handleValChange={handleChangeQed}/>
                        <MuiSlider param="SA" val={saValue} handleValChange={handleChangeSa}/>
                        {/* <MuiSlider param="N" val={nValue} handleValChange={handleChangeN}/>
                        <MuiSlider param="O" val={oValue} handleValChange={handleChangeO}/> */}
                        <MuiSlider param="AutoDock affinity" val={autoDockValue} handleValChange={handleChangeAutoDock}/>
                    </div>
                    <button className="generate-button" onClick={sliderClick}  
                        style={{color:"white",backgroundColor:"#00C6D7"}}>
                        Filter 
                    </button>
                </div>

                <h3 style={{marginBottom:'1em'}}>Showing {molecules.length} of {num_mols} ligands</h3>
            </div>
            {/* Works */}
            <section className="paddings">
                {/* Container */}
                <div className="container">
                { loading ? <div style={{textAlign:'center',color:'#eaeaea'}}>Loading...</div> :
                    /* Items Works filters*/
                    <div className="works portfolioContainer">

                        {molecules.map((e, i) => {
                            return (
                                itemWork(i, e.smiles, e.autodock_affin, e.qed, e.sa, e.img)
                            )
                        })}
                    </div>   
                    /* End Items Works filters*/
                }     
                </div>
                {/* End Container*/}
            </section>
            {/* End Works*/}
        </div>
        /* End layout*/

    );
};

export default SamplePage;