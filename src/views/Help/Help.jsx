import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './Help.css'
import { useStateContext } from '../../contexts/contentprovider';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../contexts/firebaseSetup';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Help = () => {

  const [showModal, setShowModal] = useState(false);
  
  const incidentdateRef = useRef(null);
  const platformRef = useRef(null);
  const descriptionRef = useRef(null);
  const additionalinfoRef = useRef(null);
  const moyen_contactRef = useRef(null);
  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const categoryRef= useRef(null);
  const countryRef = useRef(null);
  let category;

  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [errors, setErrors] = useState();

  const { user, setUser, setToken } = useStateContext();

  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  const handleConfirm = async () => {
  // Get the current user's ID
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
  console.error('No user is currently signed in.');
  return;
  }

  const userId = user.uid;
    try{
    category=categoryRef.current.value;
    const payload = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      Moyen_contact: moyen_contactRef.current.value,
      date: incidentdateRef.current.value,
      addinfo: additionalinfoRef.current.value,
      platform: platformRef.current.value,
      status: 'unsolved',
      categorie:categoryRef.current.value,
      pays:countryRef.current.value,
      userid: userId,
      
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

    // Add document to Firestore
    await addDoc(collection(db, 'UrgenceCollection'), payload);
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
      navigate(`/fak/${category}`);
    }, 3000);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log('show modal');
    setShowModal(true);
  };
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    incidentdateRef.current.max = formattedDate;
  }, []);

  return (


    <div className='form-containerh'>
      <div className="introh">
        <h1>Assistance face aux Cybercrimes</h1>
        <h4>Nous sommes là pour vous aider. Veuillez remplir ce formulaire. </h4>
      </div>
      <form className="request-formh" onSubmit={onSubmit}>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}

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
        <label htmlFor="country" className="form-label">Pays:</label>
        <select
          className="form-select"
          value={selectedCountry}
          onChange={handleCountryChange}
          ref={countryRef}
          aria-label="Default select example"
        >
         <option value="">Sélectionnez votre pays de residence</option>
          <option value="Cameroun">Cameroun</option>
          <option value="Cote d'ivoire">Cote d'ivoire</option>
          <option value="Gabon">Gabon</option>
          <option value="RCA">RCA</option>
          <option value="Tchad">Tchad</option>
          <option value="Senegal">Senegal</option>
          <option value="Autres">Autres</option>
        </select>
      </div>

      

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description de l'Incident:</label>
        <textarea ref={descriptionRef} id="description" name="description" className="form-controlh" rows="5" required></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="additional-info" className="form-label">Informations Supplémentaires:</label>
        <textarea ref={additionalinfoRef} id="additionalInfo" name="additional-info" className="form-controlh" rows="3"></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="moyen_contact" className="form-label">Moyen par lequel on peut vous contacter:</label>
        <input ref={moyen_contactRef} type="text" className="form-controlh" id="moyen_contact" placeholder="un numero, un email..." required />
      </div>

      <div className="mb-3">
        <label htmlFor="full-name" className="form-label">Nom et/ou prenom:</label>
        <input ref={nameRef} type="text" className="form-controlh" id="name" placeholder="Catelle Ningha" required />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Ajouter ou un fichier descriptif:</label>
        <div className="input-group">
          <input type="file" ref={imageRef} className="form-controlh" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
        </div>
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
      <div id="notification" className="notification">Alert submitted successfully!
     
      </div>

    </div>

  );
};
export default Help;