import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import sample from "../images/molecule_1.png";
import MemberCard from "./MemberCard.jsx";


const AboutUs = () => {
    useEffect(() => {
        document.title = "People | LIMO";
    });

    return (
        <div className="paddings127">
            <h1 className="page-header">People</h1>
            <h2 style={{textAlign:'center'}}></h2>
            <h3 className='people-page-subheading'></h3>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className="member-set" style={{width:"60%"}}>
                    <MemberCard imgSrc={sample} 
                        personName='Name' 
                        dept='Department'
                        websiteLink='' 
                    />
                    <MemberCard imgSrc={sample} 
                        websiteLink='' 
                        personName='Name' 
                        dept='Department'
                        school='School'
                    />
                </div>
            </div>

            <h3 className='people-page-subheading'></h3>
            <div  className="member-set">
            <MemberCard personName='Name' 
                imgSrc={sample}
                dept='Department'/>
            <MemberCard personName='Name' 
                imgSrc={sample}
                dept='Department'/>
            <MemberCard personName='Name' 
                imgSrc={sample}
                dept='Department'/>
            <MemberCard personName='Name'
                imgSrc={sample} 
                dept='Department'/>
            </div>

            <br></br>
            <br></br>

            <h2 style={{textAlign:'center'}}></h2>
            <h3 className='people-page-subheading'></h3>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                <div  className="member-set" style={{width:"70%"}}>
                <MemberCard personName='Name' 
                    imgSrc={sample}
                    dept='Department'/>
                <MemberCard personName='Name' 
                    imgSrc={sample}
                    dept='Department'/>
                <MemberCard personName='Name' 
                    imgSrc={sample}
                    dept='Department'/>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;