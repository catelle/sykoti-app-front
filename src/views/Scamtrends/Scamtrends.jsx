import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './scamtrends.css';
import axiosClient from '../../axios-client';
import ScamItem from '../../Components/ScamItem/ScamItem';
import { useNavigate } from 'react-router-dom';
import { db } from '../../contexts/firebaseSetup';
import { collection, getDocs } from 'firebase/firestore';

const Scamtrends = () => {
  const [scams, setScam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function


  const onSubmit = (ev) => {
    ev.preventDefault();
    navigate('/spreadscam'); 
  };


  useEffect(() => {
    const fetchScams = async () => {
      try {

        
        // Reference to the LoisCollection
        const scamCollectionRef = collection(db, 'ScamCollection');
        // Fetch all documents from the collection
        const querySnapshot = await getDocs(scamCollectionRef);

        // Map through documents to get data
        const scamData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Update state with fetched data
        setScam(scamData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchScams();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="div">
    {/* <div className="mb-3">
    <button className="sharebtns" type="Submit" onClick={onSubmit}><ion-icon name="share-social-outline"></ion-icon></button>
  </div> */}
    <div className="scam-list">
      {scams.map((scam) => (
        <ScamItem key={scam.id} scam={scam} />
      ))}
    </div>
    </div>
  );
};

export default Scamtrends