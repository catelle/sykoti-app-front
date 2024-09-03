import React, { useEffect, useState } from 'react'
import './Submittedalerts.css'
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/contentprovider';

  const Submittedalerts = () => {
  const [scams, setScam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const { user, token, isAdmin, notification, setUser, setToken, setIsAdmin } = useStateContext();
  


  useEffect(() => {
    const fetchScams = async () => {
      try {
        const response = await axiosClient.get('/scams');
        setScam(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchScams();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/scams/${id}`);
      setScam(scams.filter(scam => scam.id !== id));
    } catch (error) {
      console.error("There was an error deleting the scam!", error);
    }
  };

  const handleVerify = async (id) => {
    try {
      await axiosClient.put(`/scams/${id}`, { status: 'verified' });
      setScam(scams.map(scam => (scam.id === id ? { ...scam, status: 'verified' } : scam)));
    } catch (error) {
      console.error("There was an error verifying the scam!", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if(!token||(!isAdmin)) return <div className="div"> You must be admin to access this area.</div>;

  return (
    <div>
    {scams.filter(scam => scam.status === 'unverified').map(scam => (
      <div className="scam-item" key={scam.id}>
        <div className="scam-item-content">
          <div className="image-container">
            <img 
              src={`http://localhost:8001/${scam.image}`} 
              alt={scam.description} 
              className="scam-image" 
            />
            {scam.status === "verified" && (
              <div className="verified-badge">✓</div>
            )}
          </div>
          <div className="scam-details">
            <h5>{scam.description}</h5>
            {!showFullContent ? (
              <button className='l-btn' onClick={() => setShowFullContent(true)}>
                Read Full
              </button>
            ) : (
              <div className="scam-full-content">
                <p>{scam.content}</p>
                <button className='l-btn2' onClick={() => window.location.href = scam.link}>
                  Go to Link
                </button>
                <button className='l-btn2' onClick={() => setShowFullContent(false)}>
                  Show Less
                </button>
              </div>
            )}
            <button className='l-btn' onClick={() => handleVerify(scam.id)}>
              Set as Verified
            </button>
            <button className='l-btn2' onClick={() => handleDelete(scam.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  );

};

export default Submittedalerts