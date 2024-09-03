import React from 'react';
import './Dashboard.css';
import { useStateContext } from '../../contexts/contentprovider';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../../assets/aaaa.jpg'
import { useNavigate } from 'react-router-dom';
import Notification from '../../Components/Notification/Notification';




const Dashboard = () => {
  const { token } = useStateContext();
  const navigate = useNavigate(); 

  const handleNavigate = () => {
   navigate('/help');
  };
  const handleNavigate2 = () => {
    navigate('/spreadscam');
   };
   const { user, setUser, setToken } = useStateContext();

  if (!token) {
    const settings = {
      dots: true,
      infinite: true,
      speed: 2,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
  }
    return (
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={logo} className="d-block w-100" alt="First slide"/>
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
            <h1>Nous sommes là pour vous aider !</h1>
            <h5>Vous suspectez un cas de phishing, cyberviolence, escroquerie ou êtes victime de toute autre forme de cybercrime ?</h5>
            <button className='l-btnn2' onClick={handleNavigate}>Urgence</button>
          </div>
        </div>
        <div className="carousel-item">
          <img src={logo} className="d-block w-100" alt="Second slide"/>
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
            <h1>Vous avez découvert une pratique d'escroquerie en ligne ?</h1>
            <h5>Partagez vos informations avec nous pour aider à prévenir d'autres victimes potentielles.</h5>
            <button className='scam-butt' onClick={handleNavigate2}>Alerte Scam</button>
          </div>
        </div>
        <div className="carousel-item">
          <img src={logo} className="d-block w-100" alt="Third slide"/>
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
            <h1>Victime ou témoin d'un cybercrime ?</h1>
            <h5>Contactez-nous et partagez votre expérience pour aider le plus grand nombre.</h5>
            <div className="button-div">
              <button className='l-btnn2' onClick={handleNavigate}>Urgence</button>
              <button className='scam-butt' onClick={handleNavigate2}>Alerte Scam</button>
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    
    );
  
};


export default Dashboard
