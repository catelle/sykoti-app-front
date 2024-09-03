import React from 'react'
import { useNavigate } from 'react-router-dom';
import './FakItem.css';

const FakItem = ({ fak }) => {

  const navigate = useNavigate(); 


  const handleNavigate = () => {
    try{
      console.log('button clicked');
      const id= fak.id;
      navigate(`/fak-details/${id}`);
    }catch(error){
console.log(error);
    }
    
   };


    
  return (
    <div className="fak-item" >
    <div className="fak-item-content" >

      <img src={fak.image}  className="fak-imagel" onClick={handleNavigate} alt={fak.titre}  />
      <div className="fak-details">
    
        <h2>{fak.titre}</h2>
        <p>{fak.intro.slice(0, 100)}</p>
        <button className='l-btn2' onClick={handleNavigate}>Read more</button>

        
       
      </div>
        </div>
      </div>
  )
}

export default FakItem