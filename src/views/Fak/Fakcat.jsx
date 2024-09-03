import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FakItem from '../../Components/FakItem/FakItem';
import axiosClient from '../../axios-client';
import './FakCat.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../contexts/firebaseSetup';

const Fakcat = () => {

  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [faks, setFaks] = useState([]); 

  useEffect(() => {
    const fetchFaks = async () => {
      try {

        
        // Reference to the fakCollection
        const fakCollectionRef = collection(db, 'FakCollection');
        // Fetch all documents from the collection
        const querySnapshot = await getDocs(fakCollectionRef);

        // Map through documents to get data
        const fakData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Update state with fetched data
        setFaks(fakData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFaks();
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="fak-list">
      <h1>{category}</h1>
        {faks.filter((fak) => fak.categorie === category).map((fak) => (
        <FakItem key={fak.id} fak={fak} />
        ))}
      </div>
  )
}

export default Fakcat