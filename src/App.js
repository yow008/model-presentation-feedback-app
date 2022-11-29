import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import "./css/style.css";
import "./css/theme-responsive.css";

import Home from "./components/Home";
import AboutUs from './components/AboutUs';
import SamplePage from './components/SamplePage';
import Questionnaire from './components/Questionnaire';
import UploadPdb from './components/UploadPdb';
import Navbar from './components/Navbar';
import ContactUs from './components/ContactUs';
import TermOfUse from './components/TermOfUse';
import Intro from './components/Intro'
import Footer from './components/Footer';
import Demo from './components/Demo';
import SurveySubmitted from './components/SurveySubmitted';

let App = () => (
  <><Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/people" element={<AboutUs />} />
    <Route path="/survey/:id" element={<Questionnaire />} />
    <Route path="/try-limo" element={<UploadPdb />} />
    <Route path="/contact-us" element={<ContactUs />} />
    <Route path="/terms-of-use" element={<TermOfUse/>}/>
    <Route path="/intro" element={<Intro/>}/>
    <Route path="/demo" element={<Demo/>}/>
    <Route path="/sample-page" element={<SamplePage/>}/>
    <Route path="/survey-submitted" element={<SurveySubmitted/>}/>
  </Routes>
  <Footer /></>
  );

export default App;
