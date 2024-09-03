import React, { useEffect, useRef, useState } from 'react';
import './Notification.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../contexts/firebaseSetup';

const Notification = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const [messageList, setMessageList] = useState(messages);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log('Fetching messages for userId:', userId);
        
        // Create a query against the messages collection
        const messagesRef = collection(db, 'MessageCollection');
        const q = query(
          messagesRef,
          where('userid', '==', userId),
          where('archive', '==', false), 
          orderBy('timestamp', 'desc')  // Sort messages by creation date in descending order
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedMessages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedMessages);

        // Update state with the sorted messages
        setMessages(fetchedMessages);
        setUnreadCount(fetchedMessages.filter(message => !message.read).length);

        
        console.log('Fetched messages:', fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(error.message);
      }
    };
  
    fetchMessages();
  }, [userId, db]);

  const handleDelete = async (id) => {
    try {
      // Reference to the specific document in the MessageCollection
      const messageDocRef = doc(db, 'MessageCollection', id);
  
      // Delete the document from Firestore
      await deleteDoc(messageDocRef);
  
      // Update the state to remove the deleted message
      setMessages(messages.filter(message => message.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleArchive = async (id) => {
    try {
      // Reference to the specific document in the MessageCollection
      const messageDocRef = doc(db, 'MessageCollection', id);
  
      // Update the 'archived' field to true in Firestore
      await updateDoc(messageDocRef, {
        archive: true,
      });
  
      // Update the state to reflect the archived status
      setMessages(messages.map(message => message.id === id ? { ...message, archive: true } : message));
    } catch (error) {
      console.error('Error archiving message:', error);
    }
  };
    
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  
    // Optionally mark all messages as read when dropdown is opened
    if (!isDropdownOpen) {
      const markAllAsRead = async () => {
        try {
          const messagesRef = collection(db, 'MessageCollection');
          const q = query(messagesRef, where('userid', '==', userId), where('read', '==', false));
          const querySnapshot = await getDocs(q);
      
          const batchPromises = querySnapshot.docs.map(docSnapshot => {
            const messageDocRef = doc(db, 'MessageCollection', docSnapshot.id);
            return updateDoc(messageDocRef, { read: true });
          });
      
          await Promise.all(batchPromises);
          
          // Update the local state
          setMessages(messages.map(message => ({ ...message, read: true })));
          setUnreadCount(0);
        } catch (error) {
          console.error('Error marking messages as read:', error);
        }
      };
      markAllAsRead();
      
  };}
  // const handleMarkAsRead = async (messageId) => {
  //   try {
  //     await axiosClient.patch(`/messages/${messageId}`, { read: true });
  //     setMessageList(prevMessages => 
  //       prevMessages.map(message => 
  //         message.id === messageId ? { ...message, read: true } : message
  //       )
  //     );
  //   } catch (err) {
  //     console.error('Error marking message as read:', err);
  //   }
  // };


 useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleDropdownToggle(); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleDropdownToggle]);

  return (
    <div className="dropdown" ref={dropdownRef}>
    <button
      type="button"
      className="btn btn-primary position-relative"
      onClick={handleDropdownToggle}
    ><ion-icon name="notifications"></ion-icon>
      
      {unreadCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {unreadCount}
          <span className="visually-hidden">unread messages</span>
        </span>
      )}
    </button>

    {isDropdownOpen && (
      <div className="dropdown-menu dropdown-menu-end show" ref={dropdownRef}>
        {error ? (
          <div className="dropdown-item text-danger">Error loading notifications: {error}</div>
        ) : messages.length > 0 ? (
          messages.map(message => (
            <div key={message.id}  className="dropdown-item d-flex justify-content-between align-items-center">
              <Link
                  to={`/messages/${message.id}`}
                  className={`notification-link ${message.read ? 'read' : 'true'}`}
                  onClick={() => handleDropdownToggle()} // Optional: Close dropdown on click
                >
              <div>
                <div>{message.timestamp.toDate().toLocaleString()}</div>
                <div>{typeof message.message === 'string' ? message.message.slice(0, 30) : 'No content'}...</div>
              </div>
              </Link>
              <div>
              <div className="notification-actions">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(message.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleArchive(message.id)}
                >
                  Archive
                </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="dropdown-item">No messages</div>
        )}
      </div>
    )}
  </div>
  
  );
};
export default Notification;
