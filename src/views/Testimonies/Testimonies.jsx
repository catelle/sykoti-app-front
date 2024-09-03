import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../axios-client';
import { Link, useNavigate } from 'react-router-dom';
import next_icon from '../../assets/next-icon.png';
import back_icon from '../../assets/back-icon.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Testimonies.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';   
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../contexts/firebaseSetup';


const Testimonies = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const sidebarRef = useRef(null);
  
    const [selectedStoryId, setSelectedStoryId] = useState(null); // State for selected story

   
    const navigate = useNavigate(); // Initialize the navigate function
    const slider = useRef(null);


    const onSubmitt = (ev) => {
        ev.preventDefault();
        navigate('/testify');
    };



    useEffect(() => {
      const fetchStories = async () => {
        try {
  
          
          // Reference to the LoisCollection
          const historyCollectionRef = collection(db, 'historyCollection');
          // Fetch all documents from the collection
          const querySnapshot = await getDocs(historyCollectionRef);
  
          // Map through documents to get data
          const historyData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
  
          // Update state with fetched data
          setStories(historyData);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchStories();
    }, []);
  

    
    const Heading = styled.h2`
    font-family: Arial, sans-serif;
    font-size: 24px;
    font-weight: regular;
    margin-bottom: 0.5rem;
    text-align: center;
    padding-top: 7rem;

    `;

    const handleVote =()=>{

    }
    const handleLike=()=>{

    }
    const slideForward = () => {
        if (slider.current) {
            slider.current.scrollLeft += slider.current.offsetWidth;
        }
    };

    const slideBackward = () => {
        if (slider.current) {
            slider.current.scrollLeft -= slider.current.offsetWidth;
        }
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    const handleStoryClick = (story) => {
        setSelectedStory(story);
        navigate(`/story/${story.id}`);
      };

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + "...";
        } else {
          return text;
        }
      }
     
 
  


      return (
       
    <div> 
     <div className="container">
        {/* <div className="mb-3">
        <button type="Submit" onClick={onSubmitt} className="submit-button">Partager mon histoire</button>
          </div> */}
       
        <Swiper
          slidesPerView={ 'auto' }
          effect = { 'coverflow' }
          grabCursor = { true }
          centeredSlides = { true }
          loop = { true }
          coverflowEffect = {
            {
                rotate:0,
                stretch:0,
                depth: 100,
                modifier: 2.5,
            }
          }
          className='swiper_container'
          pagination={{el:'.swiper-pagination',clickable:true}}
          navigation={
            {
             nextEl:'.swiper-button-next',
             prevEl:'.swiper-button-prev',
             clickable:'true',
            }
          }
         modules={[EffectCoverflow, Pagination, Navigation]}
        >
          {stories.map((story, index) => (
            <SwiperSlide key={story.id} onClick={() => navigate(`/story/${story.id}`)} >
              {/* Your testimony content here */}
              <img  src={story.imageuri}  alt='story-image' />
              <h2>{story.title}</h2>
             
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
    </div>
          <Heading>Connectez-vous, inspirez, grandissez. Partagez votre histoire !</Heading>
    </div>
);
};

export default Testimonies;