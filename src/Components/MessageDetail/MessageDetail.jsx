import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../contexts/firebaseSetup';

const MessageDetail = () => {


    const { messageId } = useParams();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchMessage = async () => {
        try {
          const messageRef = doc(db, 'MessageCollection', messageId);
          const messageDoc = await getDoc(messageRef);
    
          if (messageDoc.exists()) {
            setMessage({ id: messageDoc.id, ...messageDoc.data() });
          } else {
            console.log('No such document!');
          }
        } catch (err) {
          console.log('Error fetching message:', err);
        }
      };
  
      fetchMessage();
    }, [messageId]);


     
  
    if (error) return <div>Error: {error}</div>;
    if (!message) return <div>Loading...</div>;
  
    return (
      <div>
        <h2>Message Details</h2>
        
        {message.image && (
        <div>
          <img src={message.image} alt="Attached" />
        </div>
      )}
        <p><strong>Date:</strong>{message.timestamp.toDate().toLocaleString()}</p>
        <p><strong>Content:</strong> {message.message}</p>
        
      </div>
    );
  };
  

export default MessageDetail;