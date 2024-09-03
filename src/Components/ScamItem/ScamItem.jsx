import React, { useState } from 'react'
import './ScamItem.css';

const ScamItem = ({ scam })  => {
  
  
      const [showFullContent, setShowFullContent] = useState(false);
    
      const handleNavigate = () => {
        window.open(scam.link, '_blank');
      };

      
    
      return (
        <div className="scam-item">
        <div className="scam-item-content">
        <div className="image-container">
          <img 
            src={scam.image}
            alt={scam.description} 
            className="scam-image" 
          />
          {scam.status === "verified" && (
            <div className="verified-badge">✓</div>
          )}
        </div>
          <div className="scam-details">
            <h3>{scam.description}</h3>
            
           
            
            {!showFullContent ? (
              <button className='l-btns' onClick={() => setShowFullContent(true)}>
                Read Full
              </button>
            ) : (
              <div className="scam-full-content">
                
                <p>{scam.content}</p>
                <button className='l-btns2' onClick={handleNavigate}>
                  Go to Link
                </button>
                <button className='l-btns2' onClick={() => setShowFullContent(false)}>
                  Show Less
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      );
    };
    
    export default ScamItem;
    