import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './LawItem.css';


const LawItem = ({ law }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const handleNavigate = () => {
    window.open(law.link, '_blank');
  };

  return (
    <div className="law-item">
      <div className="law-item-content">
        <img src={law.image} alt="image-drapeau" className="law-imagel" />
        <div className="law-details">
          <h2>{law.title}</h2>
          <p>{law.description}</p>
         
          
          {!showFullContent ? (
            <button className='l-btn' onClick={() => setShowFullContent(true)}>Read Full</button>
           
          ) : (
            <div className="law-full-content">
              <p>{law.content}</p>
              <button className='l-btn2' onClick={handleNavigate}>Go to Link</button>
              <button className='l-btn2' onClick={() => setShowFullContent(false)}>Show Less</button>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};
export default LawItem;
