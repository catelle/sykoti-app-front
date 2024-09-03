import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import './Urgence.css'
import { useStateContext } from '../../contexts/contentprovider';
import Modal from '../../Components/Modal/Modal';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../contexts/firebaseSetup';


const Urgence = () => {

  const { user, token, isAdmin, notification, setUser, setToken, setIsAdmin } = useStateContext();
  const [alerts, setAlerts] = useState([]); // Ensure state is initialized
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selecteduserid, setSelecteduserid] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {

        
        // Reference to the LoisCollection
        const lawsCollectionRef = collection(db, 'UrgenceCollection');
        // Fetch all documents from the collection
        const querySnapshot = await getDocs(lawsCollectionRef);

        // Map through documents to get data
        const lawsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Update state with fetched data
        setAlerts(lawsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, 'UrgenceCollection', id);
      await deleteDoc(docRef);
      setAlerts(alerts.filter(alert => alert.id !== id));
    } catch (error) {
      console.error("There was an error deleting the alert!", error);
    }
  };
  const handleVerify = (id) => {
    setSelectedAlert(id);
    setShowModal(true);
  };

  const onSubmit = async (formData) => {
    try {
      const docRef = doc(db, 'UrgenceCollection', selectedAlert);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const userId = docSnap.data().userid;
        const selectedData = docSnap.data();
        setSelecteduserid(userId);
        setSelected(docRef);
  
        const updatedAlertData = {
          status: 'solved',
          solution: formData.answer,
          message: formData.message,
        };
  
        await updateDoc(docRef, updatedAlertData);
  
        setAlerts(alerts.map(alert => (alert.id === docRef.id ? { ...alert, ...updatedAlertData } : alert)));
  
        const messageData = {
          archive: false,
          userid: userId,
          message: formData.message,
          read: false,
          image: formData.image,
          timestamp: new Date(),
        };
  
        await addDoc(collection(db, 'MessageCollection'), messageData);
  
        setShowModal(false);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("There was an error processing your request!", error);
    }
  };
  
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!token || !isAdmin) return <div className="div">You must be admin to access this area.</div>;
  return (
    <div>
      <Modal show={showModal} onClose={handleCloseModal} onSubmit={onSubmit} />
      {alerts.length === 0 ? (
        <p>No alerts found</p>
      ) : (
        alerts.filter(alert => alert.status === 'unsolved').map(alert => (
          <div className="scam-item" key={alert.id}>
            <div className="scam-item-content">
              <div className="image-container">
                <img 
                  src={alert.image} 
                  alt={alert.description} 
                  className="scam-image" 
                />
                {alert.status === "solved" && (
                  <div className="verified-badge">✓</div>
                )}
              </div>
              <div className="scam-details">
                <h5>{alert.name}, {alert.Moyen_contact}, {alert.categorie}</h5>
                <p>{alert.date}</p>
                {!showFullContent ? (
                  <button className='l-btn' onClick={() => setShowFullContent(true)}>
                    Read Full
                  </button>
                ) : (
                  <div className="scam-full-content">
                    <p>{alert.description}</p>
                    <button className='l-btn2' onClick={() => setShowFullContent(false)}>
                      Show Less
                    </button>
                  </div>
                )}
                <button className='l-btn' onClick={() => handleVerify(alert.id)}>
                  Set as resolved
                </button>
                <button className='l-btn2' onClick={() => handleDelete(alert.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};


export default Urgence;