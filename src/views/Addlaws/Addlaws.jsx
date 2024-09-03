import React, { useRef, useState } from 'react'
import './Addlaws.css'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/contentprovider';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage imports
import { db, storage } from '../../contexts/firebaseSetup';


const Addlaws = () => {


  const titleRef = useRef();
  const countryRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  const linkRef = useRef();
  const descriptionRef = useRef();
  const [errors, setErrors] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const { token, isAdmin, setToken, setUser, setIsAdmin } = useStateContext();
  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      title: titleRef.current.value,
      country: countryRef.current.value,
      content: contentRef.current.value,
      link: linkRef.current.value,
      description: descriptionRef.current.value,
    };

    const file = imageRef.current.files[0];
    let imageUrl = '';

    if (file) {
      try {
        // Create a storage reference
        const storageRef = ref(storage, `images/${file.name}`);
        // Upload the file
        await uploadBytes(storageRef, file);
        // Get the file's URL
        imageUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle file upload error
        return;
      } 
    }

    // Add image URL to the payload
    payload.image = imageUrl;

    try {
      // Add document to Firestore
      await addDoc(collection(db, 'LoisCollection'), payload);
      console.log('Document successfully written!');
      navigate('/lois'); // Redirect after successful submission
    } catch (error) {
      console.error('Error adding document:', error);
      // Handle Firestore error
    }
  };

  if (!token || !isAdmin) return <div className="div">You must be admin to access this area.</div>;

  return (
    <div className='form-containerl'>
      <div className="introl">
        <h1>Lois Cybercrimes</h1>
      </div>
      <form className="request-forml" onSubmit={onSubmit}>
        {errors && <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>}
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country:</label>
          <select
            className="form-select"
            value={selectedCountry}
            onChange={handleCountryChange}
            ref={countryRef}
            aria-label="Default select example"
          >
            <option value="">Sélectionnez un pays</option>
            <option value="Cameroun">Cameroun</option>
            <option value="Côte d'Ivoire">Côte d'Ivoire</option>
            <option value="Gabon">Gabon</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Lois Recente en matiere de securite en ligne:</label>
          <textarea ref={titleRef} id="title" name="title" className="form-controll" rows="5" required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Apercu contenu:</label>
          <textarea ref={contentRef} id="content" name="content" className="form-controll" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description generale:</label>
          <textarea ref={descriptionRef} id="description" name="description" className="form-controll" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">Lien fichier complet:</label>
          <textarea ref={linkRef} id="link" name="link" className="form-controll" rows="1"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image drapeau:</label>
          <div className="input-group">
            <input type="file" ref={imageRef} className="form-controll" id="imageDrapeau" aria-describedby="imageDrapeau" aria-label="Upload" />
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="submit-button">Envoyer</button>
        </div>
      </form>
    </div>
  );
};


export default Addlaws