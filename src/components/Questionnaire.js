// NEW Reference
// https://surveyjs.io/Documentation/Library?id=get-started-react#configure-styles
// https://www.npmjs.com/package/survey-react
// reference: https://surveyjs.io/Examples/Library/?id=real-product-fit-market&platform=Reactjs&theme=defaultV2#content-js

import ReactDOM from 'react-dom'
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

import "survey-core/defaultV2.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';



StylesManager.applyTheme("defaultV2");

var json = {
    "elements": [
        {
            "type": "checkbox",
            "title": "(Removed)",
            "isRequired": true,
            "hasNone": false,
            "maxSelectedChoices": 1,
            "colCount": 1,
            "choices": [
                "PhD Student",
                "Professor",
                "Master Student",
                "Other"
            ]
        }, {
            "type": "comment",
            "title": "(Removed)",
            "rows": 2
        }
    ]
};

function sendAnswers(data, id) {
    
    let url = ""
    +data.typeOfWorkplace+"&question2="+data.profession+"&question3="+data.careerStage+"&runid="+id;
    axios.get(url)
        .catch((error) => {
            alert(error); // Gives an error.
        })
}



export default function SurveyComponent() {
    useEffect(() => {
        document.title = "Survey | LIMO";  
    });
    const navigate = useNavigate();
    const { id } = useParams();

    const surveyComplete = useCallback((sender) => {
        alert("This feature has been disabled.");
        sendAnswers(sender.data, id);
        navigate("/survey-submitted")
    },[])
    const survey = new Model(json);
    survey.onComplete.add(surveyComplete);
    return <Survey model={survey} />;
}
