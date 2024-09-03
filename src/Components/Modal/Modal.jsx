import React, { useState } from 'react';
import './Modal.css'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../contexts/firebaseSetup';

const Modal = ({ show, onClose, onSubmit }) => {
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      let imageUrl = '';

      if (image) {
          try {
              // Create a storage reference
              const storageRef = ref(storage, `images/${image.name}`);
              // Upload the file
              await uploadBytes(storageRef, image);
              // Get the file's URL
              imageUrl = await getDownloadURL(storageRef);
          } catch (error) {
              console.error('Error uploading file:', error);
              // Handle file upload error
              return;
          }
      }

      const formData = {
          answer,
          message,
          image: imageUrl, // or use image if you need the actual file
      };

      onSubmit(formData);
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setImage(file);
      }
  };
  
    if (!show) {
      return null;
    }
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Resolve Alert</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Answer to Problem:</label>
              <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Message to Author:</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Attach Image:</label>
              <input type="file"  accept=".jpeg,.jpg,.png,.gif,.svg"  onChange={handleImageChange} />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Close</button>
          </form>
        </div>
      </div>
    );
  };
export default Modal
