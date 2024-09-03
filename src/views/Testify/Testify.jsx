import React, { useEffect, useRef, useState } from 'react'
import './Testify.css'
import 'bootstrap/dist/css/bootstrap.css'
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/contentprovider';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../contexts/firebaseSetup';
import { addDoc, collection } from 'firebase/firestore';

const Testify = () => {

  const [showModal, setShowModal] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const descriptionRef = useRef();
  const incidentdateRef = useRef();
  const additionalinfoRef = useRef();
  const categoryRef = useRef();
  const { setToken, setUser, setIsAdmin } = useStateContext();
  const adviceRef = useRef();
  const platformRef = useRef();
  const imageRef = useRef();
  const titleRef = useRef();
  const countryRef = useRef();
  const [errors, setErrors] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const handleConfirm = async (ev) => {
    ev.preventDefault();
    try {

      const payload = {
        Autor: nameRef.current.value,
        email: emailRef.current.value,
        introduction: descriptionRef.current.value,
        conclusion: adviceRef.current.value,
        Date: incidentdateRef.current.value,
        développement: additionalinfoRef.current.value,
        platform: platformRef.current.value,
        title: titleRef.current.value,
        storyCat: categoryRef.current.value,
        country: countryRef.current.value,
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
      payload.imageuri = imageUrl;

      // Add document to Firestore
      await addDoc(collection(db, 'historyCollection'), payload);
      console.log('Document successfully written!');
      navigate('/scam'); // Redirect after successful submission
      showNotification();
    } catch (error) {
      console.error('Error adding document: ', error);
      setErrors({ general: ['An error occurred while adding the scam item.'] });
    }
    setShowModal(false);
  };


  const handleCancel = () => {
    setShowModal(false);
  };

  const showNotification = () => {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log('show modal');
    setShowModal(true);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    incidentdateRef.current.max = formattedDate;
  }, []);


  return (

    <div className='form-containert'>
      <div className="introt">
        <h1>Partagez Votre Expérience en Ligne</h1>
        <h4>
          En partageant votre expérience, vous aidez les autres à rester en sécurité en ligne.
        </h4>

      </div>
      <form className="request-formt" onSubmit={onSubmit}>
        {errors && <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>}
        <div className="mb-3">
          <label htmlFor="incident-date" className="form-label">Date de l'Incident:</label>
          <input
            ref={incidentdateRef}
            type="date"
            id="incidentDate"
            name="incident-date"
            className="form-controlt"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="plateform" className="form-label">Platform:</label>
          <select
            className="form-select"
            value={selectedPlatform}
            onChange={handlePlatformChange}
            ref={platformRef}
            aria-label="Default select example"
          >
            <option value="">Sélectionnez une platforme</option>
            <option value="Whatsapp">Whatsapp</option>
            <option value="Telegramme">Telegramme</option>
            <option value="Facebook">Facebook</option>
            <option value="Appels">Appels</option>
            <option value="Appels">Message</option>
            <option value="Appels">Instagram</option>
            <option value="Appels">Email</option>
            <option value="Appels">Autres</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="platform" className="form-label">Categorie:</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            ref={categoryRef}
            aria-label="Default select example"
          >
            <option value="">Sélectionnez une categorie de cybercrime</option>
            <option value="Escroquerie">Escroquerie(phishing,smishing,vishing,scamming...)</option>
            <option value="Cyberharcelement">Cyberharcelement</option>
            <option value="Cyberviolence">Cyberviolence</option>
            <option value="Cyberdiscipline">Cyberdiscipline</option>
            <option value="Cyberintimidation">Cyberdintimidation</option>
            <option value="Catfish">Catfish</option>
            <option value="Autres">Autres</option>
          </select>
        </div>
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
          <label htmlFor="title" className="form-label">Titre:</label>
          <input type="text" ref={titleRef} className="form-controlt" id="name" placeholder="Titre pour votre temoignage" />

        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description de l'Incident:</label>
          <textarea id="description" ref={descriptionRef} className="form-controlt" name="description" rows="5" required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="additionalinfo" className="form-label">Impact sur Vous:</label>
          <textarea id="additionalinfo" ref={additionalinfoRef} className="form-controlt" name="impact" rows="3" required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="advice" className="form-label">Suggestions pour les Autres:</label>
          <textarea id="advice" ref={adviceRef} className="form-controlt" name="suggestions" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="full-name" className="form-label">Nom (Optionnel):</label>
          <input type="text" ref={nameRef} className="form-controlt" id="name" placeholder="Votre nom" />

          <div className="mb-3">
            <label htmlFor="file" className="form-label">Ajouter ou une image descriptive:</label>
            <div className="input-group">
              <input type="file" ref={imageRef} className="form-controlt" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />

            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Adresse Email:</label>
          <input ref={emailRef} type="email" className="form-controlt" id="email" placeholder="catelleningha@gmail.com" required />
        </div>


        <div className="mb-3">
          <button type="submit" className="submit-button">Envoyer</button>
        </div>

      </form>

      {/* Modal */}
      {showModal && (
        <div id="confirmationModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancel}>&times;</span>
            <p>Are you sure you want to submit this alert?</p>
            <button id="confirmBtn" onClick={handleConfirm}>OK</button>
            <button id="cancelBtn" onClick={handleCancel}>No</button>
          </div>
        </div>
      )}

      {/* Notification */}
      <div id="notification" className="notification">Témoignage partagé avec succes !

      </div>
    </div>

  )
}

export default Testify