import React, { useEffect, useState } from 'react'
import './Lois.css'
import axiosClient from '../../axios-client';
import LawItem from '../../Components/LawItem/LawItem.jsx'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../contexts/firebaseSetup.jsx';

const Lois = () => {

    

  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaws = async () => {
      try {

        
        // Reference to the LoisCollection
        const lawsCollectionRef = collection(db, 'LoisCollection');
        // Fetch all documents from the collection
        const querySnapshot = await getDocs(lawsCollectionRef);

        // Map through documents to get data
        const lawsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Update state with fetched data
        setLaws(lawsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLaws();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="laws-list">
      {laws.map((law) => (
        <LawItem key={law.id} law={law} />
      ))}
    </div>
  );
};

  export default Lois