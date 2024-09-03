import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Fakdetails.css'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../contexts/firebaseSetup';

const Fakdetails = () => {

    const { id } = useParams();
    const [fak, setFak] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        const fetchFak = async () => {
          try {
            const docRef = doc(db, 'FakCollection', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setFak(docSnap.data());
              console.log('Story fetched:', docSnap.data());
            } else {
              console.log('No such document!');
            }
          } catch (error) {
            console.error('Error fetching story:', error);
            setError('Error fetching story');
          } finally {
            setLoading(false);
          }
        };
        fetchFak();
    }, [id]);
  
    if (loading) {
        return <div>Loading story...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
    
      if (!fak) {
        return <div>Story not found</div>; 
      }

      const Paragraph = styled.p`
  font-family: Arial, sans-serif;
  font-size: 20px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 1rem;
`;

const Heading2 = styled.h2`
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const Heading = styled.h3`
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
    
  return (
    <div className="fak-detail">
    
      <h1>{fak.titre} ({fak.categorie})</h1>
     
      <div className="fak-info">
        
        {/* <p><strong>Platform:</strong> {story.platform}</p> */}
      
      </div>
      <img src={fak.image} alt={fak.title} className="fak-images" />
     
      <div className="fak-content">
      <Paragraph>{fak.intro}</Paragraph>
      <Heading2>{fak.T1}</Heading2>
      <Paragraph>{fak.p1}</Paragraph>  
      <Heading2>{fak.T2}</Heading2>
      <Paragraph>{fak.p2}</Paragraph>  
      <Heading2>{fak.T3}</Heading2>
      <Paragraph>{fak.p3}</Paragraph>  
      <Heading2>{fak.T4}</Heading2>
      <Paragraph>{fak.p4}</Paragraph>  
      <Heading2>{fak.T5}</Heading2>
      <Paragraph>{fak.p5}</Paragraph>  
      <Heading2>{fak.T6}</Heading2>
      <Paragraph>{fak.p6}</Paragraph>  
      <Heading2>{fak.T7}</Heading2>
      <Paragraph>{fak.p7}</Paragraph>  
      <Heading2>{fak.T8}</Heading2>
      <Paragraph>{fak.p8}</Paragraph>  
      <Heading2>{fak.T9}</Heading2>
      <Paragraph>{fak.p9}</Paragraph>  
      <Heading2>{fak.T10}</Heading2>
      <Paragraph>{fak.p10}</Paragraph>  
      <Heading2>Conclusion</Heading2>
      <Paragraph>{fak.conclusion}</Paragraph>  

      </div>
      
    </div>
  )
}

export default Fakdetails